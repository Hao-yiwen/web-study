import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    counter: 0,
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p
          className="App-intro"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="button-container"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <button
              className="decrement-button"
              onClick={() => this.setState({ counter: this.state.counter - 1 })}
            >
              -
            </button>
            <div
              className="counter-text"
              style={{ marginLeft: 20, marginRight: 20 }}
            >
              {this.state.counter}
            </div>
            <button
              className="increment-button"
              onClick={() => this.setState({ counter: this.state.counter + 1 })}
            >
              +
            </button>
          </div>
        </p>
        <view style={{backgroundColor: 'red', width: '100%', height: 100}}>
          <text style={{color: 'green'}}>213123</text>
        </view>
      </div>
    );
  }
}

export default App;
