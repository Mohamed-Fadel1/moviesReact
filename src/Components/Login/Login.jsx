import React, {  useContext, useState } from 'react' ;
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { ColorRing } from 'react-loader-spinner';
import { TokenContext } from '../../Context/TokenContext';



export default function Login() {


 let {setToken} =   useContext(TokenContext)



  const [ errMessage , setErrMessage ] = useState("") ;
  const [ isLoading , setIsLoading ] = useState(false) ;

  const navigate = useNavigate() ;
  const callLogin= async (reqBody)=>
{
setErrMessage("")
setIsLoading(true)
 
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , reqBody)
  .catch((err)=>{
    setIsLoading(false)
    setErrMessage(err.response.data.message )})
  if ( data.message === "success"  ) {

    localStorage.setItem("userToken" , data.token)

 
localStorage.setItem("userToken" , data.token)
setToken(data.token)
  
  navigate ('/Popular')
  }
}



const validationSchema = Yup.object(
  {
   
    email: Yup.string().email("email not valid").required("email is required") ,
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("passowrd is required") ,
    
  }
)

const loginForm = useFormik({
  initialValues : {
    email:"",
    password:""
  },

  validationSchema : validationSchema ,



onSubmit : callLogin

})

  return (
    <>
 

 
<div className=' w-50 m-auto py-5 '>
  <h2 className='mt-5' >login Now :</h2>
  { errMessage ? <div className='alert alert-danger '> {errMessage } </div>:null  }

  <form onSubmit={loginForm.handleSubmit}>
 
    <div className="form-group">
      <label htmlFor="email"> email</label>
      <input type="email" id='email' name='email' value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className='form-control mb-3' />
     { loginForm.errors.email && loginForm.touched.email?  <div className='alert alert-danger'> { loginForm.errors.email } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="password"> password</label>
      <input type="password" id='password' name='password' value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className='form-control mb-3' />
     { loginForm.errors.password && loginForm.touched.password?  <div className='alert alert-danger'> { loginForm.errors.password } </div>:null }
    </div>
  
<div className="d-flex justify-content-between ">


<div>
          <p> Don't have an account? <Link className='text-decoration-none ' to={"/register"} > Register   </Link> </p>
        </div>


    <button type="submit" className='btn bg-danger text-white d-block  '> 
    { isLoading ? <ColorRing
  visible={true}
  height="35"
  width="35"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> : "Login" }
     </button>
</div>
    </form>
</div>

    </>
  )


}
