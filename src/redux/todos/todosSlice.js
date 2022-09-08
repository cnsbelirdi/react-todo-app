import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getTodoAsync = createAsyncThunk('todos/getTodosAsync', async() => {
    const res = await axios("https://631903916b4c78d91b347aa9.mockapi.io/todos");
    return res.data;
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async(data) => {
    const res = await axios.post("https://631903916b4c78d91b347aa9.mockapi.io/todos", data);
    return res.data;
});

export const destroyTodoAsync = createAsyncThunk('todos/destroyTodoAsync', async(id) => {
    console.log(id);
    await axios.delete(`https://631903916b4c78d91b347aa9.mockapi.io/todos/${id}`);
    return id;
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: 'all',
    },
    reducers: {
        toggle: (state, action) => {
            const {id} = action.payload;
            const item = state.items.find(item => item.id === id);
            item.isCompleted = !item.isCompleted;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            const filtered = state.items.filter((item) => item.isCompleted === false);
            state.items = filtered;
        },
    },
    extraReducers: {
        // get Todos
        [getTodoAsync.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getTodoAsync.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        },
        [getTodoAsync.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        },
        // add Todo
        [addTodoAsync.fulfilled]: (state, action) => {
            state.items.push(action.payload);
        },
        // destroy Todo
        [destroyTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1); 
        }

    }
});

export const selectTodos = (state) => state.todos.items;

export const selectFilteredTodos = (state) => {
    if(state.todos.activeFilter === 'all'){
        return state.todos.items;
    }
    return state.todos.items.filter((todo) => 
                state.todos.activeFilter === 'active' 
                    ? todo.isCompleted === false 
                    : todo.isCompleted === true);
}


export const selectActiveFilter = (state) => state.todos.activeFilter;

export const {toggle, destroy, changeActiveFilter, clearCompleted} = todosSlice.actions;
export default todosSlice.reducer;