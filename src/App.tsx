import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CustomerList from './components/lists/CustomerList';
import TrainingList from './components/lists/TrainingList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/functions/Navigation";
import { Navigate } from "react-router-dom";
import Calendar from './components/calendar/Calendar';
import Statistics from './components/chart/Statistics';
import { fetchTrainings } from './components/apis/trainingAPI';
import type { Training } from './components/types';

function App() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetchTrainings()
      .then((response) => setTrainings(response._embedded.trainings))
      .catch((error) => console.error('Error fetching trainings:', error));
  }, []);

  return (
    <BrowserRouter>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>

          <Navigation />  

          <Typography variant="h6" sx={{ ml: 1 }}>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/customers" />} /> {/* default route */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/statistics" element={<Statistics data={trainings} yKey="duration" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}
export default App;