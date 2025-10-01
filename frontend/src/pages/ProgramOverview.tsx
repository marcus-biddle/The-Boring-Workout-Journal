import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router';
import { BentoGrid } from '../components/BentoGrid';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import type { Program, Workout } from '../types';
import { useWorkout } from '../hooks/workoutContext';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from "uuid";

interface GotoProgramComponentProps {
  program: Program
  user: UserData | null
}
const GotoProgramComponent = ({ program, user }: GotoProgramComponentProps) => {
  const hasUserStartedProgram = program.blockSetsCompleted === 0 ? false : true;

  return (
    <NavLink to={`${hasUserStartedProgram ? 'update' : program.blockSets[0].blockId}`} className='flex items-center justify-between'>
      {hasUserStartedProgram? <p>Go To Current Block</p> : <p>Start Your First Workout Block</p>}
      <ArrowRightIcon className='h-8 w-8 text-gray-700' />
    </NavLink>
  )
}

const ProgramStatsComponent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      <div className="border-r border-slate-700 px-2 ">
        <p className="text-xs font-semibold text-gray-400">Days Since Active</p>
        <p className="text-lg">42</p>
      </div>

      <div className="border-r border-slate-700 px-2">
        <p className="text-xs font-semibold text-gray-400">Blocks Completed</p>
        <p className="text-lg">15</p>
      </div>

      <div className="border-r border-slate-700 px-2">
        <p className="text-xs font-semibold text-gray-400">Weeks Completed</p>
        <p className="text-lg">38</p>
      </div>

      <div className="px-2">
        <p className="text-xs font-semibold text-gray-400">Total Volume</p>
        <p className="text-lg">12,450 kg</p>
      </div>
    </div>
  )
}

export const ProgramOverview = () => {
  let params = useParams();
  let navigate = useNavigate();
  let workoutId = uuidv4();
  const { programs, workouts, user, addWorkout } = useWorkout();

  const [program, setProgram] = useState<Program | undefined>(() => programs.find(p => p.id === params.pid));
  const [workout, setWorkout] = useState<Workout | undefined>(() => workouts.find((w) => w.status === 'in progress'))

  useEffect(() => {
    const foundProgram = programs.find(p => p.id === params.pid);
    setProgram(foundProgram);

    if (workouts.length > 0) {
      const workoutInProgress = workouts.find((w) => w.status === 'in progress')
      if (workoutInProgress) {
        setWorkout(workoutInProgress);
      } else {
        setWorkout(workouts[0])
      }
      
    } else {
      const newWorkout: Workout = {
        id: workoutId,
        userId: user?.id || '',
        programId: program?.id || '',
        date: new Date().toISOString(),
        status: 'not started',
        exercises: program?.days[0].exercises.map(ex => {
          let exerciseId = uuidv4();
          
          return {
          id: exerciseId,
          exercisePlanId: ex.id,
          exerciseInfo: {...ex.exerciseInfo},
          goalSets: ex.sets,
          goalReps: ex.targetReps,
          goalWeight: ex.targetWeight,
          log: []
        }}) || []
      };

      setWorkout(newWorkout)
      addWorkout(newWorkout)
    }
    
  }, [programs, params, workouts]);

  if (program === null) {
    return <></>
  }

  console.log(program, workout)
  
  return (
    <div className=" text-white capitalize">
      <header className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">{program?.name}</h1>
        <button onClick={() => navigate(`workouts/${workout?.id}`)} className='flex justify-between gap-4 items-center text-lg border-1 rounded-md px-6 border-indigo-500/50 bg-indigo-900/20 text-indigo-400'>
          <span>Go to Workout</span>
          <ChevronRightIcon className=' size-6' />
        </button>
        {/* <p className="mt-1 text-gray-400">
          Completion: {Math.round(program.completionProgress * 100)}%
        </p> */}
      </header>

      <BentoGrid
      mainTopLeft={<ProgramStatsComponent />}
      mainTopRight={<></>}
      bottomSecondaryLeft={<></>}
      bottomSecondaryMid={<></>}
      bottomSecondaryRight={<></>}
       />
    </div>
  )
}
