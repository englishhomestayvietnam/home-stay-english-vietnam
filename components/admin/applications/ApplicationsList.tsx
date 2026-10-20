"use client";

import React, { useState } from "react";
import {
    DeleteButton,
    EditButton,
    List,
    useDataGrid,
} from "@refinedev/mui";
import { useInvalidate } from "@refinedev/core";
import Link from "next/link";
import { format } from "date-fns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    Box,
    Chip,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Paper,
    alpha,
} from "@mui/material";
import {
    VisibilityOutlined as ViewIcon,
    Close as CloseIcon,
    FlightLand,
    FlightTakeoff,
    Email as EmailIcon,
    WhatsApp as WhatsAppIcon,
    CheckCircle,
    HourglassEmpty,
    Cancel,
    Edit as EditIcon,
} from "@mui/icons-material";
import { useSession } from "@/lib/auth-client";

const ROUNDED_SM = "2px";
const NO_SHADOW = "none !important";

interface GroupMember {
    id: string;
    fullName: string;
    sex: string;
    country: string;
}

interface ApplicationRow {
    id: string;
    fullName: string;
    email: string;
    whatsApp?: string | null;
    startDate: string;
    endDate?: string | null;
    duration: string;
    country: string;
    sex: string;
    message?: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    userImage?: string | null;
    groupMembers?: GroupMember[];
}

