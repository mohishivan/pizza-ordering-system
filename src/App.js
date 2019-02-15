import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Pizzas from './modules/pizzas'
import configureStore from './redux'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';


const {store} = configureStore()


class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer hideProgressBar={true} autoClose={3000}/>
        <Provider store={ store }>
          <Router>
            <Route path="/" exact render={ (props) => <Pizzas {...props}/> } />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
