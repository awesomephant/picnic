import React from 'react';

export default class Toggle extends React.Component{
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        console.log(this.props.value)
        if (this.props.value === true){
            this.props.updateSetting(this.props.id, false)
        } else {
            this.props.updateSetting(this.props.id, true)
        }
    }
    render() {
        return (
            <button className='toggle' onClick={this.handleClick} data-active={this.props.value}>{this.props.label}</button>
        )
    }
}