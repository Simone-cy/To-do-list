import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {WelcomeMessage}  from './components/WelcomeMessage'
import { Counter } from './components/Counter'
import { RandomUser } from './components/RandomUser'
import { TodoList } from './components/ToDoList'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Modalità Chiara" : "Modalità Scura"}
      </button>
      <TodoList />
    </div>
  )
}

export default App
{/* <WelcomeMessage message={'Hello, Vite + React!'} title={true} />
      <WelcomeMessage message={'bella a tutti'} />
      <WelcomeMessage />
      <Counter start={0}/>
      <Counter start={0}/>
      <RandomUser /> */}