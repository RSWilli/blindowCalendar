import dayjs from "dayjs"

export const relevantWeeks = () => {
    const currentWeekStart = dayjs().startOf("isoWeek")

    const offsets = [-2, -1, 0, 1, 2]

    return offsets.map(off => currentWeekStart.add(off, "week"))
}