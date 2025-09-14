import React, { useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

const WorkoutData = [
    { 
        workoutNumber: 1,
        data: [
            { exercise: "pullups", sets: 5, reps: 5, startingWeight: 100}
        ]
    },
    { 
        workoutNumber: 2,
        data: []
    },
    { 
        workoutNumber: 3,
        data: []
    },
    { 
        workoutNumber: 4,
        data: []
    },
]

const columns = [
    { 
      key: "exercise", 
      label: "Exercise",
      render: (row) => (
        <div className="font-medium text-white">{row.exercise}</div>
      )
    },
    { 
      key: "sets", 
      label: "Sets",
      render: (row) => (
        <span className="text-slate-300">{row.sets}</span>
      )
    },
    { 
      key: "reps", 
      label: "Reps",
      render: (row) => (
        <span className="text-slate-300">{row.reps}</span>
      )
    },
    { 
      key: "startingWeight", 
      label: "Starting Weight",
      render: (row) => (
        <span className={`${
          row.startingWeight === 0 ? 'text-blue-400' : 'text-green-400'
        }`}>
          {row.startingWeight === 0 ? 'Bodyweight' : `${row.startingWeight} lbs`}
        </span>
      )
    }
  ];

export const ProgramCreation = () => {

  // Group data by `groupBy` field
//   const groups = useMemo(() => {
//     const map = new Map();
//     for (const item of  WorkoutData) {
//       const key = item.workoutNumber ?? "Ungrouped";
//       if (!map.has(key)) map.set(key, []);
//       map.get(key).push(item);
//     }
//     return Array.from(map.entries()).map(([name, items]) => ({ name, items }));
//   }, [ WorkoutData]);

//   console.log(groups)

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="w-12 px-6 py-4" />
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-medium text-slate-300"
              >
                {col.label}
              </th>
            ))}
            {/* <th className="w-20 px-6 py-4" /> */}
          </tr>
        </thead>

<tbody>
  {WorkoutData.map((group) => (
    <React.Fragment key={group.workoutNumber}>
      {/* Group Header Row */}
      <tr className="bg-slate-800/30 border-b border-slate-800">
        <td colSpan={columns.length + 2} className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-medium text-base">
              Day {group.workoutNumber}
            </div>
          </div>
        </td>
      </tr>

      {/* Group Data Rows */}
      {group.data && group.data.length > 0 ? (
        group.data.map((row, i) => (
          <tr
            key={row.id ?? i}
            className="odd:bg-slate-800/0 even:bg-slate-800/10 hover:bg-slate-800/40 transition"
          >
            {/* collapse/expand spacer column */}
            <td className="px-3 py-2" />

            {/* dynamic columns */}
            {columns.map((col) => (
              <td
                key={col.key}
                className="px-3 py-3 align-top text-slate-200"
              >
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length + 2}
            className="px-6 py-3 text-slate-400 text-sm text-center"
          >
            No exercises for this day
          </td>
        </tr>
      )}

      {/* Add Exercise Button Row */}
      <tr>
        <td onClick={() => console.log("Row clicked...")} colSpan={columns.length + 2} className="p-2 text-center bg-indigo-500/35 border border-indigo-500  items-center w-full cursor-pointer">
            <div className='flex justify-center items-center gap-2 text-white'>
                <PlusIcon className='h-5 w-5' /> <span>Add Exercise</span>
            </div>
            
          {/* <button
            // onClick={() => handleAddExercise(group.workoutNumber)}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition"
          >
            + Add Exercise
          </button> */}
        </td>
      </tr>
    </React.Fragment>
  ))}
</tbody>


      </table>
    </div>
  )
}
