import { Box, Container, Heading } from "@chakra-ui/react"
import axios from "axios"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import pokeapi from "../services/pokeapi"

export default function Home({ pokemons }) {
  const [pokeinfo, setPokeinfo] = useState([])
  
  useEffect(() => {
    pokemons.map(pokemon => {
      axios.get(pokemon.url).then(({ data }: any) => {
        const info = {
          name: data.name,
          id: data.order,
          sprite: data.sprites.front_default,
          types: data.types.map(type => type.type.name)
        }

        setPokeinfo(prev => [...prev, info])
      })
      
    })
  }, [])
  
  const smallerToLarger = pokeinfo.sort((a, b) => a.id - b.id)
  const largerToSmaller = smallerToLarger.reverse()

  return (
    <Box>
      
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await pokeapi.get("/pokemon")

  return {
    props: {
      pokemons: data.results
    }
  }
}