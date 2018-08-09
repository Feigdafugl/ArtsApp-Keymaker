/* eslint react/prop-types: 0 */
import React, {Component} from 'react';
import Input from '../shared/Input';
import ReactList from 'react-list';
import DeleteDialog from '../shared/DeleteDialog';

import Value from './Value';
import SpModal from './SpModal';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traitActions from '../../state/actions/traitActions';

const mapStateToProps = (state) => ({
    ...state.trait,
    ...state.species,
    ...state.key,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...traitActions}, dispatch)
    };
}


class Trait extends Component {

    constructor (props) {
        super(props);
        this.state = {
            important: false,
            trait: '',
            traitDescription: '',
        };
    }

    delete = () => {
        console.log('her');
        this.props.actions.removeTrait(this.props.trait.traitId);
    }

    newValue = () => {
        this.props.actions.addValue(this.props.trait.traitId);
    }

    renderSp = () => {
        return this.props.trait.traitSpecies.map ((item) => {
            var temp = this.props.speciesList.find(i => i.speciesId === item);
            return(
                <div className = "imageFile m-1" key = {item}>
                    <span >{temp.latinName}</span>
                </div>
            );
        });
    }

    renderItem = (index, key) =>{
        return (
            <div key = {this.props.trait.values[key].valueId} className ="row">
                <div className="col-1"/>
                <Value traitID = {this.props.trait.traitId} index={key + 1} value ={this.props.trait.values[key]}/>
            </div>
        );
    }

    render () {
        return (
            <div className = "traitContainer " >
                <div className ="row">
                    <div className="col-xl-4 col-lg-12">
                        <Input
                            name= "traitText"
                            inputType="popup"
                            type ="trait"
                            label = "Egenskap"
                            value={this.props.trait.traitText}
                            typeID = {this.props.trait.traitId} />
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <Input
                            name= "traitDescription"
                            inputType="textarea"
                            type ="trait"
                            label = "Beskrivelse"
                            value={this.props.trait.traitDescription}
                            typeID = {this.props.trait.traitId} />
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <Input
                            name= "important"
                            inputType="checkbox"
                            type ="trait"
                            label = "Viktig"
                            value={this.props.trait.important}
                            typeID = {this.props.trait.traitId} />
                        <div >
                            <label className="image-label" style={{marginBottom: '.5em'}} >Synlig med arter:</label>
                            <div className= "col-12 row">
                                {this.renderSp()}
                                <button type="button" className="addNewTextBtn " data-toggle="modal" data-target={'#speciesModal' + this.props.trait.traitId}>
                                    <strong className="input-label">+ Legg til/fjern Arter</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <span className="input-label">Verdier:</span>
                    <div className="valueDevider"></div>
                    <ReactList
                        itemRenderer={this.renderItem}
                        length={this.props.trait.values.length}
                        type='simple'
                    />
                    <div className = "row">
                        <div className="col-1"/>
                        <div className= "addNewBtnHolder mb-2">
                            <button type="button" className="addNewBtn " onClick = {this.newValue}>
                                <i className='fas fa-plus-circle col-12 ' />
                            </button>
                            <span className= "m-2 " style={{textAlign: 'center', color: '#505050', fontWeight: '600'}}>Legg til ny verdi</span>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={'speciesModal' + this.props.trait.traitId} tabIndex="-1" role="dialog" aria-labelledby="speciesModal" aria-hidden="true">
                    <SpModal traitSpecies = {this.props.trait.traitSpecies} type="sp" typeID= {this.props.trait.traitId} onDialogClick = {this.newValue}/>
                </div>
                <div className="modal fade" id={'deleteDialogT' +this.props.trait.traitId} tabIndex="-1" role="dialog" aria-labelledby={'deleteDialogT' +this.props.trait.traitId} aria-hidden="true">
                    <DeleteDialog  type= "trait" onDialogClick = {this.delete}/>
                </div>
                <button type="button" className= "setFocus   delIcon"  data-toggle="modal"  data-target={'#deleteDialogT' +this.props.trait.traitId} >
                    <i className="far fa-trash-alt "/>
                </button>
            </div>
        );
    }
}

Trait.defaultProps= {
    trait: {
        traitId: 1,
        values: [1]
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Trait);
