import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const userInputDebounce = useDebounce({ email, password, firstName, middleName, lastName, contactNo }, 2000);
  const [debounceState, setDebounceState] = useState(false);
  const [status, setStatus] = useState('idle');

  const navigate = useNavigate();

  const handleShowPassword = useCallback(() => {
    setIsShowPassword((value) => !value);
  }, [isShowPassword]);

  const handleOnChange = (event, type) => {
    setDebounceState(false);
    setIsFieldsDirty(true);

    switch (type) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'middleName':
        setMiddleName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'contactNo':
        setContactNo(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleRegister = async () => {
    const data = { email, password, firstName, middleName, lastName, contactNo };
    setStatus('loading');
    console.log(data);

    await axios({
      method: 'post',
      url: '/admin/register',
      data,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then((res) => {
        console.log(res);
        navigate('/main/dashboard');
        setStatus('idle');
      })
      .catch((e) => {
        console.log(e);
        setStatus('idle');
        // alert(e.response.data.message);
      });
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div>
              <div className='form-group'>
                <label>E-mail:</label>
                <input
                  type='text'
                  name='email'
                  ref={emailRef}
                  onChange={(e) => handleOnChange(e, 'email')}
                />
              </div>
              {debounceState && isFieldsDirty && email == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>First Name:</label>
                <input
                  type='text'
                  name='firstName'
                  ref={firstNameRef}
                  onChange={(e) => handleOnChange(e, 'firstName')}
                />
              </div>
              {debounceState && isFieldsDirty && firstName == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Middle Name:</label>
                <input
                  type='text'
                  name='middleName'
                  ref={middleNameRef}
                  onChange={(e) => handleOnChange(e, 'middleName')}
                />
              </div>
            </div>
            <div>
              <div className='form-group'>
                <label>Last Name:</label>
                <input
                  type='text'
                  name='lastName'
                  ref={lastNameRef}
                  onChange={(e) => handleOnChange(e, 'lastName')}
                />
              </div>
              {debounceState && isFieldsDirty && lastName == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Contact No:</label>
                <input
                  type='text'
                  name='contactNo'
                  ref={contactNoRef}
                  onChange={(e) => handleOnChange(e, 'contactNo')}
                />
              </div>
              {debounceState && isFieldsDirty && contactNo == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div>
              <div className='form-group'>
                <label>Password:</label>
                <input
                  type={isShowPassword ? 'text' : 'password'}
                  name='password'
                  ref={passwordRef}
                  onChange={(e) => handleOnChange(e, 'password')}
                />
              </div>
              {debounceState && isFieldsDirty && password == '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='show-password' onClick={handleShowPassword}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className='submit-container'>
              <button
                type='button'
                disabled={status === 'loading'}
                onClick={() => {
                  if (status === 'loading') {
                    return;
                  }
                  if (email && password && firstName && lastName && contactNo) {
                    handleRegister({
                      type: 'register',
                      user: { email, password, firstName, middleName, lastName, contactNo },
                    });
                  } else {
                    setIsFieldsDirty(true);
                    if (email == '') {
                      emailRef.current.focus();
                    }
                    if (firstName == '') {
                      firstNameRef.current.focus();
                    }
                    if (lastName == '') {
                      lastNameRef.current.focus();
                    }
                    if (contactNo == '') {
                      contactNoRef.current.focus();
                    }
                    if (password == '') {
                      passwordRef.current.focus();
                    }
                  }
                }}
              >
                {status === 'idle' ? 'Register' : 'Loading'}
              </button>
            </div>
            <div className='login-container'>
              <a href='/login'>
                <small>Already have an account? Login</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
