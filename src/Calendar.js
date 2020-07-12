import React from "react";
import dayjs from 'dayjs'
import "./css/Calendar.scss"

export default function Calendar(props) {
    let rows = []
    if (props.calendar.map){
        rows = props.calendar.map((d, i) => {
            const date = dayjs(d.date);
            let name = null;
            if (date.isBefore(dayjs())){
                name = <a href={"/residency/" + i}>{d.artist_name}</a>
            } else {
                name = d.artist_name
            }
            return (
                <tr data-past={date.isBefore(dayjs(), 'day')} key={"row-" + i} ><td>{d.date}</td><td>
                    {name}
                    </td></tr>
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