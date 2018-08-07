/* eslint react/prop-types: 0 */
import React, {Component} from 'react';

import { NavLink } from 'react-router-dom';
import logo from '../../images/logo_bygger.png';


// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as keyActions from '../../state/actions/keyActions';
import * as traitActions from '../../state/actions/traitActions';
import * as speciesActions from '../../state/actions/speciesActions';

const mapStateToProps = (state) => ({
    ...state.key,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...keyActions, ...traitActions, ...speciesActions}, dispatch)
    };
}


var reader;


// COMPONENT

class Header extends Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    fileSelect = (event) => {
        var b = Object.values(event.target.files);
        if (b.length <= 0) {
            return false;
        }
        if (b[0].type.match('json') ) {
            console.log('ja');
            reader = new FileReader();
            reader.readAsText(b[0]);
            reader.onloadend = this.handelUpload.bind(this, );
        }
    }

    handelUpload =(e) => {
        console.log(e);
        var result = JSON.parse(e.target.result);
        console.log(result);
        var content = result.content;
        delete result.content;
        console.log(content);
        this.props.actions.setKey(result);
        this.props.actions.setSpecies(content.species);
        this.props.actions.setTraits(content.trait);
    }

    render () {
        return (
            <div>
                <div className = " animated fadeIn header">
                    <div className = "col-lg-3 col-md-3 col-sm-3 col-xs-6">
                        <img className="m-3" height="100" src={logo} alt="Logo" />
                    </div>
                    <div className = "col-lg-6 col-md-6 col-sm-6 col-xs-6 justify-content-center align-self-center">
                        <h3 className = " headerText text-center">ArtsApp nøkkelbygger</h3>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12 align-self-end row" >
                        <input
                            type="file"
                            style= {{display: 'none'}}
                            name= "uploadFile"
                            accept = ".json"
                            onChange = {this.fileSelect}
                            ref = {fileInput => this.fileInput = fileInput}
                        />
                        <button type= "button" className="btn headerBtn " onClick = {() => this.fileInput.click()} >
                            Last opp nøkkel
                        </button>
                    </div>
                </div>
                <nav className=" navbar-expand-lg navbar-light row">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" onClick = {this.onClickHome}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className=" collapse align-self-end ml-auto" id="menu">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <div className="nav-link">
                                    <NavLink to='/' className="menu" activeClassName='menu selected-col' exact={true}>HOME</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <NavLink to='/arter' className="menu" activeClassName='menu selected-col'>Arter</NavLink>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <NavLink to='/egenskaper' className="menu" activeClassName='menu selected-col'>Egenskaper</NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
