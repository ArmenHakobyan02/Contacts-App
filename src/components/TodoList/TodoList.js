import React from 'react'
import "./TodoList.css"

import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from "../../features/TodoReducer/TodoReducer"

import { useEffect } from 'react'
import { DeleteRequaie } from '../../Require/Require';

const TodoList = ({ ChangeHandelClick, filterName }) => {

  const dispatch = useDispatch()
  const todoList = useSelector(state => state.todo.data)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <div className='TodoList'>
      <table >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>LastName</th>
            <th>Age</th>
            <th>Categorie</th>
            <th>Delete</th>
            <th>Change</th>
          </tr>
        </thead>
        {todoList && todoList.filter((el) => {
          return filterName.toLowerCase() === "" ? el : el.name.toLowerCase().includes(filterName.toLowerCase())
        }).map((item) => {
            return (
              <tbody key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>{item.categories}</td>
                  <td> <button onClick={() => DeleteRequaie(dispatch, item.id,)} >Delete</button> </td>
                  <td> <button onClick={() => ChangeHandelClick(todoList, item.id)}>Change</button> </td>
                </tr>
              </tbody>
            )
          })}
      </table>
    </div>
  )
}

export default TodoList
