import React from "react";
import { data } from "./calendarData.json";

export default function Calendar(props) {

    const rows = data.map((d, i) => {
        return (
            <tr key={"row-" + i} ><td>{d.date}</td><td>{d.artist_name}</td></tr>
        )
    })

    return (
        <table className="calendar">
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}