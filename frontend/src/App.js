import React from 'react'
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import axios from 'axios'

import UsersList from './components/Users.js';
import ProjectsList from './components/Projects.js';
import ProjectTODOsList from './components/ProjectUsers.js';
import UserTODOList from './components/UserTODO.js';
import TODOList from './components/TODO.js';

import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'

const NotFound = ({location}) => {
    return (<div>Page not found: {location.pathname}</div>)
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todos': [],
            'projects': []
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
                axios.get('http://127.0.0.1:8000/api/todos/')
        .then(response => {
            const todos = response.data
            this.setState( {
                'todos': todos
            })
        })
        .catch(error => console.log(error))
                axios.get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
            const projects = response.data
            this.setState( {
                'projects': projects
            })
        })
        .catch(error => console.log(error))
    }


export default App;

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/todos'>TODOs</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path='/' exact component={() => <UsersList users = {this.state.users}/>} />
                        <Route path='/todos' exact component={() => <TODOList todos = {this.state.todos}/>} />
                        <Route path='/projects' exact component={() => <ProjectsList todos = {this.state.todos}/>} />
                        <Route path='/project/:id' component={() => <ProjectTODOsList todos = {this.state.todos}/>} />
                        <Route path='/user/:id' component={() => <UserTODOList todos = {this.state.todos}/>} />
                        <Redirect from='/users' to='/' />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
