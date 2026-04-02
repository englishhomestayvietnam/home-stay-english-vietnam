import { AuthProvider } from "@refinedev/core";
import { authClient, getSession, signOut } from "./auth-client";

export const authProvider: AuthProvider = {
    login: async () => {
        const session = await getSession();

        if (!session) {
            return {
                success: false,
                redirectTo: "/sign-in",
            };
        }

        return {
            success: true,
            redirectTo: "/admin",
        };
    },
    logout: async () => {
        const { error } = await signOut()

        if (error) {
            return {
                success: false,
                redirectTo: "/sign-in",
            };
        }
        return {
            success: true,
            redirectTo: "/sign-in",
        };
    },
    check: async () => {
        const session = await getSession();

        if (!session) {
            return {
                authenticated: false,
                redirectTo: "/sign-in",
            };
        }

        const userHasPermission = await authClient.admin.hasPermission({
            userId: session.data?.user.id,
            permissions: {
                dashboard: ["view"]
            }
        })
        return {
            authenticated: userHasPermission.data?.success ? true : false,
        };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: async (error: any) => {
        const status = error?.status ?? error?.statusCode;

        if (status === 401 && error.code === "TOKEN_EXPIRED") {
            return {
                logout: true,
                redirectTo: "/sign-in",
                error,
            };
        }

        if (status === 403) {
            return {
                error: error.message = 'Your are not authorized to perform this action',
            };
        }

        return { error };
    },

};