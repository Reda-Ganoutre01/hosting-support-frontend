import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.css'
import { Provider } from 'react-redux'
import App from './app/App'
import store from './lib/store'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>

    <App/>
  </Provider>
  </StrictMode>,
)
