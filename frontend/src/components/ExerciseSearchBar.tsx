import { useState } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import type { ExerciseDbAPI } from '../types';
import { DocumentMagnifyingGlassIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export interface ExerciseSearchBarProps {
  selected: ExerciseDbAPI | undefined;
  setSelected: (e: any) => void;
}

export const ExerciseSearchBar = ({selected, setSelected}: ExerciseSearchBarProps) => {
    const [query, setQuery] = useState('');
    const [exercises, setExercises] = useState<ExerciseDbAPI[]>([]);
    // const [selected, setSelected] = useState<ExerciseDbAPI | null>(null);
    const [loading, setLoading] = useState(false);

    const toQueryParam = (str: string) => {
        return str.trim().toLowerCase().replace(/\s+/g, '+');
    }

  const handleChange = async (value: string) => {
    setQuery(value);
    setLoading(true);
    if (selected && selected.name !== value) {
      setSelected(null)
    }
    if (value.length > 2) { 
        
      const res = await fetch(`https://exercisedb-api.vercel.app/api/v1/exercises/search?offset=0&limit=10&q=${toQueryParam(value)}&threshold=0.5`);
      const data = await res.json();
      console.log(data.data)
      setExercises(data.data);
    } else {
      setExercises([]);
    }
    setLoading(false);
  };

  console.log(selected)

  return (
    <Combobox value={selected} onChange={setSelected} onClose={() => setQuery('')}>
      <div className="relative w-full">
        <div className="flex items-center gap-4 rounded-md bg-white pr-6 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 dark:bg-white/5 dark:outline-gray-600 dark:has-[input:focus-within]:outline-indigo-500">
          <ComboboxInput
            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
            placeholder="Search exercise..."
            displayValue={(exercise: ExerciseDbAPI) => exercise?.name || ''}
            onChange={e => handleChange(e.target.value)}
          />
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <RocketLaunchIcon className={`size-6 ${selected ? 'text-indigo-500' : 'text-slate-600'}`} />
          </div>
        </div>
        
            
        <ComboboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
          {loading && <div className="px-4 py-2 text-gray-500">Loading...</div>}
          {exercises.map(exercise => (
            <ComboboxOption
              key={exercise.exerciseId}
              value={exercise}
              className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-indigo-500"
            >
              <span className="ml-3 block truncate font-normal group-data-selected:font-semibold capitalize">{exercise.name}</span>
            </ComboboxOption>
          ))}
          {(!loading && exercises.length === 0 && query.length > 2) && (
            <div className="px-4 py-2 text-gray-500">No results</div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  )
}
