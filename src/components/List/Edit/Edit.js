import React from 'react';
import './Edit.css'

const Edit = props => (
    <div className="edit-wrapper" id="edit-box">
        <h3>Edytuj</h3>
        <div className="edit-fields">
            <div className="edit-field">
                <label>Ulica</label>
                <p id="p-street"></p>
            </div>
            <div className="edit-field">
                <label>Miejsca</label>
                <input type="text" id="i-spots" />
            </div>
            <div className="edit-field">
                <label>Miejsca dla niep.</label>
                <input type="text" id="i-handicappedSpots" />
            </div>
            <div className="edit-field">
                <label>Płatny</label>
                <input type="checkbox" id="i-paid" />
            </div>
            <div className="edit-field">
                <input type="hidden" id="i-id" />
                <button onClick={id => {props.editFunction(document.getElementById('i-id').value)}}>Zapisz</button>
            </div>

        </div>
    </div>
)

export default Edit;