import React, { useContext, useEffect  } from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Popular from './Components/Popular/Popular'
import TopRated from './Components/TopRated/TopRated'
import UpComing from './Components/UpComing/UpComing'
import MoviesDetaiels from './Components/MoviesDetaiels/MoviesDetaiels'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { TokenContext } from './Context/TokenContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import WatchList from './Components/WatchList/WatchList'




export default function App() {





  let {setToken} = useContext(TokenContext)

  let routes = createHashRouter([
  { path : "" , element : <LayOut/> , children : [
    { path : "popular" , element : <ProtectedRoute> <Popular/> </ProtectedRoute>   } ,
    { path : "" , element :<ProtectedRoute> <Popular/> </ProtectedRoute> } ,
    { path : "toprated" , element :<ProtectedRoute> <TopRated/> </ProtectedRoute> } ,
    { path : "upcoming" , element :<ProtectedRoute> <UpComing/> </ProtectedRoute> } ,
    { path : "moviesDetailes/:id" , element :<ProtectedRoute> <MoviesDetaiels/> </ProtectedRoute> } ,
    { path : "watchlist" , element :<ProtectedRoute> <WatchList/> </ProtectedRoute> } ,
    { path : "register" , element : <Register/>  } ,
    { path : "login" , element : <Login/>  } ,
  ]}
  ])


useEffect(()=>{
if (localStorage.getItem("userToken")!=null){
  setToken(localStorage.getItem("userToken"))
}
} , [])

  return (
 <>
 



 <RouterProvider router={routes} >  </RouterProvider>

 </>
  )
}
