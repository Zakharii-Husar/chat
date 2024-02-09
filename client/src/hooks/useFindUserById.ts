import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./useAppSelectorAndDispatch";
import { UserModel } from "../features/users/usersSlice";
import { fetchAllUsers } from "../features/users/usersSlice";

export const useFindUserById = (): (id: number) => UserModel | null => {
    const dispatch = useAppDispatch();
    const { allUsers } = useAppSelector((state) => state.users);

    useEffect(()=>{
        dispatch(fetchAllUsers());
    }, [dispatch])
    return (id: number) => {
        const filtered = allUsers.filter((u) => u.id === id);
        return filtered.length > 0 ? filtered[0] : null;
    };
};