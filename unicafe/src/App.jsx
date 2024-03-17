import { useState } from "react";

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};

const StaticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statics = (props) => {
  return (
    <div>
      <h1>Statics</h1>
      {props.all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StaticsLine text="good" value={props.good} />
            <StaticsLine text="neutral" value={props.neutral} />
            <StaticsLine text="bad" value={props.bad} />
            <StaticsLine text="all" value={props.all} />
            <StaticsLine text="average" value={props.average} />
            <StaticsLine text="positive" value={props.positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState([]);
  const [positive, setPositive] = useState(0);

  const calcAverage = () => {
    if (average.length === 0) return 0;
    const sum = average.reduce((total, element) => total + element, 0);
    const newAverage = sum / average.length;
    return newAverage.toFixed(1);
  };

  const calcPositives = () => {
    if (average == 0) return "0%";
    const result = (positive / average.length) * 100;
    return `${result.toFixed(1)}%`;
  };

  const handleAverage = (num) => {
    const newAverage = average.concat(num);
    setAverage(newAverage);
  };

  const handleGoodClick = () => {
    setGood(good + 1);
    handleAverage(+1);
    setPositive(positive + 1);
  };

  const handleNeutralCLick = () => {
    setNeutral(neutral + 1);
    handleAverage(0);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    handleAverage(-1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handler={handleGoodClick} text="good" />
        <Button handler={handleNeutralCLick} text="neutral" />
        <Button handler={handleBadClick} text="bad" />
      </div>
      <Statics
        good={good}
        neutral={neutral}
        bad={bad}
        all={bad + neutral + good}
        average={calcAverage()}
        positive={calcPositives()}
      />
    </div>
  );
};

export default App;
