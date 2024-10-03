const PersonForm = (props: any) => {

    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h2>add a new</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            name:
                        </td>
                        <td>
                            <input value={props.newPerson.name} onChange={(e) => props.handleChangeName(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            number:
                        </td>
                        <td>
                            <input value={props.newPerson.number} onChange={(e) => props.handleChangeNumber(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">add</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )

}

export default PersonForm