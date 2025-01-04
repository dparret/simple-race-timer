import { Cog6ToothIcon } from '@heroicons/react/16/solid';
import React, { SetStateAction } from 'react';

interface StartProps {
    setStartTime: React.Dispatch<SetStateAction<number>>,
    setIsSettingsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Start: React.FC<StartProps> = ({setStartTime, setIsSettingsOpen}) => 
  <div className="flex flex-row gap-2 w-1/2">
    <button 
      className="grow bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md"
      onClick={() => setStartTime(Date.now())}
    >
    Start
    </button>
    <button 
      className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
      onClick={() => setIsSettingsOpen(true)}
    >
      <Cog6ToothIcon className="size-4 text-white" />
    </button>
  </div>

export default Start;
