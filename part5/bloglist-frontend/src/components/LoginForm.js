import propTypes from 'prop-types'
import Notification from './Notification'
import loginLogo from '../login.png'
const LoginForm = ({
    handleSubmit, handleUsernameChange,
    handlePasswordChange,
    username, password,successMessage,errorMessage
}) => {
    return (
        <div className='login-card-container'>
            <div className='login-card'>
                <header className='login-card-header'>
                    <h2 className='login-card-title'>Log in to application</h2>
                    <img src={loginLogo} alt='logo' className='login-card-logo' />
                </header>
                {successMessage && <Notification cls='success' msg={successMessage} />}
                {errorMessage && <Notification cls='error' msg={errorMessage} />}
                <main className='login-card-content'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input name='Username'
                                id='username'
                                value={username} 
                                onChange={handleUsernameChange}
                                type='text'
                                placeholder='enter username here' />
                        </div>
                        <div>
                            <input name='Password' id='password'
                                value={password} 
                                onChange={handlePasswordChange} 
                                type='password' 
                                placeholder='enter password here' />
                        </div>
                        <button type='submit'>login</button>
                    </form>
                </main>
                <footer className='login-card-footer'></footer>
            </div>
        </div>
    )
}

LoginForm.propTypes={
    handleSubmit:propTypes.func.isRequired,
    handlePasswordChange:propTypes.func.isRequired,
    handleUsernameChange:propTypes.func.isRequired,
    username:propTypes.string.isRequired,
    password:propTypes.string.isRequired
}
export default LoginForm