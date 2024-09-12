import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [pokemonName, setPokemonName] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState(null); // State untuk hasil pencarian
  const [errorMessage, setErrorMessage] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // State untuk filter tipe

  useEffect(() => {
    fetchPokemonList();
    fetchPokemonTypes();
  }, []);

  // Fetch daftar Pokemon default
  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(nextPage);
      setPokemonList(prevList => [...prevList, ...response.data.results]);
      setNextPage(response.data.next);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch tipe-tipe Pokemon dari API
  const fetchPokemonTypes = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  // Fungsi untuk mencari Pokémon berdasarkan nama
  const searchPokemon = async () => {
    if (pokemonName.trim() === '') {
      setErrorMessage('Please enter a Pokémon name.');
      setSearchedPokemon(null);
      return;
    }
    
    setErrorMessage('');
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setSearchedPokemon(response.data); // Simpan hasil pencarian
    } catch (error) {
      setErrorMessage('Pokémon not found');
      setSearchedPokemon(null); // Set to null if not found
    }
  };

  // Fungsi untuk memfilter Pokemon berdasarkan tipe
  const filterPokemonByType = async (type) => {
    if (type === '') {
      setSelectedType('');
      setSearchedPokemon(null);
      return;
    }

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const filteredPokemon = response.data.pokemon.map(p => p.pokemon);
      setPokemonList(filteredPokemon);
      setSearchedPokemon(null);
      setSelectedType(type);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Pokemon List
      </Typography>

      {/* Grid untuk Input dan Tombol Search */}
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={9}>
          <TextField
            fullWidth
            label="Search Pokémon by Name"
            variant="outlined"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            InputProps={{
              style: { height: '56px' } // Mengatur tinggi input menggunakan InputProps
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={searchPokemon}
            style={{ height: '56px' }}  // Menggunakan style untuk tinggi button
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Filter berdasarkan tipe */}
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={selectedType}
          label="Filter by Type"
          onChange={(e) => filterPokemonByType(e.target.value)}
        >
          <MenuItem value="">All Types</MenuItem>
          {types.map((type, index) => (
            <MenuItem key={index} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tampilkan pesan error jika pencarian gagal */}
      {errorMessage && (
        <Typography variant="body1" align="center" color="error" sx={{ marginBottom: '20px' }}>
          {errorMessage}
        </Typography>
      )}

      {/* Tampilkan hasil pencarian */}
      {searchedPokemon && (
        <Card sx={{ marginBottom: '20px' }}>
          <CardMedia
            component="img"
            height="250"
            image={searchedPokemon.sprites.other['official-artwork'].front_default || 'https://via.placeholder.com/250?text=No+Image'}
            alt={searchedPokemon.name}
            sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }} // Gambar proporsional
          />
          <CardContent>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
              {searchedPokemon.name}
            </Typography>
            <Typography variant="body1" align="center">
              Height: {searchedPokemon.height}
            </Typography>
            <Typography variant="body1" align="center">
              Weight: {searchedPokemon.weight}
            </Typography>
            <Button
              component={Link}
              to={`/pokemon/${searchedPokemon.name}`}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Jika tidak sedang melakukan pencarian, tampilkan daftar Pokemon atau hasil filter */}
      {!searchedPokemon && (
        <Grid container spacing={3}>
          {pokemonList.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
                  alt={pokemon.name}
                  sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }} // Gambar proporsional
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      color: '#3f51b5',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {pokemon.name}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/pokemon/${pokemon.name}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Load More Button untuk daftar Pokemon */}
      {!searchedPokemon && selectedType === '' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={fetchPokemonList} variant="contained" color="primary">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
