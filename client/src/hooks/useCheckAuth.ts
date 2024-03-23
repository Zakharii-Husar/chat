import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "./useAppSelectorAndDispatch";
import validateCookiesThunk from "../features/auth/login/validateCookiesThunk";


export const useCheckAuth = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const loggedInId = useAppSelector(state => state.currentUser.id);
    const navigate = useNavigate();




    useEffect(() => {

        const checkCookies = () => {
            dispatch(validateCookiesThunk());
        };



        const redirect = () => {
            if (location.pathname !== "/login" &&
                location.pathname !== "/register" &&
                location.pathname !== "/") navigate("/");

        };
        const verifyUser = async () => {
            if (loggedInId) return;
            checkCookies();
            if (!loggedInId) redirect();
        }
        verifyUser();
    }, [location.pathname, loggedInId, dispatch, navigate]);
};
