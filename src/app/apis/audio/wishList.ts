import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a key for the local storage
const LOCAL_STORAGE_KEY = "wishlist";

// Define a function to load state from local storage
const loadStateFromLocalStorage = (): WishlistState | undefined => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedState) {
    return JSON.parse(storedState);
  }
  return undefined;
};

// Define a function to save state to local storage
const saveStateToLocalStorage = (state: WishlistState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
};

export interface OneWishList {
  id: number;
  linkAudio: string;
  moshafLink: string;
  name: string;
  makkia?: boolean;
  moshfName: string;
  reciterName?: string | undefined;
}

interface WishlistState {
  wishlistItems: OneWishList[];
}

// Load initial state from local storage if available
const initialState: WishlistState = loadStateFromLocalStorage() || {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<OneWishList>) => {
      state.wishlistItems.push(action.payload);
      saveStateToLocalStorage(state); // Save state to local storage after modification
    },
    removeFromWishlist: (state, action: PayloadAction<OneWishList>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
      saveStateToLocalStorage(state); // Save state to local storage after modification
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
