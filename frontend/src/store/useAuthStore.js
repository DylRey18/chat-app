import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
// global state manager basically means
// these attributes will be shared among all the pages 
// to keep in check of whats actually going on

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn : false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    //Function to check state changing the global stored value
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
    },

    signup: async(data) => {
        set({ isSigningUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.daat.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async(data) =>{
        set({isLoggingIn: true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn: false});
        }
    },

    updateProfile: async(data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser: res.data});
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("Error in profile update",error);
            toast.error(error.response.data.message);
        } finally{
            set({isUpdatingProfile: false});
        }
    },
}));