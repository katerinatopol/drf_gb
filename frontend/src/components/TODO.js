import React from 'react'

const TODOItem = ({project}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.date_create}</td>
            <td>{todo.data_update}</td>
            <td>{todo.author}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}


const TODOList = ({todos}) => {
    return (
        <table className="table">
            <tr>
                <th>id</th>
                <th>project</th>
                <th>text</th>
                <th>date_create</th>
                <th>data_update</th>
                <th>author</th>
                <th>is_active</th>
                <th>users</th>
                {projects.map((b) => <ProjectItem project={b} />)}
            </tr>
             {todos.map((u) => <TODOItem todo={u} />)}
        </table>
    )
}

export default ProjectList
