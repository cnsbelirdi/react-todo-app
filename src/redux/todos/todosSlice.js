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
    await axios.delete(`https://631903916b4c78d91b347aa9.mockapi.io/todos/${id}`);
    return id;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async({id, data}) => {
    const res = await axios.put(`https://631903916b4c78d91b347aa9.mockapi.io/todos/${id}`, data);
    return res.data;
});

export const clearCompletedTodoAsync = createAsyncThunk('todos/clearCompletedTodoAsync', async() => {
    const res = await axios("https://631903916b4c78d91b347aa9.mockapi.io/todos");
    const filtered = res.data.filter((item) => item.isCompleted !== false);
    filtered.forEach(element => {
        axios.delete(`https://631903916b4c78d91b347aa9.mockapi.io/todos/${element.id}`);
    });
    return res.data;
});

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        activeFilter: localStorage.getItem("activeFilter"),
    },
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        }
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
        // toggle Todo
        [toggleTodoAsync.fulfilled]: (state, action) => {
            const {id, isCompleted} = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items[index].isCompleted = isCompleted;
        },
        // destroy Todo
        [destroyTodoAsync.fulfilled]: (state, action) => {
            const id = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            state.items.splice(index, 1); 
        },
        // clear completed
        [clearCompletedTodoAsync.fulfilled]: (state, action) => {
            // state.items = action.payload;
            const filtered = state.items.filter((item) => item.isCompleted === false);
            state.items = filtered;
        },

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

export const {changeActiveFilter} = todosSlice.actions;
export default todosSlice.reducer;