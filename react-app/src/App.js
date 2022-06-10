import React from "react";

import "./App.css";
import Navigatie from "./Navigatie"

import { Provider } from "react-redux";
import { store } from "./store";

class App extends React.Component {



  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <Navigatie/>
        </Provider>
      </div>
    )
  }
}

export default App;
