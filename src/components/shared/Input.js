
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// COMPONENT

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as speciesActions from '../../state/actions/speciesActions';
import * as keyActions from '../../state/actions/keyActions';
import * as traitActions from '../../state/actions/traitActions';

const mapStateToProps = (state) => ({
    ...state.species,
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...speciesActions, ...keyActions, ...traitActions}, dispatch)
    };
}



class Input extends Component {

    constructor (props) {
        super(props);
        this.state = {
            value: props.value,
            invalid: false,
            focus: false,
        };
    }

    onFocus = () =>{
        this.setState({
            focus: true,
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            value: value
        });
        switch (this.props.type) {
            case 'sp':
                this.props.actions.changeSpValues(name, value, this.props.typeID);
                break;
            case 'trait':
                this.props.actions.changeTraitValues(name, value, this.props.typeID);
                break;
            case 'value':
                this.props.actions.changeValueValues(name, value, this.props.typeID, this.props.traitID);
                break;
            case 'key':
                this.props.actions.changeKeyValues(name, value, this.props.typeID);
                break;
            default:
        }
    }

    fileSelect = (event) => {
        const target = event.target;
        const name = target.name;
        var b = Object.values(event.target.files);
        var imageList = [];
        if (this.props.type === 'value') {
            var traitIndex = this.props.traitValueCombo.findIndex(i => i.traitId === this.props.traitID);
            var valueIndex = this.props.traitValueCombo[traitIndex].values.findIndex(i => i.valueId === this.props.typeID);
            imageList = this.props.traitValueCombo[traitIndex].values[valueIndex].images.concat(b);
            this.props.actions.changeValueValues(name, imageList, this.props.typeID, this.props.traitID);
        } else if (this.props.type === 'sp') {
            imageList = this.props.speciesList[this.props.typeID-1].images.concat(b);
            this.props.actions.changeSpValues(name, imageList, this.props.typeID);
        }
    }

    importantSel =  () =>{
        this.props.actions.changeTraitValues(this.props.name, !this.props.value, this.props.typeID);
        this.setState({
            value: !this.props.value,
        });
    }

    removeFile =(name) => {
        var t = this.props.value.findIndex(i => i.name === name);
        if (this.props.type === 'value') {
            this.props.actions.removeValueImage(t, this.props.typeID, this.props.traitID);
        } else if (this.props.type === 'sp') {
            this.props.actions.removeSpImage(t, this.props.typeID);
        }
    }

    renderFilses = () => {
        return this.props.value.map ((item) => {
            return(
                <div className = "imageFile m-1" key = {item.name}>
                    <span >{item.name}</span>
                    <div className = "imageBadge" onClick = {this.removeFile.bind(this, item.name)} >
                        <i className='fas fa-times ' />
                    </div>
                </div>
            );
        });
    }

    /**
     * // input med label over som dukker opp
                <div className="input-container_temp">
                     <label className="input-label_temp" style={this.state.focus && this.state.value.length !== 0 || this.state.value.length !== 0 ? {} : {visibility: 'hidden'} } id="">{this.props.label}</label>
                     <input className="input_temp input-field_temp" placeholder ={this.props.label} onFocus={this.onFocus} name= {this.props.name} style= {this.state.invalid ? {borderWidth: 2, borderColor: 'red', borderStyle: 'solid'} : {}} value={this.state.value}  onChange={this.handleInputChange} type={this.props.inputType}/>
                </div>
     */
    render () {
        if (this.props.inputType === 'textarea') {
            return (
                <div className="input-container-popup">
                    <label style= {this.props.type ==='key' ? {backgroundColor: '#DFE7ED'} : {}} className="input-label-popup" htmlFor="beskrivelse">{this.props.label}</label>
                    <textarea className="input-popup input-TextField"  style= {this.props.type ==='key' ? {backgroundColor: '#DFE7ED'} : {}} id="description" name= {this.props.name} rows="4" value = {this.props.value} onChange = {this.handleInputChange}></textarea>
                </div>
            );
        }else if (this.props.inputType === 'image') {
            return (
                <div className="col-12 align-items-center row mt-2">
                    <label className="image-label" >{this.props.label}</label>
                    {this.renderFilses()}
                    <input
                        type="file"
                        style= {{display: 'none'}}
                        name= {this.props.name}
                        multiple
                        accept = ".jpg, .jpeg, .png"
                        onChange = {this.fileSelect}
                        ref = {fileInput => this.fileInput = fileInput}
                    />
                    <button  data-tip="React-tooltip" type= "button" className="addNewTextBtn ml-1" onClick = {() => this.fileInput.click()} >
                        <strong className="input-label" >+ Legg til</strong>
                        <ReactTooltip place="right" type="light" effect="float">
                            <span style={{fontSize: '0.8em'}}>Trykk for å laste opp bildefil.</span>
                        </ReactTooltip>
                    </button>
                </div>
            );
        } else if (this.props.inputType === 'checkbox') {
            return (
                <div className="form-check form-check-inline">
                    <label className="form-check-label mr-3 image-label " htmlFor="importantCheck">{this.props.label}</label>
                    <button name= {this.props.name} type="button" className= "setFocus checkboxBtn" onClick = {this.importantSel}>
                        {this.props.value ?
                            <i className=" input input-checkbox far fa-check-square"/>
                            :
                            <i className="input input-checkbox far fa-square"/>
                        }
                    </button>
                </div>
            );
        }else if (this.props.inputType === 'popup' ) {
            return (
                <div className="input-container-popup">
                    <label className="input-label-popup" style={this.state.focus && this.props.value.length !== 0 || this.props.value.length !== 0 ? {} : {visibility: 'hidden'} } id="">{this.props.label}</label>
                    <input className="input-popup input-field-popup" placeholder ={this.props.label} onFocus={this.onFocus} name= {this.props.name} style= {this.state.invalid ? {borderWidth: 2, borderColor: 'red', borderStyle: 'solid'} : {}} value={this.props.value}  onChange={this.handleInputChange} type="text"/>
                </div>
            );
        }
        return (
            <div className="my-2 input-container">
                <label className="input-label" id="">{this.props.label}</label>
                <input className="input input-field" name= {this.props.name} style= {this.state.invalid ? {borderWidth: 2, borderColor: 'red', borderStyle: 'solid'} : {}} value={this.props.value}  onChange={this.handleInputChange} type={this.props.inputType}/>
            </div>
        );
    }
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['sp', 'trait', 'value', 'key']).isRequired,
    typeID: PropTypes.number.isRequired,
    value: PropTypes.any.isRequired,
    traitID: PropTypes.number,
    validation: PropTypes.func,
    actions: PropTypes.any,
    speciesList: PropTypes.array,
    label: PropTypes.string,
    traitValueCombo: PropTypes.any,
};



export default connect(mapStateToProps, mapDispatchToProps)(Input);
