import { Center, Text, LinkOverlay, LinkBox, Flex } from "@chakra-ui/react"
import Image from "next/image"

function titleTransform(title: string){
  return title.replace("-", " ")
}

export default function PokemonItem({ pokemon }){
  return (
    <LinkBox textAlign="left">
      <Flex align="left" flexDir="column">
        <Image src={pokemon.image} width={180} height={180} />
        <Text as="span" opacity="0.5">
          Nº{String(pokemon.id).padStart(3, "00")}
        </Text>
        <LinkOverlay 
          href={`pokemon/${pokemon.id}`}
          textTransform="capitalize"
          size="lg"
        >
          {titleTransform(String(pokemon.name))}
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}