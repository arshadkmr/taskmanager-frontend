import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Login() {

    const [errorMessage,setErrorMessage]=useState("")

    const initialValues = {
        name: "",
        email: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().min(5).max(12).required()
    })
    const navigate=useNavigate()

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,

            onSubmit: async (values) => {
                console.log(values)
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const response = await axios.post(
                    "https://loginbackend-g600.onrender.com/user/login",
                    values,
                    config
                )
                localStorage.setItem("userInfo", JSON.stringify(response.data));
                const userInfo =JSON.parse( localStorage.getItem("userInfo"))
                    if(userInfo.token){
                        navigate('/home')
                    }else{
                        setErrorMessage(response.data.errorMessage)
                    }
            }
        })

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25 '>
                <h3 className='text-center mt-2'><strong>Login</strong></h3>
                <hr />
                <h4 style={{color:"red"}}>{errorMessage}</h4>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label className='mb-2' htmlFor="email"><strong>Email</strong></label>
                        {errors.email && touched.email ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.email}
                            </p>
                        ) : null}
                        <br />
                        <input value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur} type="email" placeholder='Email' className='form-control' id='email' name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='mb-2' htmlFor="password"><strong>Password</strong></label>
                        {errors.password && touched.password ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.password}
                            </p>
                        ) : null}
                        <br />
                        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" placeholder='Password' className='form-control' id='password' name='password' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-success mb-5'>Sign In</button>
                    </div>
                    <Link to="/register" className='btn btn-secondary w-100 mb-3'>Don't have an account, Sign Up.</Link>
                </form>
            </div>
        </div>
    )
}

export default Login