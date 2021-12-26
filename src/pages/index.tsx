import axios from "axios"
import { FormEvent, useState } from "react"
import { GetServerSideProps } from "next"
import pokeapi from "../services/pokeapi"
import PokemonItem from "../components/pokemon_item"
import { 
  Flex,
  Button,
  SimpleGrid,
  Box,
  Input,
  FormControl,
}  from "@chakra-ui/react"
import toast, { Toaster } from "react-hot-toast"

export default function Home({ pokemons, next }) {
  const [pokeinfo, setPokeinfo] = useState([...pokemons])
  const [nextPage, setNextPage] = useState(next)
  const [searchBar, setSearchBar] = useState("")

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

  async function handleSubmit(event: FormEvent){
    event.preventDefault()

    if(!searchBar){
      toast.error("Please send all required values")

      return 
    }


    setTimeout(async () => {
      try{
        const { data } = await pokeapi.get(`pokemon/${searchBar}`)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(data.id).padStart(3, "00")}.png`    
        const info = {
          ...data,
          image
        }
    
        setPokeinfo([info])
      }
      catch(error){
        toast.error("Pokemon not found")
        console.error(error)
      }
    }, 1000)

    setSearchBar("")
  }

  return (
    <>
      <Flex 
        flexDir="column"
        justify="center"
        align="center"
        pb={4}
      >
        <Box 
          as="nav"
          bgColor="red"
          w="100vw"
          h="60px"
          px={10}
          pos="fixed"
          inset="0"
          zIndex="10"
        >
          <FormControl
            w="full"
            h="full"
            as="form"
            display="flex"
            alignItems="center"
            justifyContent="right"
            onSubmit={handleSubmit}
          >
            <Input 
              w="md"
              type="text"
              color="black"
              value={searchBar}
              onChange={(event) => setSearchBar(String(event.target.value).toLowerCase().trim())}
              align="right"
              bgColor="white"
              _placeholder={{
                color: "#00000050"
              }}
              placeholder="Pesquise por nomes ou numeros"
            />
          </FormControl>
        </Box>
        <SimpleGrid
          gap={5}
          mt={70}
          minH="100vh"
          templateColumns={{
            base: "repeat(1, 1frs)", 
            sm: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)"
          }} 
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
      <Toaster position="bottom-right" />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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