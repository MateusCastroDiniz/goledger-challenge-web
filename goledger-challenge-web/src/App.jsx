import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home.jsx'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
