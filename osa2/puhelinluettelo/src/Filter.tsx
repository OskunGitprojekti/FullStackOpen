const Filter = (props: any) => {
    return (
        <div>
            filter shown with <input value={props.filter} onChange={(e) => props.handleChange(e)}/>
        </div>
    )

}

export default Filter