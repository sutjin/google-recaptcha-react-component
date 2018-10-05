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
        token="6Lc7l3MUAAAAAC_SpbFT_U35WCVNQts8UjZdeMQN"
        callback={()=>{ console.log('hello') }}
        onSuccess={(token, callback)=>{ callback(); }}
        isValid={true}
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
