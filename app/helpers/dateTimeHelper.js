import { Temporal } from '@js-temporal/polyfill'

const getCurrentDateTimeISO = () => {
  return Temporal.Now.plainDateTimeISO().toString()
}

const addMillisecondsToCurrentDateTime = (milliseconds) => {
  const now = Temporal.Now.plainDateTimeISO()
  const futureTime = now.add({ milliseconds })
  return futureTime.toString()
}

const addDaysToDate = (date, days) => {
  const temporalDate = Temporal.PlainDate.from(date)
  return temporalDate.add({ days }).toString()
}

const subtractDaysFromDate = (date, days) => {
  const temporalDate = Temporal.PlainDate.from(date)
  return temporalDate.subtract({ days }).toString()
}

const compareDates = (date1, date2) => {
  const temporalDate1 = Temporal.PlainDate.from(date1)
  const temporalDate2 = Temporal.PlainDate.from(date2)
  return Temporal.PlainDate.compare(temporalDate1, temporalDate2)
}

export { getCurrentDateTimeISO, addMillisecondsToCurrentDateTime, addDaysToDate, subtractDaysFromDate, compareDates }
