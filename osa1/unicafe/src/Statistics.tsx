import {useState} from "react";
import StatisticsLine from "./StatisticsLine.tsx";
import Button from "./Button.tsx";

const Statistics = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    function incrementGood() {
        setGood(good + 1)
    }

    function incrementNeutral() {
        setNeutral(neutral + 1)
    }

    function incrementBad() {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <span>
                <Button text="good" handleButton={incrementGood}/>
                <Button text="neutral" handleButton={incrementNeutral}/>
                <Button text="bad" handleButton={incrementBad}/>
            </span>

            <h1>statistics</h1>

            {(good + neutral + bad) > 0 ? (
                <table>
                    <tbody>
                        <StatisticsLine text="good" value={good}/>
                        <StatisticsLine text="neutral" value={neutral}/>
                        <StatisticsLine text="bad" value={bad}/>
                        <StatisticsLine text="all" value={good + neutral + bad}/>
                        <StatisticsLine text="average" value={(good + (bad * -1)) / (good + neutral + bad)}/>
                        <StatisticsLine text="positive" value={(good / (good + neutral + bad)) * 100 + "%"}/>
                    </tbody>
                </table>
            ) : (
                <div>
                    No feedback given
                </div>
            )}

        </div>
    )
}

export default Statistics