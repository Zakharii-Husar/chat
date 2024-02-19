import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./useAppSelectorAndDispatch";
import { IUserModel } from "../features/users/usersSlice";
import { fetchAllUsers } from "../features/users/usersSlice";

export const useFindUserById = (): (id: string) => IUserModel | null => {
    const dispatch = useAppDispatch();
    const { allUsers } = useAppSelector((state) => state.users);

    useEffect(()=>{
        dispatch(fetchAllUsers());
    }, [dispatch])
    return (id: string) => {
        const filtered = allUsers.filter((u) => u.id === id);
        return filtered.length > 0 ? filtered[0] : null;
    };
};