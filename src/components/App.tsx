import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import CustomerList from './CustomerList';

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <CustomerList />
      <CssBaseline />
    </Container>
  )
}

export default App
