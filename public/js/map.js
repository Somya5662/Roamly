console.log("MAP.JS LOADED");

mapboxgl.accessToken = mapToken;
const coordinates = listing.geometry.coordinates;

const map = new mapboxgl.Map({
    container: 'map',
    center: listing.geometry.coordinates,
    zoom: 9,
});

console.log("COORDINATES:", coordinates);
console.log("TYPE:", typeof coordinates);
console.log("IS ARRAY:", Array.isArray(coordinates));

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
  .setPopup(new mapboxgl.Popup({offset: 25})
  .setHTML(
    `<h4>${listing.title}</h4><p>Exact loction will be provided after booking</p>`
)
)
  .addTo(map);