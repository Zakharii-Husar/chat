import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_PRIVATE } from "./APIEndpoints";
import { setCurrentChatId } from "../state/currentChatSlice";

const createPrivateThunk = createAsyncThunk(
    "createPrivate/createPrivateThunk",
    async (recipientUname: string, {  dispatch }) => {
      const link = CREATE_PRIVATE(recipientUname);
  
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
          dispatch(setCurrentChatId(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    }
  );

  export default createPrivateThunk;