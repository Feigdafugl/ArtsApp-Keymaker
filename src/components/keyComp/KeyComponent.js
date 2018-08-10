/* eslint react/prop-types: 0 */

/**
 * @file KeyHeader.js
 * @author Kjetil Fossheim
 *
 * Component for the current key in the making. Handles input for description, Logo, description Image, level of key and level of publishing.
 *
 */

// IMPORT
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Input from '../shared/Input';


// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as keyActions from '../../state/actions/keyActions';

const mapStateToProps = (state) => ({
    ...state.key,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...keyActions}, dispatch)
    };
}

// FileReader var to be init
var reader;

// COMPONENT
class KeyComponent extends Component {

    constructor (props) {
        super(props);
        this.state = {
            descriptionImage: 0,
            imageLogo: 0,
            level: 0,
            publishingLevel: 0,
        };
    }

    /**
     * reads image files and saves it to global state
     * @param {Object} event event from input field, containing files
     * @return {void}
     */
    fileSelect = (event) => {
        const target = event.target;
        const name = target.name;
        var b = Object.values(event.target.files);
        if (b[0].type.match('image.*')) {
            reader = new FileReader();
            reader.readAsDataURL(b[0]);
            reader.onloadend = this.handelUpload.bind(this, name);
        }
        this.props.actions.changeKeyValues(name, b, 1);
    }

    handelUpload =(name) => {
        const image = reader.result;
        this.setState({
            [name]: image
        });
    }

    levelSelect = (event) => {
        this.props.actions.changeKeyValues('level', event.target.name, 1);
        this.setState({
            level: event.target.name,
        });
    }

    publichSelect = (event) => {
        this.props.actions.changeKeyValues('publishingLevel', event.target.name, 1);
        this.setState({
            publishingLevel: event.target.name,
        });
    }

    render () {
        return (
            <div className="row keyContainer">
                <div className="col-xl-4 col-lg-12">
                    <Input
                        name = "description"
                        type = "key"
                        inputType = "textarea"
                        label = "Beskrivelse"
                        value = {this.props.activeKey.description}
                        typeID = {1}
                    />
                    <div className= "mt-5">
                        <label className= "input-label" htmlFor="publishing">Publisering</label>
                        <div id="publishing" >
                            <div className="btn-group"  >
                                <button type="button" className={this.state.publishingLevel === 'private' || this.props.activeKey.publishingLevel === 'private' ? 'btn btn-outline-secondary active setFocus' : 'btn btn-outline-secondary setFocus'} name="private" onClick = {this.publichSelect}>Privat</button>
                                <button type="button" className={this.state.publishingLevel === 'beta' || this.props.activeKey.publishingLevel === 'beta' ? 'btn btn-outline-secondary active setFocus' : 'btn btn-outline-secondary setFocus'} name="beta" onClick = {this.publichSelect}>Beta</button>
                                <button type="button" className={this.state.publishingLevel === 'public' || this.props.activeKey.publishingLevel === 'public' ? 'btn btn-outline-secondary active setFocus' : 'btn btn-outline-secondary setFocus'} name="public" onClick = {this.publichSelect}>Publisert</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xl-4 col-lg-12">
                    <div className="key-image-container">
                        <label className = "key-image-label" >Beskrivelses bilde</label>
                        { this.state.descriptionImage !== 0 ?
                            <button  data-tip="React-tooltip" type= "button" className="imageUpload-withIMG  mr-3" onClick = {() => this.fileInputDes.click()} >
                                <img className="smallImage" src={this.state.descriptionImage} alt="hei"></img>
                            </button>
                            :
                            <button  data-tip="React-tooltip" type= "button" className="imageUpload setFocus mr-3" onClick = {() => this.fileInputDes.click()} >
                                <label style ={{cursor: 'pointer'}}>Last opp bilde</label>
                                <i style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#505050'}} className="fas fa-upload" />
                            </button>
                        }
                    </div>
                    <div className="key-image-container">
                        <label className = "key-image-label" >Ikon</label>
                        { this.state.imageLogo !== 0 ?
                            <button  data-tip="React-tooltip" type= "button" className="imageUpload-withIMG  mr-3" onClick = {() => this.fileInputIcon.click()} >
                                <img className="smallImage" src={this.state.imageLogo} alt="hei"></img>
                            </button>
                            :
                            <button data-tip="React-tooltip" type= "button" className="imageUpload setFocus mr-3" onClick = {() => this.fileInputIcon.click()} >
                                <label style ={{cursor: 'pointer'}}>Last opp bilde</label>
                                <i style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: '#505050'}} className="fas fa-upload" />
                            </button>
                        }
                    </div>
                </div>
                <div className="col-xl-4 col-lg-12 row">
                    <div className="col-10">
                        <div className="col-12">
                            <label className="input-label">Nivå</label>
                        </div>
                        <div className="col-8 radioGroup">
                            <div className="form-check">
                                <input type="radio" className="form-check-input setFocus" id="defaultGroupExample1" name="scientific" checked={this.state.level == 'scientific' || this.props.activeKey.level == 'scientific'} onChange = {this.levelSelect}/>
                                <label className="form-check-label" htmlFor="defaultGroupExample1">Vitenskapelig</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input setFocus" id="defaultGroupExample2" name="local" checked={this.state.level == 'local' || this.props.activeKey.level == 'local'}  onChange = {this.levelSelect}/>
                                <label className="form-check-label" htmlFor="defaultGroupExample2">Lokal</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input setFocus" id="defaultGroupExample3" name="other" checked={this.state.level == 'other' || this.props.activeKey.level == 'other'}  onChange = {this.levelSelect}/>
                                <label className="form-check-label" htmlFor="defaultGroupExample3">Annet</label>
                            </div>
                        </div>
                    </div>
                </div>
                <input
                    type="file"
                    name= "imageLogo"
                    style= {{display: 'none'}}
                    onChange = {this.fileSelect}
                    accept = ".jpg, .jpeg, .png"
                    ref = {fileInputIcon => this.fileInputIcon = fileInputIcon}
                />
                <ReactTooltip place="right" type="light" effect="float">
                    <span style={{fontSize: '0.8em'}}>Trykk for å laste opp bildefil.</span>
                </ReactTooltip>
                <input
                    type="file"
                    name= "descriptionImage"
                    style= {{display: 'none'}}
                    onChange = {this.fileSelect}
                    accept = ".jpg, .jpeg, .png"
                    ref = {fileInputDes => this.fileInputDes = fileInputDes}
                />
                {this.state.icon}
            </div>
        );
    }


}

KeyComponent.propTypes = {
    actions: PropTypes.any
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyComponent);
