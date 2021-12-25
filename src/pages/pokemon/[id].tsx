import { GetStaticPaths, GetStaticProps } from "next"
import pokeapi from "../../services/pokeapi"

export default function Id({ data }){

  return (
    <></>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await pokeapi.get(`pokemon/${params.id}`)
  return {
    props: {
      data
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