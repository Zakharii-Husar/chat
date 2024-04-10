import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_GROUP } from "./APIEndpoints";
import type { RootState } from "../state/store";
import { setCurrentChatId } from "../state/currentChatSlice";

const createGroupThunk = createAsyncThunk(
    "createGroup/createGroupThunk",
    async (_, { getState, dispatch }) => {
      const state = getState() as RootState;
      //extracting only ID's
      const membersIdsArray = state.createGroup.candidates.map(obj => obj.memberId);
      //preventing duplicates
      const uniqueArr = membersIdsArray.filter(
        (value, index, self) => value !== null && self.indexOf(value) === index
      );
      const link = CREATE_GROUP();
  
      try {
        const response = await fetch(link, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ParticipantUserIds: uniqueArr,
            ChatName: state.createGroup.name,
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