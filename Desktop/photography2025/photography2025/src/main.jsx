import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss' // Changed from './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If your App.jsx imports App.css and you want App.css to be SCSS:
// 1. Rename App.css to App.scss
// 2. In App.jsx, change `import './App.css'` to `import './App.scss'`