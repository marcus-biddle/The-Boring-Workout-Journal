import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import type { User, Program, Workout, ProgressRecord } from '../types';

const USER_STORAGE_KEY = 'workoutAppUser';
const PROGRAMS_STORAGE_KEY = 'workoutAppPrograms';
const WORKOUTS_STORAGE_KEY = 'workoutAppWorkouts';
const PROGRESS_STORAGE_KEY = 'workoutAppProgress';

const mockUser: User = {
  id: "user123",
  name: "Sample User",
  email: "user@example.com",
};

// Utility to safely load JSON from localStorage or fallback to default
function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored) as T;
    } catch {}
  }
  return defaultValue;
}

type WorkoutContextType = {
  user: User | null;
  programs: Program[];
  workouts: Workout[];
  progressRecords: ProgressRecord[];
  setUser: (user: User | null) => void;
  addProgram: (program: Program) => void;
  addWorkout: (workout: Workout) => void;
  addProgressRecord: (record: ProgressRecord) => void;
};

const WorkoutContext = createContext<WorkoutContextType>({
  user: null,
  programs: [],
  workouts: [],
  progressRecords: [],
  setUser: () => {},
  addProgram: () => {},
  addWorkout: () => {},
  addProgressRecord: () => {},
});

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => loadFromLocalStorage<User | null>(USER_STORAGE_KEY, mockUser));
  const [programs, setPrograms] = useState<Program[]>(() => loadFromLocalStorage(PROGRAMS_STORAGE_KEY, []));
  const [workouts, setWorkouts] = useState<Workout[]>(() => loadFromLocalStorage(WORKOUTS_STORAGE_KEY, []));
  const [progressRecords, setProgressRecords] = useState<ProgressRecord[]>(() => loadFromLocalStorage(PROGRESS_STORAGE_KEY, []));

  const setAndPersistUser = useCallback((newUser: User | null) => {
    if (newUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
    setUser(newUser);
  }, []);

  const addProgram = useCallback((program: Program) => {
    setPrograms((prev) => {
      const updated = [...prev, program];
      localStorage.setItem(PROGRAMS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addWorkout = useCallback((workout: Workout) => {
    setWorkouts((prev) => {
      const updated = [...prev, workout];
      localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addProgressRecord = useCallback((record: ProgressRecord) => {
    setProgressRecords((prev) => {
      const index = prev.findIndex(r => r.exerciseName === record.exerciseName && r.weekStart === record.weekStart);
      const updated = index >= 0 ? [...prev] : [...prev, record];
      if (index >= 0) updated[index] = record;
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const contextValue = useMemo(() => ({
    user,
    programs,
    workouts,
    progressRecords,
    setUser: setAndPersistUser,
    addProgram,
    addWorkout,
    addProgressRecord,
  }), [user, programs, workouts, progressRecords, setAndPersistUser, addProgram, addWorkout, addProgressRecord]);

  return (
    <WorkoutContext.Provider value={contextValue}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);