import type { ExerciseDbAPI } from "./exercisedbApi";

// User account information
export interface User {
  id: string;
  name: string;
  email: string;
}

// Represents a full workout program (template/split)
export interface Program {
  id: string;
  userId: string;
  name: string;
  description?: string;
  days: DaySchedule[];
}

// Describes all planned workouts/exercises for a single day in a program
export interface DaySchedule {
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  exercises: ExercisePlan[];
}

// Template for a planned exercise within a program
export interface ExercisePlan {
  id: string;
  exerciseInfo: ExerciseDbAPI;
  sets: number;
  targetReps: number;
  targetWeight: number;
}

// Instance of a workout (when the user logs a session)
export interface Workout {
  id: string;
  userId: string;
  programId: string;
  date: string; // ISO string for consistency
  status: 'not started' | 'in progress' | 'completed';
  exercises: WorkoutExercise[] | [];
}

// An exercise entry logged during a workout session
export interface WorkoutExercise {
  id: string;
  exercisePlanId: string;
  exerciseInfo: ExerciseDbAPI;
  goalSets: number;
  goalWeight: number;
  goalReps: number;
  log: SetLog[];
}

// Each set performed in a workout, with results
export interface SetLog {
  setNumber: number;
  completedReps: number;
  completedWeight: number;
  status: 'not started' | 'in progress' | 'completed';
}

// NEW: Weekly progression stats for an exercise
export interface ProgressRecord {
  exerciseName: string;
  weekStart: string;    // ISO date string for the week's starting Monday
  maxWeight: number;    // Max weight achieved in any set this week
  maxReps: number;      // Max reps in any set this week
  totalVolume: number;  // Sum of (weight × reps) for all sets this week
  workouts: Workout[];  // Optionally, all logs that contribute to this week's stat
}


// export type BlockItem = {
//   exerciseId: string;
//   exercise: ExerciseDbAPI;
//   sets: number;
//   reps: number;
//   weight: number;
//   isCompleted: boolean;
//   completionDate: Date | null
// };

// export type BlockSet = {
//   blockId: string;
//   blockStartTimestamp: Date;
//   completedTimestamp: Date | null;
//   isCompleted: boolean;
//   itemsCompleted: number;
//   data: BlockItem[]; //change data to something relevant
//   notes?: string;
// };

// export interface UserData {
//   userId: string;
// //   currentProgramId: string;
// //   currentBlockId: string;
//   isLoggedIn: boolean;
//   programs: Program[] | null;
// };

// export interface Program {
//   id: string;
//   name: string;
//   blockSets: BlockSet[];
//   blockSetsCompleted: number;
//   sharedCount: number;
//   isCompleted: boolean;
//   isActive: boolean;
//   completionProgress: number;

//   lastUpdated: Date;
//   lastAccessed?: Date;
//   created_at: Date;
//   startTimestamp: Date;
//   completionTimestamp: Date | null;

//   description?: string;
//   createdBy?: string;
//   tags?: string[];
//   durationWeeks?: number;
//   difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
//   goal?: string;
  
//   isPublic?: boolean;
//   notes?: string;
// } 