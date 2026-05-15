import { create } from "zustand";

import {
    loginUser,
    signupUser,
    getCurrentUser,
} from "../services/authService";

// ================= HELPERS =================
const saveAuth = (token, user) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
};

const clearAuth = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");
};

// ================= STORE =================
export const useAuthStore = create((set) => ({

    // ================= STATE =================
    token:
        localStorage.getItem("token") || null,

    user:
        JSON.parse(
            localStorage.getItem("user")
        ) || null,

    isAuthenticated:
        !!localStorage.getItem("token"),

    loading: false,

    checkingAuth: true,

    // ================= SET AUTH =================
    setAuth: (token, user) => {

        saveAuth(token, user);

        set({
            token,
            user,
            isAuthenticated: true,
            checkingAuth: false,
        });

    },

    // ================= LOGIN =================
    login: async (email, password) => {

        set({
            loading: true,
        });

        try {
            const res = await loginUser(
                email,
                password
            );

            const { token, user } = res;

            saveAuth(token, user);

            set({
                token,
                user,
                isAuthenticated: true,
                loading: false,
                checkingAuth: false,
            });

            return {
                success: true,
            };

        } catch (error) {

            clearAuth();

            set({
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                checkingAuth: false,
            });

            return {
                success: false,

                message:
                    error.response?.data?.msg ||
                    "Login failed",
            };

        }

    },

   // ================= SIGNUP =================
signup: async (
    name,
    email,
    password
) => {

    set({
        loading: true,
    });

    try {

        await signupUser(
            name,
            email,
            password
        );

        set({
            loading: false,
        });

        return {
            success: true,
        };

    } catch (error) {

        set({
            loading: false,
        });

        return {
            success: false,

            message:
                error.response?.data?.msg ||
                "Signup failed",
        };

    }

},
    // ================= LOGOUT =================
    logout: () => {

        clearAuth();

        set({
            token: null,
            user: null,
            isAuthenticated: false,
            checkingAuth: false,
        });

    },

    // ================= CHECK AUTH =================
    checkAuth: async () => {

        const token =
            localStorage.getItem("token");

        // No token
        if (!token) {

            set({
                checkingAuth: false,
            });

            return;
        }

        try {

            const res = await getCurrentUser();

            set({
                token,
                user: res.user,
                isAuthenticated: true,
                checkingAuth: false,
            });

        } catch (error) {

            clearAuth();

            set({
                token: null,
                user: null,
                isAuthenticated: false,
                checkingAuth: false,
            });

        }

    },

}));