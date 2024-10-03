import Header from "./Header.tsx";
import Content from "./Content.tsx";
import Total from "./Total.tsx";

const Course = (props: any) => {
    return (
        <div>
            <Header course={props.name}/>
            <Content parts={props.parts}/>
            <Total parts={props.parts}/>
        </div>
    )
}

export default Course;