import { useState } from 'react';
import { useStopsContext } from '../../providers/stops/stops.context.jsx';
import { useCoordinatesContext } from '../../providers/coordinates/coordinates.context';

import { Input } from '../input/input.component';

import './button.styles.scss';

export const Add = () => {
  const { stopsState, stopsDispatch } = useStopsContext();

  function addStop() {
    stopsDispatch([
      ...stopsState,
      <Input label={`Stop ${stopsState.length + 1}`} id={`Stop ${stopsState.length + 1}`} />,
    ]);
    console.log(stopsState);
  }

  return (
    <div className="add">
      <div className={`add__overlay`} onClick={addStop}>
        <p>+ Add Destination</p>
      </div>
      <div className="add__button">
        <Input label="Add" />
      </div>
    </div>
  );
};

export const Directions = () => {
  const { corState } = useCoordinatesContext();

  if (corState.start) {
    return <div className="directions">Directions</div>;
  }

  return <></>;
};
