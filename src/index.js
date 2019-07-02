import React from 'react'
import ReactDOM from 'react-dom'

// import { StateProvider } from 'modules/store'

import App from './App'
import * as serviceWorker from './serviceWorker'

import './index.css'

// const initialState = {
//   users: []
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'changeUsers':
//       return {
//         ...state,
//         users: action.users
//       }
      
//     default:
//       return state
//   }
// }

ReactDOM.render(
  // <StateProvider initialState={initialState} reducer={reducer}>
    <App />,
  // </StateProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
