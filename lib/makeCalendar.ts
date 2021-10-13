import dayjs from "dayjs"
import { CalEvent, Events } from "./helper"

export const makeEvent = (event: CalEvent) => {
    return [
        `BEGIN:VEVENT`,
        `DTSTAMP:${dayjs().format("YYYYMMDDTHHmmss")}`,
        `DTSTART;TZID=Europe/Berlin:${event.date.format("YYYYMMDDTHHmmss")}`,
        `DURATION:PT45M`,
        `SUMMARY:${event.subject}`,
        `DESCRIPTION: ${event.presenter}`,
        `LOCATION:${event.room}`,
        `UID:blindow_${event.date.unix()}`,
        `END:VEVENT`
    ].join("\r\n")
}
export const makeCalendar = (events: Events) => {

    return [
        `BEGIN:VCALENDAR`,
        `X-WR-CALDESC:Blindow`,
        `X-WR-TIMEZONE:Europe/Berlin`,
        `CALSCALE:GREGORIAN`,
        `VERSION:2.0`,
        `${events.map(makeEvent).join("\r\n")}`,
        `END:VCALENDAR`
    ].join("\r\n")

}