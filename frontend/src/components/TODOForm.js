import React from 'react'

class TODOForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'project': '',
        'text': '',
        'author': '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleProjectsChange(event) {
        if (!event.target.selectedOptions) {
            return;
        }

        let project = ''
        for(let i = 0; i < event.target.selectedOptions.length; i++) {
            project.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'project': ''
        })
    }

    handleSubmit(event) {
        console.log(this.state.project, this.state.text, this.state.author)
        this.props.createTODO(this.state.project, this.state.text, this.state.author)
        event.preventDefault()
        this.props.history.push('/todos')
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange = {(event) => this.handleChange(event)} />
                <select multiple name="project" onChange = {(event) => this.handleProjectsChange(event)}>
                    {this.props.project.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default withRouter(ProjectForm)
