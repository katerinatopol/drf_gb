import React from 'react'
import {useParams} from 'react-router-dom'


const TODOItem = ({user}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>{todo.date_create}</td>
            <td>{todo.data_update}</td>
        </tr>
    )
}

const ProjectTODOsList = ({todos}) => {
    let { id } = useParams()
    let filtered_todos = todos.filter((todo) => todo.users.includes(parseInt(id)))

    return (
        <table>
            <th>id</th>
            <th>name</th>
            <th>todos</th>
            {filtered_todos.map((b) => <TODOItem todo={b} />)}
        </table>
    )
}

export default ProjectTODOsList
