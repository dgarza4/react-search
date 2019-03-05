import React, { Component } from 'react';
import Header from './Header';
import RecipeSearch from './RecipeSearch';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Header />
        <RecipeSearch />
      </div>
    )
  }
}

export default App;
