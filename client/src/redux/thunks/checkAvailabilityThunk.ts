import { createAsyncThunk } from "@reduxjs/toolkit";
import { IS_TAKEN } from "../../APIEndpoints";

const checkAvailabilityThunk = createAsyncThunk(
    "register/checkAvailability",
    async (props: {type: string, value: string}) => {
        const link = IS_TAKEN(props.type, props.value);
        try {
            const response = await fetch(link, {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                return await response.json();
            }

        } catch (error) {
            console.error(error);
        }
    }
);

export default checkAvailabilityThunk