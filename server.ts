import { getEvents } from "./lib/getWebsite"
import { makeCalendar } from "./lib/makeCalendar"
import { relevantWeeks } from "./lib/getRelevantWeeks"
import express from "express"
import { writeFile } from "fs/promises"

let ics: string

const app = express()

async function refetchCalendar() {
    const weeks = relevantWeeks()

    const weekEvents = await Promise.all(weeks.map(week => {
        return getEvents(week)
    }))

    ics = makeCalendar(weekEvents.flat())


    writeFile("calendar.ics", ics)
}

refetchCalendar()

setInterval(refetchCalendar, 1000 * 60 * 30)

app.get("/calendar", (req, res) => {
    // res.contentType("text/calendar")
    res.send(ics)
})

app.listen(3000, "0.0.0.0")