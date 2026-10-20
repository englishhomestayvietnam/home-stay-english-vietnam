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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Avatar,
  Box,
  Chip,
  Rating,
  Stack,
  Typography,
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
  CheckCircle,
  HourglassEmpty,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useSession } from "@/lib/auth-client";

const ROUNDED_SM = "2px";
const NO_SHADOW = "none !important";

interface ReviewRow {
  id: string;
  rating: number;
  title?: string | null;
  reviewText: string;
  stayDuration?: string;
  nationality?: string;
  approved: boolean;
  date?: string;
  user?: {
    name?: string;
    image?: string;
    email?: string;
  };
}

export default function ReviewList() {
  const { data: session } = useSession();
  const isSuperAdmin = session?.user.role === "superAdmin";
  const invalidate = useInvalidate();

  const [selectedReview, setSelectedReview] = useState<ReviewRow | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const { dataGridProps } = useDataGrid({
    resource: "get-all-reviews",
    pagination: {
      currentPage: 1,
      pageSize: 10,
      mode: "server",
    },
    sorters: {
      initial: [
        {
          field: "date",
          order: "desc",
        },
      ],
    },
  });

  // Quick toggle approval status
  const handleToggleApproval = async (reviewId: string, currentApproved: boolean) => {
    try {
      setUpdating(true);
      const res = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !currentApproved }),
      });

      if (!res.ok) throw new Error("Failed to update review approval");

      setSelectedReview((prev) => (prev ? { ...prev, approved: !currentApproved } : null));
      invalidate({ resource: "get-all-reviews", invalidates: ["list"] });
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Reviewer",
        minWidth: 220,
        flex: 1.2,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%" }}>
            <Avatar
              src={
                row.user?.image ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  row.user?.name || "Reviewer"
                )}&background=46b96c&color=ffffff&bold=true`
              }
              alt={row.user?.name || "Reviewer"}
              sx={{
                width: 36,
                height: 36,
                borderRadius: ROUNDED_SM,
                boxShadow: NO_SHADOW,
                fontSize: "0.8rem",
                fontWeight: 700,
                bgcolor: alpha("#46b96c", 0.15),
                color: "primary.dark",
              }}
            >
              {row.user?.name?.[0] || "R"}
            </Avatar>
            <Box sx={{ minWidth: 0, overflow: "hidden" }}>
              <Typography variant="body2" fontWeight={700} noWrap sx={{ color: "text.primary" }}>
                {row.user?.name || "Anonymous Volunteer"}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap display="block">
                {row.nationality || "International"} {row.stayDuration ? `• ${row.stayDuration}` : ""}
              </Typography>
            </Box>
          </Stack>
        ),
      },
      {
        field: "rating",
        headerName: "Rating",
        width: 140,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Rating
              value={row?.rating ?? 5}
              precision={0.5}
              readOnly
              size="small"
              sx={{ color: "#46b96c" }}
            />
          </Box>
        ),
      },
      {
        field: "reviewText",
        headerName: "Review Snippet",
        minWidth: 320,
        flex: 2,
        renderCell: ({ row }) => (
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: 1.4,
              fontSize: "0.85rem",
              color: "text.secondary",
              py: 1,
            }}
          >
            {row.reviewText || "—"}
          </Box>
        ),
      },
      {
        field: "approved",
        headerName: "Status",
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => (
          <Chip
            label={row.approved ? "Approved" : "Pending"}
            color={row.approved ? "success" : "warning"}
            size="small"
            sx={{
              fontWeight: 800,
              borderRadius: ROUNDED_SM,
              boxShadow: NO_SHADOW,
              fontSize: "0.72rem",
            }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 130,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: ({ row }) => (
          <Stack direction="row" spacing={0.5} sx={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
            <Tooltip title="View Review Details">
              <IconButton
                size="small"
                onClick={() => setSelectedReview(row as ReviewRow)}
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
              Volunteer Reviews
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Review, approve, and manage volunteer testimonial stories.
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

      {/* Review Quick View Modal */}
      <Dialog
        open={Boolean(selectedReview)}
        onClose={() => setSelectedReview(null)}
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
        {selectedReview && (
          <>
            <DialogTitle sx={{ pb: 1, borderBottom: "1px solid", borderColor: "divider" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={800}>
                  Review Details
                </Typography>
                <IconButton size="small" onClick={() => setSelectedReview(null)}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5 }}>
              <Stack spacing={2.5}>
                {/* Volunteer Details Card */}
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
                      selectedReview.user?.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        selectedReview.user?.name || "Reviewer"
                      )}&background=46b96c&color=ffffff&bold=true`
                    }
                    alt={selectedReview.user?.name || "Reviewer"}
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: ROUNDED_SM,
                      boxShadow: NO_SHADOW,
                      fontSize: "1.1rem",
                      fontWeight: 800,
                    }}
                  >
                    {selectedReview.user?.name?.[0] || "R"}
                  </Avatar>

                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
                      {selectedReview.user?.name || "Anonymous Volunteer"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedReview.nationality || "International"} • Stay: {selectedReview.stayDuration || "N/A"}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Rating
                        value={selectedReview.rating || 5}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ color: "#46b96c" }}
                      />
                      <Chip
                        label={selectedReview.approved ? "Approved" : "Pending"}
                        color={selectedReview.approved ? "success" : "warning"}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.68rem",
                          borderRadius: ROUNDED_SM,
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Review Text */}
                <Box>
                  <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 0.5 }}>
                    FULL REVIEW TEXT:
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: ROUNDED_SM,
                      boxShadow: NO_SHADOW,
                      bgcolor: "background.default",
                      borderColor: "divider",
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                      {selectedReview.reviewText || "No text provided."}
                    </Typography>
                  </Paper>
                </Box>

                {/* Admin Status Toggle */}
                {isSuperAdmin && (
                  <Box sx={{ pt: 1 }}>
                    <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                      STATUS ACTION:
                    </Typography>
                    <Button
                      variant={selectedReview.approved ? "outlined" : "contained"}
                      color={selectedReview.approved ? "warning" : "success"}
                      size="small"
                      startIcon={selectedReview.approved ? <HourglassEmpty /> : <CheckCircle />}
                      disabled={updating}
                      onClick={() => handleToggleApproval(selectedReview.id, selectedReview.approved)}
                      sx={{
                        borderRadius: ROUNDED_SM,
                        boxShadow: NO_SHADOW,
                        textTransform: "none",
                        fontWeight: 700,
                      }}
                    >
                      {selectedReview.approved ? "Unapprove / Set to Pending" : "Approve Review"}
                    </Button>
                  </Box>
                )}
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider", justifyContent: "space-between" }}>
              {isSuperAdmin && (
                <Button
                  component={Link}
                  href={`/admin/reviews/edit/${selectedReview.id}`}
                  startIcon={<EditIcon />}
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: ROUNDED_SM,
                    boxShadow: NO_SHADOW,
                  }}
                >
                  Edit Review
                </Button>
              )}

              <Button
                onClick={() => setSelectedReview(null)}
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