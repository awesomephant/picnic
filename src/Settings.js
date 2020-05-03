import React from 'react';
import ImageToggle from './ImageToggle.js';

export default class Settings extends React.Component {
    render() {
        return (
            <div className='settings'>
                <ImageToggle updateSetting={this.props.updateSetting} options={['pen', 'img', 'video']} value={this.props.settings.currentTool} id='currentTool' title='Tool'></ImageToggle>
            </div>
        )
    }
}