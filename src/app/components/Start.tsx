import React, { SetStateAction } from 'react';

interface StartProps {
    setStartTime: React.Dispatch<SetStateAction<number>>,
}

const Start: React.FC<StartProps> = ({setStartTime}) => 
  <div className="flex flex-row gap-2 small:w-full large:w-1/2 large:max-w-96">
    <button 
      className="grow bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md"
      onClick={() => setStartTime(Date.now())}
    >
    Start
    </button>
  </div>

export default Start;
