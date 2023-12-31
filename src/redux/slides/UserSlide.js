import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  isAdmin: false,
  access_token: "",
  city: "",
};

export const UserSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id,
        name = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        isAdmin = false,
        access_token = "",
        city = "",
      } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.id = _id;
      state.isAdmin = isAdmin;
      state.access_token = access_token;
      state.city = city;
    },
    resetUser: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.id = "";
      state.isAdmin = false;
      state.access_token = "";
      state.city = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlide.actions;

export default UserSlide.reducer;
