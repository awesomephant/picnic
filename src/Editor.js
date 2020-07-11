import React from "react";
import Settings from "./Settings";
import Window from "./Window";
import ObjectSettings from "./ObjectSettings";
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
                currentTool: 'rect',
                showGrid: true,
                showOutlines: true,
                selectedObject: "",
                toolSettings: {
                    rect: {
                        fill: 'green'
                    },
                    img: {
                        src: '',
                        filename: ''
                    }
                }
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
            objects: savedObjects || {}
        }


        this.gridRef = React.createRef()
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updateSetting = this.updateSetting.bind(this);
        this.resetDrawing = this.resetDrawing.bind(this);
        this.handleObjectClick = this.handleObjectClick.bind(this);
        this.updateObject = this.updateObject.bind(this);
        this.deleteObject = this.deleteObject.bind(this);

    }
    generateID() { return '' + Math.random().toString(36).substr(2, 9); };

    updateSetting(setting, value) {
        this.setState((prevState) => {
            if (prevState.settings[setting] !== null) {
                console.log(`${setting}, ${value}`)
                prevState.settings[setting] = value;
            } else {
                console.error(`Attempted to update non-existing setting ${setting}`)
            }
            return prevState;
        })
    }
    updateObject(id, setting, value) {
        console.log(this.state.objects[id])
        console.log(`Attempting to set ${setting} to ${value} on ${id}`)
        this.setState((prev) => {
            if (prev.objects[id] && prev.objects[id][setting] !== undefined) {
                console.log(`${id}: ${setting} => ${value}`)
                prev.objects[id][setting] = value;
            } else {
                console.warn(`Attempted to update non-existing setting ${setting}`)
            }
            return prev;
        })
    }

    deleteObject(id) {
        console.log(`Attempting to delete ${id}`)
        this.setState((prev) => {
            delete prev.objects[id]
            return prev;
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
        let obj;
        const id = this.generateID()

        if (this.state.settings.currentTool === 'img') {
            obj = { id: id, type: 'img', src: 'https://picsum.photos/500', x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        } else if (this.state.settings.currentTool === 'text') {
            obj = { id: id, type: 'text', color: 'red', fontSize: 18, fontWeight: 200, fontFamily: 'Helvetica', lineHeight: 1.1, letterSpacing: 0, text: 'This paragraph of text is very very long', x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        } else if (this.state.settings.currentTool === 'embed') {
            obj = { id: id, type: 'embed', url: ' ', x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        } else if (this.state.settings.currentTool === 'rect') {
            obj = { id: id, type: 'rect', background: 'pink', x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        } else if (this.state.settings.currentTool === 'html') {
            obj = { id: id, type: 'html', htmlContent: '<h1>your code here</h1>', x: this.state.placeholder.x + 1, y: this.state.placeholder.y, w: this.state.placeholder.w, h: this.state.placeholder.h }
        }

        this.setState((prev) => {
            prev.cursor.active = false;
            prev.placeholder.active = false;
            if (obj) {
                prev.objects[id] = obj;
            }
            localStorage.setItem('picnic-objects', JSON.stringify(prev.objects))
            return (prev)
        })

    }

    handleDragStart(e) {
        e.preventDefault()
    }

    handleObjectClick(id) {
        this.setState({ selectedObject: id })
    }

    handleMouseMove(e) {
        let r = this.gridRef.current.getBoundingClientRect()
        const x = e.clientX;
        const y = e.clientY;
        const dx = e.movementX;
        const dy = e.movementY;
        const cell = (this.w / this.gridSize);
        const cx = Math.ceil((x - r.left) / cell)
        const cy = Math.ceil((y - r.top) / cell)
        this.setState((prev) => {
            prev.cursor = { x: cx, y: cy };
            prev.mouse = { x: x, y: y, deltaX: dx, deltaY: dy };
            prev.placeholder.w = (cx - prev.placeholder.x);
            prev.placeholder.h = (cy - prev.placeholder.y);
            return prev;
        })
    }

    resetDrawing() {
        this.setState({ objects: {} })
        localStorage.clear()
    }

    render() {
        const gridStyle = {
            width: `${this.w}px`,
            height: `${this.h}px`,
            gridTemplateColumns: `repeat(${this.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${this.gridSize}, 1fr)`,
            backgroundSize: `${this.w}px ${this.h / this.gridSize}px, ${this.h / this.gridSize}px ${this.w}px`
        }

        if (this.state.settings.showGrid === true) {
            gridStyle.backgroundImage = `linear-gradient(to bottom, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 100%), linear-gradient(to right, rgba(0,0,0,0.2) 0, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 100%)`
        }

        let objects = []
        for (const key in this.state.objects) {
            const obj = this.state.objects[key]
            const objectStyle = {
                gridColumn: `${obj.x} / ${obj.x + obj.w}`,
                gridRow: `${obj.y} / ${obj.y + obj.h}`
            }
            let content = null;
            if (obj.type === 'img') {
                objectStyle.backgroundImage = `url(${obj.src})`
            }
            if (obj.type === 'text') {
                objectStyle.fontSize = `${obj.fontSize}px`
                objectStyle.fontWeight = obj.fontWeight
                objectStyle.fontFamily = obj.fontFamily
                objectStyle.lineHeight = obj.lineHeight
                objectStyle.color = obj.color
                objectStyle.letterSpacing = `${obj.letterSpacing}em`
                content = obj.text
            }
            if (obj.type === 'embed') {
                content = <iframe title={`embed`} width="560" height="315" src={obj.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            }
            if (obj.type === 'rect') {
                objectStyle.background = obj.background
            }
            if (obj.type === 'html') {
                content = <div dangerouslySetInnerHTML={{__html: obj.htmlContent}}></div>
            }
            objects.push(
                <div onClick={(e) => this.handleObjectClick(obj.id, e)} data-selected={obj.id === this.state.selectedObject} style={objectStyle} key={obj.id} className={`object ${obj.type}`}>
                    {content}
                </div>
            )
        }

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
            <div className='editor' onMouseMove={this.handleMouseMove}>
                <div className="editor-toolbar">
                    <Window draggable={true} x={20} y={60} mouse={this.state.mouse} title='Tools'>
                        <Settings resetDrawing={this.resetDrawing} updateSetting={this.updateSetting} objects={this.state.objects} settings={this.state.settings}></Settings>
                    </Window>
                    <Window draggable={true} x={200} y={200} mouse={this.state.mouse} title='Object Settings'>
                        <ObjectSettings deleteObject={this.deleteObject} updateObject={this.updateObject} object={this.state.objects[this.state.selectedObject] || null}></ObjectSettings>
                    </Window>
                </div>
                <div className="editor-canvas" data-tool={this.state.settings.currentTool} data-outlines={this.state.settings.showOutlines} onDragStart={this.handleDragStart} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
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