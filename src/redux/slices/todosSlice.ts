import {createSlice} from "@reduxjs/toolkit"

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


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosReducer:(state, action) => {
        state.todos = action.payload
        console.log(state.todos)
    },
    addTodoReducer:(state, action) => {
        state.todos.push(action.payload)
    },
    hideComplitedReducer:(state) => {
        state.todos = state.todos.filter(todo => !todo.isCompleted)
    },
    updateTodoReducer: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.isCompleted = !todo.isCompleted;
                }
                return todo;
            }); 
    },
    deleteTodoReducer:(state, action) => {
        const id = action.payload
        state.todos = state.todos.filter(todo => todo.id !== id)
    }

  },
})

export const { setTodosReducer, addTodoReducer,hideComplitedReducer, updateTodoReducer, deleteTodoReducer } = todosSlice.actions;

export default todosSlice.reducer;