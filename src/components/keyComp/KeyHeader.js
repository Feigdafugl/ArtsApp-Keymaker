/* eslint react/prop-types: 0 */

/**
 * @file KeyHeader.js
 * @author Kjetil Fossheim
 *
 * Header for the current key in the making. Handles input for title and author. The keyheader is also handling the download of al key data to a JSON-file.
 * The "Lagre" button will be made to save to i web-service not file further on.
 *
 */

// IMPORT
import React, {Component} from 'react';
import Input from '../shared/Input';

// REDUX
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({
    ...state.key,
    ...state.species,
    ...state.trait,
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({}, dispatch)
    };
}

// COMPONENT

class KeyHeader extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            alertOpen: false,
        };
    }

    /**
     * makes the JSON object for printing to file.
     * @return {Object}
     */
    makeJSON = () => {
        var data = {};
        data = { [this.props.activeKey.title.replace(/\s/g,'')]: this.props.activeKey};
        data[this.props.activeKey.title.replace(/\s/g,'')].content = {species: this.props.speciesList, trait: this.props.traitValueCombo};
        return JSON.stringify(data);
    }

    /**
     * Function to download data to a file
     * @param {string} filename optional file name, is overruled by 'artsappSave.json'
     * @return {bool} false if user cancels
     */

    download = ( filename) =>{
        var r = confirm('Vil du lagre nøkkelen?');
        if (r == true) {
            filename = 'artsappSave.json';
            var file = new File([this.makeJSON()], 'artsappSave.json', {type:'application/json'});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement('a'),
                    url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        } else {
            return false;
        }

    }

    render () {
        return (
            <div className="keyheader">
                <div className="col-12 justify-content-around row">
                    <div className="row col-xl-5 col-lg-5 col-md-12 col-12 my-1">
                        <Input
                            name = "title"
                            type = "key"
                            label = "Tittel"
                            value = {this.props.activeKey.title}
                            inputType = "text"
                            typeID = {1}
                        />
                    </div>
                    <div className="row col-xl-5 col-lg-5 col-md-12 col-12 my-1">
                        <Input
                            name = "author"
                            type = "key"
                            label = "Forfatter"
                            value = {this.props.activeKey.author}
                            inputType = "text"
                            typeID = {1}
                        />
                    </div>
                    <button className = "btn col-xl-2 col-lg-2 col-md-4 col-sm-4 col-4 my-1" type="button" onClick= {this.download}>Lagre</button>
                </div>
            </div>
        );
    }


}
export default connect(mapStateToProps, mapDispatchToProps)(KeyHeader);
