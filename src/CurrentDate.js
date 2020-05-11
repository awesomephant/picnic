import React, { useState } from "react";
import dayjs from 'dayjs'
export default function () {
    const dateFormat = 'MM/DD/YY, HH:mm:ss';
    const [date, setDate] = useState(dayjs().format(dateFormat))

    setInterval(() => {
        setDate(dayjs().format(dateFormat))
    }, 1000);

    return (<date>{date}</date>)
}