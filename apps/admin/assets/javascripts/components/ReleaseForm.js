import React, {Component} from 'react';
import './ReleaseForm.scss'
import classnames from 'classnames'
import { Field } from 'redux-form'
import DatePickerInput from './DatePickerInput'
import ReactMDE from 'redux-forms-markdown-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

class ReleaseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeField: undefined
        }

        this.renderInputField = this.renderInputField.bind(this)
        this.submit = this.submit.bind(this)
        this.renderSuccessfullyUpdatedNotification = this.renderSuccessfullyUpdatedNotification.bind(this)
        this.renderHintFor = this.renderHintFor.bind(this)
        this.setActiveField = this.setActiveField.bind(this)
    }

    setActiveField(field) {
        this.setState({activeField: field})
    }

    renderHintFor(fieldName) {
        const hints = {
            version: {
                header: 'Version',
                body: (<div>
                    The identifier that you use for this release
                    <br/>
                    Possible values:
                    <ul>
                        <li>- 0.0.1</li>
                        <li>- 2.0.0-rc.2</li>
                        <li>- A.B.C</li>
                    </ul>
                </div>)
            },
            title: {
                header: 'Title',
                body: (<div>
                    The name of your feature, it can be the main feature if you plan to include multiple new functions, or some codename if you follow any convention.
                    <br/>
                    Possible values:
                    <ul>
                        <li>- Support .tiff format</li>
                        <li>- Ice Cream Sandwich</li>
                        <li>- Camera.app improvements</li>
                    </ul>
                </div>)
            },
            released_at: {
                header: 'Release time',
                body: (<div>
                    The moment when the press release should air.
                    <br/>
                    Just set the time when this information should become available to visitors.
                </div>)
            }
        }

        const hint = hints[fieldName]

        if (hint) {
            return (
                <article className="message is-info">
                    <div className="message-header">
                        <p>{ hint.header }</p>
                    </div>
                    <div className="message-body">
                        { hint.body }
                    </div>
                </article>
            )
        }
    }

    submit(attributes) {
        return this.props.submitSuccessfully(attributes)
    }

    componentDidMount() {
        this.props.fetchInitialState()
    }

    renderInputField({
                         input,
                         label,
                         placeholder,
                         type,
                         submitFailed,
                         meta: {touched, error}
                     }) {
        return (
            <div className="field">
                <label className="label">{label}</label>
                <div>
                    <input {...input} placeholder={placeholder}
                           type={type}
                           className={'input' + ((submitFailed || touched) && error ? ' is-danger' : '') }/>
                    { this.renderError({submitFailed, touched, error}) }
                </div>
            </div>
        )
    }

    renderError({submitFailed, touched, error}) {
        return (
            (submitFailed || touched) &&
            (error && <p className="help is-danger">{error}</p>)
        )
    }

    renderSuccessfullyUpdatedNotification() {
        if (this.props.successfullyUpdated) {
            return (
                <div className="control" style={ {display: 'flex', alignItems: 'center'} }>
                    <span className="has-text-info">Successfully updated <FontAwesomeIcon icon={faCheck}/></span>
                </div>
            )
        }
    }

    render() {
        const {handleSubmit, submitting, buttonClass, buttonText} = this.props

        return (
            <section className="section">
                <div className="container">
                    <form onSubmit={handleSubmit(this.submit)} id="release-form" className="form">
                        <div className="columns">
                            <div className="column is-half">
                                <Field id="release-version"
                                       label="Version"
                                       name="version"
                                       type="text"
                                       placeholder="1.2.0"
                                       onFocus={ () => { this.setActiveField('version') } }
                                       component={ this.renderInputField }
                                />
                                <Field id="release-title"
                                       label="Title"
                                       name="title"
                                       type="text"
                                       placeholder="Support new image format"
                                       onFocus={ () => { this.setActiveField('title') } }
                                       component={ this.renderInputField }
                                />
                                <Field id="release-released-at"
                                       label="Released at"
                                       name="released_at"
                                       type="text"
                                       placeholderText="The release will be available on"
                                       onFocus={ () => { this.setActiveField('released_at') } }
                                       component={ DatePickerInput }
                                />
                            </div>
                            <div className="column is-half highlight-full">
                                { this.renderHintFor(this.state.activeField) }
                            </div>
                        </div>
                        <hr/>
                        <div className="columns">
                            <div className="column">
                                <Field id="release-summary-content"
                                       label="Content"
                                       name="summary_raw"
                                       type="text"
                                       placeholder="e.g. In this release we added the support for the new image format long awaited feature is released ... in Markdown, please ;)"
                                       buttonConfig={{
                                           bold: true,
                                           italic: true,
                                           heading: true,
                                           orderedList: true,
                                           unorderedList: true,
                                           url: true,
                                           image: true,
                                           canPreview: true,
                                       }}
                                       component={ReactMDE}
                                />
                            </div>
                        </div>
                        <hr/>
                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit"
                                        className={ classnames('button', buttonClass, {'is-loading': this.props.isFetching || submitting}) }
                                        disabled={this.props.isFetching || submitting}>{ buttonText }</button>
                            </div>
                            { this.renderSuccessfullyUpdatedNotification() }
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}

export default ReleaseForm