import { Dayjs } from "dayjs"
import ICS, { DateArray } from "ics"
import { Events } from "./helper"

function toDateArray(d: Dayjs): DateArray {
    return [
        d.year(),
        d.month() + 1,
        d.date(),
        d.hour(),
        d.minute()
    ]
}

export const makeCalendar = (events: Events) => {

    const icsEvents: ICS.EventAttributes[] = events.map(e => ({
        // uid: `${e!.prettyDate}${e!.presenter}${e!.subject}${e!.room}`,
        alarms: [],
        start: toDateArray(e!.date),
        end: toDateArray(e!.date!.add(45, "minute")),
        location: e!.room,
        title: e!.subject,
        description: e!.presenter,
        startInputType: 'local',
        startOutputType: 'local',
        endInputType: 'local',
        endOutputType: 'local'
    }))

    // console.log(icsEvents)

    const ics = ICS.createEvents(icsEvents)

    if (!ics.value) {
        throw ics.error
    }


    return ics.value
}