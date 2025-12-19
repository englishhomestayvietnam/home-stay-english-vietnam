'use client'
import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@refinedev/mui";
// import { signOut } from "next-auth/react"; // if using NextAuth
// import { useRouter } from "next/navigation";

export default function UserAvatarDropdown({ session }: { session: any }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          enqueueSnackbar("Logout successful", { variant: "success" });
          router.push("/sign-in");
        },
        onError: () => {
          enqueueSnackbar("Logout failed", { variant: "error" });
        },
      },
    });
  };

  return (
    <>
      <Tooltip title={session?.data?.user?.name || "Account"}>
        <IconButton onClick={handleClick} size="small" sx={{ p: 0 }}>
          <Avatar
            src={session?.data?.user?.image || "/logo.svg"}
            alt={session?.data?.user?.name || "User"}
            sx={{
              width: 40,
              height: 40,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >

        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}