import propTypes from 'prop-types'
import loginLogo from '../login.png'
const LoginForm = (props) => {
  return (
    <div className='login-card-container loginForm'>
      <div className='login-card'>
        <header className='login-card-header'>
          <h2 className='login-card-title'>Log in to application</h2>
          <img src={loginLogo} alt='logo' className='login-card-logo' />
        </header>

        <main className='login-card-content'>
          <form onSubmit={props.handleSubmit}>
            <div>
              <input name='Username'
                id='username'
                value={props.username}
                onChange={props.handleUsernameChange}
                type='text'
                placeholder='enter username here' />
            </div>
            <div>
              <input name='Password' id='password'
                value={props.password}
                onChange={props.handlePasswordChange}
                type='password'
                placeholder='enter password here' />
            </div>
            <button id='loginBtn' type='submit'>login</button>
          </form>
        </main>
        <footer className='login-card-footer'></footer>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
}
export default LoginForm