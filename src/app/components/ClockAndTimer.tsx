import React, { SetStateAction } from 'react';
import { ArrowUturnLeftIcon, Cog6ToothIcon } from '@heroicons/react/16/solid';

interface ClockAndTimerProps {
    clock: string,
    elapsedTime: string,
    isSettingsOpen: boolean,
    setIsSettingsOpen: React.Dispatch<SetStateAction<boolean>>
}

const ClockAndTimer: React.FC<ClockAndTimerProps> = ({clock, elapsedTime, isSettingsOpen, setIsSettingsOpen}) => 
  <div className="flex flex-col gap-4 items-center h-20">
    <>
      <div className='text-xl text-neutral-500 font-mono'>
        <div className='flex flex-row gap-2 items-center'>
        {clock}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="w-10 h-10"></div> {/* This is only to center the timer */}
        <div className='text-3xl font-mono'>
          {elapsedTime}
        </div>
        { !isSettingsOpen ?
        <button 
          className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Cog6ToothIcon className="size-4 text-white" />
        </button>
        :
        <button 
          className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
          onClick={() => setIsSettingsOpen(false)}
        >
          <ArrowUturnLeftIcon className="size-4 text-white" />
        </button>
        }
      </div>
    </>
  </div>

export default ClockAndTimer;