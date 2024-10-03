const Persons = (props: any) => {

    return (
        <div>
            <h2>Numbers</h2>
            {props.persons.filter((p: any) => {
                if (props.filter === "") {
                    return true;
                }
                return p.name?.toLowerCase().includes(props.filter.toLowerCase());
            }).map((p: any) => {
                return (
                    <div key={p.name}>
                        {p.name} {p.number}
                        <button onClick={(e) => props.handleDelete(e, p)}>delete</button>
                    </div>)
            })}
        </div>
    )

}

export default Persons