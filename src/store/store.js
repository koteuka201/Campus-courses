import authReducer from './slices/authSlice'
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
    reducer: {
      auth: authReducer 
    },
    devTools:true
  });
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getProfile } from "../services/apiService";


// export const isAuth= createAsyncThunk('auth/isAuth', async (token)=>{
    
//     const response= await getProfile(token)
    
//     if(response!=''){
//         return true
//     }
//     else{
//         return false
//     }
    
// })

// const authSlice= createSlice({
//     name: 'auth',
//     initialState:{
//         isAuthenticated: '',
//         isLoading: false
//     },
    
//     reducers: {
//         setAuth(state, action){
            
//             state.isAuthenticated=action.payload
//         },
//         clearAuth(state) {
//             state.isAuthenticated = '';
//         }
//     },
//     extraReducers:(builder)=>{
//         builder.addCase(isAuth.rejected,(state)=>{
//             state.isAuthenticated=false
//             state.isLoading=false
//         })
//         .addMatcher(
//             (action) => action.type === isAuth.fulfilled.type && action.payload === false,
//             (state) => {
//                 state.isAuthenticated = false;
//                 state.isLoading = false;
//             }
//         )
//         .addMatcher(
//             (action) => action.type === isAuth.fulfilled.type && action.payload === true,
//             (state) => {
//                 state.isAuthenticated = true;
//                 state.isLoading = false;
//             }
//         )

//     }
// })

// export const {setAuth,clearAuth}=authSlice.actions
// export default authSlice.reducer

