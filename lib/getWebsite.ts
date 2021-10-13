import fetch from "node-fetch"
import { parse } from "node-html-parser"
import { parseRow } from "./helper"
import dayjs from "dayjs"
import weekOfYear from 'dayjs/plugin/weekOfYear'
import utc from 'dayjs/plugin/utc'
import iconv from "iconv-lite"
dayjs.extend(weekOfYear)
dayjs.extend(utc)

function getUrl(week: number) {
    return `https://plan.blindow.de/wochen/weeks/${week}/INDEX_PH102.htm`
}

export const getEvents = async (week: number) => {
    const date = dayjs().week(week + 1)

    console.log(getUrl(week))

    const res = await fetch(getUrl(week))

    const text = iconv.decode(await res.buffer(), "iso-8859-1")

    const html = parse(text)

    const tableRows = html.querySelectorAll("body > center > table > tr")

    const rows = tableRows
        .slice(1)
        .map(row => row
            .querySelectorAll("table td")
            .map(c => c.innerText
                .replace(/\s/g, "")
                .replace(/&nbsp;/g, "")
                .replace(/&amp;/g, "&")
            ).flatMap(t => t == "" ? ["", "", ""] : [t])
        ).filter(r => r.length != 0)

    const events = rows.map(r => parseRow(date, r)).flat()

    return events
}
