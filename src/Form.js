import React, {Component} from 'react';
import {browserHistory} from 'react-router';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName: '',
            gender: 'male',
            senioCitizen: false,
            numberOfGuests: 1,
            visible: "none"
        };
        this.handleInputChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e){
        e.preventDefault();
        this.setState({
            visible:"block"
        });
    }

    onNavigateHome(){
        browserHistory.push("/home");
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value; //To-Do: not getting checkbox value
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
            <form>
                <label>
                    First Name: 
                    <input name='firstName' type='text' onChange={this.handleInputChange}/>
                </label>
                <label>
                    Gender: 
                    <select name='gender' value={this.state.gender.value} onChange={this.handleInputChange}>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='transGender'>Trans gender</option>
                    </select>
                </label>
                <label>
                    Senior Citizen:
                    <input name='senioCitizen' type='checkbox' checked={this.state.seniorCitizen} onChange={this.handleInputChange}/>
                </label>
                <label>
                    Number of guests:
                    <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange}/>
                </label>
                <br/>
                <button onClick={this.submitForm}>Preview</button>
            </form>
            <hr/>
            <div style={{display:`${this.state.visible}`}}>
                Name: {this.state.firstName}<br/>
                Gender: {this.state.gender}<br/>
                senioCitizen: {this.state.seniorCitizen}<br/>   
                Number of guests: {this.state.numberOfGuests}
            </div>
            <hr/>
            <button className="btn btn-primary" onClick={this.onNavigateHome}>Go Home</button>
            </div>
        );
    }
}

export default Reservation;