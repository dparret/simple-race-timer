import { Duration, hoursToSeconds, intervalToDuration, minutesToSeconds } from "date-fns"

const padZero = (value?: number) => {
  if (value === undefined)
    return "00"
  if (value < 10)
    return `0${value}`
  return value.toString()
}

export const formatClock = (hours?: number, minutes?: number, seconds?: number) => `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
export const formatTimerFromSeconds = (seconds: number) => {
  const timeDuration = intervalToDuration({ start: 0, end: seconds * 1000});
  return `${(timeDuration.hours === undefined || timeDuration.hours === 0) ? "" : timeDuration.hours + ":"}${padZero(timeDuration.minutes)}:${padZero(timeDuration.seconds)}`
}

export const hoursMinutesAndSecondsDurationToSeconds = (stopwatch: Duration): number => (
  (stopwatch.hours ? hoursToSeconds(stopwatch.hours) : 0)
  + (stopwatch.minutes ? minutesToSeconds(stopwatch.minutes) : 0)
  + (stopwatch.seconds ? stopwatch.seconds : 0)
)

export interface place {
    raceNumber: number,
    timeInSeconds: number,
  }

export interface settings {
    min: number,
    max: number
  }

export const isRaceFieldValid = (raceField: number, places: place[], settings: settings) => {
  // Check for invalid race numbers
  if (raceField < settings.min || raceField > settings.max) {
    alert("Race number not in the valid range!")
    return false;
  }
  if (places.map((p) => p.raceNumber).includes(raceField)) {
    alert("Race number was saved already!")
    return false;
  }  
  // Otherwise it's valid.
  return true;
};

export const isRaceFieldPresent = (raceField: number, places: place[]) => {
  const isPresent = places.map((p) => p.raceNumber).includes(raceField)
  if (!isPresent){
    alert("The race number can't be overridden");
    return false;
  } else {
    return true;
  }
};

// Use to check if a field is empty or not
export const isFieldEmpty = (key: string) => {
  const field = document.getElementById(key) as HTMLFormElement;
  return field === null || field.value === "" ? true : false;
}

export const isTimeValid = (time: string) => {
  const matchTimeRegex = /^(?:(?:(\d{1,2}):)?([0-5]\d):)([0-5]?\d)$/
  const isTime = matchTimeRegex.test(time)

  if (!isTime){
    alert("The time must be of the format HH:mm:ss or mm:ss.");
    return false;
  } else {
    return true;
  }
}

export const timerFormatToSeconds = (time: string) => {
  const splitTime = time.split(":", 3).map((e) => Number(e));
  
  // Force 0 hours if needed
  const splitTimeWithHours = splitTime.length === 2 ? [0, ...splitTime] : splitTime;

  return splitTimeWithHours[0] * 60 * 60 + splitTimeWithHours[1] * 60 + splitTimeWithHours[2]
}