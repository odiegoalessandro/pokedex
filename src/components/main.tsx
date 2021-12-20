import Head from "next/head"
import { Box, Container } from "@chakra-ui/react"
import { ReactNode } from "react"

interface MainProps {
  children: ReactNode
}

function Main({ children }: MainProps){
  return (
    <Box as="main">
      <Head>
        <meta name="description" content="Pokedex feita em next.js" />
        <meta name="author" content="Diego alessandro da cruz martins" />
        <meta property="og:site_name" content="pokedex" />
        <meta property="og:type" content="website" />
        <title>Pokedex</title>
      </Head>
      <Container maxW="container.lg">
        {children}
      </Container>
    </Box>
  )
}

export default Main
