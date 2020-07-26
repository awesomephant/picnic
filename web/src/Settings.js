import React from 'react';
import Toolbox from './Toolbox.js';
import Toggle from './Toggle.js';
import './css/Settings.scss';

export default function Settings(props) {
    return (
        <div className='settings'>
            <div className='setting'>
                <Toolbox updateSetting={props.updateSetting} value={props.settings.currentTool} id='currentTool' title='Tool'></Toolbox>
            </div>
            <div className='setting'>
                <Toggle updateSetting={props.updateSetting} id='showGrid' value={props.settings.showGrid} label="Grid"></Toggle>
            </div>
            <div className='setting'>
                <Toggle updateSetting={props.updateSetting} id='showOutlines' value={props.settings.showOutlines} label="Outlines"></Toggle>
            </div>
            <div className='setting'>
                <button className='danger' onClick={props.resetDrawing}>Reset</button>
            </div>
            <div className='setting'>
                <input readOnly type="text" value={JSON.stringify(props.objects)} />
            </div>
        </div>
    )
}