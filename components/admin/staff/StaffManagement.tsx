"use client";

import { useState, useEffect, useMemo } from "react";
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
    TablePagination,
    Avatar,
    Chip,
    CircularProgress,
    Button,
    Menu,
    MenuItem,
    Alert,
    Snackbar,
    TextField,
    InputAdornment,
    Stack,
    alpha,
} from "@mui/material";
import {
    MoreVert,
    CheckCircle,
    AdminPanelSettings,
    Person,
    Search,
} from "@mui/icons-material";
import { useSession } from "@/lib/auth-client";

const ROUNDED_SM = "2px";
const NO_SHADOW = "none !important";

interface User {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string | null;
    createdAt: string;
}

const ROLES = {
    VOLUNTEER: "user",
    STAFF: "admin",
    ADMIN: "superAdmin",
};

const TABS = ["Volunteers", "Staff", "Admins"];

export default function StaffManagement() {
    const { data: session, isPending: isSessionPending } = useSession();
    const [activeTab, setActiveTab] = useState(0);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
                if (res.status === 403) throw new Error("Unauthorized");
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data);
            } catch {
                showNotification("Failed to load users", "error");
            } finally {
                setLoading(false);
            }
        };

        if (session?.user.role === "superAdmin") {
            fetchUsers();
        } else if (!isSessionPending && session?.user.role !== "superAdmin") {
            setLoading(false);
        }
    }, [session, isSessionPending]);

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
        handleMenuClose();

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

            setUsers((prev) =>
                prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
            );
            showNotification(`Role updated to ${getRoleLabel(newRole)}`, "success");
        } catch (error: any) {
            showNotification(error.message || "Failed to update role", "error");
        }
    };

    const showNotification = (message: string, severity: "success" | "error") => {
        setNotification({ message, severity });
    };

    // Filter users based on active tab and search query
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const role = user.role || "user";
            const matchRole =
                (activeTab === 0 && role === "user") ||
                (activeTab === 1 && role === "admin") ||
                (activeTab === 2 && role === "superAdmin");

            if (!matchRole) return false;

            if (searchQuery.trim() !== "") {
                const q = searchQuery.toLowerCase();
                const matchName = user.name?.toLowerCase().includes(q);
                const matchEmail = user.email?.toLowerCase().includes(q);
                if (!matchName && !matchEmail) return false;
            }

            return true;
        });
    }, [users, activeTab, searchQuery]);

    // Paginated slice
    const paginatedUsers = useMemo(() => {
        const start = page * rowsPerPage;
        return filteredUsers.slice(start, start + rowsPerPage);
    }, [filteredUsers, page, rowsPerPage]);

    const getRoleLabel = (role: string) => {
        if (role === "admin") return "Staff";
        if (role === "superAdmin") return "Admin";
        return "Volunteer";
    };

    if (!isSessionPending && session?.user.role !== "superAdmin") {
        return (
            <Box p={4} display="flex" justifyContent="center">
                <Alert severity="error" sx={{ borderRadius: ROUNDED_SM, boxShadow: NO_SHADOW }}>
                    You do not have permission to view this page.
                </Alert>
            </Box>
        );
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" py={8}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                p: { xs: 2, md: 3 },
                borderRadius: ROUNDED_SM,
                boxShadow: NO_SHADOW,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ letterSpacing: "-0.5px" }}>
                    Staff & User Management
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Manage member permissions, assign staff roles, and view registered volunteers.
                </Typography>
            </Box>

            {/* Filter & Search Bar */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                    mb: 2.5,
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    pb: 1,
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => {
                        setActiveTab(v);
                        setPage(0);
                    }}
                    sx={{
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.88rem",
                            borderRadius: ROUNDED_SM,
                        },
                    }}
                >
                    {TABS.map((label, idx) => {
                        const count = users.filter((u) => {
                            const r = u.role || "user";
                            if (idx === 0) return r === "user";
                            if (idx === 1) return r === "admin";
                            if (idx === 2) return r === "superAdmin";
                            return false;
                        }).length;

                        return <Tab key={label} label={`${label} (${count})`} />;
                    })}
                </Tabs>

                <TextField
                    size="small"
                    placeholder="Search name or email..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPage(0);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: ROUNDED_SM,
                            boxShadow: NO_SHADOW,
                            height: 36,
                            fontSize: "0.85rem",
                        },
                    }}
                    sx={{ width: { xs: "100%", sm: 240 } }}
                />
            </Box>

            {/* Table */}
            <TableContainer sx={{ border: "1px solid", borderColor: "divider", borderRadius: ROUNDED_SM }}>
                <Table>
                    <TableHead sx={{ bgcolor: alpha("#46b96c", 0.04) }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem" }}>
                                Member
                            </TableCell>
                            <TableCell sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem" }}>
                                Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem" }}>
                                Assigned Role
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ fontWeight: 800, textTransform: "uppercase", fontSize: "0.78rem" }}
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 6, color: "text.secondary" }}>
                                    No members found in this category.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:hover": { bgcolor: alpha("#46b96c", 0.03) },
                                        "& td": { borderColor: "divider" },
                                    }}
                                >
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1.5}>
                                            <Avatar
                                                src={
                                                    user.image ||
                                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                        user.name || "User"
                                                    )}&background=46b96c&color=ffffff&bold=true`
                                                }
                                                alt={user.name}
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: ROUNDED_SM,
                                                    boxShadow: NO_SHADOW,
                                                    fontWeight: 700,
                                                    fontSize: "0.85rem",
                                                }}
                                            >
                                                {user.name?.[0]?.toUpperCase()}
                                            </Avatar>
                                            <Typography variant="body2" fontWeight={700}>
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: "text.secondary", fontSize: "0.88rem" }}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={getRoleLabel(user.role || "user")}
                                            size="small"
                                            color={
                                                user.role === "superAdmin"
                                                    ? "error"
                                                    : user.role === "admin"
                                                    ? "primary"
                                                    : "default"
                                            }
                                            icon={
                                                user.role === "superAdmin" ? (
                                                    <AdminPanelSettings />
                                                ) : user.role === "admin" ? (
                                                    <CheckCircle />
                                                ) : (
                                                    <Person />
                                                )
                                            }
                                            sx={{
                                                borderRadius: ROUNDED_SM,
                                                boxShadow: NO_SHADOW,
                                                fontWeight: 800,
                                                fontSize: "0.72rem",
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            endIcon={<MoreVert />}
                                            onClick={(e) => handleMenuOpen(e, user)}
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: ROUNDED_SM,
                                                boxShadow: NO_SHADOW,
                                                borderColor: "divider",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Change Role
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredUsers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
                sx={{
                    borderTop: "1px solid",
                    borderColor: "divider",
                    mt: 1,
                    "& .MuiTablePagination-select": {
                        borderRadius: ROUNDED_SM,
                    },
                }}
            />

            {/* Role Change Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: ROUNDED_SM,
                        boxShadow: NO_SHADOW,
                        border: "1px solid",
                        borderColor: "divider",
                    },
                }}
            >
                <MenuItem onClick={() => handleRoleChange(ROLES.VOLUNTEER)} sx={{ fontSize: "0.88rem", fontWeight: 600 }}>
                    Set as Volunteer
                </MenuItem>
                <MenuItem onClick={() => handleRoleChange(ROLES.STAFF)} sx={{ fontSize: "0.88rem", fontWeight: 600 }}>
                    Set as Staff
                </MenuItem>
                <MenuItem onClick={() => handleRoleChange(ROLES.ADMIN)} sx={{ fontSize: "0.88rem", fontWeight: 600 }}>
                    Set as Admin (SuperAdmin)
                </MenuItem>
            </Menu>

            {/* Snackbar feedback */}
            <Snackbar open={!!notification} autoHideDuration={4000} onClose={() => setNotification(null)}>
                <Alert
                    severity={notification?.severity || "info"}
                    onClose={() => setNotification(null)}
                    sx={{ borderRadius: ROUNDED_SM, boxShadow: NO_SHADOW }}
                >
                    {notification?.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
}
