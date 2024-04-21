import React from 'react'
import style from "./Loading.module.css"
import { ColorRing } from 'react-loader-spinner'
import imgLoader from "../../assets/image/IMDB_Logo_2016.svg.png"

export default function Loading() {
  return (
  <>
  
  <div className={`d-flex justify-content-center align-items-center vh-100 position-fixed top-0 start-0 end-0 bottom-0 ${style.loaderWrapper}`}>
  <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
      <figure className='text-center'>
        <img src={imgLoader}  alt="" style={{ width: '80px', height: 'auto' }} />
      </figure>
    </div>
  
  </>
  )
}
