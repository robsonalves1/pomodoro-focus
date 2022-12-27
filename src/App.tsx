import React from 'react';
import logo from './logo.svg';
import { useState } from "react";
import './App.scss'
import { start } from 'repl';

function MainNav(props: any) {
  return (
    <nav className="main-nav">
      <a id='nav-logo'>
        <img
          src="https://pomofocus.io/icons/icon-white.png"
          alt="check icon"
          id="check-icon"
        />
        Pomodoro Focus
      </a>
      <button
        id="settings"
        onClick={props.settings}
      >
        <img
          src="https://pomofocus.io/icons/config-white.png"
          id="settings-icon"
        />
      </button>
    </nav>

  );
}

function PomoTime(props: any) {
  // const btnFocus =
  //   <button
  //     className="btn-focus-break-time"
  //     onClick={props.foc}
  //   >
  //     Focus
  //   </button>;

  // const btnFocusClicked =
  //   <button
  //     className="btn-focus-break-time clicked"
  //     onClick={props.foc}
  //   >
  //     Focus
  //   </button>;

  // const btnBreak =
  //   <button
  //     className="btn-focus-break-time"
  //     onClick={props.foc}
  //   >
  //     Break
  //   </button>;

  // const btnBreakClicked =
  //   <button
  //     className="btn-focus-break-time"
  //     onClick={props.foc}
  //   >
  //     Break
  //   </button>

  return (
    <div id="div-time">

      <div id="div-btn-focus-break">
        <button
          id="btn-focus-time"
          className="btn-focus-break-time clicked"
          onClick={props.foc}
        >
          Focus
        </button>
        <button
          id="btn-break-time"
          className="btn-focus-break-time clicked"
          onClick={props.foc} 
        >
          Break
        </button>
      </div>
      {
        (props.sec < 10) ? <div className="time-left">{props.min}:0{props.sec}</div>
          : <div className="time-left">{props.min}:{props.sec}</div>
      }

      <div id="div-btn-play-pause">
        <button
          className="btn-play-pause"
          onClick={props.play}
        >
          Start
        </button>
        <button
          className="btn-play-pause"
          onClick={props.pause}
        >
          Pause
        </button>
      </div>
    </div>
  )
}

function PomoSettings(props: any) {
  // const [defaultMinValue, setDefaultMinValue] = useState<number>();

  return (
    <div id='div-settings'>
      <h1>Timer Settings</h1>

      <div id='div-min-sec'>

        <div id="div-focus">
          <span>Focus</span>
          <input
            id='focus-value'
            className="input-min-sec-values"
            type='number'
            min={0}
            max={60}
            step={1}
            onChange={props.min}
          >
          </input>
        </div>

        <div id="div-break">
          <span>Break</span>
          <input
            id='break-value'
            className="input-min-sec-values"
            type='number'
            min={0}
            max={60}
            step={1}
            onChange={props.min}
          >
          </input>
        </div>

      </div>

    </div>
  );
}

function App() {
  const [minutes, setMinute] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [focus, setFocus] = useState<boolean>(true);
  const [play, setPlay] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [focusMin, setFocusMin] = useState<number>(25);
  const [breakMin, setBreakMin] = useState<number>(5);

  const timeout = setTimeout(() => {
    if (play) {
      if (seconds == 0) {
        setSeconds(59);
        setMinute(minutes - 1);
      } else {
        setSeconds(seconds - 1);
      }
    }
  }, 1000);

  const Play = (): void => {
    setPlay(!play);
  }

  const Pause = (): void => {
    setPlay(!play);
  }

  const Settings = (): void => {
    setSettings(!settings);
  }

  const incDecMin = (elem: any): void => {
    setMinute(elem.target.value)

    if (elem.target.id == "focus-value") {
      setFocusMin(elem.target.value);
    } else {
      setBreakMin(elem.target.value);
    }
  }

  const Focus = (elem: any): void => {
    setFocus(!focus);

    if (elem.target.id == "btn-focus-time") {
      setMinute(focusMin);
      setSeconds(0);
    } else if (elem.target.id == "btn-break-time") {
      setMinute(breakMin);
      setSeconds(0);
    }
  }

  return (
    <div className="App">
      <MainNav
        settings={Settings}
      />
      <PomoTime
        min={minutes}
        sec={seconds}
        foc={Focus}
        play={Play}
        pause={Pause}
      />
      {(settings) && <PomoSettings min={incDecMin} sec={setSeconds} />}

    </div>
  );
}

export default App;
