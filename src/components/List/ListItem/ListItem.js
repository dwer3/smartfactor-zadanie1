import React from 'react';
import './ListItem.css';
import vectorLayer, {view, defaultStyle, hoverStyle, selectStyle} from '../../../map.js'

const ListItem = (props) => (
    <tr className="list-items" 
    onMouseOver={() => {vectorLayer.getSource().uidIndex_[props.id].setStyle(hoverStyle)}} 
    onMouseLeave={() => {vectorLayer.getSource().uidIndex_[props.id].setStyle(defaultStyle)}}
    onClick={() => {vectorLayer.getSource().uidIndex_[props.id].setStyle(selectStyle);view.animate({center: [vectorLayer.getSource().uidIndex_[props.id].geometryChangeKey_.target.extent_[0],vectorLayer.getSource().uidIndex_[props.id].geometryChangeKey_.target.extent_[1]],duration: 1000,zoom: 18});}} >
        <td>{props.street}</td>
        <td>{props.spots}</td>
        <td>{props.handicappedSpots}</td>
        <td>{props.paid?"tak":"nie"}</td>
        <td><button onClick={(e) => {e.stopPropagation();props.edit(props.id)}}>Edytuj</button></td>
        <td><button onClick={(e) => {e.stopPropagation();props.delete(props.id)}}>Usuń</button></td>
    </tr>
)

export default ListItem;