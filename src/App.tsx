import React from 'react';
import { useState } from "react";
import './App.scss'


interface MainNavProps {
  settings: React.MouseEventHandler<HTMLButtonElement>
}

interface PomoTimeProps {
  foc: React.MouseEventHandler<HTMLButtonElement>;
  clicked: boolean;
  running: boolean;
  play: React.MouseEventHandler<HTMLButtonElement>;
  pause: React.MouseEventHandler<HTMLButtonElement>;
  min: number;
  sec: number;
}

interface PomoSettingsProps {
  settings: React.MouseEventHandler<HTMLAnchorElement>;
  min: React.ChangeEventHandler<HTMLInputElement>;
  sec: React.Dispatch<React.SetStateAction<number>>;
  foc: any;
}

function MainNav({ settings }: MainNavProps) {
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
      <div id="div-btn-main-nav">
        <button
          id="btn-settings"
          className="btn-main-nav"
          onClick={settings}
        >
          <img
            src="https://pomofocus.io/icons/config-white.png"
            id="settings-icon"
          />
        </button>
        <button
          id="btn-profile"
          className="btn-main-nav"
        >
          <img
            src="https://pomofocus.io/icons/user-white.png"
            id="profile-icon"
            alt="profile icon"
          />
        </button>
      </div>


    </nav>

  );
}

function PomoTime(props: PomoTimeProps) {
  const btnFocusClicked =
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
        className="btn-focus-break-time "
        onClick={props.foc}
      >
        Break
      </button>
    </div>;

  const btnBreakClicked =
    <div id="div-btn-focus-break">
      <button
        id="btn-focus-time"
        className="btn-focus-break-time"
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
    </div>;

  return (
    <div id="div-time">

      {
        (props.clicked)
          ? btnFocusClicked
          : btnBreakClicked
      }

      {
        (props.sec < 10)
          ? <div className="time-left">{props.min}:0{props.sec}</div>
          : <div className="time-left">{props.min}:{props.sec}</div>
      }

      {
        (props.running && props.play)
          ? <div id="div-btn-play-pause">
            <button
              className="btn-play-pause clicked"
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
          : <div id="div-btn-play-pause">
            <button
              className="btn-play-pause"
              onClick={props.play}
            >
              Start
            </button>
            <button
              className="btn-play-pause clicked"
              onClick={props.pause}
            >
              Pause
            </button>
          </div>
      }

    </div>
  )
}

const PomoSettings = (props: PomoSettingsProps) => {
  return (
    <div id='div-settings'>
      <a onClick={props.settings}>
        <img
          id="btn-close"
          src="https://pomofocus.io/icons/remove-black-sm.png"
          alt="close window button"
        />
      </a>
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
      if (seconds == 0 && minutes != 0) {
        setSeconds(59);
        setMinute(minutes - 1);
      } else if (seconds != 0 && minutes >= 0) {
        setSeconds(seconds - 1);
      } else if (seconds == 0 && minutes == 0) {
        setFocus(!focus);
        switch (focus) {
          case true:
            setMinute(focusMin);
            setSeconds(0);
            break;

          case false:
            setMinute(breakMin);
            break;
        }
      }
    }
  }, 1000);

  const Play = (): void => {
    setPlay(true);
  }

  const Pause = (): void => {
    setPlay(false);
  }

  const Settings = (): void => {
    setSettings(!settings);
  }

  const incDecMin = (elem: any): void => {
    setMinute(elem.target.value);

    if (elem.target.id == "focus-value") {
      setFocusMin(elem.target.value);
      setFocus(true);
    } else {
      setBreakMin(elem.target.value);
      setFocus(false);
    }
  }

  const Focus = (elem: any): void => {
    setPlay(false);

    if (elem.target.id == "btn-focus-time") {
      setFocus(true);
      setMinute(focusMin);
      setSeconds(0);
    } else if (elem.target.id == "btn-break-time") {
      setFocus(false);
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
        clicked={focus}
        play={Play}
        pause={Pause}
        running={play}
      />
      {(settings) && <PomoSettings min={incDecMin} sec={setSeconds} settings={Settings} foc={Focus} />}

    </div>
  );
}

export default App;
