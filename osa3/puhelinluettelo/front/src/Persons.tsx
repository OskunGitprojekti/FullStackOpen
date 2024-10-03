const Persons = (props: any) => {

    return (
        <div>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {props.persons.filter((p: any) => {
                        if (props.filter === "") {
                            return true;
                        }
                        return p.name?.toLowerCase().includes(props.filter.toLowerCase());
                    }).map((p: any) => {
                        return (
                            <tr key={p._id}>
                                <td>
                                    {p.name}
                                </td>
                                <td>
                                    {p.number}
                                </td>
                                <td>
                                    <button onClick={(e) => props.handleDelete(e, p)}>delete</button>
                                </td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default Persons