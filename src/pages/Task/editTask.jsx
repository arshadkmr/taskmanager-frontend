import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

function EditTask() {

    const taskInfo = JSON.parse(localStorage.getItem("taskInfo"))
    console.log("myjson", taskInfo)

    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))


    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [value, setValue] = useState(taskInfo.taskData.progress)

    
    const initialValues = {
        title:taskInfo.taskData.title,
        description:taskInfo.taskData.description,
        progress: taskInfo.taskData.progress,
        startDate: taskInfo.taskData.startData,
        endDate: taskInfo.taskData.endDate
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().min(5).max(15).required(),
        description: Yup.string().required(),
        progress: Yup.number().min(0).max(100).required(),
        startDate: Yup.date().min(new Date()).required(),
        endDate: Yup.date().min(new Date()).required()
    })
    
    
    
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
        initialValues,
        validationSchema: validationSchema,
        
        onSubmit: async (values, action) => {
            console.log(values);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const response = await axios.post(
                `https://loginbackend-g600.onrender.com/user/edit/${taskInfo.taskData.id}`,
                values,
                config
                )
                console.log(response);
                if (response.data.errorMessage) {
                    setSuccessMessage('')
                    setErrorMessage(response.data.errorMessage)
                }
                if (response.data.successMessage) {
                    setErrorMessage('')
                    setSuccessMessage(response.data.successMessage)
                    navigate('/home')
                }
                action.resetForm()
            }
        })
        
        // setValue(handleChange.progress)
        
    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-info">
            <div className="p-3 bg-white w-25">
                <h1 className='text-center mt-2'><strong>Tasks</strong></h1>
                <hr />
                <h4 style={{ color: "red" }}>{errorMessage}</h4>
                <h4 style={{ color: "green" }}>{successMessage}</h4>
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="mb-2" htmlFor="title">Title</label>
                        {errors.title && touched.title ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.title}
                            </p>
                        ) : null}
                        <input value={values.title} onChange={handleChange} onBlur={handleBlur} className="form-control mb-3" type="text" name="title" placeholder="title" required />
                    </div>
                    <div>
                        <label className="mb-2" htmlFor="description">Description</label>
                        {errors.description && touched.description ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.description}
                            </p>
                        ) : null}
                        <textarea value={values.description} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className="form-control mb-3" type="text" rows={5} name="description" placeholder="description" required />
                    </div>
                    <label className="mb-2" htmlFor="progress">Progress {value}</label>
                    {errors.progress && touched.progress ? (
                        <p style={{ color: "red" }} variant="body2">
                            {errors.progress}
                        </p>
                    ) : null}
                    <input value={values.progress} type="range" className="form-range" min="0" max="100" step="5" id="customRange3" onChange={handleChange} onBlur={handleBlur} name="progress" placeholder="progress" required />
                    <div>
                        {errors.startDate && touched.startDate ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.startDate}
                            </p>
                        ) : null}
                        <p>Start Date : {format(new Date(taskInfo.taskData.startDate), "dd-MM-yyyy")}</p>
                        <input value={values.startDate} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className="form-control mb-3" type="date" name="startDate" placeholder="startDate" required />
                    </div>
                    <div>
                        {errors.endDate && touched.endDate ? (
                            <p style={{ color: "red" }} variant="body2">
                                {errors.endDate}
                            </p>
                        ) : null}
                        <p>End Date : {format(new Date(taskInfo.taskData.endDate), "dd-MM-yyyy")}</p>
                        <input value={values.endDate} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className="form-control mb-3" type="date" name="endDate" placeholder="endDate" required />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-warning">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask