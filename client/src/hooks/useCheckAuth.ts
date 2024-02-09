import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAppSelector } from "./useAppSelectorAndDispatch";

export const useCheckAuth = () => {
    const location = useLocation();
    const uId = useAppSelector(state => state.auth.response.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (uId === null && location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/") {
            navigate("/login");
        }
    }, [location.pathname, navigate, uId]);
};
