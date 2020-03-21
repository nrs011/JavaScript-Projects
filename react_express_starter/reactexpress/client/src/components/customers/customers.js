import React, {Component} from 'react';
import './customers.css';

class Customers extends Component{
    constructor() {
        super();
        this.state = {
            customers: [] //Empty customers array in state
        }
    }
//Runs automatically when the component is run
    componentDidMount() {
        fetch("/api/customers") //Call to our backend
            .then(res => res.json())
            .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers))); //Setting our state
    }

    render() {
        return (
            <div>
                <h2>Customers</h2>
            </div>
        )
    }
}

export default Customers;
