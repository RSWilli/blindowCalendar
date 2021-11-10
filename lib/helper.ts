import { Dayjs } from "dayjs"

export const parseTime = (timestring: string) => {
    const [hour, minute] = timestring.split(":")

    return {
        hour: parseInt(hour), minute: parseInt(minute)
    }
}

type RawEvent = [string, string, string] | null

export type Row = [string, RawEvent, RawEvent, RawEvent, RawEvent, RawEvent]

export const parseRow = (week: Dayjs, row: Row) => {
    const [time, ...rest] = row
    const { hour, minute } = parseTime(time)

    const date = week.hour(hour).minute(minute).second(0)

    const days = ["mon", "tue", "wed", "thu", "fri"].map<CalEvent | null>((day, i) => {
        const d = date.day(i + 1)

        const event = rest[i]

        if (event === null) {
            return null
        }

        const [presenter, subject, room] = event

        return {
            date: d,
            prettyDate: d.format("ddd DD.MM.YYYY HH:mm"),
            time,
            day,
            presenter, subject, room
        }
    }).filter(e => e !== null)

    return days as CalEvent[]
}

export type CalEvent = {
    date: Dayjs
    prettyDate: string
    time: string
    day: string
    presenter: string
    subject: string
    room: string
}

export type Events = CalEvent[]