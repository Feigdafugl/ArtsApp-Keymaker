/* eslint react/prop-types: 0 */
// IMPORT PACKAGES
import React, {Component} from 'react';

import SpesiesComp from '../components/spesiesComp/SpesiesComp';
import ReactList from 'react-list';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as speciesActions from '../state/actions/speciesActions';

const mapStateToProps = (state) => ({
    ...state.species,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...speciesActions}, dispatch)
    };
}

// COMPONENT

class Species extends Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    newSpecies = () => {
        this.props.actions.addSpecies(this.props.speciesList.length);
    }

    renderItem = (index, key) =>{
        return (
            <SpesiesComp key= {this.props.speciesList[key].speciesId} species = {this.props.speciesList[key]}/>
        );
    }

    render () {
        return (

            <div className="p-2 content">
                <ReactList
                    itemRenderer={this.renderItem}
                    length={this.props.speciesList.length}
                    type='simple'
                    style={{marginBottom: '5em'}}
                />
                <div className= "addNewBtnHolder " onClick = {this.newSpecies}>
                    <button type="button" className="addNewBtn " >
                        <i className='fas fa-plus-circle col-12 ' />
                    </button>
                    <span className= "m-2 " style={{textAlign: 'center', color: '#505050', fontWeight: '600'}}>Legg til ny art</span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Species);
