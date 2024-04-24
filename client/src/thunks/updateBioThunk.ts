import { createAsyncThunk } from "@reduxjs/toolkit";
import { UPDATE_BIO } from "./APIEndpoints";

const updateBioThunk = createAsyncThunk(
  "currentChat/sendMessage",
  async (newBio: string) => {
    const link = UPDATE_BIO();
    console.log(newBio)
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBio),
        credentials: "include",
      });

      if (response.ok) return true;
    } catch (error) {
      console.log(error);
    }
  }
);

export default updateBioThunk;