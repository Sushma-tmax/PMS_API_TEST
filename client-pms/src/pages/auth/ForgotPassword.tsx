import React from 'react'
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import axios from "axios";

type IFormInput = {
    email: string;
}


const ForgotPassword = () => {
    const {register, handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();

    const onSubmit = async (data: any) => {
        reset()
        try {
            const {data: regi} = await axios.post(
                `/api/v1/auth/forgot-password`,
                data
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
                                name='email'
                                render={({field}) => <TextField
                                    {...field}
                                    {...register("email")}
                                    label="Email" type='email'
                                    variant="standard"/>}/>

                    <Button onClick={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                            color="primary">
                        Forgot Password
                    </Button>

                    {/*<input type="submit"/>*/}
                </form>
            </Container>
        </Paper>
    )


}

export default ForgotPassword