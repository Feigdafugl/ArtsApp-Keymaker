/* eslint react/prop-types: 0 */
/**
 * @file Traits.js
 * @author Kjetil Fossheim
 *
 * Screen controlling the list of traits adding new to the list.
 *
 */

// IMPORT
import React, {Component} from 'react';
import ReactList from 'react-list';
import Trait from '../components/TraitValue/Trait';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traitActions from '../state/actions/traitActions';

const mapStateToProps = (state) => ({
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...traitActions}, dispatch)
    };
}

// COMPONENT

class Traits extends Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    newTrait = () => {
        this.props.actions.addTrait();
    }


    renderItem = (index, key) =>{
        console.log(this.props.traitValueCombo);
        return (
            <Trait key = {this.props.traitValueCombo[key].traitId} trait ={this.props.traitValueCombo[key]}/>
        );
    }

    render () {
        return (
            <div className="py-2 content">
                <ReactList
                    itemRenderer={this.renderItem}
                    length={this.props.traitValueCombo.length}
                    type='simple'
                    style={{marginBottom: '2em'}}
                />
                <div className= "addNewBtnHolder">
                    <button type="button" className="addNewBtn " onClick = {this.newTrait}>
                        <i className='fas fa-plus-circle col-12 ' />
                    </button>
                    <span className= "m-2 " style={{textAlign: 'center', color: '#505050', fontWeight: '600'}}>Legg til ny egneskap</span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Traits);
