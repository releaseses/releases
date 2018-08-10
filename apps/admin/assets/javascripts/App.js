import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import NavItem from './components/NavItem'

import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faToolbox } from '@fortawesome/free-solid-svg-icons'

import ReleasesIndexPage from './containers/ReleasesIndexPage';
import CreateReleasePage from './containers/CreateReleasePage';
import EditReleasePage from './containers/EditReleasePage';

class App extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <div>
                    <nav className="navbar is-info">
                        <div className="navbar-brand">
                            <Link className="navbar-item" to="/admin/" />
                            <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </nav>
                    <section className="hero is-info">
                        <div className="tabs is-boxed is-centered main-menu is-medium" id="nav">
                            <ul>
                                <NavItem to="/admin">
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faList}/>
                                        </span>
                                    <span>Releases</span>
                                </NavItem>

                                <li className={'is-blured'}>
                                    <a className={'is-disabled'}>
                                        <span className="icon">
                                            <FontAwesomeIcon icon={faToolbox}/>
                                        </span>
                                        <span>Settings</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <Route exact path="/admin" component={ReleasesIndexPage}/>
                    <Route exact path="/admin/releases" component={ReleasesIndexPage}/>
                    <Route exact path="/admin/releases/new" component={CreateReleasePage}/>
                    <Route path="/admin/releases/:id/edit" component={EditReleasePage}/>
                </div>
            </Router>
        );
    }
}

export default App;
