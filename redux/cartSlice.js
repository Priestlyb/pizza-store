import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      const existing = state.pizzas.find((p) => p._id === action.payload._id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.pizzas.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },

    removePizza: (state, action) => {
      const index = state.pizzas.findIndex((p) => p._id === action.payload);
      if (index !== -1) {
        const removed = state.pizzas[index];
        state.total -= removed.price * removed.quantity;
        state.quantity -= 1;
        state.pizzas.splice(index, 1);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const pizza = state.pizzas.find((p) => p._id === id);
      if (pizza) {
        state.total -= pizza.price * pizza.quantity;
        pizza.quantity = quantity;
        state.total += pizza.price * quantity;
      }
    },

    reset: (state) => {
      state.pizzas = [];
      state.quantity = 0;
      state.total = 0;
    },

    loadCartFromStorage: (state, action) => {
      state.pizzas = action.payload.pizzas || [];
      state.quantity = action.payload.quantity || 0;
      state.total = action.payload.total || 0;
    },
  },
});

export const {
  addPizza,
  removePizza,
  updateQuantity,
  reset,
  loadCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
