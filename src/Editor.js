import React from "react";
import Settings from "./Settings";
import "./css/editor.scss";

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.gridSize = 50;
        this.w = 1000;
        this.h = 1000;

        const savedObjects = JSON.parse(localStorage.getItem('picnic-objects'))

        this.state = {
            settings: {
                currentTool: 'text',
                showGrid: true,
                toolSettings: {}
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
            objects: savedObjects || []
        }


        this.gridRef = React.createRef()
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.resetDrawing = this.resetDrawing.bind(this);

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
        this.setState({
            cursor: { active: true },
            placeholder: {
                active: true,
                x: this.state.cursor.x - 1,
                y: this.state.cursor.y - 0,
                w: 0,
                h: 0
            }
        })
    }

    handleMouseUp(e) {
        e.preventDefault()

        let obj;
        if (this.state.settings.currentTool === 'img') {
            obj = { type: 'img', properties: { src: 'https://picsum.photos/500' }, x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
            this.state.objects.push(obj)
        } else if (this.state.settings.currentTool === 'text') {
            obj = { type: 'text', properties: { text: 'This paragraph of text is very very long so it would break into a longer column Whether you like cooking, love it or are indifferent to the task, most of us can agree that washing a lot of pots and pans after dinner is a drag. Wouldn’t it instead be easier if there was really only one? One skillet or one Dutch oven, one sheet pan, one pot? Wouldn’t that be great? Imagine the ease of it, to come home from work and turn on the oven, line a sheet pan with foil or parchment, tip onto it some vegetables, some protein, some ' }, x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        } else if (this.state.settings.currentTool === 'embed') {
            obj = { type: 'embed', properties: { url: '' }, x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        }

        this.setState((prev) => {
            prev.cursor.active = false;
            prev.placeholder.active = false;
            prev.objects = [...prev.objects, obj]
            localStorage.setItem('picnic-objects', JSON.stringify(prev.objects))
            return (prev)
        })

    }

    handleDragStart(e) {
        e.preventDefault()
    }

    handleMouseMove(e) {
        let r = this.gridRef.current.getBoundingClientRect()
        const x = e.clientX;
        const y = e.clientY;
        const cell = (this.w / this.gridSize);
        const cx = Math.ceil((x - r.left) / cell)
        const cy = Math.ceil((y - r.top) / cell)

        this.setState((prev) => {
            prev.cursor = { x: cx, y: cy };
            prev.mouse = { x: x, y: y };
            prev.placeholder.w = (cx - prev.placeholder.x);
            prev.placeholder.h = (cy - prev.placeholder.y);

            return prev;
        })
    }

    resetDrawing() {
        this.setState({ objects: [] })
        localStorage.clear()
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

        const objects = this.state.objects.map((obj, i) => {
            const objectStyle = {
                gridColumn: `${obj.x} / ${obj.x + obj.w}`,
                gridRow: `${obj.y} / ${obj.y + obj.h}`
            }
            let content = null;
            if (obj.type === 'img') {
                objectStyle.backgroundImage = `url(${obj.properties.src})`
            }
            if (obj.type === 'text') {
                content = obj.properties.text
            }
            if (obj.type === 'embed') {
                content = <iframe title={`embed-${i}`} width="560" height="315" src="https://www.youtube.com/embed/IyNrcayUNfg?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            }
            return (
                <div style={objectStyle} key={`obj-${i}`} className={`object ${obj.type}`}>
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
                    <button onClick={this.resetDrawing}>Reset</button>
                </div>
                <div className="editor-canvas" onDragStart={this.handleDragStart} onMouseMove={this.handleMouseMove} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
                    <div ref={this.gridRef} style={gridStyle} className='grid'>
                        {objects}
                        {cursor}
                        {placeholder}
                    </div>
                </div>
            </div>
        )
    }
}

export default Editor;