import React from 'react';
import ReactDOM from 'react-dom';
import ReCaptcha from './components/index.jsx';

console.log(ReCaptcha.execute);

ReactDOM.render(
  (<div>
    <span>Hello World</span>
    <ReCaptcha token="abcd" callback={()=>{ console.log('hello') }} onSuccess={()=>{ console.log('') }} isValid={true} />
    </div>),
  document.getElementById('app'))
