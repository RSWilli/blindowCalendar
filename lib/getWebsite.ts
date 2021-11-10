import fetch from "node-fetch"
import { parse } from "node-html-parser"
import { parseRow, Row } from "./helper"
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

    console.log(dayjs().format("DD.MM.YYYY HH:mm:ss"), getUrl(week))

    const res = await fetch(getUrl(week))

    if (res.status != 200) return []

    const text = iconv.decode(await res.buffer(), "iso-8859-1")

    const html = parse(text)

    const tableRows = html.querySelectorAll("body > center > table > tr")

    const rows = tableRows
        .slice(1) // remove the first row because it contains the header
        .map(row => {
            const cells = row.querySelectorAll(":scope > td") // find all cells
                .map(cell => {
                    // cell is either has one empty td (no subject), one td (time) or 3 tds (subject, time, room)
                    const subcells = cell.querySelectorAll("table td")
                        .map(c => c.innerText
                            .replace(/\s/g, "")
                            .replace(/&nbsp;/g, "")
                            .replace(/&amp;/g, "&")
                        )

                    // if there is no subject, the cell is empty
                    if (subcells.length == 0 || (subcells.length == 1 && subcells[0] == "")) return null

                    if (subcells.length == 1) {
                        return subcells[0] // cell is a time
                    }

                    return subcells
                })

            return cells
        }).filter(c => c?.length != 0 && c[0] != null)

    const events = rows.map(r => parseRow(date, r as Row)).flat()

    return events
}
