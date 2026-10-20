  "use client";

  import { useShow } from "@refinedev/core";
  import {
    Show,
    NumberField,
    TextFieldComponent as TextField,
    MarkdownField,
  } from "@refinedev/mui";
  import { Stack, Typography, Box, Divider, Rating, Avatar } from "@mui/material";

  type IReview = {
    id: string;
    rating: number;
    title: string;
    reviewText: string;
    stayDuration: string;
    nationality: string;
    approved: boolean;
    user?: { name?: string; image?: string };
  };

  export default function SingleReview() {
    const {
      result: record,
      query: { isLoading },
    } = useShow<IReview>();

    return (
      <Show
        isLoading={isLoading}
        headerProps={{ title: false }}
        wrapperProps={{
          sx: {
            borderRadius: "2px",
            boxShadow: "none !important",
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        <Stack spacing={4}>
          {/* Header with Rating */}
          <Box textAlign="start">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 2,
                mt: 2,
              }}
            >
              <Avatar
                src={record?.user?.image}
                alt={record?.user?.name}
                sx={{ borderRadius: "2px", width: 44, height: 44 }}
              />

              <Rating
                value={record?.rating ?? 0}
                precision={0.5}
                readOnly
                size="large"
              />
              <Typography variant="h6" color="text.secondary">
                {record?.rating ?? 0} out of 5 stars
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Details */}
          <Stack spacing={6} direction="row">
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Review ID
              </Typography>
              <TextField
                value={record?.id ?? ""}
                sx={{ fontFamily: "monospace", fontSize: "1.1rem" }}
              />
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Volunteer Name
              </Typography>
              <TextField value={record?.user?.name || "Anonymous"} />
            </Box>
            <Divider />

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Rating
              </Typography>
              <NumberField value={record?.rating} />
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Stay Duration
              </Typography>
              <TextField value={record?.stayDuration} />
            </Box>

              <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Nationality
              </Typography>
              <TextField value={record?.nationality} />
            </Box>
          </Stack>

          <Divider />

          {/* Full Review Text */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Full Review
            </Typography>
            <Box
              sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: "2px",
                boxShadow: "none !important",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <MarkdownField
                value={record?.reviewText || "*No review text provided.*"}
              />
            </Box>
          </Box>
        </Stack>
      </Show>
    );
  }
