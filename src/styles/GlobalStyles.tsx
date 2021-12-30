import React from "react"
import Head from "next/head"
import { css, Global } from "@emotion/react"
import { CSSReset } from "@chakra-ui/css-reset"

const GlobalStyles: React.FC = ({ children }) => {
  return(
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global styles={css`
        html {
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        .container{
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 5px;
          height: 30px;
          position: relative;
          &::before{
            content: "";
            width: 100%;
            height: 50%;
            top: 0;
            border-radius: 5px 5px 0 0;
            left: 0;
            position: absolute;
          }
          &::after{
            content: "";
            width: 100%;
            height: 50%;
            border-radius: 0 0 5px 5px;
            bottom: 0;
            left: 0;
            position: absolute;
          }
          span {
            color: #fff;
            z-index: 1;
            position: absolute;
            font-weight: bold;
            line-height: 28px; 
          }
          &.fire {
            background: #FD7D24;
          }
          &.normal{
            background: #A4ACAF;
          }
          &.water{
            background: #4592C4;
          }
          &.grass{
            background: #9BCC50;
          }
          &.flying{
            &::before{
              background: #3DC7EF;
            }
            &::after{
              background: #BDB9B8;
            }
          }
          &.fighting{
            background: #D56723;
          }
          &.poison{
            background: #B97FC9;
          }
          &.eletric{
            background: #EED535;
          }
          &.ground{
            &::before{
              background: #F7DE3F;
            } 
            &::after{
              background: #AB9842;
            }
          }
          &.rock{
            background: #A38C21; 
          }
          &.psichic{
            background: #F366B9;
          }
          &.ice{
            background: #51C4E7;
          }
          &.bug{
            background: #729F3F;
          }
          &.ghost{
            background: #7B62A3;
          }
          &.steel{
            background: #9EB7B8;
          }
          &.dragon{
            &::before{
              background: #53A4CF;
            }
            &::after{
              background: #F16E57;
            }
          }
          &.dark{
            background: #707070;
          }
          &.fairy{
            background: #FDB9E9;
          }
        }
      `}/>
      {children}
    </>
  )
}

export default GlobalStyles