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
        this.setState({temp:e.target.value});
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
        this.state={
            scale: 'c',
            temp: ''
        };
        this.handleTempChange = this.handleTempChange.bind(this);
    }

    handleTempChange(e){
        const scale = e.target.scale;
        if(scale==='c'){
            this.setState({scale: 'c',temp:e.target.temp});
        }
        else{
            this.setState({scale: 'f', temp:e.target.temp});
        }
    }

    render(){
        const scale = this.state.scale;
        const temp = this.state.temp;
        const celsius = scale === 'c' ? temp : tryConvert(temp, toCelsius);
        const fehrenheit = scale === 'f' ? temp : tryConvert(temp, toFahrenheit);
        return(
            <div>
                <TemperatureInput scale='c' temp={celsius} onChange={this.handleTempChange}/>
                <TemperatureInput scale='f' temp={fehrenheit} onChange={this.handleTempChange}/>
            </div>
        );
    }
}

export default TemperatureCalculator;