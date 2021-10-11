import { Dayjs } from "dayjs"

export const parseTime = (timestring: string) => {
    const [hour, minute] = timestring.split(":")

    return {
        hour: parseInt(hour), minute: parseInt(minute)
    }
}

export const parseRow = (week: Dayjs, row: string[]) => {
    const [time, ...rest] = row
    const { hour, minute } = parseTime(time)

    const date = week.hour(hour).minute(minute)

    const days = ["mon", "tue", "wed", "thu", "fri"].map<CalEvent | null>((day, i) => {
        const d = date.day(i + 1)

        const [presenter, subject, room] = rest.slice(i * 3, i * 3 + 3)

        if (!presenter || !subject || !room) {
            return null
        }

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

type CalEvent = {
    date: Dayjs
    prettyDate: string
    time: string
    day: string
    presenter: string
    subject: string
    room: string
}

export type Events = CalEvent[]