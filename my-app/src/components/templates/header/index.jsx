import React from 'react'
import './header.css'

export default props => 

<header>
<div className="navbar navbar-dark bg-dark box-shadow">
    <div className="container d-flex justify-content-between">
        <a href="#" className="navbar-brand d-flex align-items-center">
            <i className="fa fa-phone-square"></i><strong className="pl-2">VxTel</strong>
        </a>
        <button className="navbar-toggler collapsed" 
            data-toggle="collapse" data-target="#header">
            <span className="navbar-toggler-icon"></span>
        </button>
    </div>
</div>
<div className="bg-dark collapse" id="header">
    <div className="container">
        <div className="row">
            <div className="col-sm-8 col-md-7 py-4">
                <h4 className="text-white">Tarifas Falemais:</h4>
                <section className="text-muted">
                    <table className="table">
  <thead>
    <tr>
      <th scope="col">Origem</th>
      <th scope="col">Destino</th>
      <th scope="col">R$/min</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">011</th>
      <td>016</td>
      <td>1,90</td>
    </tr>
    <tr>
      <th scope="row">016</th>
      <td>011</td>
      <td>2,90</td>
    </tr>
    <tr>
      <th scope="row">011</th>
      <td>017</td>
      <td>1,70</td>
    </tr>
    <tr>
      <th scope="row">017</th>
      <td>011</td>
      <td>2,70</td>
    </tr>
    <tr>
      <th scope="row">011</th>
      <td>016</td>
      <td>0,90</td>
    </tr>
    <tr>
      <th scope="row">018</th>
      <td>011</td>
      <td>1,90</td>
    </tr>
  </tbody>
</table>
                </section>
            </div>
            <div className="col-sm-4 offset-md-1 py-4">
                <h4 className="text-white">Contato</h4>
                <ul className="list-unstyled">
                    <li>
                        <a href="#" className="text-white">Área do Cliente</a>
                    </li>
                    <li>
                        <a href="#" className="text-white">Facebook</a>
                    </li>
                    <li>
                        <a href="mailto:#" className="text-white">Fale Conosco</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</header>