import { useRef, useEffect, useState } from "react";
import SectionCounter from "./SectionCounter";

export default function AutoIncrementCounter() {
  const [counter, setCounter] = useState(0);
  const [autoIncrementValue, setAutoIncrementValue] = useState(0);
  const counterVal = useRef(1);
  const inputVal = useRef(null);

  const handleIncrementDecrement = (isIncrement) => {
    counterVal.current = isIncrement
      ? parseInt(counterVal.current) + 1
      : parseInt(counterVal.current) - 1;
    inputVal.current.value = parseInt(counterVal.current);
  };

  const handleInputValue = (element, setValue) => {
    if (element.target.value >= 1) {
      setValue(Number(element.target.value));
      element.target.value = Number(element.target.value);
    } else {
      setValue(1);
    }
  };

  useEffect(() => {
    let timerId;
    if (autoIncrementValue > 0) {
      timerId = setInterval(() => {
        setCounter((count) => count + parseInt(counterVal.current));
      }, autoIncrementValue * 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [autoIncrementValue]);

  const handleIncrementValue = (e) => {
    if (parseInt(e.target.value) < 0 || isNaN(parseInt(e.target.value))) {
      e.target.value = 0;
    } else {
      e.target.value = Number(e.target.value);
    }
    counterVal.current = e.target.value;
  };

  return (
    <>
      {/* counter header */}
      <div className="appHeader">
        <h1 className="appHeading">Counter : {counter}</h1>
      </div>
      <div className="appHeader">
        <h6 className="appHeading">Increment/Decrement Counter</h6>
      </div>
      <div className="appHeader">
        <button
          className="appButton"
          disabled={counter <= 1 ? true : false}
          onClick={() => {
            setCounter(counter - parseInt(inputVal.current.value));
          }}
        >
          -
        </button>
        <input
          className="counterInput"
          min={1}
          type="number"
          onChange={(e) => {
            handleInputValue(e, setCounter);
          }}
          value={counter}
        />
        <button
          className="appButton"
          onClick={() => {
            setCounter(counter + parseInt(inputVal.current.value));
          }}
        >
          +
        </button>
      </div>

      {/* Value by which counter Increment/Decrement */}
      <div className="appHeader">
        <h6 className="appHeading">
          Value by which counter Increment/Decrement
        </h6>
      </div>
      <div className="appHeader">
        <button
          className="appButton"
          disabled={parseInt(counterVal.current) <= 1 ? true : false}
          onClick={() => {
            handleIncrementDecrement(false);
          }}
        >
          -
        </button>
        <input
          ref={inputVal}
          className="counterInput"
          min={1}
          type="number"
          onChange={(e) => {
            handleIncrementValue(e);
          }}
          defaultValue={counterVal.current}
        />
        <button
          className="appButton"
          onClick={() => {
            handleIncrementDecrement(true);
          }}
        >
          +
        </button>
      </div>

      {/* Increment/Decrement Counter Time */}
      <div className="appHeader">
        <h6 className="appHeading">Increment/Decrement Counter Time</h6>
      </div>
      <div className="appHeader">
        <SectionCounter
          valueSetter={setAutoIncrementValue}
          inputValue={autoIncrementValue}
          incDecValue={1}
          min={0}
          type="number"
        ></SectionCounter>
      </div>
    </>
  );
}
