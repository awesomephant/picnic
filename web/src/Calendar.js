import React from "react"
import dayjs from "dayjs"
import "./css/Calendar.css"
import Skeleton from "react-loading-skeleton"

export default function Calendar(props) {
  let rows = false
  if (props.calendar.map) {
    rows = props.calendar.map((d, i) => {
      const date = dayjs(d.date)
      let name = null
      if (date.isBefore(dayjs())) {
        name = <a href={"/residency/" + d.slug}>{d.artist_name}</a>
      } else {
        name = d.artist_name
      }
      return (
        <tr data-past={date.isBefore(dayjs(), "day")} key={"row-" + i}>
          <td>{date.format("MMM DD, YYYY")}</td>
          <td>{name}</td>
        </tr>
      )
    })
  }
  return (
    <table className="calendar">
      <tbody>{rows || <Skeleton height={20} count={10} />}</tbody>
    </table>
  )
}
