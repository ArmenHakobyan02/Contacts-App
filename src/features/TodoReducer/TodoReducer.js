import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const URL = "http://localhost:8080/users"

export const getUsers = createAsyncThunk(
    "Users/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(URL)
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const TodoReducer = createSlice({
    name: "TodoReducer",
    initialState: {
        data: [],
        isLoading: false,
        isSuccses: false,
        errorMessige: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccses = true
                state.data = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.errorMessige = action.payload
            })
    }
})

export default TodoReducer.reducer