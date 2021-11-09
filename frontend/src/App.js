import React from 'react'
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import axios from 'axios'

import UsersList from './components/Users.js';
import ProjectsList from './components/Projects.js';
import ProjectTODOsList from './components/ProjectTODOs.js';
import UserTODOList from './components/UserTODO.js';
import TODOList from './components/TODO.js';

import Footer from './components/Footer.js';
import Navbar from './components/Menu.js';
import LoginForm from './components/LoginForm.js';
import ProjectForm from './components/ProjectForm.js';

const NotFound = ({location}) => {
    return (<div>Page not found: {location.pathname}</div>)
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'todos': [],
            'projects': [],
            'token': ''
        }
    }

    getToken(login, password) {
            axios.post('http://127.0.0.1:8000/api-token-auth/', {"username": login, "password": password})
            .then(response => {
                console.log(response.data.token)
                localStorage.setItem('token', response.data.token)
                this.setState({'token': response.data.token}, this.loadData)
            })
            .catch(error => alert("Wrong password"))
        }

    logout() {
            localStorage.setItem('token', '')
            this.setState({'token': ''}, this.loadData)
        }

    isAuthenticated() {
            return !!this.state.token
        }

    getHeaders() {
            if (this.isAuthenticated()) {
                return {'Authorization': 'Token ' + this.state.token}
            }
            return {}
        }

    createTODO(project, text, author) {

            const headers = this.getHeaders()
            axios.post(`http://127.0.0.1:8000/api/projects/`, {'project': project, 'text': text, 'author': author} , {headers})
            .then(response => {
                this.loadData();
            })
            .catch(error => {
                console.log(error)
            })
        }

    deleteTODO(id) {

        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todos/${id}/`, {headers})
        .then(response => {
            this.setState( {
                'todos': this.state.todos.filter((todo) => todo.id != id)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    createProject(title, authors) {

            const headers = this.getHeaders()
            axios.post(`http://127.0.0.1:8000/api/projects/`, {'name': name, 'authors': authors} , {headers})
            .then(response => {
                this.loadData();
            })
            .catch(error => {
                console.log(error)
            })
        }

    deleteProject(id) {

        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
        .then(response => {
            this.setState( {
                'projects': this.state.projects.filter((project) => project.id != id)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    loadData() {
        const headers = this.getHeaders()
          axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data
            this.setState( {
                'users': users
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                'users': []
            })
        })
        axios.get('http://127.0.0.1:8000/api/todos/', {headers})
        .then(response => {
            const todos = response.data
            this.setState( {
                'todos': todos
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                'todos': []
            })
        })
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data
            this.setState( {
                'projects': projects
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                'projects': []
            })
        })
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log(token)
        this.setState({'token': token}, this.loadData)
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/todos'>TODOs</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='/projects/create'>Create project</Link></li>
                            <li>
                                { this.isAuthenticated() ?
                                    <button onClick={()=>this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>
                                }
                            </li>
                        </ul>
                    </nav>

                    <Switch>
                        <Route path='/' exact component={() => <UsersList users = {this.state.users}/>} />
                        <Route path='/login' exact component={() => <LoginForm getToken={(login, password) =>
                        this.getToken(login, password)} />} />
                        <Route path='/todos' exact component={() => <TODOList todos = {this.state.todos} deleteTODO={(id) => this.deleteTODO(id)}/>}/>
                        <Route path='/todos/create' exact component={() => <TODOForm project = {this.state.project} createTODO={(project, text, author) => this.createProject(project, text, author)}/>}/>} />
                        <Route path='/projects' exact component={() => <ProjectsList projects = {this.state.todos} deleteProject={(id) => this.deleteProject(id)}/>}/>} />
                        <Route path='/projects/create' exact component={() => <ProjectForm authors = {this.state.authors} createProject={(name, authors) => this.createProject(name, authors)}/>}/>} />
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
