import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { axiosInternal } from '../../api/todos.api';

interface Todo {
    id: number,
    isCompleted: boolean,
}

interface todosState {
    todos: Todo[];
}

const initialState: todosState = {
    todos: []
};


export const createTodo = createAsyncThunk(
  'todos/CREATE_TODO',
  async (body: any, {dispatch}: any): Promise<void> => {
    try {
      const response = await axiosInternal.post("/todos/create", body)
    if(response.status === 200 || response.status === 201){
        console.log("todo created");
        return response.data
    }
    } catch (error) {
          const err:any=error;
          if(err.response.status === 400){
            console.log("err", error)
              throw new Error("User not found")
          }
    }
    }
);

export const deleteTodo = createAsyncThunk(
  'todos/DELETE_TODO',
  async (id: any, {dispatch}: any): Promise<void> => {
    try {
      const response = await axiosInternal.delete(`/todos/${id}`)
    if(response.status === 200 || response.status === 201){
        console.log("todo deleted");
        return response.data
    }
    } catch (error) {
          const err:any=error;
          if(err.response.status === 400){
            console.log("err", error)
              throw new Error("User not found")
          }
    }
    }
);

export const updateTodo = createAsyncThunk(
  'todos/UPDATE_TODO',
  async (data: any, {dispatch}: any): Promise<void> => {
    try {
      console.log("data.id", data.id);
      console.log("data.completed", data.completed);
      
      const response = await axiosInternal.put(`/todos/${data.id}`,{ completed: data.completed})
    if(response.status === 200 || response.status === 201){
        console.log("todo is completed or not completed");
        return response.data
    }
    } catch (error) {
          const err:any=error;
          if(err.response && err.response.status === 400){
            console.log("err", error)
              throw new Error("User not found")
          }
    }
    }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    }
})

export const todosReducer = todosSlice.reducer;