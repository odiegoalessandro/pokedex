import { Box, Flex, Heading, Grid, GridItem, Progress, Center, VStack, HStack, Text } from "@chakra-ui/react"
import { GetStaticPaths, GetStaticProps } from "next"
import NextLink from "next/link"
import pokeapi from "../../services/pokeapi"
import Image from "next/image"

function textTransform(text: string){
  return text.replace("-", " ")
}

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
       <Grid 
        mt={100}
        w="full"
        h="full"
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={5}
      >
          <GridItem 
            colSpan={1}
            rowSpan={2}
            bgColor="gray.700"
            px={7}
          >
            <VStack spacing={5} align="left">

              <Image src={pokemon.image} width={250} height={250} />
              <Heading fontSize="lg">name: {pokemon.name}</Heading>
              <Heading fontSize="lg">weight: {pokemon.weight}</Heading>
              <Heading fontSize="lg">height: {pokemon.height}</Heading>
              <Heading fontSize="md">types:</Heading>
              <HStack mt={2}>
                {
                  pokemon.types.map(type => (
                    <Box className={`container ${type.type.name}`}>
                      <Text as="span">
                        {type.type.name}
                      </Text>
                    </Box>
                  ))
                }
              </HStack>
            </VStack>
          
          </GridItem>
          <GridItem
            colSpan={3}
            rowSpan={2}
            py={5}
            bgColor="gray.700"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            <Heading fontSize="xl" p={8}>
              Status
            </Heading>
            <VStack mb={10}>
              {
                pokemon.stats.map(status => {
                  const calc = status.base_stat * 100 / 255
                  return (
                    <>
                      <Text 
                        px={8}
                        alignSelf="flex-start"
                        textTransform="capitalize"
                      >
                        {textTransform(status.stat.name)}
                      </Text>
                      <Progress value={calc} w="91%" title={`${status.base_stat}/255`} />
                    </>
                  )
                })
              }
            </VStack>
          </GridItem>
       </Grid>
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
