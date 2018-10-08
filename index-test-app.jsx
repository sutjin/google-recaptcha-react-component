import React from 'react';
import ReactDOM from 'react-dom';
import ReCaptcha from './components/index.jsx';

class Parent extends React.Component {
  onClick = () => {
    this.child.execute();
  }

  render() {
    return (
      <div>
      <ReCaptcha
        token="TEST_ACCOUNT"
        onSuccess={(token, callback)=>{ callback(); }}
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
