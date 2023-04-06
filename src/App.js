import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  const create = (resource) => {
    // ...
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const email = useField('text')
  const [tasks, taskService] = useResource('http://localhost:3005/tasks')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleTaskSubmit = (event) => {
    event.preventDefault()
    taskService.create({ content: content.value })
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, email: email.value})
  }

  return (
    <div>
      <h2>tasks</h2>
      <form onSubmit={handleTaskSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {tasks.map(t => <p key={t.id}>{t.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        email <input {...email} />
        <button>create</button>
      </form>
      {persons.map(p => <p key={p.id}>{p.name} {p.email}</p>)}
    </div>
  )
}

export default App
