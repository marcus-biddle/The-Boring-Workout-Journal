import React, { useState } from 'react';
import type { Program, ExercisePlan, DaySchedule, ExerciseDbAPI } from '../types';
import { useWorkout } from '../hooks/workoutContext';
import { MagnifyingGlassIcon, PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { ExerciseSearchBar } from '../components/ExerciseSearchBar';
import { v4 as uuidv4 } from "uuid";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export interface FlippableDaySchedule extends DaySchedule {
  isFlipped: boolean;
}

export const CreateProgramPage = () => {
  const { addProgram, user } = useWorkout();
  

  const [programName, setProgramName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDbAPI>();
  const [weight, selectedWeight] = useState<number>(0);
  const [reps, selectedReps] = useState<number>(0);
  const [sets, selectedSets] = useState<number>(0);
  const [days, setDays] = useState<FlippableDaySchedule[]>(
    daysOfWeek.map(day => ({ dayOfWeek: day, isFlipped: false, exercises: [] }))
  );

  // Add an empty exercise to a day
  const addExerciseToDay = (
    dayIndex: number, 
  ) => {
    let id = uuidv4();
    console.log(id);
    if (!selectedExercise) {
      return;
    }
    setDays(prev => {
      const copy = [...prev];
      copy[dayIndex].exercises.push({
        id: id,
        exerciseInfo: selectedExercise,
        sets: sets,
        targetReps: reps,
        targetWeight: weight,
      });
      return copy;
    });

    setSelectedExercise(undefined);
    selectedReps(0);
    selectedSets(0);
    selectedWeight(0);

    toggleDayFlip(dayIndex)
  };

  // Handle exercise input change
  const updateExercise = (
    dayIndex: number,
    exerciseIndex: number,
    field: keyof ExercisePlan,
    value: string | number
  ) => {
    setDays(prev => {
      const copy = [...prev];
      copy[dayIndex].exercises[exerciseIndex] = {
        ...copy[dayIndex].exercises[exerciseIndex],
        [field]: typeof value === 'string' && (field === 'sets' || field === 'targetReps' || field === 'targetWeight')
          ? Number(value)
          : value,
      };
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let id = uuidv4();

    // Basic validation
    if (!programName.trim()) {
      alert('Program name is required');
      return;
    }

    // need to validate user is logged in
    const newProgram: Program = {
      id: id,
      userId: user?.id || '',
      name: programName,
      description: '',
      days: days.map(({ dayOfWeek, exercises }) => ({
        dayOfWeek,
        exercises,
      })),
    };

    addProgram(newProgram);

    // Optional: clear form or navigate away
    setProgramName('');
    setDescription('');
    setDays(daysOfWeek.map(day => ({ dayOfWeek: day, isFlipped: false, exercises: [] })));
    alert('Program created!');
  };

  const toggleDayFlip = (dayIndex: number) => {
  setDays(prevDays => {
    return prevDays.map((day, index) => {
      if (index === dayIndex) {
        // Toggle isFlipped for clicked day
        return {
          ...day,
          isFlipped: !day.isFlipped,
        };
      }
      return day;
    });
  });
};

console.log(days)


  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-4xl mx-auto">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
          <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Create Your Program</h2>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
          This information will be displayed publicly so be careful what you share.
          </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="programName" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
            Name
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                <input
                  id="programName"
                  name="programName"
                  type="text"
                  onChange={(e) => setProgramName(e.target.value)}
                  className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="border-b border-gray-900/10 pb-12 mt-2 dark:border-white/10">
          <h2 className="text-base/7 font-semibold text-gray-900 dark:text-white">Exercise Selection Per Day</h2>
          <p className="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="sm:col-span-6 bg-slate-900 p-4 rounded-md space-y-4">
                <label htmlFor="first-name" className="text-xl/8 font-medium text-indigo-500 flex justify-between items-center">
                  {day.dayOfWeek}
                  <button type='button' onClick={() => toggleDayFlip(dayIndex)}>
                    {!day.isFlipped ? <PencilSquareIcon className=' size-6 text-slate-600' /> : <MagnifyingGlassIcon className=' size-6 text-slate-600' />}
                  </button>
                </label>
                {day.isFlipped && <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  {/* First input takes full width of the first row (all 6 columns) */}
                  <div className="sm:col-span-6">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                      Exercise
                    </label>
                    <ExerciseSearchBar selected={selectedExercise} setSelected={setSelectedExercise} />
                  </div>
                  

                  {/* Next three inputs split the second row equally (2 columns each) */}
                  <div className="sm:col-span-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                      Starting Weight
                    </label>
                    <input
                    id="weight"
                    name="weight"
                    type="number"
                    onChange={(e) => selectedWeight(Number(e.target.value))}
                    className="sm:col-span-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                      # of Sets
                    </label>
                    <input
                    id="sets"
                    name="sets"
                    type="number"
                    onChange={(e) => selectedSets(Number(e.target.value))}
                    className="sm:col-span-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900 dark:text-white">
                      # of Reps
                    </label>
                    <input
                    id="reps"
                    name="reps"
                    type="number"
                    onChange={(e) => selectedReps(Number(e.target.value))}
                    className="sm:col-span-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                    />
                  </div>
                </div>}
                {day.isFlipped && <div className='flex justify-end'>
                  <button type='button' onClick={() => addExerciseToDay(dayIndex)} className=' border-1 border-indigo-500 text-indigo-500 px-4 py-0.5 rounded-md bg-indigo-500/10'>
                    Add Exercise
                  </button>
                </div>}
                {!day.isFlipped && day.exercises.map((exercise) => (
                  <div key={exercise.id} className=' capitalize text-white'>
                    {exercise.exerciseInfo.name} <span className=' lowercase text-slate-300 px-2'>|</span> {exercise.targetWeight} lbs <span className=' lowercase text-slate-300 px-2'>x</span> {exercise.sets} sets <span className=' lowercase text-slate-300 px-2'>x</span> {exercise.targetReps} reps {exercise.id}
                  </div>
                ))}
                
              </div>
            ))}
          </div>
        </div>

        <div className='flex justify-end mt-4'>
          <button
          type="submit"
          className="px-4 py-2 bg-indigo-900/70 text-indigo-100 font-semibold rounded"
          >
            Create Program
          </button>
        </div>
      
    </form>
  );
};

