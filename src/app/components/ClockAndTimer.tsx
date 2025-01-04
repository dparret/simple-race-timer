import React from 'react';
import { ClockIcon } from '@heroicons/react/16/solid';

interface ClockAndTimerProps {
    clock: string,
    elapsedTime: string
}

const ClockAndTimer: React.FC<ClockAndTimerProps> = ({clock, elapsedTime}) => 
  <div className="flex flex-col gap-2 items-center">
    <div className='text-xl text-neutral-500 font-mono'>
      <div className='flex flex-row gap-2 items-center'>
      <ClockIcon className="size-4 text-neutral-500" />
      {clock}
      </div>
    </div>
    <div className='text-3xl font-mono'>
    {elapsedTime}
    </div>
  </div>

export default ClockAndTimer;