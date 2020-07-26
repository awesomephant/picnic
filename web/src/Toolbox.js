import React from 'react';
import './css/Toolbox.scss';

const tools = [
    { value: 'rect', title: 'Rectangle' },
    { value: 'img', title: 'Image' },
    { value: 'text', title: 'Text' },
    { value: 'embed', title: 'Embed' },
    { value: 'html', title: 'HTML' },
    { value: 'edit', title: 'Edit' }
]

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
        const options = tools.map((op) => {
            let active = false;
            if (this.props.value === op.value) {
                active = true;
            }
            return (
                <li data-active={active} data-value={op.value} onClick={this.handleChange} key={`op-${op.value}`} className='option'>
                    {op.title}
                </li>
            )
        })
        return (
            <div className='setting toolbox'>
                <ul className="options">
                    {options}
                </ul>
            </div>
        )
    }
}