'use strict';

import Logo from './components/Logo'
import Info from './components/Info'
import BookTable from './components/BookTable'
import Log from './components/Log'
import ShoppingCart from './components/ShoppingCart'
import UserInfo from './components/UserInfo'
import React from 'react';
import ReactDOM from 'react-dom';
import { userInfo } from 'os';

var category = localStorage.getItem('category');
var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
  category = ['Poem', 'Fiction', 'Story'];
  headers = ['title','auther','price','publish','        '];
  data = [
    {category:"Poem",title:"Ice Rain",auther:"Alan",price:21,publish:2001,choice:"Add"},
    {category:"Poem",title:"Homeland",auther:"Mimi",price:44,publish:2011,choice:"Add"},
    {category:"Fiction",title:"Cut me off",auther:"Alan",price:92,publish:2008,choice:"Add"},
    {category:"Story",title:"Grind me down",auther:"BBan",price:67,publish:2000,choice:"Add"},
    {category:"Poem",title:"Green",auther:"BBan",price:17,publish:2011,choice:"Add"}
  ];
}

ReactDOM.render(
  <div className="layout">
    <div className="header">
      <Logo/>
      <Info/>
    </div>
    <div className="content">
      <BookTable category={category} headers={headers} initialData={data}/>
      <ShoppingCart/>
      <UserInfo/>
      <Log/>
    </div>    
  </div>,
  document.getElementById('app')
);