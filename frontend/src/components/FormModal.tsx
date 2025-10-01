import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import type { additionalFields, Field } from '../types';

export interface FormModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  subtext?: string;
  fields: Field[];
  additionalFields?: additionalFields[];
  formId: string;
  confirmationButtonText: string;
  onSubmit: (data: Record<string, any>) => void;
}

export const FormModal = ({
  open,
  setOpen,
  title,
  subtext,
  fields,
  additionalFields,
  formId,
  confirmationButtonText,
  onSubmit,
}: FormModalProps) => {
const [formData, setFormData] = useState<Record<string, any>>({});
const [selected, setSelected] = useState(null);

const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const dropdownField = fields.find((field) => field.type === "dropdown");

  // Build the new submission object
  const submissionData = {
    ...formData,
    ...(dropdownField ? { [dropdownField.name]: selected } : {}),
  };

  // Pass updated data to onSubmit
  onSubmit(submissionData);

  // Reset state + close modal
  setFormData({});
  setOpen(false);
};


  if (!open) return null;

  console.log(selected)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
    <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
    />

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10"
        >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-green-500/10">
                <PencilSquareIcon aria-hidden="true" className="size-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 dark:text-white">
                    {title}
                </DialogTitle>
                <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subtext}
                    </p>
                </div>
                </div>
            </div>

            <form id={formId} onSubmit={handleSubmit} className='my-4'>
                <div className="space-y-4">
                    {additionalFields && additionalFields.map((field) => (
                        <div key={field.label}>
                            <label className="block text-slate-300 text-sm mb-1">
                                {field.label}
                            </label>
                            {field.component}
                        </div>
                    ))}
                    {fields.map((field) => (
                        <div key={field.name}>
                            <label className="block text-slate-300 text-sm mb-1">
                                {field.label}
                            </label>

                            {field.type === "dropdown" ? (
                                <Listbox value={selected} onChange={setSelected}>
                                    {/* <Label className="block text-sm/6 font-medium text-gray-900 dark:text-white">{field.label}</Label> */}
                                    <div className="relative mt-2">
                                        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800/50 dark:text-white dark:outline-white/10 dark:focus-visible:outline-indigo-500">
                                            <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                                                <span className="block truncate">{selected !== null ?  `Workout ${selected}` : 'Select'}</span>
                                            </span>
                                            <ChevronUpDownIcon
                                            aria-hidden="true"
                                            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4 dark:text-gray-400"
                                            />
                                        </ListboxButton>

                                        <ListboxOptions
                                        transition
                                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                                        >
                                            {field.options && field.options.map((option) => (
                                            <ListboxOption
                                            key={option.label}
                                            value={option.value}
                                            className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden dark:text-white dark:data-focus:bg-indigo-500"
                                            >
                                                <div className="flex items-center">
                                                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{option.label}</span>
                                                </div>

                                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white dark:text-indigo-400">
                                                    <CheckIcon aria-hidden="true" className="size-5" />
                                                </span>
                                            </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            ) : field.type === "textarea" ? (
                                <textarea
                                placeholder={field.placeholder || ""}
                                value={formData[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            ) : (
                                <input
                                type={field.type || "text"}
                                placeholder={field.placeholder || ""}
                                value={formData[field.name] || ""}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </form>

            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700/25">
                <button
                    type="submit"
                    form={formId}
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 sm:ml-3 sm:w-auto dark:bg-green-500 dark:shadow-none dark:hover:bg-green-400"
                >
                    {confirmationButtonText}
                </button>
                <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
                >
                    Cancel
                </button>
            </div>
        </DialogPanel>
        </div>
    </div>
    </Dialog>
  )
}