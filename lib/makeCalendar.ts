import dayjs from "dayjs"
import { Lesson } from "./types"

export const makeEvent = (event: Lesson) => {
    return [
        `BEGIN:VEVENT`,
        `DTSTAMP:${dayjs().format("YYYYMMDDTHHmmss")}`,
        `DTSTART;TZID=Europe/Berlin:${dayjs(event.start).format("YYYYMMDDTHHmmss")}`,
        `DTEND;TZID=Europe/Berlin:${dayjs(event.end).format("YYYYMMDDTHHmmss")}`,
        `SUMMARY:${event.SubjectName}`,
        `DESCRIPTION:${event.TeacherName}`,
        `LOCATION:${event.RoomName}`,
        `UID:blindow_${event.Id}`,
        `END:VEVENT`
    ].join("\r\n")
}
export const makeCalendar = (events: Lesson[]) => {

    return [
        `BEGIN:VCALENDAR`,
        `X-WR-CALDESC:blindow`,
        `X-WR-CALNAME:blindow`,
        `X-WR-TIMEZONE:Europe/Berlin`,
        `CALSCALE:GREGORIAN`,
        `PRODID:blindow-parser`,
        `VERSION:2.0`,
        `${events.map(makeEvent).join("\r\n")}`,
        `BEGIN:VTIMEZONE`,
        `TZID:Europe/Berlin`,
        `BEGIN:STANDARD`,
        `DTSTART:19701025T030000`,
        `RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU`,
        `TZNAME:CET`,
        `TZOFFSETFROM:+0200`,
        `TZOFFSETTO:+0100`,
        `END:STANDARD`,
        `BEGIN:DAYLIGHT`,
        `DTSTART:19700329T020000`,
        `RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU`,
        `TZNAME:CEST`,
        `TZOFFSETFROM:+0100`,
        `TZOFFSETTO:+0200`,
        `END:DAYLIGHT`,
        `END:VTIMEZONE`,
        `END:VCALENDAR`
    ].join("\r\n")

}