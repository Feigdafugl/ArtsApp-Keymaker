/**
 * @file AppRouter.js
 * @author Kjetil Fossheim
 *
 * router for the Keymaker. The menu and the KeyHeader is outside the router, since these is static.
 */

// IMPORT
import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/Statics/Header';
import SideMenu from '../components/Statics/SideMenu';
import KeyHeader from '../components/KeyComp/KeyHeader';
import Key from '../screens/Key';
import Traits from '../screens/Traits';
import Species from '../screens/Species';


// COMPONENT
export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header/>
            <div className = "mainContainer ">
                <SideMenu />
                <div className = "col p-0" >
                    <KeyHeader/>
                    <div className = "py-2 content">
                        <Switch>
                            <Route path='/' component={Key} exact={true} />
                            <Route path='/arter' component={Species} />
                            <Route path='/egenskaper' component={Traits} />
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
            </div>
        </Fragment>
    </BrowserRouter>
);
