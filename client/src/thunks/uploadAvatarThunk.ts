import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../state/store";
import { UPLOAD_AVATAR } from "./APIEndpoints";
import { updateAvatarName } from "../state/loggedInUserSlice";

const uploadAvatarThunk = createAsyncThunk(
  "avatar/uploadAvatar",
  async (formData: FormData, { getState, dispatch }) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(UPLOAD_AVATAR, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const imageName = await response.text();

        dispatch(updateAvatarName(imageName));
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export default uploadAvatarThunk;
