import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import Filter from "./Filter.tsx";
import PersonForm from "./PersonForm.tsx";
import Persons from "./Persons.tsx";
import Notification from "./Notification.tsx";
import PersonService from "./services/PersonService.ts";

const App = () => {
    const [persons, setPersons] = useState<Person[]>([])
    const [newPerson, setNewPerson] = useState(new Person())
    const [filter, setFilter] = useState("")
    const [notificationMessage, setNotificationMessage] = useState("")
    const [notificationIsError, setNotificationIsError] = useState(false)


    useEffect(() => {
        PersonService.getAll().then(r => {
            setPersons(r.data);
        });
    });

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        let existingPerson = persons.find((p) => p.name === newPerson.name);
        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                existingPerson.number = newPerson.number;
                PersonService.update(existingPerson.id, existingPerson).then(() => {
                    PersonService.getAll().then(r => {
                        setPersons(r.data);
                        setNotificationMessage(`Number ${existingPerson.number} was updated for ${existingPerson.name}`);
                        setNotificationIsError(false);
                        setTimeout(() => {
                            setNotificationMessage("");
                        }, 5000);
                    });
                });
            }
            return;
        }
        if (newPerson.id === "") {
            newPerson.id = String(persons.length + 1);
        }
        PersonService.create(newPerson).then(() => {
            PersonService.getAll().then(r => {
                setPersons(r.data);
                setNotificationMessage(`${newPerson.name} was created`);
                setNotificationIsError(false);
                setTimeout(() => {
                    setNotificationMessage("");
                }, 5000);
            });
        });
    }

    function handleDelete(event: FormEvent, p: Person) {
        event.preventDefault()
        if (window.confirm(`Delete ${p.name} ${p.id}`)) {
            PersonService.drop(p.id).then(() => {
                PersonService.getAll().then(r => {
                    setPersons(r.data);
                    setNotificationMessage(`${p.name} was deleted`);
                    setNotificationIsError(false);
                    setTimeout(() => {
                        setNotificationMessage("");
                    }, 5000);
                });
            }).catch(e => {
                if (e.response.status == 404) {
                    setNotificationIsError(true);
                    setNotificationMessage(`Information of ${p.name} has already been removed from server`);
                }
            });
        }
    }

    function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
        const tempPerson = structuredClone(newPerson);
        tempPerson.name = e.target.value;
        setNewPerson(tempPerson);
    }

    function handleChangeNumber(e: ChangeEvent<HTMLInputElement>) {
        const tempPerson = structuredClone(newPerson);
        tempPerson.number = e.target.value;
        setNewPerson(tempPerson);
    }

    function handleChangeFilter(e: ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notificationMessage} isError={notificationIsError}/>
            <Filter filter={filter} handleChange={handleChangeFilter}/>
            <PersonForm newPerson={newPerson} handleChangeName={handleChangeName}
                        handleChangeNumber={handleChangeNumber} handleSubmit={handleSubmit}/>
            <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
        </div>
    )

}

class Person {
    name: string;
    number: string;
    id: string;

    constructor(name: string = "", number: string = "", id: string = "") {
        this.name = name;
        this.number = number;
        this.id = id;
    }

}

export default App