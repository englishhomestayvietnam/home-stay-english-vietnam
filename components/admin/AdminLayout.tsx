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
import AssignmentIcon from "@mui/icons-material/Assignment";
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
  { text: "Applications", icon: <AssignmentIcon />, path: "/admin/applications" },
  { text: "Calendar", icon: <CalendarMonthIcon />, path: "/admin/calendar" },
  { text: "Staff", icon: <SchoolIcon />, path: "/admin/staff" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const session = useSession();
  const cleanPath = pathname.split("?")[0];
  const activePath = menuItems.find(item => item.path === cleanPath || (item.path !== "/admin" && cleanPath.startsWith(item.path + "/")) || (item.path !== "/admin" && cleanPath.startsWith(item.path)))?.path || "/admin";

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
                borderRadius: "2px",
                mx: open ? 2 : 1,
                py: 1.5,
                px: open ? 2 : 0,
                gap: open ? 2 : 0,
                justifyContent: open ? "flex-start" : "center",
                transition: "all 0.2s ease",
                bgcolor: "transparent",
                "&:hover": { bgcolor: alpha("#000", 0.04) },
              }}
            >
              {open ? (
                <Typography
                  variant="h6"
                  fontWeight={800}
                  letterSpacing="-0.5px"
                  color="primary"
                  sx={{ fontSize: "1.25rem" }}
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
                    borderRadius: 2,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>

        {/* Navigation - Consistent with flat design */}
        <List sx={{ px: open ? 1.5 : 0.5, pt: 1 }}>
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
                    minHeight: 44,
                    borderRadius: "2px",
                    mx: open ? 0 : 0.5,
                    py: 1.2,
                    px: open ? 2 : 0,
                    gap: open ? 2 : 0,
                    justifyContent: open ? "flex-start" : "center",
                    position: "relative",
                    transition: "all 0.18s ease",
                    boxShadow: "none !important",

                    bgcolor: isActive
                      ? alpha("#46b96c", 0.1)
                      : "transparent",
                    color: isActive ? "primary.dark" : "text.secondary",
                    fontWeight: isActive ? 700 : 500,
                    borderLeft: isActive && open ? "3px solid #46b96c" : "3px solid transparent",

                    "&:hover": {
                      bgcolor: isActive
                        ? alpha("#46b96c", 0.16)
                        : alpha("#000", 0.04),
                    },

                    "& .MuiListItemIcon-root": {
                      color: isActive ? "primary.main" : "text.secondary",
                      minWidth: 0,
                      fontSize: "1.3rem",
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: "0.9rem" }} />}
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
                borderRadius: "2px",
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