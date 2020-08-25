import React, {Component} from 'react';
import ListItem from './ListItem/ListItem';
import vectorLayer from '../../map.js'
import './List.css'
import Filter from './Filter/Filter'
import Edit from './Edit/Edit'

class List extends Component {
    constructor() {
        super();
        let places = vectorLayer.getSource().getFeatures();
        this.state = {
            data: places,
            unsortedData : places
        }
        this.sortByName = this.sortByName.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.filterElements = this.filterElements.bind(this);
        this.editFill = this.editFill.bind(this);
        this.editSave = this.editSave.bind(this);
    }

    sortByName() {
        this.state.data.sort( function ( a, b ) {
            if ( a.values_.street < b.values_.street ){
              return -1;
            }
            if ( a.last_nom > b.last_nom ){
              return 1;
            }
            return 0;
          });
          this.setState({unsortedData: this.state.data})
    }

    deleteElement(id) {
        document.getElementById('edit-box').style.display = "none";
        document.getElementById('i-search-street').value = "";
        vectorLayer.getSource().removeFeature(vectorLayer.getSource().uidIndex_[id]);
        this.setState({data: vectorLayer.getSource().getFeatures(), unsortedData: vectorLayer.getSource().getFeatures()});
    }

    filterElements(val) {
        let leftPlaces = this.state.unsortedData.filter(function (e) {
            return e.values_.street.substring(0,val.length).toLowerCase() == val.toLowerCase();
        });
        this.setState({data: leftPlaces});
    }

    editFill(id) {
        document.getElementById('edit-box').style.display = "block";
        document.getElementById('p-street').textContent = vectorLayer.getSource().uidIndex_[id].values_.street;
        document.getElementById('i-spots').value = vectorLayer.getSource().uidIndex_[id].values_.spots;
        document.getElementById('i-handicappedSpots').value = vectorLayer.getSource().uidIndex_[id].values_.handicappedSpots;
        document.getElementById('i-paid').checked = vectorLayer.getSource().uidIndex_[id].values_.paid;
        document.getElementById('i-id').value = id;
        
    }

    editSave(id) {
        vectorLayer.getSource().uidIndex_[id].values_.spots = document.getElementById('i-spots').value;
        vectorLayer.getSource().uidIndex_[id].values_.handicappedSpots = document.getElementById('i-handicappedSpots').value;
        vectorLayer.getSource().uidIndex_[id].values_.paid = document.getElementById('i-paid').checked;
        this.setState({data: vectorLayer.getSource().getFeatures(), unsortedData: vectorLayer.getSource().getFeatures()});
        document.getElementById('edit-box').style.display = "none";
    }
    
    render() {
        return (
            <div>
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th className="btn-sort" onClick={this.sortByName}>Ulica</th>
                            <th>Miejsca</th>
                            <th>Dla niep.</th>
                            <th>Płatny</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(item => (
                            <ListItem 
                                street={item.values_.street} 
                                spots={item.values_.spots} 
                                handicappedSpots={item.values_.handicappedSpots} 
                                paid={item.values_.paid}
                                id={item.ol_uid}
                                key={item.ol_uid}
                                lat={1}
                                lon={2}
                                edit={id => this.editFill(id)}
                                delete={id => this.deleteElement(id)}
                            />
                        ))}
                    </tbody>
                </table>
                <Filter 
                    filterFunction={val => this.filterElements(val)}
                />
                <Edit 
                    editFunction={id => this.editSave(id)}
                />
            </div>
        )
    }
}

export default List;