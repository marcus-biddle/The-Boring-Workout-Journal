import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home.Page.tsx';
import { Programs } from './pages/Programs.Page.tsx';
import { ProgramOverview } from './pages/ProgramOverview.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { ProtectedRoute } from './pages/ProtectedRoutes.tsx';
import { WorkoutProvider } from './hooks/workoutContext.tsx';
import { CreateProgramPage } from './pages/createProgramPage.tsx';
import { WorkoutLogPage } from './pages/WorkoutLogPage.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <WorkoutProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Programs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/programs">
              <Route index element={<Programs />} />
              <Route path=':pid/edit' element={<CreateProgramPage />} />
              <Route path=':pid' element={<ProgramOverview />} />
              <Route path=':pid/workouts/:workoutId' element={<WorkoutLogPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </WorkoutProvider>
  </BrowserRouter>,
)
