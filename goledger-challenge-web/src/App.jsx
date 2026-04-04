import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import TvShowDetail from './pages/TvShowDetail'
import './styles/App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/tvShow/:title/:id" element={<TvShowDetail/>}/>
      </Routes>
    </>
  )
}

export default App
