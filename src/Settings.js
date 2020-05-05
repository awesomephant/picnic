import React from 'react';
import Toolbox from './Toolbox.js';

export default function Settings(props) {

    const tools = [
        'pen',
        'img',
        'text',
        'embed',
    ]

    return (
        <div className='settings'>
            <Toolbox updateSetting={props.updateSetting} options={tools} value={props.settings.currentTool} id='currentTool' title='Tool'></Toolbox>
        </div>
    )
}