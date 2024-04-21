import styles from "./Register.module.css"
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing,  } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField, Alert } from '@mui/material';


export default function Register() {

   let navigate =  useNavigate()
   const [errMessage , setErrMessage] = useState("") ;
   const [isLoading , setIsLoading] = useState(false) ;


 async function callRegister (reqBody){
    try {
        setIsLoading(true)
        setErrMessage("")
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , reqBody)
        console.log(data);
       
        if (data.message==="success") {
            navigate("/Login")
        }
    } catch (error) {
        console.log(error);
        setIsLoading(false)
       setErrMessage(error.response.data.message)
    }
  }



  const validationSchema = Yup.object({
    name:Yup.string().min(3,"name is too short").max(10,"name is too short").required("name is required"),
    email:Yup.string().email("email not valid").required("email is required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{4,8}$/, "invalid password").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")] , "passowrd and rePassowrd should be match").required("rePassword is required") ,
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone").required("phone is required"),
  })

    const registerFormik  = useFormik({
        initialValues : {
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        } ,
        validationSchema : validationSchema ,
        onSubmit : callRegister
    })


  return (
 <>

<div className=' w-50 m-auto py-3 '>
  <h2 className="mt-5" >Register Now :</h2>
  { errMessage ? <div className='alert alert-danger '> {errMessage } </div>:null  }

  <form onSubmit={registerFormik.handleSubmit}>
    <div className="form-group">
      <label htmlFor="fullName">  name </label>
      <input type="text" id='fullName' name='name' value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className='form-control mb-3' />
     { registerFormik.errors.name && registerFormik.touched.name?  <div className='alert alert-danger'> { registerFormik.errors.name } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="email"> email</label>
      <input type="email" id='email' name='email' value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className='form-control mb-3' />
     { registerFormik.errors.email && registerFormik.touched.email?  <div className='alert alert-danger'> { registerFormik.errors.email } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="password"> password</label>
      <input type="password" id='password' name='password' value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className='form-control mb-3' />
     { registerFormik.errors.password && registerFormik.touched.password?  <div className='alert alert-danger'> { registerFormik.errors.password } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="rePassword"> rePassword</label>
      <input type="password" id='rePassword' name='rePassword' value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className='form-control mb-3' />
     { registerFormik.errors.rePassword && registerFormik.touched.rePassword?  <div className='alert alert-danger'> { registerFormik.errors.rePassword } </div>:null }
    </div>
    <div className="form-group">
      <label htmlFor="phone"> phone</label>
      <input type="tel" id='phone' name='phone' value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} className='form-control mb-3' />
     { registerFormik.errors.phone && registerFormik.touched.phone?  <div className='alert alert-danger'> { registerFormik.errors.phone } </div>:null }
    </div>
  <div className="d-flex justify-content-between ">
  <div>
          <p className="fs-6">Have already an account? <Link className='text-decoration-none text-danger fs-5 ' to={"/login"} > LogIn   </Link> </p>
        </div>
  <button disabled = { !(registerFormik.dirty &&registerFormik.isValid ) } type="submit" className='btn bg-danger text-white d-block '> 
    { isLoading ? <ColorRing
  visible={true}
  height="35"
  width="35"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  /> : "Registe"  }
     
     </button>
    
  </div>
 
  </form>
</div>




 </>
  )
}



// <button type='submit' disabled={ !(.dirty &&.isValid ) } className=' btn btn-danger btn-lg d-block ms-auto '> { isLoading ? <ColorRing
//   visible={true}
//   height="35"
//   width="35"
//   ariaLabel="color-ring-loading"
//   wrapperStyle={{}}
//   wrapperClass="color-ring-wrapper"
//   colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//   /> : "Register"  }  </button>