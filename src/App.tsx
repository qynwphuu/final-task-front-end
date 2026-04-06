import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
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

      <Container maxWidth={false} disableGutters sx={{ height: "calc(100vh - 64px)", display: "flex", flexDirection: "column" }}>
        <CustomerList />
      </Container>
    </>
  );
}

export default App;
