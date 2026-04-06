import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{ flex: 1 }}>
        <CustomerList />
      </div>

      <CssBaseline />
    </div>
  );
}

export default App
