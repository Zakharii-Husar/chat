import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { UPLOAD_AVATAR } from "../../app/APIEndpoints";

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
        console.log("OK")
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export default uploadAvatarThunk;
