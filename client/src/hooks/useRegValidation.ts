import type { RootState } from "../app/store";
import {
    useAppSelector,
    useAppDispatch,
} from "../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import validator from "validator";
import { setEmailErr, setFullNameErr, setNickNameErr, setPasswordErr, setConfirmErr } from '../features/auth/registerSlice';
import { EMAIL_AVAILABILITY_URL, NICKNAME_AVAILABILITY_URL } from "../app/APIEndpoints";

export const useRegValidation = () => {
    const { email, fullName, nickName, password, confirm } = useAppSelector(
        (state: RootState) => state.register
    );

    const dispatch = useAppDispatch();

    const isTaken = async (
        APIEndpoint: string,
        valueToCheck: string
    ): Promise<boolean> => {
        const link = APIEndpoint === "email" ? EMAIL_AVAILABILITY_URL :
            NICKNAME_AVAILABILITY_URL;
        try {
            const response = await fetch(
                `${link}/${encodeURIComponent(
                    valueToCheck
                )}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error during checking email availability:", error);
            //Preventing insertinon of a new email if impossible to prove
            //that it doesn't already exist in the DB:
            return true;
        }
    };

    useEffect(() => {
        const validateEmail = async () => {
            if (!validator.isEmail(email)) {
                dispatch(setEmailErr("Invalid email"));
            } else if (await isTaken("email", email)) {
                dispatch(setEmailErr("Email taken. Forgot your password?"));
            } else {
                dispatch(setEmailErr(""));
            }
        };
        validateEmail();
    }, [email])

    useEffect(() => {
        const validateNickName = async () => {
            if (
                !validator.isLength(nickName, { min: 4, max: 12 }) ||
                !validator.isAlphanumeric(nickName) ||
                !validator.isAlpha(nickName[0])
            ) {
                dispatch(setNickNameErr("Invalid nickname. It should be between 4 and 12 characters, " +
                    "start with a non-digit character, and can only contain alphanumeric characters."));
            } else if (await isTaken("username", nickName)) {
                dispatch(setNickNameErr("Nickname already taken!"));
            }
            else {
                dispatch(setNickNameErr(""));
            }
        };

        validateNickName();
    }, [nickName])

    useEffect(() => {
        const validatePassword = () => {
            if (
                !validator.isLength(password, { min: 8, max: 30 }) ||
                !validator.isStrongPassword(password, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
            ) {
                dispatch(setPasswordErr("Invalid password." +
                    "It must contain from 8  to 30 characters, " +
                    "including at least one uppercase letter, " +
                    "one lowercase letter, one digit, and one special character."));
            } else {
                dispatch(setPasswordErr(""));
            }

            validator.equals(password, confirm)
                ? (dispatch(setConfirmErr("")))
                : (dispatch(setConfirmErr("Passwords don't match")));
        };

        validatePassword();
    }, [password, confirm])

    useEffect(() => {
        const validateFullName = () => {
            !validator.isEmpty(fullName) &&
                validator.isLength(fullName, { min: 3, max: 20 }) &&
                validator.matches(fullName, /^[a-zA-Z\s]+$/)
                ? (dispatch(setFullNameErr("")))
                : (dispatch(setFullNameErr("Has to consist of 3 to 20 letters.")));
        };
        validateFullName();
    }, [fullName]);
};
