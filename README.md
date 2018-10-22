
# google-recaptcha-react-module

Easy to use React component to enable Google ReCaptcha for your form


## Using the components
1. install the component to your project
```
$ npm install --save google-recaptcha-react-component
```
2. Import the component
```
// es6
import  ReCaptcha  from  'google-recaptcha-react-component';
```

```
// es5
var ReCaptcha =  require('google-recaptcha-react-component');
```
3. Use it like any other component!
```
render:  function  ()  {
	return  (
		<ReCaptcha ...{props}>
		// Content
		<ReCaptcha />
	);
}
```

### Configuration
Component Props
| Prop Name  |Type | Note|
| ------------- | ------------- | ------------- |
| token  | **Required**. string  |  token given by Google ReCaptcha|
|size|*Optional*. String| set value to "invisible" for invisible ReCaptcha|
| onSuccess  | **Required**. function(token)  | Callback function triggered when ReCaptcha is resolved. *token* is a vlue returned by ReCapthca that you will need to validate.|
|onRef|*Optional*. object| Required if using the invisible ReCaptcha, otherwise it is not needed


### Example
Use for Checkbox ReCaptcha
```
class Parent extends React.Component {
	onSuccess = (token) => {
		// TODO: Validate the token your way and continue process
	}

	render() {
		return (
			<div>
				<ReCaptcha
					token="SAMPLE_TOKEN_FROM_RECAPTCHA"
					onSuccess={this.onSuccess} />
	      </div>
		);
	}
}
```
Use for Invisible ReCaptcha
```
class Parent extends React.Component {
	onClick = () => {
		this.child.execute(); // Triggers Invisible ReCaptcha
	}

	onSuccess = (token) => {
		// TODO: Validate the token your way and continue process
	}

	render() {
		return (
			<div>
				<ReCaptcha
					token="SAMPLE_TOKEN_FROM_RECAPTCHA"
					size="invisible"
					onSuccess={this.onSuccess}
					onRef={ref => (this.child = ref)} />
				<button onClick={this.onClick}>ReCaptcha.method()</button>
	      </div>
		);
	}
}

```
### Get Your ReCaptcha account

Create your ReCaptcha account and follow the instruction [here](https://www.google.com/recaptcha/)

## Whats next?

 - Complete Unit test
 - CSS Override

## Contributing
Please fill any bugs or issue [here](https://github.com/sutjin/google-recaptcha-react-component/issues)
