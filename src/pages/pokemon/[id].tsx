import { Box, Flex, Heading } from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import NextLink from "next/link"
import pokeapi from "../../services/pokeapi"

export default function Id({ pokemon }){
  console.log(pokemon)

  return (
    <Flex>
      <Box 
        as="nav" 
        bgColor="red" 
        w="100vw" 
        h="60px"
        pos="fixed"
        inset="0"
        display="flex"
        alignItems="center"
        px={10}
      >
        <NextLink href="/">
          <Heading cursor="pointer" fontSize="xl">
            Pokemon
          </Heading>
        </NextLink>
      </Box>
      
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await pokeapi.get(`pokemon/${params.id}`)
  const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${String(data.id).padStart(3, "00")}.png`
  const info = {
    ...data, 
    image
  }

  return {
    props: {
      pokemon: info
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeapi.get(`pokemon`)
  const paths = []
  for(let i = 1; data.count > i; i++){
    paths.push(`/pokemon/${i}`)
  }

  return {
    paths,
    fallback: false
  }
}