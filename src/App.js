
// styles


// react
import { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./components/css/App.css"

// my components 
import Weather from "./components/Weather.js"

function App() {



  /*

  */


  return (
    <div className="App">
      <BrowserRouter >
        <Switch>
          <Route path='/'>
            <Weather />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
