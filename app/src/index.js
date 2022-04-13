import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { Container } from './components/styled/Container.style'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Container>
                <App />
            </Container>          
        </Router>       
    </Provider>, 
    document.getElementById('root')
)