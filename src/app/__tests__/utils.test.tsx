import { expect, test } from 'vitest'
import { isRaceFieldPresent, isRaceFieldValid, place } from '../utils'

const places: place[] = [
    {
        position: 1,
        raceNumber: 1,
        time: "00:01"
    },
    {
        position: 2,
        raceNumber: 12,
        time: "00:03"
    },
    {
        position: 3,
        raceNumber: 3,
        time: "00:04"
    },
    {
        position: 4,
        raceNumber: 5,
        time: "00:05"
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