import React from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Box, Button, Container, Paper, TextField} from "@mui/material";
import {useRegisterUserMutation} from "../../service/root";

type IFormInput = {
    name: string
    email: string;
    password: string;
}


const Register = () => {
    const {register, handleSubmit, reset, control, formState: {errors}} = useForm<IFormInput>();
    const [registerUser, { isLoading,data,  }] = useRegisterUserMutation()


    const onSubmit =  async (data: any) => {
        try {
            const user = await registerUser(data)
            console.log(data)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
        reset()
    };


    return (
        <Paper>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Controller control={control}
                                name='name'
                                render={({field}) => <TextField
                                    {...field}
                                    {...register("name")}
                                    label="Name" type='text'
                                    variant="standard"/>}/>



                    <Controller control={control}
                                name='email'
                                render={({field}) => <TextField
                                    {...field}
                                    {...register("email")}
                                    label="Email" type='email'
                                    variant="standard"/>}/>

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
                        Register
                    </Button>

                    {/*<input type="submit"/>*/}
                </form>
            </Container>
        </Paper>
    );
};

export default Register;