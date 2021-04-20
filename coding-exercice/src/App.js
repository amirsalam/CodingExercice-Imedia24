import React, { useState, useRef, useCallback } from 'react'
import './App.css';
import ListPokemon from './components/ListPokemon'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
 
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    pokemons,
    hasMore,
    loading,
    error
  } = ListPokemon(query, pageNumber)

  const observer = useRef()

  const lastPokemonElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <div className="App">
      <div className="container">
      <div className="row">
      <div className="col-md-6">
      <h1>List Pokemons</h1>
      <input type="text" className="form-control" value={query} onChange={handleSearch}></input>
      <ul className="list-group">
      {pokemons.map((pokemon, index) => {
        if (pokemons.length === index + 1) {
          return <li className="list-group-item"  ref={lastPokemonElementRef} key={pokemon}>{pokemon}
          <button type="button" className="btn btn-success btn-lg d-flex">More Information</button>
          </li>
        } else {
          return <li className="list-group-item" key={pokemon}>{pokemon}
          <button type="button"  className="btn btn-success btn-lg d-flex">More Information</button>
          </li>
        }
      })}
      </ul>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default App;
