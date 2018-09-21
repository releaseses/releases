import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCertificate, faRss, faSquare, faArrowUp, faUserNinja, faEye } from '@fortawesome/free-solid-svg-icons'
import './Timeline.scss'
import Spinner from 'react-spinkit'
import Moment from 'react-moment'
import TagPanel from './../containers/TagPanelContainer'

export default class Timeline extends Component {
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
            <div className="has-text-centered">
                <span className="icon is-large has-text-info">
                    <Spinner name='circle' fadeIn={'full'} color={'#209cee'}/>
                </span>
            </div>
        )
    }

    renderEmptyReleases() {
        return (
            <section className="section">
                You can create your first release <a href={'/admin/releases/new'}>here</a>
            </section>
        );
    }

    renderReleases() {
        return (
            <div className="timeline">
                { this.props.releases.map((release, index) => this.renderRelease(index, release)) }
            </div>
        );
    }

    renderRelease(index, release) {
        return (
            <div key={index} className="timeline-item">
                <div className="timeline-marker is-image is-icon is-32x32">
                    <FontAwesomeIcon icon={faCertificate}/>
                </div>
                <div className="timeline-content">
                    <p className="heading">
                        <Moment format="MMM D, YYYY" parse="YYYY-MM-DD HH:mm:ss">{release.released_at}</Moment>
                    </p>
                    <p>
                        <Link to={`/releases/${release.version}`}>{release.title}</Link>
                    </p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="columns is-gapless"></div>
                <section className="container">
                    <p className="title is-1 is-inline-block">Changelog</p>
                    <span style={{'marginLeft': '1rem', 'marginRight': '1rem'}}></span>
                    <p className="subtitle is-inline-block is-blured">
                        &nbsp;
                        Subscribe
                    </p>
                    <span style={{'marginLeft': '1rem', 'marginRight': '1rem'}}></span>
                    <p className="subtitle is-inline-block is-blured">
                        <FontAwesomeIcon className={'has-text-primary'} icon={faRss}/>
                        &nbsp;
                        RSS
                    </p>
                </section>
                <hr/>
                <div className="columns is-gapless"></div>
                <section className="container">
                    <div className="columns">
                        <div className="column is-7 is-offset-1">
                            {this.renderLoaderOrReleases()}
                        </div>
                        <div className="column is-3">
                            <TagPanel/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
