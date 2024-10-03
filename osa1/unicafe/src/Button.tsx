const Button = (props: any) => {
    return (
        <button onClick={() => props.handleButton()}>{props.text}</button>
    )
}

export default Button