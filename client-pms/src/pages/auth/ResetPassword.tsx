import React from 'react'
import {Controller, useForm} from "react-hook-form";
import axios from "axios";
import {Button, Container, Paper, TextField} from "@mui/material";
import {useLocation, Link} from 'react-router-dom';


type IFormInput = {
    password: string;
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const query = useQuery();

    const {register, handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();

    const onSubmit = async (data: any) => {
        console.log(data);
        const {password} = data;
        reset()
        try {
            const {data: regi} = await axios.post(
                `/api/v1/auth/reset-password`, {
                    password,
                    token: query.get('token'),
                    email: query.get('email'),
                }
            );
            console.log(data)
            console.log(regi)
        } catch (error) {
            console.log(error)
        }

        console.log(data);
    };


    return (
        <Paper>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>


                    <Controller control={control}
                                name='password'
                                render={({field}) => <TextField
                                    {...field}
                                    {...register("password")}
                                    label="Password" type='password'
                                    variant="standard"/>}/>


                    <Button onClick={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                            color="primary">
                        New Password
                    </Button>

                    {/*<input type="submit"/>*/}
                </form>
            </Container>
        </Paper>
    )
}

export default ResetPassword