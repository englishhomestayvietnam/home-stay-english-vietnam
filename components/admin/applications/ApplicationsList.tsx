"use client";

import React from "react";
import {
    DeleteButton,
    EditButton,
    List,
    ShowButton,
    useDataGrid,
    DateField,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Chip, Stack, alpha } from "@mui/material";
import { useSession } from "@/lib/auth-client";

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
            },
            {
                field: "email",
                headerName: "Email",
                minWidth: 200,
                flex: 1,
            },
            {
                field: "program",
                headerName: "Program",
                minWidth: 150,
                renderCell: ({ value }) => (
                    <Chip
                        label={value}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: 'capitalize' }}
                    />
                ),
            },
            {
                field: "duration",
                headerName: "Duration",
                minWidth: 120,
            },
            {
                field: "startDate",
                headerName: "Start Date",
                minWidth: 120,
                renderCell: ({ value }) => <DateField value={value} format="LL" />,
            },
            {
                field: "endDate",
                headerName: "End Date",
                minWidth: 120,
                renderCell: ({ value }) => value ? <DateField value={value} format="LL" /> : "-",
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
                minWidth: 150,
                renderCell: ({ value }) => <DateField value={value} format="LLL" />,
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
                    <Stack direction="row" spacing={1} sx={{ height: "100%", alignItems: "center" }}>
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
                rowHeight={60}
                sx={{
                    border: "none",
                    boxShadow: "none",
                    "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
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
