import Weather from "./Weather.tsx";

const Countries = (props: any) => {

    if (props.countries == null || props.countries.length == 0) {
        return;
    }

    if (props.countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (props.countries.length > 1) {
        return (
            <div>
                {props.countries.map((c: any) => {
                    return <div key={c.name.common}>{c.name.common}
                        <button onClick={() => props.handleShow(c)}>show</button>
                    </div>
                })}
            </div>
        )
    } else {
        return (
            <div>
                <h1>{props.countries[0].name.common}</h1>
                <div>{props.countries[0].capital}</div>
                <div>area {props.countries[0].area}</div>
                <h2>languages</h2>
                <ul>
                    {Object.keys(props.countries[0].languages).map((l: any) => {
                        return <li key={l}>{props.countries[0].languages[l]}</li>
                    })}
                </ul>
                <img src={props.countries[0].flags.png}/>
                <Weather country={props.countries[0]}/>
            </div>
        )
    }
}

export default Countries