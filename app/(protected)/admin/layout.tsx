"use client";
import { Authenticated, Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { NotistackSnackbarContent, RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider } from "@mui/material/styles";
import { AdminLayout } from "@/components/admin/AdminLayout";
import theme from "@/mui.theme.config";
import { authProvider } from "@/lib/auth-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  const API_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : "https://www.englishhomestayvietnam.com/api";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RefineSnackbarProvider preventDuplicate>
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          resources={[
            {
              name: "get-all-reviews",
              list: "/admin/reviews",
              show: "/admin/reviews/show/:id",
              edit: "/admin/reviews/edit/:id",
              meta: { canDelete: true },
            },
            {
              name: "applications",
              list: "/admin/applications",
              show: "/admin/applications/show/:id",
              edit: "/admin/applications/edit/:id",
              meta: { canDelete: true },
            },
            {
              name: "landing-page",
              list: "/admin/landing-page",
              meta: { label: "Site Content" },
            },
          ]}
          options={{ syncWithLocation: true }}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={useNotificationProvider}
        >
          <Authenticated redirectOnFail="/sign-in" key="admin-layout">
            <AdminLayout>
              <main className="mt-12 max-w-6xl mx-auto">
                {children}

              </main>
            </AdminLayout>
          </Authenticated>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
