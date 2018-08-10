import React, {Component} from 'react'
import './ReleaseList.scss'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faCertificate, faClock, faArrowUp, faUserNinja, faEye } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment'

export default class ReleaseList extends Component {
    constructor(props) {
        super(props)

        this.renderLoaderOrReleases = this.renderLoaderOrReleases.bind(this)
        this.renderLoader = this.renderLoader.bind(this)
        this.renderEmptyReleases = this.renderEmptyReleases.bind(this)
        this.renderReleases = this.renderReleases.bind(this)
        this.renderRelease = this.renderRelease.bind(this)
    }

    componentDidMount() {
        this.props.fetchReleases()
    }

    renderLoaderOrReleases() {
        if (this.props.isFetching) {
            return this.renderLoader()
        } else if (this.props.releases.length === 0) {
            return this.renderEmptyReleases()
        } else {
            return this.renderReleases()
        }
    }

    renderLoader() {
        return (
            <div className="box content has-text-centered">
                <span className="icon is-large has-text-info">
                    <Spinner name='circle' fadeIn={'full'} color={'#209cee'}/>
                </span>
            </div>
        )
    }

    renderEmptyReleases() {
        return (
            <section className="section">
                You can create your first release <Link to="/admin/releases/new">here</Link>
            </section>
        );
    }

    renderReleases() {
        return (
            <div className="box content">
                {this.props.releases.map((release, index) => this.renderRelease(index, release))}
            </div>
        );
    }

    renderRelease(index, release) {
        return (
            <article key={index} className="post">
                <h4>{release.title}</h4>
                <div className="media">
                    <div className="media-left">
                        <p className="image is-32x32">
                            <span className="icon is-medium">
                                <FontAwesomeIcon icon={faCertificate} style={{height: '32px', width: '32px'}}/>
                            </span>
                        </p>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <Link to={`/admin/releases/${release.id}/edit`}>{release.version}</Link>&nbsp;
                                created at&nbsp;<Moment format="MMM D, YYYY" parse="YYYY-MM-DD HH:mm:ss"> {release.created_at} </Moment> |
                                released&nbsp;<Moment parse="YYYY-MM-DD HH:mm:ss" fromNow> {release.released_at} </Moment>
                            </p>
                        </div>
                    </div>
                    <div className="media-right">
                        <Link to={`/admin/releases/${release.id}/edit`}
                              className="button is-info is-outlined">
                            <FontAwesomeIcon icon={faPencilAlt}/>
                        </Link>
                    </div>
                    <div className="media-right">
                        <div className="button is-danger is-outlined is-blured" disabled>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        return (
            <section className="container">
                <div className="columns">
                    <div className="column is-3">
                        <Link className="button is-primary is-block is-alt is-large" to="/admin/releases/new">New Release</Link>
                        <aside className="menu is-blured">
                            <p className="menu-label">Tags</p>
                            <ul className="menu-list">
                                <li>
                                    <span className="tag is-primary">
                                        <FontAwesomeIcon icon={faClock}/> &nbsp; Version release
                                    </span>
                                </li>
                                <li>
                                    <span className="tag is-info">
                                        <FontAwesomeIcon icon={faEye}/> &nbsp; Product update
                                    </span>
                                </li>
                                <li>
                                    <span className="tag is-info">
                                        <FontAwesomeIcon icon={faArrowUp}/> &nbsp; Feature
                                    </span>
                                </li>
                                <li>
                                    <span className="tag is-danger">
                                        <FontAwesomeIcon icon={faUserNinja}/> &nbsp; Postmortem
                                    </span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    <div className="column is-9">
                        { this.renderLoaderOrReleases() }
                    </div>
                </div>
            </section>
        );
    }
}
