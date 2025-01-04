const padZero = (value?: number) => {
  if (value === undefined)
    return "00"
  if (value < 10)
    return `0${value}`
  return value.toString()
}

export const formatClock = (hours?: number, minutes?: number, seconds?: number) => `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`
export const formatTimer = (hours?: number, minutes?: number, seconds?: number) => `${(hours === undefined || hours === 0) ? "" : hours + ":"}${padZero(minutes)}:${padZero(seconds)}`

export interface place {
    position: number,
    raceNumber: number,
    time: string
  }

export interface settings {
    min: number,
    max: number
  }

export const isRaceFieldValid = (raceField: HTMLFormElement, places: place[], settings: settings) => {
  // Check for invalid race numbers
  if (raceField.value < settings.min || raceField.value > settings.max) {
    alert("Race number not in the valid range!")
    return false
  }
  if (places.map((p) => p.raceNumber).includes(raceField.value)) {
    alert("Race number was saved already!")
    return false
  }  
  // Otherwise it's valid.
  return true;
}