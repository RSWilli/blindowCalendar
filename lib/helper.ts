import { Dayjs } from "dayjs"

export const parseTime = (timestring: string) => {
    const [hour, minute] = timestring.split(":")

    return {
        hour: parseInt(hour), minute: parseInt(minute)
    }
}

export const dayHelper = (param: string[]) => {
    return {
        presenter: param[0],
        subject: param[1],
        room: param[2]
    }
}

export const parseRow = (week: Dayjs, row: string[]) => {
    const [time, ...rest] = row
    const { hour, minute } = parseTime(time)

    const date = week.set("hour", hour).set("minute", minute)

    const days = ["mon", "tue", "wed", "thu", "fri"].map((day, i) => {
        const d = date.set("day", i + 1)

        return {
            date: d,
            prettyDate: d.format("ddd DD.MM.YYYY HH:mm"),
            time,
            ...dayHelper(rest.slice(i * 3, i * 3 + 3))
        }
    }).filter(ev => {
        return ev.presenter != undefined || ev.room != undefined || ev.subject != undefined
    })

    return days
}

export type Events = ReturnType<typeof parseRow>