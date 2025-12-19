"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  alpha,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CottageIcon from "@mui/icons-material/Cottage";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import UserAvatarDropdown from "./UserAvatar";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <CottageIcon />, path: "/admin/landing-page" },
  { text: "Reviews", icon: <Inventory2Icon />, path: "/admin/reviews" },
  { text: "Applications", icon: <CalendarMonthIcon />, path: "/admin/applications" },
  { text: "Staff", icon: <SchoolIcon />, path: "/admin/staff" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const session = useSession();
  const cleanPath = pathname.split("?")[0];
  const activePath = menuItems.find(item => item.path === cleanPath)?.path || "/admin";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default", shadow: "none" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 72,
            borderRight: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            overflowX: "hidden",
            boxShadow: "none",
            transition: "width 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        }}
      >
        {/* Logo / Title - Same height & style as menu items */}
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              href="/"
              sx={{
                minHeight: 48,
                borderRadius: open ? 3 : "50%",
                mx: open ? 2 : 1.5,
                py: 1.5,
                px: open ? 2.5 : 0,
                gap: open ? 3 : 0,
                justifyContent: open ? "flex-start" : "center",
                transition: "all 0.22s ease",
                bgcolor: "transparent",
                "&:hover": { bgcolor: alpha("#000", 0.06) },
              }}
            >
              {open ? (
                <Typography
                  variant="h6"
                  fontWeight={800}
                  letterSpacing="-0.5px"
                  color="primary"
                  sx={{ fontSize: "1.35rem" }}
                >
                  English Homestay Vietnam
                </Typography>
              ) : (
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  style={{
                    borderRadius: 8,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>

        {/* Navigation - Consistent with logo */}
        <List sx={{ px: open ? 2 : 0, pt: 1 }}>
          {menuItems.map((item) => {
            const isActive = activePath === item.path;

            if (item.text === "Staff" && session.data?.user.role !== "superAdmin") {
                return null;
            }

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    minHeight: 48,
                    borderRadius: open ? 3 : "50%",
                    mx: open ? 0 : 1.5,
                    py: 1.5,
                    px: open ? 2.5 : 0,
                    gap: open ? 3 : 0,
                    justifyContent: open ? "flex-start" : "center",
                    position: "relative",
                    transition: "all 0.22s ease",

                    bgcolor: isActive
                      ? alpha("#46b96c", open ? 0.08 : 0.12)
                      : "transparent",
                    color: isActive ? "primary.main" : "text.secondary",
                    fontWeight: isActive ? 600 : 500,

                    "&:hover": {
                      bgcolor: isActive
                        ? alpha("#46b96c", open ? 0.14 : 0.18)
                        : alpha("#000", 0.06),
                    },

                    "& .MuiListItemIcon-root": {
                      color: isActive ? "primary.main" : "text.secondary",
                      minWidth: 0,
                      fontSize: "1.35rem",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            backdropFilter: "blur(12px)",
            boxShadow: "none",
            ml: `${open ? drawerWidth : 72}px`,
            width: `calc(100% - ${open ? drawerWidth : 72}px)`,
            transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ minHeight: 70 }}>
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                mr: 2,
                color: "primary.main",
                bgcolor: alpha("#46b96c", 0.1),
                "&:hover": { bgcolor: alpha("#46b96c", 0.18) },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <UserAvatarDropdown session={session} />
          </Toolbar>
        </AppBar>

        <Box sx={{ pt: "70px", p: { xs: 3, md: 4 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}