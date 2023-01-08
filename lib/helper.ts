import { Dayjs } from "dayjs"

export const parseTime = (timestring: string) => {
    const [hour, minute] = timestring.split(":")

    return {
        hour: parseInt(hour), minute: parseInt(minute)
    }
}

type RawEvent = [string, string, string] | null

export type Row = [string, RawEvent, RawEvent, RawEvent, RawEvent, RawEvent]

export const getRowEvents = (weekstart: Dayjs, row: Row) => {
    const [time, ...rest] = row
    const { hour, minute } = parseTime(time)

    // weekstartTime is the dayjs date on monday at the correct start time for the row
    const weekstartTime = weekstart.hour(hour).minute(minute).second(0)

    const days = ["mon", "tue", "wed", "thu", "fri"].map<CalEvent | null>((_day, i) => {
        const d = weekstartTime.day(i + 1)

        const event = rest[i]

        if (event === null) {
            return null
        }

        const [presenter, subject, room] = event

        return {
            date: d,
            prettyDate: d.format("ddd DD.MM.YYYY HH:mm"),
            time,
            presenter, subject,
            room: room ?? "Online"
        }
    }).filter(e => e !== null)

    return days as CalEvent[]
}

export type CalEvent = {
    date: Dayjs
    prettyDate: string
    time: string
    presenter: string
    subject: string
    room: string
}

export type Events = CalEvent[]