import React from 'react';
import logo from './logo.svg';
import './App.css';

class ConnectPage extends React.Component {
  render() {
    return <h1>Hello</h1>
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
