const Total = (props: any) => {
    return (
        <p>
            <b>total of {props.parts.reduce((sum: number, current: any) => sum + current.exercises, 0)} exercises</b>
        </p>
    )
}

export default Total;