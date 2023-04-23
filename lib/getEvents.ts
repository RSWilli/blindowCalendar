import fetch from "node-fetch"
import dayjs, { Dayjs } from "dayjs"
import isoWeek from 'dayjs/plugin/isoWeek'
import utc from 'dayjs/plugin/utc'
import { Schedule } from "./types"
dayjs.extend(isoWeek)
dayjs.extend(utc)

export const getEvents = async (from: Dayjs, to: Dayjs) => {
    const res = await fetch("https://blindow.a4.school/api/Api/PublicSchedule/GetSchedule", {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json;charset=utf-8",
        },
        "body": JSON.stringify({
            "schoolId": 37,
            "requestId": "dfe4591e5d0832d61ba2daebbc000208784270fc",
            "classId": "293",
            "from": from.toISOString(),
            "to": to.toISOString(),
            "getShortNames": 1
        }),
        "method": "POST",
    })

    if (!res.ok) {
        const text = await res.text()

        console.log(res.status, text)

        throw new Error("Could not fetch schedule")
    }

    const data = await res.json() as Schedule

    return data.lessons
}

// await fetch("https://blindow.a4.school/api/Api/PublicSchedule/GetSchedule", {
//     "credentials": "omit",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/112.0",
//         "Accept": "application/json, text/plain, */*",
//         "Accept-Language": "en-GB,en-US;q=0.8,en;q=0.5,de-DE;q=0.3",
//         "Content-Type": "application/json;charset=utf-8",
//         "Sec-Fetch-Dest": "empty",
//         "Sec-Fetch-Mode": "cors",
//         "Sec-Fetch-Site": "same-origin"
//     },
//     "referrer": "https://blindow.a4.school/schedulemanager/Scripts/app/publicSchedule/",
//     "body": "{\"schoolId\":37,\"requestId\":\"dfe4591e5d0832d61ba2daebbc000208784270fc\",\"classId\":\"293\",\"from\":\"2023-04-16T22:00:00.000Z\",\"to\":\"2023-04-21T22:00:00.000Z\",\"getShortNames\":1}",
//     "method": "POST",
//     "mode": "cors"
// })