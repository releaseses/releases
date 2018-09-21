import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-spinkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-solid-svg-icons'


export default class TagPanel extends Component {
    constructor(props) {
        super(props)

        this.renderLoaderOrTags = this.renderLoaderOrTags.bind(this)
        this.renderLoader = this.renderLoader.bind(this)
        this.renderTags = this.renderTags.bind(this)
    }

    componentDidMount() {
        this.props.fetchTags()
    }

    renderLoaderOrTags() {
        if (this.props.isFetching) {
            return this.renderLoader()
        } else {
            return this.renderTags()
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

    renderTags() {
        return (
            <nav className="panel">
                { this.props.tags.map((tag) => (
                    <a className="panel-block" key={tag.slug}>
                        <span className="panel-icon">
                            <FontAwesomeIcon icon={faSquare} style={{ textColor: tag.color }}/>
                        </span>
                        { tag.name }
                    </a>
                )) }
            </nav>
        )
    }

    render() {
        return (
            <div>
                { this.renderLoaderOrTags() }
            </div>
        );
    }
}
