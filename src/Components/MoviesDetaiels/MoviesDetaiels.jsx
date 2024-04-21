import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';

export default function MoviesDetaiels() {

  const [loading , setLoading] = useState(false)

 
    let { id } = useParams()
    console.log(id);
  
    const [details, setDetails] = useState(null)
  
    async function fetchMovieDetails() {
      try {
        setLoading(true)
        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        console.log(data);
        setDetails(data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }


    useEffect(() => {
 
      fetchMovieDetails()
    }, [id])




let navigate = useNavigate()


function goToHome () {
navigate ("/Popular")
}

function goToImdb() {
  window.open("https://www.imdb.com/chart/top/", "_blank");
}



if (loading ) return <Loading/>
  
    return (
      <div>
      
        <h2 className='text-danger fw-bolder my-3 ' > Movie Details  </h2>
     <div className="container">
     {details && (
          <div>
            <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} className='w-100 position-relative ' alt={details.title} />
            <div className='position-absolute top-50 ham '>
              <img src= {`https://image.tmdb.org/t/p/original${details.poster_path}`} className='w-25 poster-image '   alt="" />
            </div>
         <div className=' position-absolute top-100 text-white moviesCard text-center start-50 '>
         <h3 className=' fw-bolder fs-1 '>{details.title}</h3>
         <div className=" detailes ">
         <p className=" fw-bolder fs-3 " >{Math.round(details.vote_average * 10) / 10}{" "}<i style={{ color: "yellow" }} className="fa-solid fa-star"></i></p>
         <p className='fw-bolder fs-5'>({details.vote_count}) Votes </p>
        <p className='fw-bolder fs-5 my-2'> Release date :  { details.release_date  }   </p>
         </div>
            
         </div>
         <div className='position-absolute start-50 mx-5 mt-5 Synopsis '>
         <p className=' fs-4 fw-bold ' > Synopsis : </p>
         <p> { details.overview } </p>
            </div>
     
          </div>
        )}
        <div className="d-flex justify-content-around  position-absolute start-0 bt "> 
<p className='fs-4 fw-bolder ' > Useful Links : </p>
<button onClick={goToHome} className='btn btn-danger btn-lg d-block mx-4 ' > HomePage <i className="fa-solid fa-pen-to-square"></i> </button>
<button onClick={goToImdb} className='btn btn-warning  btn-lg d-block ' > IMDB <i className="fa-solid fa-pen-to-square"></i> </button>
 </div>
     </div>
   
      </div>
    )
}



