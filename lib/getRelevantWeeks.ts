import dayjs from "dayjs"

export const relevantWeeks = () => {
    const today = dayjs()

    const offsets = [-2, -1, 0, 1, 2]

    return offsets.map(off => today.add(off, "week").isoWeek())
}