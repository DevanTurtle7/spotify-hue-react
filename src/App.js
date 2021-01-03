import React from 'react';
import './App.css';

class ConnectPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {input: ''}
    this.clickHandler = this.clickHandler.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.val = ''
  }

  changeHandler(event) {
    this.setState({input: event.target.value})
  }

  clickHandler() {
    console.log(this.state.input)
  }


  render() {
    return <div id='ConnectPage'>
      <h2>Enter Bridge IP Address</h2>
      <input type='number' placeholder='000.000.000.00' onChange={this.changeHandler}/><br></br>
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
  if (props.status == 'no-ip') {
    return <ConnectPage/>
  } else {
    return <ErrorPage/>
  }
}

export default App;
