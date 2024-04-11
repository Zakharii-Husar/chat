import { createAsyncThunk } from "@reduxjs/toolkit";
import { UPLOAD_AVATAR } from "./APIEndpoints";
import { updateAvatarName } from "../state/loggedInUserSlice";

const uploadAvatarThunk = createAsyncThunk(
  "users/uploadAvatar",
  async (formData: FormData, { dispatch }) => {
    const link = UPLOAD_AVATAR();
    try {
      const response = await fetch(link, {
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
