import React from "react";
import dayjs from 'dayjs'
import "./css/Calendar.scss"

export default function Calendar(props) {
    let rows = []
    if (props.calendar.map){
        rows = props.calendar.map((d, i) => {
            const date = dayjs(d.date);
            return (
                <tr data-past={date.isBefore(dayjs())} key={"row-" + i} ><td>{d.date}</td><td>{d.artist_name}</td></tr>
            )
        })
    }
    return (
        <table className="calendar">
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}