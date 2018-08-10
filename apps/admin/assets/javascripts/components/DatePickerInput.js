import React, { PureComponent } from 'react'
import DatePicker from 'react-datepicker'
import classnames from 'classnames'
import moment from 'moment'
import './DatePickerInput.scss'

class DatePickerInput extends PureComponent {

    handleChange = (date) => {
        this.props.input.onChange(moment(date))
    }

    render () {
        const { submitFailed, input, className, meta: { error, touched }, label, ...rest } = this.props

        return (
            <div className="field" onMouseEnter={ input.onFocus }>
                <label htmlFor={input.name} className={classnames("label")}>{label}</label>
                <div>
                    <DatePicker {...rest}
                                autoOk
                                className={ classnames(className, {'is-danger': (submitFailed || touched) && error}) }
                                onChange={ this.handleChange }
                                selected={ input.value ? moment(input.value).startOf('hour') : null }
                                dateFormat="YYYY-MM-DD HH:mm:ss"
                                showTimeSelect
                                timeIntervals={60}
                                timeCaption="time"
                                timeFormat="HH:mm"
                    />
                    { (submitFailed || touched) && error && <span className={classnames('help', 'is-danger')}>{error}</span>}
                </div>
            </div>
        )
    }
}

DatePickerInput.defaultProps = {
    className: 'input',
    required: false
}

export default DatePickerInput