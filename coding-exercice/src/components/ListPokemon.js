import {useState,useEffect} from 'react';
import axios from 'axios'

 function ListPokemon(query, pageNumber) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [pokemons, setPokemons] = useState([])
    const [hasMore, setHasMore] = useState(false)
    useEffect(() => {
        setPokemons([])
      }, [query])
    
        useEffect(() => {
            setLoading(true)
            setError(false)
            let cancel
            axios({
              method: 'GET',
              url: 'https://pokeapi.co/api/v2/pokemon',
              params: { q: query, page: pageNumber },
              cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
              setPokemons(prevPokemons => {
                return [...new Set([...prevPokemons, ...res.data.results.map(p => p.name)])]
              })
              setHasMore(res.data.results.length > 0)
              setLoading(false)
            }).catch(e => {
              if (axios.isCancel(e)) return
              setError(true)
            })
            return () => cancel()
          }, [query, pageNumber])
        
          return { loading, error, pokemons, hasMore }
}

export default ListPokemon

