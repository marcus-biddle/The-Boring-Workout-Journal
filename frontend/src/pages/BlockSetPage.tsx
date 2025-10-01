import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { EllipsisVerticalIcon} from '@heroicons/react/24/solid';
import { Accordion } from '../components/Accordion';
import { CircularProgressBar } from '../components/CircularProgressBar';

const BlockItem = (item: BlockItem) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
      <div className='flex flex-col items-baseline'>
        <span className='capitalize text-lg'>{item.exercise.name}</span>
        <span className=' text-gray-500 indent-8'>{item.weight} lbs <span className='text-2xl'>|</span> {item.sets} sets <span className='text-2xl'>|</span> {item.reps} reps</span>
      </div>
      
      <EllipsisVerticalIcon className=' size-6' />
    </div>
  )
}

// block should only be using user data to update
export const BlockSetPage = () => {
  let { pid, blockId } = useParams();
  const [block, setBlock] = useState<BlockSet | undefined>(undefined)
  const [currentStep, setCurrentStep] = useState(1);

  const getCurrentBlock = () => {
    const activeBlock = user?.programs?.find((p) => p.id === pid)?.blockSets.find((b) => b.blockId === blockId);
    console.log(activeBlock)
    setBlock(activeBlock);
  }

  const handleStepClick = (stepId) => {
    setCurrentStep(stepId);
  };

  const getStepStatus = (step) => {
    if (step.completed) return 'completed';
    if (step.id === currentStep) return 'current';
    return 'upcoming';
  };

  useEffect(() => {
    getCurrentBlock();
  },[pid, blockId])

  return (
    <div className='text-white'>
      <header className='flex items-center gap-12 px-24 py-10'>
        <div>
          <CircularProgressBar
            progress={80}
            size={45}
            strokeWidth={4}
            color="#ec4899"
            showPercentage={false}
          />
        </div>
        <h1 className='text-4xl'>Week X Day Y Block Z</h1>
        
      </header>

      <div className="space-y-0">
          {block?.data.map((step, index) => {
            const status = getStepStatus(step);
            const isLast = index === block.data.length - 1;
            
            return (
              <div key={step.exerciseId} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-4 top-8 w-px h-full bg-gray-800"></div>
                )}
                
                <div 
                  className="flex items-start space-x-3 cursor-pointer group py-3"
                  onClick={() => handleStepClick(step.exerciseId)}
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
                  <div  className="flex-1 pb-6 min-h-0 bg-slate-900/40 rounded-md p-4">
                    <div onClick={() => console.log(step)}>
                      <h3 className={`
                      font-semibold capitalize transition-all duration-300 ease-out text-base leading-tight
                      ${status === 'current' || status === 'completed'
                        ? 'text-white group-hover:text-blue-100'
                        : 'text-gray-400 group-hover:text-gray-300'
                      }
                    `}>
                      {step.exercise.name}
                    </h3>
                    <p className={`
                      text-xs mt-0.5 transition-all duration-300 ease-out leading-relaxed
                      ${status === 'current' || status === 'completed'
                        ? 'text-gray-300 group-hover:text-gray-200'
                        : 'text-gray-500 group-hover:text-gray-400'
                      }
                    `}>
                      {step.weight}lbs x {step.sets} sets x {step.reps} reps
                    </p>
                    </div>
                    <div>
                      <table className="min-w-full border-none mt-2">
    <thead>
      <tr>
        <th className="px-3 py-2 border-none text-left">Set #</th>
        <th className="px-3 py-2 border-none text-left">Weight</th>
        <th className="px-3 py-2 border-none text-left">Reps</th>
        <th className="px-3 py-2 border-none text-left">Completed</th>
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: +step.sets }).map((_, i) => (
        <tr key={i}>
          <td className="px-3 py-2 border-none">{i + 1}</td>
          <td className="px-3 py-2 border-none flex gap-2 items-center">
            <input
              type="number"
              className="w-16 py-1 px-2 rounded-md border-none dark:bg-gray-800"
              value={step.weight}
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
  </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      
      <Accordion items={block?.data || []} allowMultiple={true} />
    </div>
  )
}
