import React, {Component} from 'react';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state={
            firstName: '',
            gender: 'male',
            senioCitizen: false,
            numberOfGuests: 1
        };
        this.handleInputChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(){
        
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
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
                <button onClick={this.submitForm}>Submit</button>
            </form>
        );
    }
}

export default Reservation;