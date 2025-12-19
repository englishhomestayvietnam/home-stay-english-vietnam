"use client";

import { useShow } from "@refinedev/core";
import {
    Show,
    TextFieldComponent as TextField,
    DateField,
    EmailField,
} from "@refinedev/mui";
import { Stack, Typography, Box, Divider, Chip } from "@mui/material";

type IApplication = {
    id: string;
    fullName: string;
    email: string;
    whatsApp?: string;
    startDate: string;
    endDate?: string;
    duration: string;
    program: string;
    message?: string;
    status: string;
    createdAt: string;
};

export default function SingleApplication() {
    const {
        result: data,
        query: { isLoading },
    } = useShow<IApplication>();

    return (
        <Show isLoading={isLoading} headerProps={{ title: "Application Details" }}>
            <Stack spacing={4}>

                {/* Header / Status */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h5" fontWeight={600}>
                            {data?.fullName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontFamily="monospace">
                            ID: {data?.id}
                        </Typography>
                    </Box>
                    <Chip
                        label={data?.status}
                        color={
                            data?.status === "APPROVED" ? "success" :
                                data?.status === "REJECTED" ? "error" : "warning"
                        }
                        sx={{ fontWeight: 'bold' }}
                    />
                </Box>

                <Divider />

                {/* Key Details Grid */}
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={4}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Program</Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{data?.program}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                        <Typography variant="body1">{data?.duration}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Start Date</Typography>
                        <DateField value={data?.startDate} format="LL" />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">End Date</Typography>
                        {data?.endDate ? <DateField value={data?.endDate} format="LL" /> : "N/A"}
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Applied On</Typography>
                        <DateField value={data?.createdAt} format="LLLL" />
                    </Box>
                </Box>

                <Divider />

                {/* Contact Info */}
                <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={4}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                        <EmailField value={data?.email} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">WhatsApp</Typography>
                        <Typography variant="body1">{data?.whatsApp || "N/A"}</Typography>
                    </Box>
                </Box>

                <Divider />

                {/* Message */}
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>Message</Typography>
                    <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {data?.message || "No message provided."}
                        </Typography>
                    </Box>
                </Box>

            </Stack>
        </Show>
    );
}
