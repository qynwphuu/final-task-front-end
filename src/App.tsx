import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 2 }}>
        <CustomerList />
      </Box>
    </>
  );
}

export default App;