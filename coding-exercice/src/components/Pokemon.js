import React, { useState,useRef, useCallback } from 'react'
import ListPokemon from '../components/ListPokemon'
import InformatonPokemon from '../components/InformatonPokemon';

function Pokemon() {

  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [modalShow, setModalShow] = React.useState(false);

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

        <div data-testid="pokemon1" className="App">
            
      <div className="container">
      <div className="row">
      <div className="col-md-6">
      <h1>List Pokemons</h1>
      <input type="text" className="form-control" value={query} onChange={handleSearch}></input>
      <ul className="list-group">
      {pokemons.map((pokemon, index) => {
        if (pokemons.length === index + 1) {
          return <li className="list-group-item mt-4" name="name"  ref={lastPokemonElementRef} key={pokemon}>{pokemon}
          <div className="d-flex">
          <button type="button" variant="primary"   onClick={() => setModalShow(true)}  className="btn btn-success btn-lg ml-auto">More Information</button></div>
          <InformatonPokemon 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
          </li>
        } else {
          return <li className="list-group-item mt-4" key={pokemon}>{pokemon}
          <div className="d-flex">
          <button type="button" variant="primary" onClick={() => setModalShow(true)}  className="btn btn-success btn-lg ml-auto">More Information</button></div>
          <InformatonPokemon 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
    )
}

export default Pokemon
