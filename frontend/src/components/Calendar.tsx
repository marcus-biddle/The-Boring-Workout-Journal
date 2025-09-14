import React, { useState } from 'react';

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 22)); // January 22, 2024
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  // Get calendar data
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date(2024, 0, 22); // Set today as Jan 22 for demo
  const selectedDate = new Date(2024, 0, 12); // Set selected date as Jan 12 for demo
  
  // Get first day of month and adjust for Monday start (0 = Monday, 6 = Sunday)
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust so Monday = 0
  
  // Get last day of month
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  // Get last day of previous month
  const lastDayPrevMonth = new Date(year, month, 0).getDate();
  
  // Create calendar grid
  const calendarDays = [];
  
  // Previous month's trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: lastDayPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
      date: new Date(year, month - 1, lastDayPrevMonth - i)
    });
  }
  
  // Current month days
  for (let day = 1; day <= lastDay; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false,
      date: new Date(year, month, day)
    });
  }
  
  // Next month's leading days
  const remainingCells = 42 - calendarDays.length; // 6 rows × 7 days = 42
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false,
      date: new Date(year, month + 1, day)
    });
  }
  
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(year, month + direction, 1));
  };
  
  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };
  
  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };
  
  return (
    <div className=" bg-slate-900 flex items-center justify-center p-1">
      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700 max-w-md w-full">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 text-xl font-bold"
          >
            ‹
          </button>
          
          <h2 className="text-white text-lg font-semibold">
            {months[month]}
          </h2>
          
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-400 text-xl font-bold"
          >
            ›
          </button>
        </div>
        
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-slate-400 text-sm font-medium text-center py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.slice(0, 42).map((dayObj, index) => {
            const { day, isCurrentMonth, date } = dayObj;
            const todayFlag = isToday(date);
            const selectedFlag = isSelected(date);
            
            return (
              <button
                key={index}
                className={`
                  h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-700
                  ${!isCurrentMonth 
                    ? 'text-slate-500' 
                    : todayFlag 
                      ? 'bg-white text-slate-900 hover:bg-slate-100' 
                      : selectedFlag
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'text-slate-200 hover:text-white'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};