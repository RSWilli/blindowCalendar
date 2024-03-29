import { getEvents } from "./lib/getEvents"
import { makeCalendar } from "./lib/makeCalendar"
import { relevantWeeks } from "./lib/getRelevantWeeks"
import express from "express"
import { writeFile } from "fs/promises"
import nocache from "nocache"

let ics: string

const app = express()

app.use(nocache())
app.set("etag", false)
app.disable('view cache')

async function refetchCalendar() {
    console.log("refetching")

    const weeks = relevantWeeks()

    const start = weeks[0]

    const end = weeks[weeks.length - 1].endOf("isoWeek")

    const events = await getEvents(start, end)

    ics = makeCalendar(events.flat())

    writeFile("calendar.ics", ics)
}

refetchCalendar()

setInterval(refetchCalendar, 1000 * 60 * 30)

app.get("/calendar", (req, res) => {
    console.log("calendar accessed:", req.headers["user-agent"])

    res.contentType("text/calendar")
    res.send(ics)
})

app.listen(3000, "0.0.0.0")