import {ChangeEvent, useEffect, useState} from 'react'
import CountryService from "./services/CountryService.ts";
import Countries from "./Countries.tsx";

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        CountryService.search().then((r: any) => {
            setCountries(r.data);
            setIsLoading(false);
        });
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchTerm(e.target.value);
    }

    function handleShow(c: any) {
        setSearchTerm(c.name.common);
    }

    if (isLoading) {
        return (
            <div>
                loading country data
            </div>
        )
    } else {
        return (
            <div>
                <div>
                    find countries <input value={searchTerm} onChange={handleChange}/>
                </div>
                <div>
                    <Countries handleShow={handleShow}
                               countries={countries.filter((c: any) => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()))}/>
                </div>
            </div>
        )
    }

}


export default App