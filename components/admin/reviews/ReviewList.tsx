"use client";

import React from "react";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Chip, Rating, Stack, alpha } from "@mui/material";
import { useSession } from "@/lib/auth-client";

export default function ReviewList() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user.role === "superAdmin";
  const { dataGridProps } = useDataGrid({ resource: "get-all-reviews" });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "avatar",
        headerName: "",
        width: 70,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Avatar
            src={row.user?.image}
            alt={row.user?.name}
            sx={{
              width: 40,
              height: 40,
              border: "2px solid",
              borderColor: "background.default",
            }}
          />
        ),
      },
      {
        field: "name",
        headerName: "Reviewer",
        minWidth: 180,
        flex: 1,
        renderCell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              minHeight: 56,
            }}
          >
            <Box fontWeight={600} fontSize="0.95rem">
              {row.user?.name || "Anonymous"}
            </Box>
          </Box>
        ),
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 160,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Rating
            value={row?.rating ?? 0}
            precision={0.5}
            readOnly
            size="medium"
            sx={{ color: "#46b96c" }}
          />
        ),
      },
      {
        field: "reviewText",
        headerName: "Review",
        minWidth: 320,
        flex: 2,
        renderCell: ({ row }) => (
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.5,
              fontSize: "0.9rem",
              py: 1.5, // consistent vertical padding
            }}
          >
            {row.reviewText || "—"}
          </Box>
        ),
      },
      {
        field: "approved",
        headerName: "Status",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Chip
            label={row.approved ? "Approved" : "Pending"}
            color={row.approved ? "success" : "warning"}
            size="small"
            variant="filled"
            sx={{
              fontWeight: 600,
              fontSize: "0.8rem",
              height: 30,
            }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "",
        width: 130,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={0.5} sx={{ height: "100%", alignItems: "center" }}>
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
    <List title="Reviews">
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        rowHeight={72}
        sx={{
          border: "none",
          boxShadow: "none",
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          },
          "& .MuiDataGrid-columnHeaders": {
            bgcolor: "transparent",
            borderBottom: "2px solid",
            borderColor: "divider",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "0.75rem",
            letterSpacing: "0.5px",
            color: "text.secondary",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: alpha("#46b96c", 0.04),
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "2px solid",
            borderColor: "divider",
          },
          "& .MuiPaper-root": {
            boxShadow: "none",
          },
        }}
      />
    </List>
  );
}