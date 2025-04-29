import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";

// global state manager basically means
// these attributes will be shared among all the pages 
// to keep in check of whats actually going on

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn : false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        try {
            //Point this to the backend checkAuth.js file, basically axios acts like the postman
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});
        } catch (error) {
            console.log("error in CheckAuth:",error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    }
}));