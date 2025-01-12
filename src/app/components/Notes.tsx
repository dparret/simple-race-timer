import React, { SetStateAction } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid';

interface NotesProps {
  setIsNotesOpen: React.Dispatch<SetStateAction<boolean>>,
  notes: string,
  setNotes: React.Dispatch<SetStateAction<string>>
}

const Notes: React.FC<NotesProps> = ({setIsNotesOpen, notes, setNotes}) =>
  <div className="flex flex-row gap-2 small:w-full large:w-1/2 large:max-w-96">
    <input 
      id="notes"
      className="grow bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
      placeholder="If anything goes south... write it down."
      value={notes}
      onChange={(value) => setNotes(value.currentTarget.value)}
    />
    <button 
      className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
      onClick={() => setIsNotesOpen(false)}
    >
      <ArrowUturnLeftIcon className="size-4 text-white" />
    </button>
  </div>

export default Notes;
