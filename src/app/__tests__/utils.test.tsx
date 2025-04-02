import { expect, test } from 'vitest'
import { isRaceFieldPresent, isRaceFieldValid, isTimeValid, place, timerFormatToSeconds } from '../utils'

const places: place[] = [
    {
        raceNumber: 1,
        timeInSeconds: 1
    },
    {
        raceNumber: 12,
        timeInSeconds: 3
    },
    {
        raceNumber: 3,
        timeInSeconds: 4
    },
    {
        raceNumber: 5,
        timeInSeconds: 5
    }
]
 
test('isRaceFieldValid', () => {
    expect(isRaceFieldValid(1, [], {min: 2, max: 10})).toBe(false)
    expect(isRaceFieldValid(2, [], {min: 2, max: 10})).toBe(true)
    expect(isRaceFieldValid(9, [], {min: 2, max: 10})).toBe(true)
    expect(isRaceFieldValid(10, [], {min: 2, max: 10})).toBe(true)
    expect(isRaceFieldValid(11, [], {min: 2, max: 10})).toBe(false)

    expect(isRaceFieldValid(1, places, {min: 0, max: 12})).toBe(false)
    expect(isRaceFieldValid(2, places, {min: 0, max: 12})).toBe(true)
    expect(isRaceFieldValid(3, places, {min: 0, max: 12})).toBe(false)
    expect(isRaceFieldValid(4, places, {min: 0, max: 12})).toBe(true)
    expect(isRaceFieldValid(5, places, {min: 0, max: 12})).toBe(false)
    expect(isRaceFieldValid(12, places, {min: 0, max: 12})).toBe(false)
})

test('isRaceFieldPresent', () => {
    expect(isRaceFieldPresent(1, places)).toBe(true)
    expect(isRaceFieldPresent(12, places)).toBe(true)
    expect(isRaceFieldPresent(3, places)).toBe(true)
    expect(isRaceFieldPresent(5, places)).toBe(true)

    expect(isRaceFieldPresent(0, places)).toBe(false)
    expect(isRaceFieldPresent(2, places)).toBe(false)
    expect(isRaceFieldPresent(-2, places)).toBe(false)
})

test('isTimeValid', () => {
    expect(isTimeValid('10:00')).toBe(true)
    expect(isTimeValid('01:20')).toBe(true)
    expect(isTimeValid('1:00:00')).toBe(true)
    expect(isTimeValid('1:02:02')).toBe(true)
    expect(isTimeValid('01:02:02')).toBe(true)
    expect(isTimeValid('99:59:59')).toBe(true)

    expect(isTimeValid('0')).toBe(false)
    expect(isTimeValid('10')).toBe(false)
    expect(isTimeValid('1:10')).toBe(false)
    expect(isTimeValid('1:1')).toBe(false)
    expect(isTimeValid('0:10')).toBe(false)
    expect(isTimeValid('01:60')).toBe(false)
    expect(isTimeValid('60:00')).toBe(false)
    expect(isTimeValid('abc')).toBe(false)
    expect(isTimeValid('01;00')).toBe(false)
    expect(isTimeValid('100:00:00')).toBe(false)
})

test('timerFormatToSeconds', () => {
    expect(timerFormatToSeconds('10:00')).toBe(600)
    expect(timerFormatToSeconds('01:20')).toBe(80)
    expect(timerFormatToSeconds('1:00:00')).toBe(3600)
    expect(timerFormatToSeconds('1:02:02')).toBe(3722)
    expect(timerFormatToSeconds('01:02:02')).toBe(3722)
    expect(timerFormatToSeconds('99:59:59')).toBe(359999)
})
