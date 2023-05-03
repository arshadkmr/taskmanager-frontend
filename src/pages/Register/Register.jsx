import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link,useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function Register() {

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState('')


    const initialValues = {
        name: "",
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(5).max(15).required(),
        email: Yup.string().required(),
        password: Yup.string().min(5).max(12).required(),
        cPassword: Yup.string().min(5).max(12).required()
    })
    const navigate=useNavigate()

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,


            onSubmit: async (values, action) => {
                console.log(values);
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };
                const response = await axios.post(
                    "https://loginbackend-g600.onrender.com/user/register",
                    values,
                    config
                )
                console.log(response);
                if (response.data.errorMessage) {
                    setSuccessMessage('')
                    setErrorMessage(response.data.errorMessage)
                }
                if(response.data.successMessage){
                    setErrorMessage('')
                    setSuccessMessage(response.data.successMessage)
                    navigate('/login')
                }
                action.resetForm()
            }
        })
        


    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25 '>
                <h3 className='text-center mt-2'><strong>Register</strong></h3>
                <hr />
                
                <h4 style={{color:"red"}}>{errorMessage}</h4>
                <h4 style={{color:"green"}}>{successMessage}</h4>
                <form onSubmit={handleSubmit} >
                    <div className='mb-3'>
                        <label className='mb-2 mt-2' htmlFor="name"><strong>Name</strong></label>
                        <br />
                        {errors.name && touched.name ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.name}
                            </p>
                        ) : null}
                        <input value={values.name} onChange={handleChange} onBlur={handleBlur} type="text" placeholder='Name' className='form-control' id='name' name='name' />
                    </div>
                    <div className='mb-3'>
                        <label className='mb-2' htmlFor="email"><strong>Email</strong></label>
                        <br />
                        {errors.email && touched.email ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.email}
                            </p>
                        ) : null}
                        <input value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur} type="email" placeholder='Email' className='form-control' id='email' name='email' />
                    </div>
                    <div className='mb-3'>
                        <label className='mb-2' htmlFor="password"><strong>Password</strong></label>
                        <br />
                        {errors.password && touched.password ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.password}
                            </p>
                        ) : null}
                        <input value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" placeholder='Password' className='form-control' id='password' name='password' />
                    </div>
                    <div className='mb-3'>
                        <label className='mb-2' htmlFor="cPassword"><strong>Confirm Password</strong></label>
                        <br />
                        {errors.cPassword && touched.cPassword ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.cPassword}
                            </p>
                        ) : null}
                        <input value={values.cPassword} onChange={handleChange} onBlur={handleBlur} type="password" placeholder='confirm Password' className='form-control' id='cPassword' name='cPassword' />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type='submit' className='btn btn-success mb-5'>Sign up</button>
                    </div>
                    <Link to="/login" className='btn btn-secondary w-100 mb-3'>Already have an account? Sign in.</Link>
                </form>
            </div>
        </div>
    )
}

export default Register