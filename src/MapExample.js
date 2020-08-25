import React from 'react';
import 'ol/ol.css';
import {Map, View, Tile}  from 'ol';
import {OSM} from 'ol/source';



class MapExample  {

    componentDidMount() {
        var map = new Map({
            view: new View({
                center: [0, 0],
                zoom: 1
            }),
            layers: [
                new Tile({
                    source: new OSM()
                })
            ],
            target: 'map'
        });
    }
    render() {

        return (
            <div id="map"></div>
        )
    }
}

export default MapExample;