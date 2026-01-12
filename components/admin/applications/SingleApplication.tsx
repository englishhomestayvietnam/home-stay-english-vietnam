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
    country: string;
    sex: string;
    message?: string;
    status: string;
    createdAt: string;
    groupMembers?: {
        fullName: string;
        country: string;
        sex: string;
    }[];
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
                        <Typography variant="subtitle2" color="text.secondary">Country</Typography>
                        <Typography variant="body1">{data?.country}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">Sex</Typography>
                        <Typography variant="body1">{data?.sex}</Typography>
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

                {/* Group Members */}
                {data?.groupMembers && data.groupMembers.length > 0 && (
                    <>
                        <Box>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Group Members ({data.groupMembers.length})
                            </Typography>
                            <Stack spacing={2}>
                                {data.groupMembers.map((member, index) => (
                                    <Box key={index} p={2} border={1} borderColor="divider" borderRadius={1}>
                                        <Typography variant="subtitle2">Member {index + 1}</Typography>
                                        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mt={1}>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Name</Typography>
                                                <Typography variant="body2">{member.fullName}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Country</Typography>
                                                <Typography variant="body2">{member.country}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" color="text.secondary">Sex</Typography>
                                                <Typography variant="body2">{member.sex}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                        <Divider />
                    </>
                )}

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