export default function ApplicationsList() {
    const { data: session } = useSession();
    const isSuperAdmin = session?.user.role === "superAdmin";
    const invalidate = useInvalidate();

    // Modal state for viewing application
    const [selectedApp, setSelectedApp] = useState<ApplicationRow | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);

    // Configure proper server-side pagination (10 rows per page by default)
    const { dataGridProps } = useDataGrid({
        resource: "applications",
        pagination: {
            currentPage: 1,
            pageSize: 10,
            mode: "server",
        },
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        },
    });

    // Quick status update inside the modal
    const handleQuickStatusUpdate = async (appId: string, newStatus: string) => {
        try {
            setUpdatingStatus(true);
            const res = await fetch(`/api/applications/${appId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            setSelectedApp((prev) => (prev ? { ...prev, status: newStatus } : null));
            invalidate({ resource: "applications", invalidates: ["list"] });
        } catch (err: any) {
            alert("Error updating status: " + err.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "fullName",
                headerName: "Volunteer",
                minWidth: 230,
                flex: 1.2,
                renderCell: ({ row }) => (
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%" }}>
                        <Avatar
                            src={
                                row.userImage ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    row.fullName || "Volunteer"
                                )}&background=46b96c&color=ffffff&bold=true`
                            }
                            alt={row.fullName}
                            sx={{
                                width: 34,
                                height: 34,
                                borderRadius: ROUNDED_SM,
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                bgcolor: alpha("#46b96c", 0.15),
                                color: "primary.dark",
                            }}
                        >
                            {row.fullName?.[0]}
                        </Avatar>
                        <Box sx={{ minWidth: 0, overflow: "hidden" }}>
                            <Typography variant="body2" fontWeight={700} noWrap sx={{ color: "text.primary" }}>
                                {row.fullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap display="block">
                                {row.country || "Unknown Country"} • {row.sex || "N/A"}
                            </Typography>
                        </Box>
                    </Stack>
                ),
            },
            {
                field: "email",
                headerName: "Contact",
                minWidth: 210,
                flex: 1,
                renderCell: ({ row }) => (
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                        <Typography variant="body2" color="text.primary" noWrap>
                            {row.email}
                        </Typography>
                        {row.whatsApp && (
                            <Typography variant="caption" color="text.secondary" noWrap>
                                WA: {row.whatsApp}
                            </Typography>
                        )}
                    </Box>
                ),
            },
            {
                field: "startDate",
                headerName: "Stay Period & Due Date",
                minWidth: 200,
                flex: 1,
                renderCell: ({ row }) => (
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                        <Typography variant="body2" fontWeight={700} color="primary.main" noWrap>
                            {row.startDate ? format(new Date(row.startDate), "dd MMM yyyy") : "N/A"}
                            {row.endDate ? ` → ${format(new Date(row.endDate), "dd MMM yyyy")}` : ""}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            Duration: <strong>{row.duration || "N/A"}</strong>
                        </Typography>
                    </Box>
                ),
            },
            {
                field: "status",
                headerName: "Status",
                minWidth: 120,
                align: "center",
                headerAlign: "center",
                renderCell: ({ value }) => (
                    <Chip
                        label={value}
                        color={
                            value === "APPROVED"
                                ? "success"
                                : value === "REJECTED"
                                ? "error"
                                : "warning"
                        }
                        size="small"
                        sx={{
                            fontWeight: 800,
                            borderRadius: ROUNDED_SM,
                            fontSize: "0.72rem",
                        }}
                    />
                ),
            },
            {
                field: "createdAt",
                headerName: "Applied At",
                minWidth: 160,
                align: "center",
                headerAlign: "center",
                renderCell: ({ value }) => (
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        {value ? format(new Date(value), "dd MMM yyyy, HH:mm") : "-"}
                    </Typography>
                ),
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                filterable: false,
                align: "center",
                headerAlign: "center",
                minWidth: 130,
                renderCell: ({ row }) => (
                    <Stack
                        direction="row"
                        spacing={0.5}
                        sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}
                    >
                        {/* Pop-up modal trigger instead of redirecting */}
                        <Tooltip title="View Application Details">
                            <IconButton
                                size="small"
                                onClick={() => setSelectedApp(row as ApplicationRow)}
                                sx={{
                                    color: "primary.main",
                                    borderRadius: ROUNDED_SM,
                                    "&:hover": { bgcolor: alpha("#46b96c", 0.12) },
                                }}
                            >
                                <ViewIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        {isSuperAdmin && (
                            <>
                                <EditButton hideText size="small" recordItemId={row.id} />
                                <DeleteButton hideText size="small" recordItemId={row.id} />
                            </>
                        )}
                    </Stack>
                ),
            },
        ],
        [isSuperAdmin]
    );

    return (
        <>
            <List
                title={
                    <Box>
                        <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ letterSpacing: "-0.5px" }}>
                            Applications
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Manage volunteer applications, stay periods, and approval statuses.
                        </Typography>
                    </Box>
                }
                wrapperProps={{
                    sx: {
                        borderRadius: ROUNDED_SM,
                        boxShadow: NO_SHADOW,
                        border: "1px solid",
                        borderColor: "divider",
                        overflow: "hidden",
                        bgcolor: "background.paper",
                    },
                }}
                headerProps={{
                    sx: {
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    },
                }}
            >
                <DataGrid
                    {...dataGridProps}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 25, 50]}
                    rowHeight={64}
                    sx={{
                        border: "none",
                        boxShadow: NO_SHADOW,
                        borderRadius: ROUNDED_SM,
                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            px: 2,
                            display: "flex",
                            alignItems: "center",
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            bgcolor: alpha("#46b96c", 0.04),
                            borderBottom: "2px solid",
                            borderColor: "divider",
                            fontWeight: 800,
                            color: "text.primary",
                            fontSize: "0.78rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            px: 1,
                        },
                        "& .MuiDataGrid-row:hover": {
                            bgcolor: alpha("#46b96c", 0.03),
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "1px solid",
                            borderColor: "divider",
                            px: 1,
                            bgcolor: "background.paper",
                        },
                    }}
                />
            </List>

            {/* Quick View Pop-Up Modal */}
            <Dialog
                open={Boolean(selectedApp)}
                onClose={() => setSelectedApp(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: ROUNDED_SM,
                        boxShadow: NO_SHADOW,
                        border: "1px solid",
                        borderColor: "divider",
                    },
                }}
            >
                {selectedApp && (
                    <>
                        <DialogTitle sx={{ pb: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" fontWeight={800}>
                                    Application Details
                                </Typography>
                                <IconButton size="small" onClick={() => setSelectedApp(null)}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </DialogTitle>

                        <DialogContent sx={{ pt: 2.5 }}>
                            <Stack spacing={2.5}>
                                {/* Header with Avatar & Status */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 1.5,
                                        borderRadius: ROUNDED_SM,
                                        bgcolor: alpha("#46b96c", 0.05),
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Avatar
                                        src={
                                            selectedApp.userImage ||
                                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                selectedApp.fullName || "Volunteer"
                                            )}&background=46b96c&color=ffffff&bold=true`
                                        }
                                        alt={selectedApp.fullName}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            borderRadius: ROUNDED_SM,
                                            boxShadow: NO_SHADOW,
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            border: `2px solid ${
                                                selectedApp.status === "APPROVED"
                                                    ? "#16a34a"
                                                    : selectedApp.status === "PENDING"
                                                    ? "#d97706"
                                                    : "#ef4444"
                                            }`,
                                        }}
                                    >
                                        {selectedApp.fullName?.[0]}
                                    </Avatar>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
                                            {selectedApp.fullName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {selectedApp.country} • {selectedApp.sex}
                                        </Typography>

                                        <Box sx={{ mt: 0.5 }}>
                                            <Chip
                                                label={selectedApp.status}
                                                color={
                                                    selectedApp.status === "APPROVED"
                                                        ? "success"
                                                        : selectedApp.status === "REJECTED"
                                                        ? "error"
                                                        : "warning"
                                                }
                                                size="small"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: "0.7rem",
                                                    borderRadius: ROUNDED_SM,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Stay Timeline Dates */}
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: ROUNDED_SM,
                                        boxShadow: NO_SHADOW,
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                                        STAY SCHEDULE
                                    </Typography>
                                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
                                                <FlightLand sx={{ fontSize: 14, color: "#16a34a" }} /> Arrival Date
                                            </Typography>
                                            <Typography variant="body2" fontWeight={800} color="#16a34a" sx={{ mt: 0.3 }}>
                                                {format(new Date(selectedApp.startDate), "EEE, dd MMM yyyy")}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center" gap={0.5}>
                                                <FlightTakeoff sx={{ fontSize: 14, color: "#2563eb" }} /> Checkout Due Date
                                            </Typography>
                                            <Typography variant="body2" fontWeight={800} color="#2563eb" sx={{ mt: 0.3 }}>
                                                {selectedApp.endDate
                                                    ? format(new Date(selectedApp.endDate), "EEE, dd MMM yyyy")
                                                    : "N/A"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Stay Duration: <strong>{selectedApp.duration}</strong>
                                        </Typography>
                                    </Box>
                                </Paper>

                                {/* Contact Information */}
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: ROUNDED_SM,
                                        boxShadow: NO_SHADOW,
                                        border: "1px solid",
                                        borderColor: "divider",
                                    }}
                                >
                                    <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                                        CONTACT DETAILS
                                    </Typography>
                                    <Stack spacing={1}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <EmailIcon fontSize="small" sx={{ color: "text.secondary" }} />
                                            <Typography variant="body2">
                                                <a
                                                    href={`mailto:${selectedApp.email}`}
                                                    style={{ color: "#46b96c", textDecoration: "none" }}
                                                >
                                                    {selectedApp.email}
                                                </a>
                                            </Typography>
                                        </Box>

                                        {selectedApp.whatsApp && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <WhatsAppIcon fontSize="small" sx={{ color: "#25D366" }} />
                                                <Typography variant="body2">
                                                    <a
                                                        href={`https://wa.me/${selectedApp.whatsApp.replace(/[^0-9]/g, "")}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: "#16a34a", textDecoration: "none", fontWeight: 700 }}
                                                    >
                                                        {selectedApp.whatsApp} (Chat on WhatsApp)
                                                    </a>
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Paper>

                                {/* Group Members */}
                                {selectedApp.groupMembers && selectedApp.groupMembers.length > 0 && (
                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                                            Group Members ({selectedApp.groupMembers.length}):
                                        </Typography>
                                        <Stack spacing={0.8} sx={{ mt: 0.5 }}>
                                            {selectedApp.groupMembers.map((m, idx) => (
                                                <Paper
                                                    key={idx}
                                                    variant="outlined"
                                                    sx={{ p: 1, borderRadius: ROUNDED_SM, boxShadow: NO_SHADOW }}
                                                >
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {m.fullName} • {m.country} • {m.sex}
                                                    </Typography>
                                                </Paper>
                                            ))}
                                        </Stack>
                                    </Box>
                                )}

                                {/* Message */}
                                {selectedApp.message && (
                                    <Box>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary">
                                            Applicant Message:
                                        </Typography>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 1.2,
                                                mt: 0.5,
                                                borderRadius: ROUNDED_SM,
                                                boxShadow: NO_SHADOW,
                                                bgcolor: "background.default",
                                            }}
                                        >
                                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", fontSize: "0.85rem" }}>
                                                {selectedApp.message}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                )}

                                {/* SuperAdmin Quick Actions */}
                                {isSuperAdmin && (
                                    <Box sx={{ pt: 1 }}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                                            QUICK STATUS DECISION
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            {selectedApp.status !== "APPROVED" && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<CheckCircle />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedApp.id, "APPROVED")}
                                                    sx={{
                                                        borderRadius: ROUNDED_SM,
                                                        boxShadow: NO_SHADOW,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Approve
                                                </Button>
                                            )}

                                            {selectedApp.status !== "PENDING" && (
                                                <Button
                                                    variant="outlined"
                                                    color="warning"
                                                    size="small"
                                                    startIcon={<HourglassEmpty />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedApp.id, "PENDING")}
                                                    sx={{
                                                        borderRadius: ROUNDED_SM,
                                                        boxShadow: NO_SHADOW,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Set Pending
                                                </Button>
                                            )}

                                            {selectedApp.status !== "REJECTED" && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<Cancel />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedApp.id, "REJECTED")}
                                                    sx={{
                                                        borderRadius: ROUNDED_SM,
                                                        boxShadow: NO_SHADOW,
                                                        textTransform: "none",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Reject
                                                </Button>
                                            )}
                                        </Stack>
                                    </Box>
                                )}
                            </Stack>
                        </DialogContent>

                        <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", justifyContent: "space-between" }}>
                            {isSuperAdmin && (
                                <Button
                                    component={Link}
                                    href={`/admin/applications/edit/${selectedApp.id}`}
                                    startIcon={<EditIcon />}
                                    size="small"
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: ROUNDED_SM,
                                        boxShadow: NO_SHADOW,
                                    }}
                                >
                                    Edit Full Record
                                </Button>
                            )}

                            <Button
                                onClick={() => setSelectedApp(null)}
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: ROUNDED_SM,
                                    boxShadow: NO_SHADOW,
                                }}
                            >
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    );
}
