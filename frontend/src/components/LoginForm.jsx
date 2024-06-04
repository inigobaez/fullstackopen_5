import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({ username, password })

  }
  return <>

    <form data-testid='loginForm' onSubmit={handleLogin}>
      <span>loginform</span>
      <div>
        <label htmlFor='username'>Username</label>
        <input data-testid='username' type='text' name='username' value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input data-testid='password' type='password' name='password' value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>Login</button>
    </form>
  </>
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}
export default LoginForm