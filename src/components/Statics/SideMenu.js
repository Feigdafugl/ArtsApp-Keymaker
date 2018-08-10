/**
 * @file SideMenu.js
 * @author Kjetil Fossheim
 *
 * Component containing the side menu. Collapses at small screens.
 *
 */

// IMPORT
import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

// COMPONENT
class SideMenu extends Component {

    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        return (
            <nav className="navbar-expand-lg sidemenu">
                <div className="collapse in navbar-collapse" id="menu">
                    <ul className="navbar-nav flex-column">
                        <NavLink className="menu nav-item nav-link" to='/' activeClassName='menu selected' exact={true}>Nøkkel</NavLink>
                        <NavLink className="nav-item nav-link menu"  to='/arter' activeClassName='menu selected'>Arter</NavLink>
                        <NavLink className="nav-item nav-link menu" to='/egenskaper' activeClassName='menu selected'>Egenskaper</NavLink>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default SideMenu ;
