import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
import { GlobalContext } from "../../Context/GlobalContext";
import { useTheme } from "@emotion/react";
import { Carousel } from "react-bootstrap";

export default function Popular() {

const theme = useTheme()


  const [popularMovies, setPopularMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);


  async function getPopularMovies() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      setPopularMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPopularMovies();
  }, []);


  if (loading) return <Loading />;

  return (
    <>
       <Carousel interval={2000} controls={false} indicators={false} pause={false}>
          {popularMovies.map((img) => (
            <Carousel.Item key={img.id}>
              <div className="position-relative">
                <img
                  className="d-block w-100"
                  src={`https://image.tmdb.org/t/p/original${img.backdrop_path}`}
                  alt={img.title}
                />
                <div className="position-absolute top-50 start-50 ham  translate-middle text-center text-white">
                  <h1 className=" fw-bolder hamadaa  "> {img.title} </h1>
                  <span className=" fw-bolder fs-3 " >{Math.round(img.vote_average * 10) / 10}{" "}<i style={{ color: "yellow" }} className="fa-solid fa-star"></i></span>
                  <h6  >{img.overview}</h6>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      <div className="container">
        <h1 className="text-danger fw-bolder my-5">Popular</h1>
        <input
          type="text"
          className="form-control my-5 w-50 mx-auto"
          placeholder="Enter Movie Name..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="row gy-5">
          {popularMovies
            .filter((movie) =>
              movie.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((movie) => (
              <div key={movie.id} className="col-md-3 col-lg-2 Scale-Image">
                <Link to={`/moviesDetailes/${movie.id}`} className="text-decoration-none link-color">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    className="w-100"
                    alt={movie.title}
                  />
                  <h4 className="text-decoration-none text-center fs-6 card-footer bg-danger  ">{movie.original_title}</h4>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
