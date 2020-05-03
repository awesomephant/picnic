import React from "react";
import Settings from "./Settings";

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.gridSize = 50;
        this.w = 1000;
        this.h = 1000;
        this.state = {
            settings: {
                currentTool: 'pen',
                showGrid: true
            },
            mouse: {},

            cursor: {
                active: false,
                x: 0,
                y: 6
            },
            placeholder: {
                x: 0, y: 2, w: 10, h: 10, active: false
            },
            objects: [
            ]
        }

        this.gridRef = React.createRef()

        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updateSetting = this.updateSetting.bind(this);

    }

    updateSetting(setting, value) {
        this.setState((prevState) => {
            if (prevState.settings[setting] !== null) {
                prevState.settings[setting] = value;
            } else {
                console.error(`Attempted to update non-existing setting ${setting}`)
            }
            return prevState;
        })
    }

    handleMouseDown(e) {
        this.setState((prev) => {
            prev.cursor.active = true;
            if (prev.settings.currentTool === 'img') {
                prev.placeholder.active = true
                prev.placeholder.x = prev.cursor.x - 1
                prev.placeholder.y = prev.cursor.y - 0
                prev.placeholder.w = 0
                prev.placeholder.h = 0
            }
            return prev
        })
    }
    handleMouseUp(e) {
        e.preventDefault()
        this.setState((prev) => {
            prev.cursor.active = false;
            prev.placeholder.active = false
            if (prev.settings.currentTool === 'img') {
                let img = { type: 'img', properties: { src: 'https://picsum.photos/500' }, x: prev.placeholder.x + 1, y: prev.placeholder.y, w: prev.placeholder.w, h: prev.placeholder.h }
                prev.objects.push(img)
            }
            return prev;
        })
    }
    handleDragStart(e) {
        e.preventDefault()
    }

    handleMouseMove(e) {
        const cell = (this.w / this.gridSize);
        let r = this.gridRef.current.getBoundingClientRect()
        const cx = Math.ceil((e.clientX - r.left) / cell)
        const cy = Math.ceil((e.clientY - r.top) / cell)

        this.setState((prev) => {
            prev.cursor.x = cx;
            prev.cursor.y = cy;
            prev.mouse = { x: e.clientX, y: e.clientY };
            if (prev.cursor.active) {
                if (prev.settings.currentTool === 'pen') {
                    let paint = { type: 'paint', properties: { fill: 'black' }, x: prev.cursor.x, y: prev.cursor.y, w: 1, h: 1 }
                    prev.objects.push(paint)
                } else if (prev.settings.currentTool = 'img') {
                    prev.placeholder.w = prev.cursor.x - prev.placeholder.x
                    prev.placeholder.h = (prev.cursor.y - prev.placeholder.y)
                }

            }

            return prev;
        })
    }

    render() {
        const gridStyle = {
            width: `${this.w}px`,
            height: `${this.h}px`,
            gridTemplateColumns: `repeat(${this.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${this.gridSize}, 1fr)`,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 100%), linear-gradient(to right, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 100%)`,
            backgroundSize: `${this.w}px ${this.h / this.gridSize}px, ${this.h / this.gridSize}px ${this.w}px`
        }

        const objects = this.state.objects.map((obj) => {
            const objectStyle = {
                gridColumn: `${obj.x} / ${obj.x + obj.w}`,
                gridRow: `${obj.y} / ${obj.y + obj.h}`
            }
            let content = null;
            if (obj.type === 'img') {
                objectStyle.backgroundImage = `url(${obj.properties.src})`
                //content = <video src='/picnic/0060_1.mp4' autoPlay loop muted></video>
            }
            return (
                <div style={objectStyle} className='object'>
                    {content}
                </div>
            )
        })

        const cursorStyle = {
            gridColumn: `${this.state.cursor.x} / ${this.state.cursor.x + 1}`,
            gridRow: `${this.state.cursor.y} / ${this.state.cursor.y + 1}`
        }
        const cursor = <div className='cursor' style={cursorStyle}></div>

        const placeholderStyle = {
            gridColumn: `${this.state.placeholder.x + 1} / ${this.state.placeholder.x + 1 + this.state.placeholder.w}`,
            gridRow: `${this.state.placeholder.y} / ${this.state.placeholder.y + this.state.placeholder.h}`
        }
        let placeholder = null
        if (this.state.placeholder.active) {
            placeholder = <div className='placeholder' style={placeholderStyle}></div>
        }
        return (
            <div className='editor'>
                <div className="editor-toolbar">
                    <h2>Tools</h2>
                    <Settings updateSetting={this.updateSetting} settings={this.state.settings}></Settings>
                </div>
                <div ref={this.gridRef} style={gridStyle} className='grid' onDragStart={this.handleDragStart} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    {objects}
                    {cursor}
                    {placeholder}
                </div>
            </div>
        )
    }
}

export default Editor;