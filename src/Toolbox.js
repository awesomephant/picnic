import React from 'react';
import './css/Toolbox.scss';

export default class Toolbox extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const setting = this.props.id;
        const value = e.target.getAttribute('data-value');
        this.props.updateSetting(setting, value)
    }

    render() {
        const options = this.props.options.map((op) => {
            let active = false;
            if (this.props.value === op){
              active = true;  
            }
            return (
                <li data-active={active} data-value={op} onClick={this.handleChange} key={`op-${op}`} className='option'>{op}</li>
            )
        })
        return (
            <div className='setting toolbox'>
                <label>{this.props.title}</label>
                <ul className="options">
                    {options}
                </ul>
            </div>
        )
    }
}