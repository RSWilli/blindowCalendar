import dayjs from "dayjs"
import { CalEvent, Events } from "./helper"

export const makeEvent = (event: CalEvent) => {
    return `BEGIN:VEVENT
    DTSTAMP:${dayjs().format("YYYYMMDDTHHmm")}
    DTSTART;TZID=Europe/Berlin:${event.date.format("YYYYMMDDTHHmm")}
    DTEND;TZID=Europe/Berlin:${event.date.add(45, "minute").format("YYYYMMDDTHHmm")}
    SUMMARY:${event.subject}
    LOCATION:${event.room}
    SEQUENCE:0
    UID:${event.date.unix()}
    END:VEVENT`
}
export const makeCalendar = (events: Events) => {

    return `BEGIN:VCALENDAR
    X-WR-CALDESC:Blindow
    X-WR-TIMEZONE:Europe/Berlin
    CALSCALE:GREGORIAN
    VERSION:2.0
    ${events.map(makeEvent).join("\n")}
    END:VCALENDAR
    `.replace(/ /g, "")
}