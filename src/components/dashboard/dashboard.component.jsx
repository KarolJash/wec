import { useMobileContext } from '../../providers/mobile/mobile.context';
import { handleExit } from '../details/details.component';
import { useMapContext } from '../../providers/mapbox/mapbox.context';
import { CgClose } from 'react-icons/cg';
import { useGraphhopperContext } from '../../providers/graphhopper/graphhopper.context';
import { useRouteContext } from '../../providers/route/route.context';
import { distance_meters } from '../math/math.component';
import { useCoordinatesContext } from '../../providers/coordinates/coordinates.context';
import { useStopsContext } from '../../providers/stops/stops.context.jsx';
import { removeMarker } from '../map/functions/map.markers.jsx';

import './dashboard.styles.scss';

const Dashboard = () => {
  const { mapState } = useMapContext();
  const { mobileState, mobileDispatch } = useMobileContext();
  const { graphState } = useGraphhopperContext();
  const { routeState } = useRouteContext();
  const { corState, corDispatch } = useCoordinatesContext();
  const { stopsDispatch } = useStopsContext();

  const round_distance = x => {
    if (x >= 1000) {
      return [`${Math.round(x / 100) / 10}`, 'KM'];
    }

    return [x, 'M'];
  };

  const round_time = x => {
    return [`${Math.floor(x / 3600000)}`, 'HR', `${Math.round((x % 3600000) / 60000)}`, 'MIN'];
  };

  function handleClick(e) {
    e.preventDefault();

    // handleExit(e, mapState, mobileDispatch, corDispatch, stopsDispatch, corState);
    handleExit(e, mapState, mobileDispatch, corDispatch, stopsDispatch, corState);
    removeMarker(mapState);
  }

  if (graphState) {
    const instruction_distance_left =
      routeState.instruction_distance -
      distance_meters(
        routeState.current_location[1],
        routeState.current_location[0],
        graphState.paths[0].points.coordinates[0][1],
        graphState.paths[0].points.coordinates[0][0]
      );
    const distance =
      routeState.distance -
      graphState.paths[0].instructions[routeState.instruction_index].distance +
      instruction_distance_left;

    const time =
      routeState.time -
      (1 -
        (instruction_distance_left / graphState.paths[0].instructions[routeState.instruction_index].distance) *
          graphState.paths[0].instructions[routeState.instruction_index].time);

    const today = new Date();
    today.setHours(today.getHours() + round_time(time)[0] * 1);
    today.setMinutes(today.getMinutes() + round_time(time)[2] * 1);

    return (
      <div className={mobileState === 'route' ? 'dashboard' : 'hidden'}>
        <div className="dashboard__exit">
          <CgClose className="dashboard__icon" />
          <div className="dashboard__button" onClick={handleClick} />
        </div>
        <div className="dashboard__info">
          <div className="dashboard__text">
            <p className="dashboard__text--number">
              {today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <div className="dashboard__text">
            {round_time(time)[0] * 1 !== 0 ? <p className="dashboard__text--number">{round_time(time)[0]}</p> : <></>}
            {round_time(time)[0] * 1 !== 0 ? <p className="dashboard__text--unit">{round_time(time)[1]}</p> : <></>}
            <p className="dashboard__text--number">{round_time(time)[2]}</p>
            <p className="dashboard__text--unit">{round_time(time)[3]}</p>
          </div>
          <div className="dashboard__text">
            <p className="dashboard__text--number">{round_distance(distance)[0]}</p>
            <p className="dashboard__text--unit">{round_distance(distance)[1]}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
