"use client";

import React from "react";
import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useDataGrid,
} from "@refinedev/mui";
import { format } from "date-fns";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Stack, alpha } from "@mui/material";
import { useSession } from "@/lib/auth-client";


interface GroupMember {
    id: string;
    fullName: string;
    sex: string;
    country: string;
}

export default function ApplicationsList() {
    const { data: session } = useSession();
    const isSuperAdmin = session?.user.role === "superAdmin";

    const { dataGridProps } = useDataGrid({
        resource: "applications",
        sorters: {
            initial: [
                {
                    field: "createdAt",
                    order: "desc",
                },
            ],
        }
    });

    const columns = React.useMemo<GridColDef[]>(
        () => [
            {
                field: "fullName",
                headerName: "Full Name",
                minWidth: 150,
                flex: 1,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 200,
                flex: 1,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "duration",
                headerName: "Duration",
                minWidth: 120,
                align: "center",
                headerAlign: "center",
            },
            {
                field: "startDate",
                headerName: "Start Date",
                minWidth: 120,
                align: "center",
                headerAlign: "center",
                renderCell: ({ value }) => value ? format(new Date(value), "dd MMM yyyy") : "-",
            },
            {
                field: "endDate",
                headerName: "End Date",
                minWidth: 120,
                align: "center",
                headerAlign: "center",
                renderCell: ({ value }) => value ? format(new Date(value), "dd MMM yyyy") : "-",
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
                        variant="filled"
                        sx={{ fontWeight: "bold" }}
                    />
                ),
            },
            {
                field: "createdAt",
                headerName: "Applied At",
                minWidth: 180,
                align: "center",
                headerAlign: "center",
                renderCell: ({ value }) => value ? format(new Date(value), "dd MMM yyyy, HH:mm") : "-",
            },
            {
                field: "groupMembers",
                headerName: "Group Members",
                minWidth: 250,
                flex: 1,
                align: "center",
                headerAlign: "center",
                renderCell: ({ row }) => {
                    const members = row.groupMembers as GroupMember[];
                    if (!members || members.length === 0) return "-";
                    return (
                        <Stack spacing={0.5} py={1} sx={{ width: "100%" }}>
                            {members.map((member) => (
                                <Box key={member.id} sx={{
                                    p: 1,
                                    bgcolor: "background.paper",
                                    borderRadius: 1,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    fontSize: "0.75rem",
                                    textAlign: "left"
                                }}>
                                    <strong>{member.fullName}</strong>
                                    <Box component="span" sx={{ color: "text.secondary" }}>
                                        {" • "}{member.sex}{" • "}{member.country}
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    );
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                filterable: false,
                align: "center",
                headerAlign: "center",
                minWidth: 120,
                renderCell: ({ row }) => (
                    <Stack direction="row" spacing={1} sx={{ height: "100%", alignItems: "center", justifyContent: "center", width: "100%" }}>
                        <ShowButton hideText size="small" recordItemId={row.id} />
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
        <List title="Applications">
            <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                disableRowSelectionOnClick
                getRowHeight={() => "auto"}
                sx={{
                    border: "none",
                    boxShadow: "none",
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnHeaderTitleContainer": {
                        justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        bgcolor: "transparent",
                        borderBottom: "2px solid",
                        borderColor: "divider",
                        fontWeight: 600,
                        color: "text.secondary",
                    },
                    "& .MuiDataGrid-row:hover": {
                        bgcolor: alpha("#46b96c", 0.04),
                    },
                }}
            />
        </List>
    );
}
