import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "./useAppSelectorAndDispatch";
import { validateCookiesAsync } from './../features/auth/authSlice';


export const useCheckAuth = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const loggedIn = useAppSelector(state => state.auth.loggedIn);
    const navigate = useNavigate();




    useEffect(() => {

        const checkCookies = () => {
            dispatch(validateCookiesAsync());
        };



        const redirect = () => {
            if (location.pathname !== "/login" &&
                location.pathname !== "/register" &&
                location.pathname !== "/") navigate("/");

        };
        const verifyUser = async () => {
            if (loggedIn) return;
            await checkCookies();
            if (!loggedIn) redirect();
        }
        verifyUser();
    }, [location.pathname, loggedIn, dispatch, navigate]);
};
