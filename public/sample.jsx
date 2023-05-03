import React, { useState } from "react";
import { toast } from 'react-toastify';
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Grid,
    Paper,
    Avatar,
    Typography,
    TextField,
    Button,
    Box,
    Link,
} from "@material-ui/core";

import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import apiCalls from "../../EndPoints/UserApiCalls";
import LoadingAnimation from "../../layouts/LoadingAnimation"
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import "../../styles/UserStyles/UserSignup.css"

function SignUp() {
    const marginTop = { marginTop: 5 };

    const pageStyle = {
        backgroundColor: "#312E2E",
        height: "100%",
    };
    const paperStyle = { padding: "30px 20px", width: 300, margin: "7px auto" };
    const headerStyle = { margin: 0 };
    const avatarStyle = { backgroundColor: "#1bbd7e" };


    const [error, setError] = useState("");
    const navigate = useNavigate("");
    const [loading, setLoading] = useState(false);



    const [showPassword, setShowPassword] = useState(false);
    const initialValues = {
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",

    };



    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,


            onSubmit: async (values, action) => {
                console.log(values);
                setLoading(true);
                const response = await apiCalls.signIn(values);
                console.log(response);
                if (response.error) {
                    console.log(response.error);
                    setError(response.error);
                    toast.error(response.error)
                } else if (response.status) {
                    action.resetForm();
                    const id = response.data.userId
                    toast.success(response.send)
                    navigate(`/emailVerification/${id}`);
                }
                setLoading(false);
                action.resetForm();
            },
        });

    console.log(errors);

    return (

        <Grid>
            <Paper
                elevation={20}
                style={{
                    ...paperStyle,
                    marginTop: "100px",
                    backgroundColor: "#3A3131",
                }}
            >
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant="caption" gutterBottom>
                        Please fill this form to create an account !
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                        <Typography color="error" variant="body2">
                            {errors.name}
                        </Typography>
                    ) : null}
                    <TextField
                        fullWidth
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                    />
                    {errors.email && touched.email ? (
                        <Typography color="error" variant="body2">
                            {errors.email}
                        </Typography>
                    ) : null}
                    <TextField
                        fullWidth
                        label="Phone Number"
                        placeholder="Enter your phone number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                        <Typography color="error" variant="body2">
                            {errors.phoneNumber}
                        </Typography>
                    ) : null}
                    <TextField
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}
                                        edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    {errors.password && touched.password ? (
                        <Typography color="error" variant="body2">
                            {errors.password}
                        </Typography>
                    ) : null}
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ marginTop: "10px" }}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                        <Typography color="error" variant="body2">
                            {errors.confirmPassword}
                        </Typography>
                    ) : null}

                    {error && (
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    )}

                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        style={{ marginTop: "10px" }}
                    >
                        {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <Button type="submit" variant="contained" color="primary">
                                Sign up
                            </Button>
                        )}

                        <Grid
                            container
                            justifyContent="center"
                            style={{ marginTop: "10px" }}
                        >
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    Already have an account?
                                    <Link href="/signin" variant="body2">
                                        Sign In
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Grid>

    );
}

export default SignUp;