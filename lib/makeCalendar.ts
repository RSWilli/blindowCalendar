import dayjs from "dayjs"
import { Lesson } from "./types"

const format = "YYYYMMDDTHHmmss"

export const makeEvent = (event: Lesson) => {
    return [
        `BEGIN:VEVENT`,
        `DTSTAMP:${dayjs().format(format)}Z`,
        `DTSTART:${dayjs(event.start).utc(false).format(format)}Z`,
        `DTEND:${dayjs(event.end).utc(false).format(format)}Z`,
        `SUMMARY:${event.SubjectName.replace("Methodische Anwendung der Physiotherapie im Fachbereich", "PT")}`,
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
        `CALSCALE:GREGORIAN`,
        `PRODID:blindow-parser`,
        `METHOD: PUBLISH`,
        `VERSION:2.0`,
        `${events.map(makeEvent).join("\r\n")}`,
        `END:VCALENDAR`
    ].join("\r\n")
}