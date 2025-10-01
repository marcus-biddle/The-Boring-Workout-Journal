import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useWorkout } from '../hooks/workoutContext';
import type { SetLog, Workout, WorkoutExercise } from '../types';

export const WorkoutLogPage = () => {
    let params = useParams();
    const { workouts } = useWorkout();

    const [workout, setWorkout] = useState<Workout | undefined>(() => workouts.find((w) => w.id === params.workoutId))
    const [currentExercise, setCurrentExercise] = useState<WorkoutExercise | undefined>();
    console.log(workout)

    useEffect(() => {
  if (!workout?.exercises) return;

  const index = workout.exercises.findIndex(ex => {
    if (ex.log.length === 0) {
      // If no sets logged yet, this is the current exercise
      return true;
    }
    if (ex.log.length > 0 && ex.log.length !== ex.goalSets) {
      // If some sets logged but not all completed, keep working on this exercise
      return true;
    }
    return false; // Else, skip to next exercise
  });

  setCurrentExercise(workout.exercises[index > -1 ? index : 0]);
}, [workout]);

    console.log(currentExercise)

  return (
    <>
        <div className="space-y-0">
            {workout?.exercises.map((exercise, index) => {
                const currExerciseindex = workout.exercises.findIndex(e => e.id === currentExercise?.id);
                const status = exercise.id === currentExercise?.id ? 'current' : index < currExerciseindex ? 'completed' : '';
                console.log(exercise.id, currentExercise?.id)
                const isLast = index === workout.exercises.length - 1;

                return (
                    <div key={exercise.id} className="relative">
                    {/* Connector line */}
                    {!isLast && (
                    <div className="absolute left-4 top-8 w-px h-full bg-gray-800"></div>
                    )}

                    <div 
                    className="flex items-start space-x-3 cursor-pointer group py-3"
                    // onClick={() => handleStepClick(step.exerciseId)}
                    >
                    {/* Step indicator */}
                    <div className="flex-shrink-0 relative">
                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-out
                    ${status === 'completed' 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 group-hover:scale-105' 
                    : status === 'current'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-blue-400/30 shadow-lg shadow-blue-500/25 group-hover:ring-blue-400/50 group-hover:scale-105'
                    : 'bg-gray-800 group-hover:bg-gray-700 group-hover:scale-105'
                    }
                    `}>
                    {status === 'completed' ? (
                    // <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <></>
                    ) : status === 'current' ? (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    ) : (
                    <div className="w-2 h-2 bg-gray-600 rounded-full group-hover:bg-gray-500"></div>
                    )}
                    </div>
                    </div>

                    {/* Step content */}
                    <div  className={`flex-1 pb-6 min-h-0 ${currentExercise?.id === exercise.id ? 'bg-indigo-800/10 border-1 border-indigo-800/25' : 'bg-indigo-950/50'} rounded-md p-4`}>
                    <div onClick={() => console.log(exercise)}>
                    <h3 className={`
                    font-semibold capitalize transition-all duration-300 ease-out text-xl leading-tight
                    ${status === 'current' || status === 'completed'
                    ? 'text-white group-hover:text-blue-100'
                    : 'text-indigo-500/70 group-hover:text-gray-300'
                    }
                    `}>
                    {exercise.exerciseInfo.name}
                    </h3>
                    <p className={`
                    text-md mt-0.5 transition-all duration-300 ease-out leading-relaxed
                    ${status === 'current' || status === 'completed'
                    ? 'text-gray-300 group-hover:text-gray-200'
                    : 'text-indigo-500/70 group-hover:text-gray-400'
                    }
                    `}>
                    {exercise.goalWeight}lbs x {exercise.goalSets} sets x {exercise.goalReps} reps
                    </p>
                    </div>
                    <div>
                    {currentExercise?.id === exercise.id && <table className="min-w-full border-none mt-2">
                    <thead>
                    <tr>
                    <th className="px-3 py-2 border-none text-left">Set #</th>
                    <th className="px-3 py-2 border-none text-left">Weight</th>
                    <th className="px-3 py-2 border-none text-left">Reps</th>
                    <th className="px-3 py-2 border-none text-left">Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.from({ length: +exercise.goalSets }).map((_, i) => (
                    <tr key={i}>
                    <td className="px-3 py-2 border-none">{i + 1}</td>
                    <td className="px-3 py-2 border-none flex gap-2 items-center">
                    <input
                    type="number"
                    className="w-16 py-1 px-2 rounded-md border-none dark:bg-gray-800"
                    value={exercise.goalWeight}
                    name={`weight-${i}`}
                    />
                    <span>lbs</span>
                    </td>
                    <td className="px-3 py-2 border-none">
                    <input
                    type="text"
                    className="w-16 py-1 px-2 rounded-md border-none dark:bg-gray-800"
                    placeholder="Reps"
                    name={`reps-${i}`}
                    />
                    </td>
                    <td className="px-3 py-2 border-none">
                    <input
                    type="checkbox"
                    checked={false}
                    onChange={() => null}
                    name={`completed-${i}`}
                    className="size-6"
                    />
                    </td>
                    </tr>
                    ))}
                    </tbody>
                    </table>}
                    </div>
                    </div>
                    </div>
                    </div>
                );
            })}
        </div>
    </>
  )
}
