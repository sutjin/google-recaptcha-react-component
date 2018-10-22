import React from 'react';
import ReactDOM from 'react-dom';
import ReCaptcha from './src/index.jsx';

class Parent extends React.Component {
  onClick = () => {
      this.child.execute(); // Triggers Invisible ReCaptcha
  }

  onSuccess = (token) => {
    console.log(token);
      // TODO: Validate the token your way and continue process
  }

  render() {
    return (
      <div>
      <ReCaptcha
        token="TEST_TOKEN"
        size="invisible"
        onSuccess={this.onSuccess}
        onRef={ref => (this.child = ref)} />
      <button onClick={this.onClick}>Child.method()</button>
      </div>
    );
  }
}

ReactDOM.render(
  (<div>
    <span>Hello World</span>
    <Parent />
    </div>),
  document.getElementById('app'))
