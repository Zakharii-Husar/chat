import type { RootState } from "../app/store";
import {
  useAppSelector,
  useAppDispatch,
} from "../hooks/useAppSelectorAndDispatch";
import { useEffect } from "react";
import validator from "validator";
import {
  setEmailErr,
  setFullNameErr,
  setNickNameErr,
  setPasswordErr,
  setConfirmErr,
} from "../features/auth/register/registerSlice";
import {
  EMAIL_AVAILABILITY_URL,
  NICKNAME_AVAILABILITY_URL,
} from "../app/APIEndpoints";

export const useRegValidation = () => {
  const { email, fullName, nickName, password, confirm, validationErrors } =
    useAppSelector((state: RootState) => state.register);

  const dispatch = useAppDispatch();

  const isTaken = async (
    APIEndpoint: string,
    valueToCheck: string
  ): Promise<boolean> => {
    const link =
      APIEndpoint === "email"
        ? EMAIL_AVAILABILITY_URL
        : NICKNAME_AVAILABILITY_URL;
    try {
      const response = await fetch(
        `${link}/${encodeURIComponent(valueToCheck)}`
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
      if (!email) {
        dispatch(setEmailErr("*"));
      } else if (!validator.isEmail(email)) {
        dispatch(setEmailErr("invalid"));
      } else if (await isTaken("email", email)) {
        dispatch(setEmailErr("is taken."));
      } else {
        dispatch(setEmailErr(""));
      }
    };
    validateEmail();
  }, [email]);

  useEffect(() => {
    const validateNickName = async () => {
      if (!nickName) {
        dispatch(setNickNameErr("*"));
      }
      else if (!validator.isLength(nickName, { min: 4, max: 20 })) {
        dispatch(setNickNameErr("should be between 4 and 20 characters"));
      } 
      else if (!validator.matches(nickName, /^[a-zA-Z][\w\-#$\._]*$/)) {
        dispatch(setNickNameErr("should start with a letter and can only contain '-', '_', '.', '#', '$'"));
      }
      else if (!validator.isAlpha(nickName[0])) {
        dispatch(setNickNameErr("should begin with a letter"));
      } else if (await isTaken("username", nickName)) {
        dispatch(setNickNameErr("already taken!"));
      } else {
        dispatch(setNickNameErr(""));
      }
    };

    validateNickName();
  }, [nickName]);

  useEffect(() => {
    const validatePassword = () => {
      if (!password) {
        dispatch(setPasswordErr("*"));
      } else if (
        !validator.isLength(password, { min: 8, max: 30 }) ||
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        dispatch(
          setPasswordErr(
            "must be 8-30 characters long, " +
              "include upper and lower case letters,a digit and a special character"
          )
        );
      } else {
        dispatch(setPasswordErr(""));
      }

      validator.equals(password ?? "", confirm ?? "")
        ? dispatch(setConfirmErr(""))
        : dispatch(setConfirmErr("Passwords don't match"));
    };

    validatePassword();
  }, [password, confirm, validationErrors.password]);

  useEffect(() => {
    const validateFullName = () => {
      if (!fullName) {
        dispatch(setFullNameErr("*"));
      } else {
        !validator.isEmpty(fullName) &&
        validator.isLength(fullName, { min: 3, max: 30 }) &&
        validator.matches(fullName, /^[a-zA-Z\s]+$/)
          ? dispatch(setFullNameErr(""))
          : dispatch(setFullNameErr("has to be 3 to 20 letters."));
      }
    };
    validateFullName();
  }, [fullName]);
};
