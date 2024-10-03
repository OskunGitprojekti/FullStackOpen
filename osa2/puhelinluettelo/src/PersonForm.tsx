const PersonForm = (props: any) => {

    return (
        <form onSubmit={(e) => props.handleSubmit(e)}>
            <h2>add a new</h2>
            <div>
                name: <input value={props.newPerson.name} onChange={(e) => props.handleChangeName(e)}/>
            </div>
            <div>
                number: <input value={props.newPerson.number} onChange={(e) => props.handleChangeNumber(e)}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm