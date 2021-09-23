import React from 'react'
import axios from 'axios'
import UsersList from './components/Users.js';
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
            this.setState( {
                'users': users
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        return (

            <div>
                <Navbar />
                <UsersList users = {this.state.users}/>
                <Footer />
            </div>

        )
    }
}

export default App;
