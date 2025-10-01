import { EmptyProgramState } from '../components/EmptyProgramState'
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router';
import { v4 as uuidv4 } from "uuid";
import { useWorkout } from '../hooks/workoutContext';
import type { Program } from '../types';

export const ProgramCard = (program: Program) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4  w-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-white text-xl font-semibold">{program.name}</h3>
        <button aria-label="More options" className="text-gray-400 hover:text-gray-300">
          <EllipsisVerticalIcon className="h-6 w-6" />
        </button>
      </div>

      {/* <div className='flex items-center gap-2'>
        <div className="w-full bg-gray-700 rounded-full h-1 ">
          <div
            className={`bg-indigo-500 h-1 rounded-full`}
            style={{ width: `${(program.completionProgress || 0) * 100}%` }}
          ></div>
        </div>
      <span
        className={`text-xs font-semibold ${
          program.isCompleted ? 'text-green-400' : 'text-yellow-400'
        }`}
      >
        {program.isCompleted ? 'Completed' : `${Math.round((program.completionProgress || 0) * 100)}%`}
      </span>
      </div> */}
      

      {/* Description */}
      {program.description && (
        <p className="text-gray-300 mt-2 text-sm line-clamp-3">
          {program.description}
        </p>
      )}

      {/* Tags */}
      {/* {program.tags && program.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      )} */}

      {/* Progress and Info */}
      {/* <div className="mt-4 grid grid-cols-2 gap-2 text-gray-400">
        <div>
          <p className=' uppercase text-xs font-extralight'>Difficulty</p>
          <p className=' text-white/80 text-md capitalize'>{program.difficultyLevel || 'N/A'}</p>
        </div>
        <div>
          <p className=' uppercase text-xs font-extralight'>Last Updated</p>
          <p className=' text-white/80 text-md capitalize'>{new Date(program.lastUpdated).toLocaleDateString() || 'N/A'}</p>
        </div>
        <div>
          <p className=' uppercase text-xs font-extralight'>Status</p>
          <p className=' text-white/80 text-md capitalize'>{program.isActive ? 'Active' : 'Inactive'}</p>
        </div>
        <div>
          <p className=' uppercase text-xs font-extralight'>Created At</p>
          <p className=' text-white/80 text-md capitalize'>{new Date(program.created_at).toLocaleDateString() || 'N/A'}</p>
        </div>
        <span></span>
      </div> */}
    </div>
  );
}

export const Programs = () => {
  const newProgramId = uuidv4();
  const { programs } = useWorkout();

  if (programs.length === 0) return <EmptyProgramState />;

  console.log('PROGRAMS PAGE', programs);

  return (
    <div className=" p-4 rounded-md text-gray-300">
      <div className='flex justify-end'>
        <button className=' cursor-pointer'>
          <NavLink to={`/programs/${newProgramId}/edit`}>
            <PlusIcon className='bg-indigo-700/70 w-8 h-8 rounded-lg' />
          </NavLink>
        </button>
      </div>
      <h3 className="mb-3 text-sm font-semibold">Active Programs</h3>
      <hr className="border-gray-700 border-t-2 w-32 mb-6" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {programs.map((proj: Program) => (
          <NavLink to={`/programs/${proj.id}`} key={proj.name}>
            <ProgramCard {...proj} />
          </NavLink>
        ))}
      </div>
    </div>
  )
}
