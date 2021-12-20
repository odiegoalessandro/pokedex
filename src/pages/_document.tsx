import Document, { Html, Head, Main, NextScript } from "next/document"
import { ColorModeScript } from "@chakra-ui/react"
import React from "react"
import theme from "../lib/chakra-theme"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <>
        <Html lang="pt-BR">
          <Head>
            <link rel="icon" type="image/ico" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
          </Head>
          <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    )
  }
}

export default MyDocument
