import React, {Component} from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import './Viewer.scss'
import Logo from './components/Logo'
import NotFound from './components/NotFound'
import ReleaseTimelinePage from './containers/ReleaseTimelinePage'
import ReleasePage from './containers/ReleasePage'

class Viewer extends Component {
    render() {
        return (
            <Router history={this.props.history}>
                <div className={'viewer-container'}>
                    <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
                        <div className="container">
                            <div className="navbar-brand">
                                <Link to={'/'} className="navbar-item">
                                    <Logo/>
                                </Link>
                                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                    <span aria-hidden="true"></span>
                                </a>
                            </div>
                        </div>
                    </nav>
                    <div className={'viewer-body'}>
                        <Switch>
                        <Route exact path="/" component={ReleaseTimelinePage}/>
                        <Route exact path="/releases" component={ReleaseTimelinePage}/>
                        <Route path="/releases/:version" component={ReleasePage}/>
                        <Route component={NotFound} />
                        </Switch>
                    </div>
                    <footer className="footer">
                        <div className="content has-text-centered">
                            <p>
                                <a href="https://github.com/releaseses/releases">Releases app</a>.
                                The source code is licensed <a href="https://github.com/releaseses/releases/blob/master/LICENSE.txt">MIT</a>.
                            </p>
                        </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

export default Viewer;
