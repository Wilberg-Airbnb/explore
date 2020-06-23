import React from 'react';
import ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      console.log()
  }

  render() {
    return (
      <div>
        <h1>HELLO WORLD</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('explore'));