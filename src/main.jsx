import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
import './styles.scss'
import { SignUp } from './pages/SignUp/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SignUp/>
  </React.StrictMode>,
)
