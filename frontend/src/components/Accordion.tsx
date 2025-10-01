import React, { useState, useRef, useEffect } from 'react';
import type { BlockItem } from '../types';
import { CustomInput } from './Input';

type AccordionProps = {
  items: BlockItem[];
  allowMultiple?: boolean;
};

export const Accordion = ({ items, allowMultiple = false }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const [heights, setHeights] = useState<Record<number, number>>({});
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Calculate heights for smooth animations
  useEffect(() => {
    const newHeights: Record<number, number> = {};
    items.forEach((item, i) => {
      const element = contentRefs.current[i];
      if (element) {
        newHeights[i] = element.scrollHeight;
      }
    });
    setHeights(newHeights);
  }, [items]);

  const toggle = (id: number) => {
    if (allowMultiple) {
      setOpenIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } else {
      setOpenIds(prev => prev.has(id) ? new Set() : new Set([id]));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, id: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-slate-800 border border-slate-600 rounded-lg shadow-sm overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIds.has(i);
        const contentHeight = heights[i] || 0;
        
        return (
          <div key={item.exerciseId} className="border-b border-slate-800 last:border-b-0">
            <button
              onClick={() => toggle(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="flex justify-between items-center w-full px-6 py-4 text-left text-gray-900 font-medium bg-slate-800 focus:outline-none focus:bg-slate-700 focus:ring-2 focus:ring-inset focus:ring-slate-700 transition-colors duration-200"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${i}`}
            >
                <div className='flex flex-col'>
                    <span className='capitalize text-lg text-white'>{item.exercise.name}</span>
                    <span className=' text-gray-400 indent-8'>{item.weight} lbs <span className='text-2xl'>|</span> {item.sets} sets <span className='text-2xl'>|</span> {item.reps} reps</span>
                </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div
              id={`accordion-content-${i}`}
              role="region"
              aria-labelledby={`accordion-button-${i}`}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height: isOpen ? `${contentHeight}px` : '0px',
              }}
            >
              <div
                ref={el => { contentRefs.current[i] = el; }}
                className="px-6 py-4 text-gray-700 text-sm leading-relaxed flex gap-6"
              >
                <CustomInput />
                <div className='flex items-end justify-center'>
                    <button className='bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'>
                    Confirm
                    </button>
                </div>
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};