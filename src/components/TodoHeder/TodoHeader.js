import React from 'react'
import "./TodoHeader.css"

import { AiOutlineClose } from "react-icons/ai"

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TodoList from '../TodoList/TodoList'

import { PostRequire, PutRequire } from '../../Require/Require';

const TodoHeader = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.todo.data)
    const [DropAddDiv, SetDropAddDiv] = useState(false)
    const [filterName, setFilterName] = useState("")
    const [btnvalue, setbtnvalue] = useState(false)

    const [formInput, setFormInput] = useState({ 
        name: "", 
        lastName: "", 
        age: "", 
        categories: "" 
    })

    const onChange = ({ target: { name, value } }) => {
        setFormInput({ ...formInput, [name]: value })
    }

    const addNewCard = () => {
        setFormInput({ 
            name: "", 
            lastName: "", 
            age: "", 
            categories: "" 
        })
        SetDropAddDiv(true)
        setbtnvalue(true)
    }

    const Close = () => {
        SetDropAddDiv(false)
    }

    const EmptyInputs = () => {
        let isEmpty = true
        for (let key in formInput) {
            if (formInput[key] === "") {
                return isEmpty = false
            }
        }
        return isEmpty
    }

    const HnadlePostClcik = () => {
        if (btnvalue) {
            PostRequire(dispatch, formInput)
        }
        else if (!btnvalue) {
            PutRequire(dispatch, formInput)
        }
        EmptyInputs() ?
            toast.success('Your change has been made successfully !', {
                position: toast.POSITION.TOP_RIGHT
            }) :
            toast.error('fill in the blank box !', {
                position: toast.POSITION.TOP_RIGHT
            })
        Close()
    }

    const ChangeHandelClick = (todoList, id) => {
        const el = todoList.find((w) => w.id === id)
        if (el) {
            setFormInput({
                id: el.id,
                name: el.name,
                lastName: el.lastName,
                age: el.age,
                categories: el.categories
            })
        }
        setbtnvalue(false)
        SetDropAddDiv(true)
    }

    return (
        <div className='TodoHeader'>
            <div className='TodoHeader_items'>
                <section className='Heders-Name'><h1>Rest Api,  JSON Server</h1></section>
                <input
                    type="text"
                    className='filterInput'
                    placeholder='Filter is Name'
                    onChange={(e) => setFilterName(e.target.value)}
                    value={filterName} />
                <button onClick={addNewCard} >Add New Lsit</button>
            </div>
            {DropAddDiv ?
                <div className='DropDiv'>
                    <div className="DropDiv_item">
                        <AiOutlineClose onClick={Close} />
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>Enter Your Name</label >
                            <input
                                type='text'
                                name="name"
                                value={formInput.name}
                                onChange={onChange}
                                placeholder="Name"
                                required
                            />
                            <label >Enter Your lastName</label >
                            <input
                                type='text'
                                name="lastName"
                                value={formInput.lastName}
                                onChange={onChange}
                                placeholder="lastName"
                                required
                            />
                            <label >Enter Your age</label >
                            <input
                                type='number'
                                name="age"
                                value={formInput.age}
                                onChange={onChange}
                                placeholder="age"
                                required
                            />
                            <label >Enter Your Categorie</label >
                            <input
                                type='text'
                                name="categories"
                                value={formInput.categories}
                                onChange={onChange}
                                placeholder="Categories"
                                required
                            />
                            <input type='submit'
                                disabled={EmptyInputs() ? false : true}
                                onClick={HnadlePostClcik}
                                value={btnvalue ? "Add" : "Change"} />
                        </form>
                    </div>
                </div>
                : null}
            <TodoList ChangeHandelClick={ChangeHandelClick} filterName={filterName} />
        </div>
    )
}

export default TodoHeader
