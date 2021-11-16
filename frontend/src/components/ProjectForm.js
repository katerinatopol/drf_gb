import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'authors': [],
            'todos': []
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAuthorsChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let authors = []
        for(let i = 0; i < event.target.selectedOptions.length; i++) {
            authors.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            ['authors']: authors
        })
    }


    handleSubmit(event) {
        console.log(this.state.name, this.state.authors)
        this.props.createProject(this.state.name, this.state.authors)
        event.preventDefault()
        this.props.history.push('/projects')
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange = {(event) => this.handleChange(event)} />
                <select multiple name="authors" onChange = {(event) => this.handleAuthorsChange(event)}>
                    {this.props.authors.map((author) => <option value={author.id}>{author.first_name} {author.last_name} </option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default withRouter(ProjectForm)
