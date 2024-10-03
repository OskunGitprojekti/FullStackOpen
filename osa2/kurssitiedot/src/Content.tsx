const Content = (props: any) => {
    return (
        <div>
            {props.parts.map((p: any) => {
                return (<p key={p.name}>{p.name} {p.exercises}</p>);
            })}
        </div>
    )
}

export default Content;