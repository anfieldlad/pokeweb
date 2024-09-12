// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import { Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      {/* Navbar menggunakan Material-UI */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PokeWeb
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
        </Toolbar>
      </AppBar>

      {/* Main container untuk konten halaman */}
      <Container sx={{ marginTop: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pokemon/:pokemonName" element={<DetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'primary.main', p: 2, mt: 4, textAlign: 'center', color: 'white' }}>
        <Typography variant="body2">
          by: Bobby Ananta Dioriza feat. ChatGPT
        </Typography>
      </Box>
    </Router>
  );
}

export default App;
