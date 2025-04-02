"use client"

import React, { useEffect, useState }  from 'react';
import { intervalToDuration, startOfToday } from "date-fns";
import { useLocalStorage } from 'usehooks-ts';
import Footer from './components/Footer';
import ClockAndTimer from './components/ClockAndTimer';
import Record from './components/Record';
import Results from './components/Results';
import Start from './components/Start';
import { DEFAULT_SETTING_MAX, DEFAULT_SETTING_MIN, DEFAULT_TIME, DEFAULT_PLACES, DEFAULT_STARTTIME } from './constants';
import { formatClock, hoursMinutesAndSecondsDurationToSeconds, place, settings } from './utils';
import Settings from './components/Settings';

const Timer: React.FC = () => {
  // States
  const [clock, setClock] = useState(DEFAULT_TIME);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
 
  // Values using local storage
  const [startTime, setStartTime] = useLocalStorage('SRT-startTime', DEFAULT_STARTTIME, { initializeWithValue: false });
  const [places, setPlaces] = useLocalStorage<place[]>('SRT-places', DEFAULT_PLACES, { initializeWithValue: false });
  const [settings, setSettings]= useLocalStorage<settings>('SRT-settings', {min: DEFAULT_SETTING_MIN, max: DEFAULT_SETTING_MAX}, { initializeWithValue: true });

  // Get executed at the specified interval. Compute and set the time values.
  useEffect(() => {
    const timer = setInterval(() => {
      // Set the clock time
      const timeToNow = intervalToDuration({start: startOfToday(), end: Date.now()});
      setClock(formatClock(timeToNow.hours, timeToNow.minutes, timeToNow.seconds));
    
      // Compute and set the elasped time
      if (startTime > 0) {
        const stopwatch = intervalToDuration({start: Number(startTime), end: Date.now()});
        setElapsedSeconds(hoursMinutesAndSecondsDurationToSeconds(stopwatch));
      }

      setIsLoading(false);
    }, 100);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, [startTime]);
  
  return (
    <div className="grid grid-rows-[20px_1fr_24px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {!isLoading && 
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">
        <ClockAndTimer elapsedSeconds={elapsedSeconds} clock={clock} isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen}/>
        {isSettingsOpen ?
        <Settings setStartTime={setStartTime} setElapsedSeconds={setElapsedSeconds} setPlaces={setPlaces} setIsSettingsOpen={setIsSettingsOpen} settings={settings} setSettings={setSettings} />
        :
        <>
          <div className="flex flex-col gap-4 items-center w-full justify-items-center">
            {startTime === 0 ?
            <Start setStartTime={setStartTime} />
            :
            <Record elapsedSeconds={elapsedSeconds} places={places} setPlaces={setPlaces} settings={settings}/>
            }
          </div>
          <Results places={places} setPlaces={setPlaces} settings={settings}/>
        </>
        }
      </main>
      }
      <Footer />
    </div>
  );
}

export default Timer;
