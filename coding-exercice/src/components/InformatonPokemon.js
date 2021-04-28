import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button' ;

import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

function InformatonPokemon(props) {


  const GET_POKEMON_INFO = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}, pokemon_v2_abilities: {}}}, order_by: {id: asc}) {
      name
      id
  }
  }
  `

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  


  
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              More Information at Pokemon
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="container">
      {data.gen3_species.map((pokemon, index) => (
          <div key={index} className="card">
            <div class="card-body">
              <h3>{pokemon.name}</h3>
            </div>
          </div>
        ))}
    </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }   



export default InformatonPokemon
