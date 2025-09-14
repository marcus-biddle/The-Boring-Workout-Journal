import { PlusIcon, FolderPlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from "uuid";

export const EmptyProgramState = () => {
  const newProgramId = uuidv4(); 
  let navigate = useNavigate();
  
    const handleCreateProject = () => {
    console.log('Creating new project...');
    navigate(`/programs/${newProgramId}/edit`)
  };

  return (
    <div className="relative flex items-center justify-center p-22 bg-slate-800/80 rounded-lg border border-slate-700/30">
      <div className="text-center max-w-md">
        {/* Folder Plus Icon */}
        <div className='flex justify-center'>
            <FolderPlusIcon className='w-16 h-16 text-slate-500' />
        </div>
        

        {/* Text Content */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-3">
            No programs
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Get started by creating a new program.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleCreateProject}
          className="inline-flex items-center px-6 py-2 bg-indigo-600 hover:bg-indigo-300 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <PlusIcon className="w-5 h-5 mr-2" strokeWidth={2} />
          New Program
        </button>
      </div>
    </div>
  )
}

