import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home.Page.tsx';
import { Programs } from './pages/Programs.Page.tsx';
import { ProgramCreation } from './pages/ProgramCreation.Page.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/programs">
          <Route index element={<Programs />} />
          <Route path=':pid/edit' element={<ProgramCreation />} />
        </Route>
      </Route>
      
    </Routes>
  </BrowserRouter>,
)
