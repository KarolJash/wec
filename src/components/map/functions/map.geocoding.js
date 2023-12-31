export const geoCoding = async addr => {
  const query = new URLSearchParams({
    country: 'CA',
    language: 'en',
    limit: '5',
    access_token: 'pk.eyJ1Ijoia2Fyb2wtamFzaCIsImEiOiJjbGpzbzd1MWswcDNyM3JydzVsdGE3NDFsIn0.3V_WODA18Rj3mJhJX2dbpg',
  }).toString();

  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?${query}`, {
    method: 'GET',
  });
  /*
  const response = await fetch(
    `https://graphhopper.com/api/1/geocode?q=${addr}&locale=de&key=ee4af31e-0f04-4b6c-9f9b-c8a665ec6a89`,
    { method: 'GET' }
  );
  */
  return await response.json();
};
