import { configureStore } from "@reduxjs/toolkit";
import  TodoReducer  from "./TodoReducer/TodoReducer";


const store = configureStore({
    reducer: {
        todo : TodoReducer
    },
  })

export default store