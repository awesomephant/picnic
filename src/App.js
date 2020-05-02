import React from 'react';
import ModeSwitch from './ModeSwitch';
import Editor from './Editor';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      mode: 'editing'
    }
  }
  render() {

    return (
      <div className="app">
        <header className="app-header"><h1>Editor</h1></header>
        <ModeSwitch></ModeSwitch>
        <Editor></Editor>
      </div>
    );
  }
}

export default App;
