import type { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import { setEmail, setFullName, setNickName, setPassword, setConfirm, registerAsync } from './registerSlice';
import { SyntheticEvent, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRegValidation } from '../../hooks/useRegValidation';
import { useNavigate } from 'react-router';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  } from  'mdb-react-ui-kit';
  import  './Register.css';

export function Register() {

    const navigate = useNavigate();

    const validationErrors = useAppSelector((state) => state.register.validationErrors);

    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);


    const dispatch = useAppDispatch();
    useRegValidation();

    useEffect(() => {
        if (loggedInUserId) navigate("/");
    }, [loggedInUserId])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case "email":
                dispatch(setEmail(value));
                break;
            case "fullName":
                dispatch(setFullName(value));
                break;
            case "nickName":
                dispatch(setNickName(value));
                break;
            case "password":
                dispatch(setPassword(value));
                break;
            case "confirm":
                dispatch(setConfirm(value));
                break;
        }
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const inputIsOk = Object.values(validationErrors).every(err => err === "");
        if (inputIsOk) {
            dispatch(registerAsync());
        } else {
            alert("YOU HAVE VALIDATION ERRORS!");
        }
    };



    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
          <div className='mask gradient-custom-3'></div>
          <MDBCard className='m-5' style={{maxWidth: '600px'}}>
            <MDBCardBody className='px-5' >
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>
              <Form.Label className="text-danger">{validationErrors.email}</Form.Label>
              <MDBInput onInput={handleInput} name='email' wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
              <Form.Label className="text-danger">{validationErrors.fullName}</Form.Label>
              <MDBInput onInput={handleInput} name='fullName' wrapperClass='mb-4' label='Full Name' size='lg' id='form1' type='text'/>
              <Form.Label className="text-danger">{validationErrors.nickName}</Form.Label>
              <MDBInput onInput={handleInput} name='nickName' wrapperClass='mb-4' label='Create a nickname' size='lg' id='form1' type='text'/>
              <Form.Label className="text-danger">{validationErrors.password}</Form.Label>
              <MDBInput onInput={handleInput} name='password' wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
              <Form.Label className="text-danger">{validationErrors.confirm}</Form.Label>
              <MDBInput onInput={handleInput} name='confirm' wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password'/>
              <div className='d-flex flex-row justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
              </div>
              <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleSubmit} >Register</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
}