import  React, { useEffect } from "react";
import { useState, FC} from "react";
import { Button, Grid, Paper, Typography, TextField, Link} from "@mui/material";
import {useNavigate} from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { signIn } from "../../redux/slices/auth.slice";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useForm, SubmitHandler } from 'react-hook-form';
import {  object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from "@material-ui/core";
import { signIn } from "../../redux/slices/authSlice";

    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const headerStyle = { margin: 0 }

    const loginSchema = object({
    email: string().nonempty('Email is required').email('Email is invalid'),
    password: string()
    .nonempty('Password is required')
})

type LoginInput = TypeOf<typeof loginSchema>;

type LoginType = { 
    username: string,
    password: string
}

export const LoginPage: FC<{}> = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {token} = useAppSelector((state): any => state.auth)

    const [loginData, setLoginData] = useState<LoginType>({
        username: "",
        password: ""
    })

    const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

   const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

    useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
     if(token) {
        navigate("/")
      }
  }, [isSubmitSuccessful, reset, token]);

     const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
     dispatch(signIn(values))
     };

    return (
        <Grid container>
            <Paper style={paperStyle}>
                    <Grid direction="column" alignItems="center" justifyContent="center">
                        <Avatar style={avatarStyle}>
                            <PeopleAltIcon />
                        </Avatar>
                        <h2 style={headerStyle}>Sign In</h2>
                        <Typography variant='caption' gutterBottom>Please complete this form to login!</Typography>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <TextField margin="normal" type="email" fullWidth label="Email" sx={{mt:2, mb:1.5}} required error={!!errors['email']} helperText={errors['email'] ? errors['email'].message : ''} {...register('email')} onChange={dataLogin}/>
                        <TextField margin="normal" type="password" fullWidth label="Password"sx={{mt:1.5, mb:1.5}} required error={!!errors['password']} helperText={errors['password'] ? errors['password'].message : ''} {...register('password')} onChange={dataLogin}/>
                        <Typography sx={{mt:2, mb:2}} fontSize="15px" variant="body2"><Link href="/register">Haven't created an account? Enter here.</Link></Typography>
                    <Button type='submit' variant='contained' color='primary'>Sign in</Button>
                    </form>
            </Paper> 
        </Grid>
    )
}
