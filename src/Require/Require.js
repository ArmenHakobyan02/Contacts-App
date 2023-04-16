import axios from "axios"
import { URL, getUsers } from "../features/TodoReducer/TodoReducer"
import { toast } from 'react-toastify';

export const PostRequire = async (dispatch, data)=>{
    try {
        await axios.post(URL, data)
        dispatch(getUsers())
    } catch (error) {
        console.log('Error >',error)
    }
}

export const PutRequire = async (dispatch, data)=>{
    try {
        await axios.put(`${URL}/${data.id}`, data)
        dispatch(getUsers())
    } catch (error) {
        console.error("Error:", error);
    }
}

export const DeleteRequaie = async (dispatch, id) => {
    try {
      await axios.delete(`${URL}/${id}`)
      dispatch(getUsers())

      toast.success(`successfully deleted this id ${id}`, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
    catch (error) {
      console.log("Error >", error)
    }
  }