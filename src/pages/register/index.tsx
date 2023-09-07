import {Grid, Paper, Box, Typography, TextField,Avatar, Button, FormControlLabel } from "@mui/material";
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useState, FC, useEffect} from "react";
import { literal, object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signUp } from "../../redux/slices/todosSlice";
import { useNavigate } from "react-router-dom";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';


    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const headerStyle = { margin: 0 }
    const marginTop = { marginTop: 5 }
    
const registerSchema = object({
  username: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 32 characters'),
  email: string().nonempty('Email is required').email('Email is invalid'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
  terms: literal(true, {
    invalid_type_error: 'Accept Terms is required',
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

type RegisterInput = TypeOf<typeof registerSchema>;

type RegisterType = { 
    username: string,
    email: string,
    password: string
}

export const RegisterPage: FC<{}> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [registerData, setRegisterData] = useState<RegisterType>({
        username: "",
        email: "",
        password: ""
    })

  const {token} = useAppSelector((state): any => state.todos)

    const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
     if(token) {
        navigate("/")
      }
  }, [isSubmitSuccessful, reset, token]);

  const dataRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegisterData({...registerData, [e.target.name]: e.target.value})
    }


  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log("registerData", registerData);
    dispatch(signUp(registerData))

  };
  
    return ( 
        <Grid container>
        <Paper style={paperStyle}>
                <Grid direction="column" alignItems="center" justifyContent="center">
                    <Avatar style={avatarStyle}>
                        <ChecklistRtlIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <TextField margin="normal" type="text" fullWidth label="Username" sx={{mt:2, mb:0}} required error={!!errors['username']} helperText={errors['username'] ? errors['username'].message : ''} {...register('username')} onChange={dataRegister}/>
                    <TextField margin="normal" type="email" fullWidth label="Email" sx={{mt:2, mb:1.5}} required error={!!errors['email']} helperText={errors['email'] ? errors['email'].message : ''} {...register('email')} onChange={dataRegister}/>
                    <TextField margin="normal" type="password" fullWidth label="Password"sx={{mt:1.5, mb:1.5}} required error={!!errors['password']} helperText={errors['password'] ? errors['password'].message : ''} {...register('password')} onChange={dataRegister}/>
                    <TextField margin="normal" type="password" fullWidth label="Confirm password"sx={{mt:1.5, mb:1.5}} required error={!!errors['passwordConfirm']} helperText={errors['passwordConfirm'] ? errors['passwordConfirm'].message : ''} {...register('passwordConfirm')}/>
                    <FormControlLabel
                        control={<Checkbox required />}
                        {...register('terms')}
                        label="I accept the terms and conditions."
                    />
                <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
            
        </Grid>
    )
}