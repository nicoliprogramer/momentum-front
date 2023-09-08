import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInternal } from '../../api/todos.api';
import Swal from 'sweetalert2'

export interface AuthProps {
    username:     string;
    email:    string;
    token: string;
}

const initialState : AuthProps = {username: "", email: "", token: ""}

export const signIn = createAsyncThunk(
  'auth/SIGN_IN',
  async (body: any, {dispatch}: any): Promise<void> => {
    try {
      const response = await axiosInternal.post("/auth/login", body)
    if(response.status === 200 || response.status === 201){
        Swal.fire({
                title: 'Bienvenido!',
                text: 'you are part of the community',
                icon: 'success',
                showConfirmButton: false,
                timer: 1400
              })
              
        localStorage.setItem("token", response.data.token)
        return response.data.token
    }
    } catch (error) {
          const err:any=error;
          if(err.response.status === 400){
            Swal.fire({
                title: 'Are you sure?',
                text: 'user data not found',
                icon: 'warning',
                confirmButtonText: 'Understand!'
              })
              throw new Error("User not found")
          }
    }
    }
);

export const signUp = createAsyncThunk(
  'auth/SIGN_UP',
  async (body: any, {dispatch}: any): Promise<void> => {
    try {
      const response = await axiosInternal.post("/users/register", body)
    if(response.status === 200 || response.status === 201){
        Swal.fire({
                title: 'Bienvenido!',
                text: 'you are part of the community',
                icon: 'success',
                showConfirmButton: false,
                timer: 1400
              })
      
        localStorage.setItem("token", response.data.token)
        return response.data.token
    }
    } catch (error) {
          const err:any=error;
           if(err.response.status === 400){
            Swal.fire({
                title: 'Are you sure?',
                text: 'user data not found',
                icon: 'warning',
                confirmButtonText: 'Understand!'
              })
              throw new Error("User not found")
          }
    }
    }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: builder  =>{
      builder
      .addCase(signIn.fulfilled,(state: any,action: any) => {
        state.token = action.payload
      })
      .addCase(signIn.rejected,(state: any,action: any) => {
        state.token = ""
      })
      .addCase(signUp.fulfilled,(state: any,action: any) => {
        state.token = action.payload
      })
      .addCase(signUp.rejected,(state: any,action: any) => {
        state.token = ""
      })
  },
})

export const authReducer = authSlice.reducer