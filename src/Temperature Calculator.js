import React, {Component} from 'react';

const scaleNames={
    c: 'celsius',
    f: 'fahrenheit'
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
  
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onTempChange(e.target.value);
    }

    render(){
        var tempInputStyle = {
            width:'250px'
        }
        const scale = this.props.scale;
        const temperature = this.props.temp;
        return(
            <fieldset style={tempInputStyle}>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

class TemperatureCalculator extends Component{
    constructor(props){
        super(props);
        this.state={    //define state here for single source of truth, so that both the input would be in sync.
            scale: 'c', 
            temp: ''
        };//sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”.
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }

    handleCelsiusChange(temp) {
        this.setState({scale: 'c', temp});  //another way to update state, where passed var should be of same name
      }
    
      handleFahrenheitChange(t) {
        this.setState({scale: 'f', temp:t});
      }

    render(){
        const scale = this.state.scale;
        const temp = this.state.temp;
        const celsius = scale === 'f' ? tryConvert(temp, toCelsius) : temp;
        const fahrenheit = scale === 'c' ? tryConvert(temp, toFahrenheit) : temp;
        return(     //passing state as props
            <div>
                <TemperatureInput scale='c' temp={celsius} onTempChange={this.handleCelsiusChange}/>
                <TemperatureInput scale='f' temp={fahrenheit} onTempChange={this.handleFahrenheitChange}/>
            </div>
        );
    }
}

export default TemperatureCalculator;