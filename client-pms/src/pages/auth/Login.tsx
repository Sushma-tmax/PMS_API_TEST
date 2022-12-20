import React from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import Input from "@mui/material/Input";
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useGetPokemonByNameQuery} from "../../service/root";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import logo from "*.png";

type IFormInput = {
    email: string;
    password: string;
}


const Login = () => {
    const {register, handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();

    const {data} = useGetPokemonByNameQuery('')
    console.log(data)


    const onSubmit = async (data: any) => {
        try {
            const {data: loginUserData} = await axios.post(`/api/v1/auth/login`, data);
        } catch (error) {
            console.log(error)
        }


        reset()
        console.log(data);
    };


    return (
        <Paper>
            <Container>
                <Stack spacing={3}>
                    {/*<img className='header-logo' src={logo} alt="logo" height={90} ></img>*/}
                    <h3 className="head1">Welcome to </h3>
                    <h3 className="head2">Performance Appraisal System</h3>

                </Stack>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller control={control}
                                name='email'
                                render={({field}) => <TextField
                                autoComplete="off"
                                    {...field}
                                    {...register("email")}
                                    label="Email" type='email'
                                    variant="standard"/>}/>

                    <Controller control={control}
                                name='password'
                                render={({field}) => <TextField
                                autoComplete="off"
                                    {...field}
                                    {...register("password")}
                                    label="Password" type='password'
                                    variant="standard"/>}/>


                    <Button onClick={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                            color="primary">
                        Login
                    </Button>

                    {/*<input type="submit"/>*/}
                </form>
            </Container>
        </Paper>
    );
};

export default Login;