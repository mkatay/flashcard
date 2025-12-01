
import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { AddCard } from './pages/AddCard'
import { Topic } from './pages/Topic'
import '@fontsource/inter';
import { AddTopic } from './pages/AddTopic'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addtopic' element={<AddTopic/>}/>
      <Route path='/topic/:id/:name' element={<Topic/>}/>
      <Route path='/addcard/:id/:name' element={<AddCard />}/>
    </Routes>
  )
}

export default App
