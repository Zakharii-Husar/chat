import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector, useAppDispatch } from "./useAppSelectorAndDispatch";
import { validateCookiesAsync } from './../features/auth/authSlice';


export const useCheckAuth = () => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const loggedInId = useAppSelector(state => state.auth.response?.id);
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
            if (loggedInId) return;
            await checkCookies();
            if (!loggedInId) redirect();
        }
        verifyUser();
    }, [location.pathname, loggedInId, dispatch, navigate]);
};
