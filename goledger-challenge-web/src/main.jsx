import React from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider} from '@mui/material/styles'
import {theme} from './utils/theme.js'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </BrowserRouter>
</React.StrictMode>
)
