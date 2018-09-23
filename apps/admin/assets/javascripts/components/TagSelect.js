import React, {Component} from 'react'
import chroma from 'chroma-js'
import Select from 'react-select'

class TagSelect extends Component {
    componentDidMount() {
        this.props.fetchTags()
    }

    handleChange(tags) {
        this.props.input.onChange(tags)
    }

    render() {
        const tags = this.props.options,
            options = Object
                .keys(this.props.options)
                .map(function (slug) {
                    let tag = tags[slug]
                    return {
                        value: tag.slug,
                        label: tag.name,
                        color: tag.color,
                    }
                }),
            colourStyles = {
                control: styles => ({...styles, backgroundColor: 'white'}),
                option: (styles, {data, isDisabled, isFocused, isSelected}) => {
                    const color = chroma(data.color);
                    return {
                        ...styles,
                        backgroundColor: isDisabled
                            ? null
                            : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
                        color: isDisabled
                            ? '#ccc'
                            : isSelected
                                ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
                                : data.color,
                        cursor: isDisabled ? 'not-allowed' : 'default',
                    };
                },
                multiValue: (styles, {data}) => {
                    const color = chroma(data.color);
                    return {
                        ...styles,
                        backgroundColor: color.alpha(0.1).css(),
                    };
                },
                multiValueLabel: (styles, {data}) => ({
                    ...styles,
                    color: data.color,
                }),
                multiValueRemove: (styles, {data}) => ({
                    ...styles,
                    color: data.color,
                    ':hover': {
                        backgroundColor: data.color,
                        color: 'white',
                    },
                }),
            }

        return (
            <Select isMulti
                    closeMenuOnSelect={false}
                    options={options}
                    styles={colourStyles}
                    onChange={ value => this.handleChange(value) }
            />
        )
    }
}

export default TagSelect