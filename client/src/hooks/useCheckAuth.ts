import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector } from "./useAppSelectorAndDispatch";
import { API_URL } from "../app/globalVars";

export const useCheckAuth = () => {
    // const location = useLocation();
    // const uId = useAppSelector(state => state.auth.response.id);
    // const navigate = useNavigate();

    // const checkCookies = () => {

    // };

    // const hasValidCookies = checkCookies();

    // const redirect = () => {
    //     if (location.pathname !== "/login" &&
    //         location.pathname !== "/register" &&
    //         location.pathname !== "/") navigate("/");

    // };

    // const setUserDetails () => {

    // };

    // const verifyUser = () => {
    //     if (uId !== null) return;
    //     if (!hasValidCookies) {
    //         redirect();
    //         return;
    //     } else {
    //         setUserDetails();
    //     }
    // };

    // useEffect(() => {
    //     verifyUser();
    // }, [location.pathname, navigate, uId]);
};
