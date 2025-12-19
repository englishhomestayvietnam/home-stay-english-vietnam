"use client";

import { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    Tabs,
    Tab,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    CircularProgress,
    Button,
    Menu,
    MenuItem,
    Alert,
    Snackbar
} from "@mui/material";
import { MoreVert, CheckCircle, AdminPanelSettings, Person } from "@mui/icons-material";
import { useSession } from "@/lib/auth-client";

interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string | null;
    createdAt: string;
}

// Mapping DB roles to UI Tabs
// Volunteer = 'user' (or null)
// Staff = 'admin'
// Admin = 'superAdmin' 

const ROLES = {
    VOLUNTEER: "user",
    STAFF: "admin",
    ADMIN: "superAdmin"
};

const TABS = ["Volunteer", "Staff", "Admin"];

export default function StaffManagement() {
    const { data: session, isPending: isSessionPending } = useSession();
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

    useEffect(() => {
        if (session?.user.role === "superAdmin") {
            fetchUsers();
        } else if (!isSessionPending && session?.user.role !== "superAdmin") {
            setLoading(false);
        }
    }, [session, isSessionPending]);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (res.status === 403) {
                throw new Error("Unauthorized");
            }
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            // console.error("Fetch users error", error);
            showNotification("Failed to load users", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!isSessionPending && session?.user.role !== "superAdmin") {
        return (
            <Box p={4} display="flex" justifyContent="center">
                <Alert severity="error">You do not have permission to view this page.</Alert>
            </Box>
        );
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: User) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleRoleChange = async (newRole: string) => {
        if (!selectedUser) return;

        handleMenuClose(); // Close menu immediately

        try {
            const res = await fetch("/api/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: selectedUser.id, role: newRole }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Update failed");
            }

            // Optimize local update
            setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
            showNotification(`Role updated to ${getRoleLabel(newRole)}`, "success");

        } catch (error: any) {
            // console.error("Update role error", error);
            showNotification(error.message || "Failed to update role", "error");
        }
    };

    const showNotification = (message: string, severity: "success" | "error") => {
        setNotification({ message, severity });
    };

    // Filter users based on active tab
    const filteredUsers = users.filter(user => {
        const role = user.role || "user"; // Default to user if null
        if (activeTab === 0) return role === "user";
        if (activeTab === 1) return role === "admin";
        if (activeTab === 2) return role === "superAdmin";
        return false;
    });

    const getRoleLabel = (role: string) => {
        if (role === 'admin') return 'Staff';
        if (role === 'superAdmin') return 'Admin';
        return 'Volunteer';
    };

    if (loading) return <CircularProgress />;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>User Management</Typography>

            <Tabs
                value={activeTab}
                onChange={(_, v) => setActiveTab(v)}
                sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
                {TABS.map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No users found in this category.</TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar src={user.image || ""} alt={user.name}>
                                                {user.name?.[0]?.toUpperCase()}
                                            </Avatar>
                                            <Typography variant="body2" fontWeight="medium">
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getRoleLabel(user.role || 'user')}
                                            size="small"
                                            color={user.role === 'superAdmin' ? 'error' : user.role === 'admin' ? 'primary' : 'default'}
                                            icon={user.role === 'superAdmin' ? <AdminPanelSettings /> : user.role === 'admin' ? <CheckCircle /> : <Person />}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            endIcon={<MoreVert />}
                                            onClick={(e) => handleMenuOpen(e, user)}
                                        >
                                            Manage
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleRoleChange(ROLES.VOLUNTEER)}>Set as Volunteer</MenuItem>
                <MenuItem onClick={() => handleRoleChange(ROLES.STAFF)}>Set as Staff</MenuItem>
                <MenuItem onClick={() => handleRoleChange(ROLES.ADMIN)}>Set as Admin</MenuItem>
            </Menu>

            <Snackbar
                open={!!notification}
                autoHideDuration={6000}
                onClose={() => setNotification(null)}
            >
                <Alert severity={notification?.severity || "info"} onClose={() => setNotification(null)}>
                    {notification?.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
