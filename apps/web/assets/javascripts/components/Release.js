import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import Moment from 'react-moment'

export default class Release extends Component {
    constructor(props) {
        super(props)

        this.renderLoaderOrRelease = this.renderLoaderOrRelease.bind(this)
        this.renderLoader = this.renderLoader.bind(this)
        this.renderRelease = this.renderRelease.bind(this)
    }

    componentDidMount() {
        this.props.fetchRelease()
    }

    renderLoaderOrRelease() {
        if (this.props.isFetching) {
            return this.renderLoader()
        } else {
            return this.renderRelease()
        }
    }

    renderLoader() {
        return (
            <div className="container">
                <section className="articles has-text-centered">
                    <span className="icon is-large has-text-info">
                        <Spinner name='circle' fadeIn={'full'} color={'#209cee'}/>
                    </span>
                </section>
            </div>
        )
    }

    renderRelease() {
        return (
            <div>
                <div className="columns is-gapless"></div>
                <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                    <ul>
                        <li>
                            <Link to={'/'}>Timeline</Link>
                        </li>
                        <li className="is-active">
                            <a ariaCurrent="page">Release {this.props.release.version}</a>
                        </li>
                    </ul>
                </nav>
                <div className="container">
                    <section className="articles">
                        <div className="column is-8 is-offset-2">
                            <div className="card article">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content has-text-centered">
                                            <p className="title article-title">{this.props.release.title}</p>
                                            <div className="tags level-item">
                                                <Moment
                                                    className="tag is-rounded"
                                                    format="MMM D, YYYY"
                                                    parse="YYYY-MM-DD HH:mm:ss">
                                                    {this.props.release.released_at}
                                                </Moment>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content article-body"
                                         dangerouslySetInnerHTML={{__html: this.props.release.summary_html}}></div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    render() {
        if(this.props.notFound) {
            this.props.resetRelease()
        }

        return (
            <section className="container">
                {this.renderLoaderOrRelease()}
            </section>
        );
    }
}
