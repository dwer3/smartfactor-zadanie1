import React from 'react';
import './Filter.css'

const Filter = props => (
    <div className="filter-wrapper">
        <h3>Filtruj</h3>
        <div className="filter-input">
            <label>Ulica: </label>
            <input type="text" id="i-search-street" onChange={(e) => {props.filterFunction(e.target.value)}}></input>
        </div>
        
    </div>
)

export default Filter;