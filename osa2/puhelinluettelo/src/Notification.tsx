const Notification = (props: any) => {
    if (props.message === "") {
        return null
    }

    return (
        <div>
            {(props.isError) ? (
                <div className="error">
                    {props.message}
                </div>
            ) : (
                <div className="success">
                    {props.message}
                </div>
            )}
        </div>
    )
}

export default Notification