import React from 'react';
import './css/Toggle.scss';

export default class ImageToggle extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        const setting = this.props.id;
        const value = e.target.value;
        this.props.updateSetting(setting, value)
    }

    render() {
        const options = this.props.options.map((op) => {
            return (
                <>
                    <option id={op} name={this.props.id} value={op}>{op}</option>
                </>
            )
        })
        return (
            <div className='setting imageToggle'>
                <label>{this.props.title}</label>
                <select value={this.props.value} name="" id="" onChange={this.handleChange}>
                    {options}
                </select>
            </div>
        )
    }
}