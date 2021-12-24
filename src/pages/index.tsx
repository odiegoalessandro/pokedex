import axios from "axios"
import { useState } from "react"
import { GetServerSideProps } from "next"
import { Flex, Button, SimpleGrid, Box }  from "@chakra-ui/react"
import pokeapi from "../services/pokeapi"
import PokemonItem from "../components/pokemon_item"

export default function Home({ pokemons, next }) {
  const [pokeinfo, setPokeinfo] = useState([...pokemons])
  const [nextPage, setNextPage] = useState(next)
  const [order, setOrder] = useState("smallerToLargest")

  async function loadMore(){
    if(nextPage){
      const { data } = await axios.get(nextPage)
      const newPokemons = data.results.map((pokemon, index) => {
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(index + 1 + pokeinfo.length).padStart(3, "00")}.png`
        
        return {
          id: index + 1 + pokeinfo.length,
          image,
          name: pokemon.name
        }
      })
  
      setNextPage(data.next)
      setPokeinfo(prev => [...prev, ...newPokemons])
    }
  }

  return (
    <Flex 
      flexDir="column"
      justify="center"
      align="center"
      pb={4}
    >
      <Box 
        as="nav"
        bgColor="trasparent"
        w="100vw"
        h="50px"
        pos="fixed"
        inset="0"
        zIndex="10"
      >
      </Box>
      <SimpleGrid
        gap={5}
        templateColumns={{
          base: "repeat(1, 1frs)", 
          sm: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)"
        }} 
        minH="100vh"
      >
        {pokeinfo.sort((a, b) => a.id - b.id).map(
          pokemon => <PokemonItem pokemon={pokemon} key={pokemon.id} />
        )}
      </SimpleGrid>
      <Button
        mt={5} 
        bgColor="#30A7D7"
        w="10rem"
        onClick={() => loadMore()}
      >
        more
      </Button>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await pokeapi.get("/pokemon", {params: {limit: 12}})
  const pokemons = data.results.map((pokemon, index) => {
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(index + 1).padStart(3, "00")}.png`

    return {
      name: pokemon.name,
      image,
      id: index + 1
    }
  })

  return {
    props: {
      pokemons,
      next: data.next
    }
  }
}