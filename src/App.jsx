
import { Route, Routes } from 'react-router'
import './App.css'
import { Home } from './pages/Home'
import { AddCard } from './pages/AddCard'
import { Topic } from './pages/Topic'
import '@fontsource/inter';

import { MyMenu } from './components/MyMenu'
import { Dashboard } from './pages/Dashboard'

function App() {


  return (
    <div className='app'>
      <MyMenu/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/topic/:id/:name' element={<Topic/>}/>
      <Route path='/addcard/:id/:name' element={<AddCard />}/>
    </Routes>
    </div>
  )
}

export default App
