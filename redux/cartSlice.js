import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    pizzas: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addPizza: (state, action) => {
      state.pizzas.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.pizzas = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addPizza, reset } = cartSlice.actions;
export default cartSlice.reducer;
