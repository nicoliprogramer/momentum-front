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
      const response = await axiosInternal.post("/todos", body)
    if(response.status === 200 || response.status === 201){
        console.log("todo created");
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

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    }
})

export const { } = todosSlice.actions;

export default todosSlice.reducer;