import { navigate } from 'gatsby-link'
import React from 'react'
import { getUser, isLoggedIn, logout } from '../services/auth'
import Login from './login'

const NavBar = props => {
  let greetingMessage = ''
  if (isLoggedIn()) {
    greetingMessage = `Hello, ${getUser().name}.`
  } else {
    greetingMessage = 'You are not logged in'
  }
  return (
    <nav
      className="navigation-bar"
      style={props.timeout ? { display: 'none' } : {}}
    >
      <ul>
        |
        <li>
          {/* If userName.name isn't true, then don't allow user to view profile */}{' '}
          {!getUser().name ? (
            <span className="nav-button">{greetingMessage}</span>
          ) : (
            <span
              onClick={() => props.onOpenArticle('profile')}
              className="nav-button"
            >
              {greetingMessage}
            </span>
          )}
        </li>
        |
        <li>
          {!isLoggedIn() ? (
            <p
              className="nav-button"
              onClick={() => props.onOpenArticle('login')}
            >
              Log in{' '}
            </p>
          ) : (
            <p
              className="nav-button"
              onClick={() => logout(() => navigate('/'))}
            >
              Sign Out
            </p>
          )}
        </li>
        |
        <li>
          <p
            className="nav-button"
            onClick={() => {
              props.onOpenArticle('rep-saved')
            }}
          >
            Saved
          </p>
        </li>
        |
      </ul>
    </nav>
  )
}

export default NavBar
