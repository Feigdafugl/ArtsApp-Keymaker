/* eslint react/prop-types: 0 */

/**
 * @file Key.js
 * @author Kjetil Fossheim
 *
 * Screen wrapping the key input component.
 *
 */

// IMPORT
import React, {Component} from 'react';
import KeyComponent from '../components/keyComp/KeyComponent';


// COMPONENT
class Key extends Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        return (
            <div className = "py-3 content" >
                <KeyComponent/>
            </div>
        );
    }

}

export default Key;
