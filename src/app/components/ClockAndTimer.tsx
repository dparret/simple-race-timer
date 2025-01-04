import React from 'react';

interface ClockAndTimerProps {
    clock: string,
    elapsedTime: string
}

const ClockAndTimer: React.FC<ClockAndTimerProps> = ({clock, elapsedTime}) => 
  <div className="flex flex-col gap-4 items-center h-20">
    <>
      <div className='text-xl text-neutral-500 font-mono'>
        <div className='flex flex-row gap-2 items-center'>
        {clock}
        </div>
      </div>
      <div className='text-3xl font-mono'>
      {elapsedTime}
      </div>
    </>
  </div>

export default ClockAndTimer;