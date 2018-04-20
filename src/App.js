import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

// function Welcome(props){   //stateless component
//   return <h1>Hello, {props.name}</h1>
// }



// function App() {
//   return (
//     <div>
//       <Welcome name='pawan'/>
//     </div>
//   );
// }

class Welcome extends Component{
  constructor(props){
    super(props);
    this.state = {
      a: 1,
      b: 2
    };
  }

  update(){   
    // this.setState({    //this.props and this.state may be updated asynchronously, we should not rely on their values for calculating the next state. So, it's wrong
    //   a:this.state.a+1+ parseInt(this.props.num+1)
    // });

    // this.setState(function(prevState, props){    //correct
    //   return {
    //     a:prevState.a+1+parseInt(props.num+1,10)
    //   };
    // });

    // this.setState(prevState =>({   //correct
    //   a: prevState.a+1
    // }));

    this.setState((prevState, props)=>({    //correct, using arrow func
      a:prevState.a+1+parseInt(props.num+1,10),
      b:this.state.b+1
    }));

   // this.setState({b:this.state.b+1});  //uncomment and comment the above line which updates 'b', and check the console log.
                                          //state updates are shallow merged, so render() will execute for every setState.
  }
  render(){
    console.log(this.state);
    return <h1>Hello, {this.props.name} - {this.state.a}</h1>
  }

  componentDidMount(){   
    this.updateWelcome = setInterval(
      ()=>this.update(),   
      1000); 
  }
}

function MountBtn(props){
  return(
    <button onClick={props.onClick}>Mount</button>
  )
}

function UnMountBtn(props){
  return(
    <button onClick={props.onClick}>UnMount</button>
  )
}

function ListItem(props){
  const value = props.value;
  return(   //key should not be specified here
    <li>{value}</li>
  )
}

function NumberList(props){
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>  //key is must to know react which el has manipulations.
    <li key={number.toString()}>  
      {number}
    </li>
  );

  const listItems1 = numbers.map((number) =>  //key should specified inside loop.
    <ListItem key={number.toString()} value={number*2}/>
  )
  return(
    <ul>
      {listItems}
      <ul>{listItems1}</ul>
      <span>JSX allows embedding any expressions in curly braces so we could inline the map()</span>
      <ul>
        {numbers.map((number) =>
          <ListItem key={number.toString()}
                    value={number} />

        )}
      </ul>
    </ul>
  );
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMount: false
    };
  }


  mount(){
    ReactDOM.render(<Clock/>,document.getElementById('clock'));
    this.setState({isMount: true});
  }

  unMount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('clock'));
    this.setState({isMount: false});
  }

  render() {
    const btn = this.state.isMount ? (
      <UnMountBtn onClick={this.unMount.bind(this)}/>
    ):(
        <MountBtn onClick={this.mount.bind(this)}/>
    );

  const numbers = [1,2];
  // var divStyle={
  //   color:'white',
  //   backgroundColor:'black'
  // }
    return (    //<div style={divStyle}>
      <div> 
        <Welcome name='pawan' num='0'/>
        {btn}
        <div id='clock'/>
        <span>Keys used within arrays should be unique among their siblings.<br/> However they don’t need to be globally unique.
        <br/>Keys serve as a hint to React but they don’t get passed to your components.<br/> 
        If you need the same value in your component, pass it explicitly as a prop with a different name</span>
        <NumberList numbers={numbers}/>
      </div>
    );
  }
}

class Clock extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    };
  }

  update(){
    //this.state.date=new Date();   //this will not re-render the clock component

    this.setState({   
      date: new Date()
    });
  }

  componentWillMount(){   //lifecycle method
    console.log('componentWillMount');
  }

  render(){
    console.log('render');
    return(
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }

  componentDidMount(){   //lifecycle method
    console.log('componentDidMount');
    //this.tick = setInterval(this.update.bind(this),1000);
    this.tick = setInterval(
      ()=>this.update(),   //ES6 - lambda expression or arrow function
      1000); 
  }

  componentWillUnmount(){   //lifecycle method
    console.log('componentWillUnmount');
    clearInterval(this.tick);   //must, otherwise throws error
  }

  // componentDidUnmount(){     //no such lifecycle method
  //   console.log('componentDidUnMount');
  // }
}

export default App;
