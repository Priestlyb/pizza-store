import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  quantity: 0, // number of different pizza items
  total: 0,    // sum of price * quantity of each item
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza: (state, action) => {
      state.pizzas.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },

    removePizza: (state, action) => {
      const index = state.pizzas.findIndex(p => p._id === action.payload);
      if (index !== -1) {
        const removed = state.pizzas[index];
        state.total -= removed.price * removed.quantity;
        state.quantity -= 1;
        state.pizzas.splice(index, 1);
      }
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const pizza = state.pizzas.find(p => p._id === id);
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
      return action.payload;
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
