import React from "react"
import "./css/Toggle.css"

export default class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    if (this.props.value === true) {
      this.props.updateSetting(this.props.id, false)
    } else {
      this.props.updateSetting(this.props.id, true)
    }
  }
  render() {
    let verb = ""
    if (this.props.value === true) {
      verb = "Hide"
    } else {
      verb = "Show"
    }
    return (
      <button className="toggle" onClick={this.handleClick} data-active={this.props.value}>
        {verb} {this.props.label}
      </button>
    )
  }
}
