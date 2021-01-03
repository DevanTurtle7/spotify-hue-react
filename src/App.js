import React from 'react';
import ReactDom from 'react-dom';
import './App.css';
import {connectToBridge} from './philipsHue';

class ConnectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: '' }
    this.clickHandler = this.clickHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)

    this.validChars = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'])
  }

  changeHandler(event) {
    var string = event.target.value
    var i = 0

    while (i < string.length) {
      var char = string[i]

      if (!this.validChars.has(char)) {
        // Remove characters that aren't numbers or dots
        string = string.substring(0, i) + string.substring(i + 1, string.length)
      } else if (char === '.' && string[i + 1] === '.') {
        // Remove repeated dots
        string = string.substring(0, i) + string.substring(i + 1, string.length)
      } else {
        i++
      }
    }

    event.target.value = string
    this.setState({ input: event.target.value })
  }

  async clickHandler() {
    var result = await connectToBridge(this.state.input)
  }


  render() {
    return <div id='ConnectPage'>
      <h2>Enter Bridge IP Address</h2>
      <input placeholder='000.000.000.00' onChange={this.changeHandler} /><br></br>
      <button onClick={this.clickHandler}>Connect</button>
    </div>
  }
}

class ErrorPage extends React.Component {
  render() {
    return <h1>Error</h1>
  }
}

function App(props) {
  if (props.status === 'no-ip') {
    return <ConnectPage />
  } else {
    return <ErrorPage />
  }
}

export default App;
