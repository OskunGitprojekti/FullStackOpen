const Total = (props: any) => {
    return (
        <p>
            Number of exercises {props.parts.reduce((sum: number, current: any) => sum + current.exercises, 0)}
        </p>
    )
}

export default Total;