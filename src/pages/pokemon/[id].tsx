import { GetStaticPaths, GetStaticProps } from "next"
import pokeapi from "../../services/pokeapi"

export default function Id({ data }){
  console.log(data)

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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking"
  }
}