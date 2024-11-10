import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'


interface AuthState {
  username: string | null
}


const initialState: AuthState = {
  username: null
}


const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.username = action.payload
    },

    userLoggedOut(state) {
      state.username = null
    }
  },

  selectors: {
    selectCurrentUsername: (authState) => authState.username
  }
})


export const {
  userLoggedIn,
  userLoggedOut
} = authSlice.actions

export const { selectCurrentUsername } = authSlice.selectors

export default authSlice.reducer
