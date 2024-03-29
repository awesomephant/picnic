import React from "react"

export default function ObjectSettings(props) {
  const settings = []

  function handleUpdate(setting, value) {
    props.updateObject(props.object.id, setting, value)
  }
  function handleDelete() {
    props.deleteObject(props.object.id)
  }

  if (props.object !== null) {
    for (const key in props.object) {
      let p = props.object[key]
      if (key === "background" || key === "color") {
        settings.push(
          <div className="setting">
            <label htmlFor={key}>{key}</label>
            <input onChange={(e) => handleUpdate(key, e.target.value)} value={p} type="color"></input>
          </div>
        )
      } else if (key === "text" || key === "htmlContent") {
        settings.push(
          <div className="setting">
            <label htmlFor={key}>{key}</label>
            <textarea onChange={(e) => handleUpdate(key, e.target.value)} value={p}></textarea>
          </div>
        )
      } else if (typeof p === "string" && key !== "id" && key !== "type") {
        settings.push(
          <div className="setting">
            <label htmlFor={key}>{key}</label>
            <input name={key} onChange={(e) => handleUpdate(key, e.target.value)} value={p} type="text"></input>
          </div>
        )
      } else if (typeof p === "number") {
        settings.push(
          <div className="setting">
            <label htmlFor={key}>{key}</label>
            <input onChange={(e) => handleUpdate(key, e.target.value * 1)} value={p} min="1" type="number"></input>
          </div>
        )
      }
    }
  }

  let content = "No object selected"
  if (settings.length > 0) {
    content = (
      <>
        {settings}
        <button onClick={handleDelete} className="button danger">
          Delete Object
        </button>
      </>
    )
  }
  return <div className="object-settings settings">{content}</div>
}
