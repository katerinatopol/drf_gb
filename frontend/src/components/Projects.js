import React from 'react'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td>{project.users}</td>
            <td><button type='button' onClick={()=>deleteProject(project.id)}>Delete</button></td>
        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>id</th>
            <th>name</th>
            <td>{project.repository}</td>
            <th>users</th>
            {projects.map((b) => <ProjectItem project={b} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList