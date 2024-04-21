import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

export default function LayOut() {


  const [ mode , setMyMode ] = useState (
    localStorage.getItem("currentMode") === null
    ? "light"
    : localStorage.getItem("currentMode") === "light"
    ? "light"
    : "dark"
  )


  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  



  return (
   <>
 <ThemeProvider theme={darkTheme}>
 <CssBaseline />
   <NavBar setMyMode = {setMyMode} />
   <Outlet/>
   </ThemeProvider>
   </>
  )
}
