import type { BlockSet, ExerciseDbAPI } from "../types";

export const WorkoutsTable = ({ blocksets }: { blocksets: BlockSet[] }) => {
  console.log('Table workouts', blocksets)
  return (
    <div className="space-y-8">
      {blocksets.map((block, index) => (
        <div key={block.blockId} className="rounded-lg border border-slate-700 bg-slate-900/50">
          <h2 className="px-6 py-3 text-lg font-semibold text-slate-100">
            Workout {index +1}
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-slate-200">
                <th className="px-6 py-3 text-left">Exercise</th>
                <th className="px-6 py-3 text-left">Sets</th>
                <th className="px-6 py-3 text-left">Reps</th>
                <th className="px-6 py-3 text-left">Starting Weight</th>
              </tr>
            </thead>
            <tbody>
              {block.data.map((row, idx) => (
                <tr key={idx} className="border-t border-slate-700">
                  <td className="px-6 py-4 text-slate-100">
                    {typeof row.exercise === "string" ? (
                      row.exercise
                    ) : (
                      <div className="flex items-center gap-3">
                        <img
                          src={row.exercise.gifUrl}
                          alt={row.exercise.name}
                          className="w-12 h-12 rounded-md"
                        />
                        <span>{row.exercise.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-100">{row.sets}</td>
                  <td className="px-6 py-4 text-slate-100">{row.reps}</td>
                  <td className="px-6 py-4 text-slate-100">{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
