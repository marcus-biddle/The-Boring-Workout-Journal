interface CustomInputProps {

}

export const CustomInput = ({

}: CustomInputProps) => {
  return (
    <div className=''>
      <label htmlFor="price" className="block text-sm/6 font-medium text-gray-500">
        Manually Enter Data
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white dark:bg-white/5 outline-1 outline-gray-300 dark:outline-gray-600">
      <input
        id="price"
        name="price"
        type="text"
        placeholder="weight"
        className="block w-24 py-1.5 px-2 text-base text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 border-x-0 rounded-none focus:outline-none"
      />
      <div className="px-3 py-1.5 text-base text-gray-500 bg-slate-900/90 dark:text-gray-400 border-0 rounded-r-none border-r-2 focus:outline-none">Lbs</div>
      <input
        id="price"
        name="price"
        type="text"
        placeholder="0.00"
        className="block w-24 py-1.5 px-2 text-base text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 border-x-0 rounded-none focus:outline-none"
      />
      <div className="px-3 py-1.5 text-base text-gray-500 bg-slate-900/90 dark:text-gray-400 border-0 rounded-r-none border-r-2 focus:outline-none">Sets</div>

      {/* Price input */}
      <input
        id="price"
        name="price"
        type="text"
        placeholder="0.00"
        className="block w-24 py-1.5 px-2 text-base text-gray-900 placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 border-x-0 rounded-none focus:outline-none"
      />
      <div className="px-3 py-1.5 text-base text-gray-500 bg-slate-900/90 rounded-r-md dark:text-gray-400 border-0 focus:outline-none">Reps</div>

      {/* Currency select */}
      {/* <select
        id="currency"
        name="currency"
        className="px-3 py-1.5 text-base text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-0 rounded-r-md focus:outline-none"
        aria-label="Currency"
      >
        <option>USD</option>
        <option>CAD</option>
        <option>EUR</option>
      </select> */}
    </div>
      </div>
    </div>
  )
}