import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_GROUP_CHAT } from "../../../../app/APIEndpoints";
import type { RootState } from "../../../../app/store";
import { setCurrentChatId } from "../existingChatSlice";

const createGroupThunk = createAsyncThunk(
    "newChat/createGroupThunk",
    async (_, { getState, dispatch }) => {
      const state = getState() as RootState;
      //extracting only ID's
      const membersIdsArray = state.newChat.candidates.map(obj => obj.memberId);
      //preventing duplicates
      const uniqueArr = membersIdsArray.filter(
        (value, index, self) => value !== null && self.indexOf(value) === index
      );
  
      try {
        const response = await fetch(CREATE_GROUP_CHAT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ParticipantUserIds: uniqueArr,
            ChatName: state.newChat.chatName,
          }),
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

  export default createGroupThunk;