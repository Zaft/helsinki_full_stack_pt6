import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {

    const Button = (props) => {
        return (
            <button onClick={props.handleClick}>
            {props.text}
            </button>
        )
    }

    const handleClick = (title) => {
        switch(title) {
            case "good":
                store.dispatch({type: 'GOOD', payload: {}})
                break
            case "neutral":
                store.dispatch({type: 'OK', payload: {}})
                break
            case "bad":
                store.dispatch({type: 'BAD', payload: {}})
                break
            case "reset":
                store.dispatch({type: 'ZERO', payload: {}})
            default:
        }
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => handleClick("good")} text="good"/>
            <Button handleClick={() => handleClick("neutral")} text="neutral"/>
            <Button handleClick={() => handleClick("bad")} text="bad"/>
            <Button handleClick={() => handleClick("reset")} text="reset stats"/>
            <div>good {store.getState().good}</div>
            <div>ok {store.getState().ok}</div>
            <div>bad {store.getState().bad}</div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
  }
  renderApp()
  store.subscribe(renderApp)