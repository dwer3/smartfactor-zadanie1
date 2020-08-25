import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Fill, Stroke, Style} from 'ol/style';
import Overlay from 'ol/Overlay';
import {fromLonLat} from 'ol/proj';
import Parkingi from './parkingi';


// Syle
var defaultStyle = new Style({
  stroke: new Stroke({
    color: 'green',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(0, 255, 0, 0.5)',
  }),
});

var hoverStyle = new Style({
  stroke: new Stroke({
    color: 'red',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(255, 0, 0, 0.3)',
  }),
});
var selectStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 1,
  }),
  fill: new Fill({
    color: 'rgba(0, 0, 255, 0.5)',
  }),
});  


// Popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');

var overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});


// Mapy
var tileLayer = new TileLayer({
  source: new OSM()
});

var vectorLayer = new VectorLayer({
  source: new VectorSource({
    features: new GeoJSON({
      featureProjection: 'EPSG:3857',
    }).readFeatures(Parkingi)
  }), 
  style: defaultStyle,
});

var view = new View({
  center: fromLonLat([18.6078249,54.3837191]),
  zoom: 16.5,
})

var map = new Map({
  layers: [tileLayer, vectorLayer],
  target: 'map',
  overlays: [overlay],
  view: view
});


// Integracja mapy
var selected = null;
map.on('pointermove', function (e) {
  if (selected !== null) {
    selected.setStyle(undefined);
    overlay.setPosition(undefined);
    selected = null;
  }
  map.forEachFeatureAtPixel(e.pixel, function (f) {
    selected = f;
    var coordinate = e.coordinate;
    content.innerHTML = '<p>Ulica: '+ selected.get('street') +'</p><p>Liczba miejsc: ' + selected.get('spots') + '</p><p>Liczba miejsc dla niep.: ' + selected.get('handicappedSpots') + '</p><p>Płatne: ' + (selected.get('paid')?"tak":"nie") + '</p>';
    overlay.setPosition(coordinate);
    return true;
  });
});

export default vectorLayer;
export {view, defaultStyle, hoverStyle, selectStyle};