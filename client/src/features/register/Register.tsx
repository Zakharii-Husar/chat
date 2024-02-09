import type { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import { setEmail, setFullName, setNickName, setPassword, setConfirm } from './registerSlice';
import { SyntheticEvent, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useRegValidation } from './useRegValidation';
import { useNavigate } from 'react-router';

export function Register() {

    const navigate = useNavigate();

    const {
        email,
        fullName,
        nickName,
        password,
        confirm,
        validationErrors
    } = useAppSelector((state: RootState) => state.register);


    const dispatch = useAppDispatch();
    useRegValidation();

    useEffect(()=>{
    }, [email])

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

    
    async function createUser() {
        const response = await fetch("http://localhost:5190/api/CreateUser",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                UserName: nickName,
                Email: email,
                FullName: fullName,
                PasswordHash: password
              }),
              credentials: 'include',
        });

        if (response.ok) {
            navigate("/");
        } else {
            alert("REGISTRATION FAILED!!!");
        }
      }

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        createUser();
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor='email'>Email:</label>
                <input name='email' onInput={handleInput} type='text' />
                <Form.Label className="text-danger">{validationErrors.email}</Form.Label>

                <label htmlFor='fullName'>Full Name:</label>
                <input name='fullName' onInput={handleInput} type='text' />
                <Form.Label className="text-danger">{validationErrors.fullName}</Form.Label>

                <label htmlFor='nickName'>Nick Name:</label>
                <input name='nickName' onInput={handleInput} type='text' />
                <Form.Label className="text-danger">{validationErrors.nickName}</Form.Label>

                <label htmlFor='password'>Password:</label>
                <input name='password' onInput={handleInput} type='password' />
                <Form.Label className="text-danger">{validationErrors.password}</Form.Label>

                <label htmlFor='confirm'>Confirm Password:</label>
                <input name='confirm' onInput={handleInput} type='password' />
                <Form.Label className="text-danger">{validationErrors.confirm}</Form.Label>

                <button type='submit'>Register</button>
            </Form>
        </div>
    )
}