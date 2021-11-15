import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './app.css'



import Header from '../components/templates/header'
import Home from '../main/pages/home'
import Forms from '../components/templates/form'


export default props => 

    <div className="app">
        <Header />
        <Home />
        <Forms />
    </div>     