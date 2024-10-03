import {useState} from 'react'

const App = () => {
    const anecdoteData = [
        new Anecdote('If it hurts, do it more often.'),
        new Anecdote('Adding manpower to a late software project makes it later!'),
        new Anecdote('The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.'),
        new Anecdote('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'),
        new Anecdote('Premature optimization is the root of all evil.'),
        new Anecdote('Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'),
        new Anecdote('Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'),
        new Anecdote('The only way to go fast, is to go well.')
    ]

    const [anecdotes, setAnecdotes] = useState(anecdoteData);
    const [selected, setSelected] = useState(0);

    function selectRandom() {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    function voteSelected() {
        const tempAnecdotes = anecdotes.slice();
        tempAnecdotes[selected].incrementVotes();
        setAnecdotes(tempAnecdotes);
    }

    function getMostVoted() {
        return anecdotes.reduce((acc, value) => {
            return acc.votes > value.votes ? acc : value;
        })
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <div>
                {anecdotes[selected].text}
            </div>
            <div>
                has {anecdotes[selected].votes} votes
            </div>
            <span>
                <button onClick={voteSelected}>vote</button>
                <button onClick={selectRandom}>next anecdote</button>
            </span>

            <h1>Anecdote with most votes</h1>
            <div>{getMostVoted().text}</div>
            <div>has {getMostVoted().votes} votes</div>
        </div>
    )
}

class Anecdote {
    text: string;
    votes: number;

    constructor(text: string) {
        this.text = text;
        this.votes = 0;
    }

    incrementVotes() {
        this.votes++;
    }
}

export default App