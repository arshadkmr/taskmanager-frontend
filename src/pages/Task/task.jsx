import React, { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { format } from "date-fns";

function Task() {

    const [task, setTask] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const navigate = useNavigate()

    useEffect(() => {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        axios.get("https://loginbackend-g600.onrender.com/user/task", config)
            .then(response => {
                setTask(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [userInfo.token])


    const editHandler = (id) => {
        axios.get(`https://loginbackend-g600.onrender.com/user/edit/${id}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
            .then(response => {
                console.log(response.data.taskData)
                localStorage.setItem("taskInfo", JSON.stringify(response.data));
                const taskInfo = JSON.parse(localStorage.getItem("taskInfo"))
                if (taskInfo) {
                    navigate("/edit")
                }
            })
            .catch(error => {
                console.log("catch error : ", error)
            })
    }

    const deleteHandler = (id) => {
        axios.get(`https://loginbackend-g600.onrender.com/user/delete/${id}`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
            .then(response => {
                if (response.data) {
                    navigate("/home")
                }
            })
    }

    const logoutUser = () => {
        const remove=localStorage.removeItem("userInfo")
        if(remove){
            navigate('/login')
        }

    }

    const currentTime = new Date()
    function compareDate(crr, old) {
        if (crr == old) {
            alert("The task has started.. Complete fast..!!")
        } else if (crr < old) {
            alert("The task will start soon.. Complete")
        }
    }
    const date = task.map((item) => {
        compareDate(currentTime, item.startDate)
        return format(new Date(item.startDate), "dd-MM-yyyy")
    }
    )
    console.log()
    console.log("DAtea : ", date)

    const cardStyle = {
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        margin: '10px',
        width: "25"
    };

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-info'>
            <div className='p-3 w-25'>
                {task.map((item) => {
                    return (
                        <div className="card" style={cardStyle} key={item.id} >
                            <div className="card-body p-3">
                                <h5 className="card-title">{item.title} </h5>
                                <p className="card-text">{item.description}</p>
                                <label htmlFor="customRange3" className="form-label">Progress {item.progress}%</label>
                                <input type="range" value={item.progress} className="form-range" min="0" max="100" step="5" id="customRange3" disabled />
                                <p>Start Date : {format(new Date(item.startDate), "dd-MM-yyyy")}</p>
                                <p>End Date : {format(new Date(item.endDate), "dd-MM-yyyy")}</p>
                                <p>Status : {item.progress !== 100 ? 'Pending' : 'Completed'}</p>
                                <div className='d-flex justify-content-center'>
                                    <button onClick={() => editHandler(item.id)} className='btn btn-primary' style={{ marginRight: '50px' }}>Edit Task</button>
                                    <button onClick={() => deleteHandler(item.id)} className='btn btn-danger' >Delete Task</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className='d-flex justify-content-center'>
                    <Link className='btn btn-warning' style={{ marginRight: '50px' }} to="/task">Add Task</Link>
                    <button onClick={() => logoutUser()} className='btn btn-dark ml-2'>Log Out</button>
                </div>
            </div>
        </div >
    )
}

export default Task