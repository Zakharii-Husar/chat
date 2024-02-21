import type { RootState } from '../../app/store';
import { useAppSelector, useAppDispatch } from '../../hooks/useAppSelectorAndDispatch';
import { setEmail, setFullName, setNickName, setPassword, setConfirm, registerAsync } from './registerSlice';
import { SyntheticEvent, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useRegValidation } from '../../hooks/useRegValidation';
import { useNavigate } from 'react-router';

export function Register() {

    const navigate = useNavigate();

    const {
        email,
        fullName,
        nickName,
        password,
        validationErrors
    } = useAppSelector((state: RootState) => state.register);

    const { id: loggedInUserId } = useAppSelector(state => state.auth.response);


    const dispatch = useAppDispatch();
    useRegValidation();

    useEffect(() => {
        if (loggedInUserId) navigate("/");
        console.log(loggedInUserId);
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