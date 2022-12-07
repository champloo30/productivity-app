import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './addForm.scss'

export default function Form(props) {
  const [form, setForm] = useState({
    name: '',
    completed: false
  })

  const navigate = useNavigate()

  function handleChange(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const newTask = { ...form }
    
    await fetch(`http://localhost:5000/myTasks/addTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    .catch(error => {
      window.alert(error)
      return
    })

    setForm({name: '', completed: false})
    navigate('/myTasks')
  }

  return (
    <div className="form">
      <div className="form-container">
        <form className='create-todo' onSubmit={handleSubmit}>
          <h1>Add A Task</h1>
          <input 
            className='todo-input' 
            type="text" 
            name="todo" 
            id="new-todo" 
            value={form.name} 
            onChange={(e) => handleChange({ name: e.target.value })}
            placeholder='What are we doing today?' 
            required 
          />
          <div className="btn-group">
            <Link className='btn cancel' to='/myTasks'>Close</Link>
            <button className='btn save'>Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
