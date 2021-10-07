import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td>{project.users}</td>
        </tr>
    )
}


const ProjectList = ({projects}) => {
    return (
        <table>
            <th>id</th>
            <th>name</th>
            <td>{project.repository}</td>
            <th>users</th>
            {projects.map((b) => <ProjectItem project={b} />)}
        </table>
    )
}

export default ProjectList