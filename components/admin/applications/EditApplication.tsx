"use client";

import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import {
    Stack,
    Typography,
    Box,
    Divider,
    TextField as MuiTextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    Alert,
    CircularProgress,
    Card,
    CardContent
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useParsed } from "@refinedev/core";

// Define the interface based on your Schema/IApplication
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
};

export default function EditApplication() {
    const { id } = useParsed();
    const {
        saveButtonProps,
        refineCore: { query: queryResult },
        control,
        formState: { errors },
    } = useForm<IApplication>({
        refineCoreProps: {
            resource: "applications",
            action: "edit",
            id,
        },
    });

    const { data, isLoading, isError, error } = queryResult || {};
    const record = data?.data;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Alert severity="error" sx={{ m: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                    Error loading application
                </Typography>
                <Typography variant="body2">
                    {error?.message || "Please try again later."}
                </Typography>
            </Alert>
        );
    }

    if (!record) {
        return <Alert severity="warning">Application not found.</Alert>;
    }

    return (
        <Edit saveButtonProps={saveButtonProps} title={`Edit Application: ${record.fullName}`}>
            <Stack spacing={4}>
                {/* Status Section - Highlighted */}
                <Card variant="outlined" sx={{ bgcolor: 'background.default', borderColor: 'primary.main' }}>
                    <CardContent>
                        <Stack spacing={2}>
                            <Typography variant="subtitle2" color="primary" fontWeight="bold">
                                APPLICATION ACTION
                            </Typography>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "Status is required" }}
                                render={({ field }) => (
                                    <FormControl fullWidth error={!!errors.status}>
                                        <InputLabel>Update Status</InputLabel>
                                        <Select
                                            {...field}
                                            value={field.value ?? ""}
                                            label="Update Status"
                                            sx={{ bgcolor: 'background.paper' }}
                                        >
                                            <MenuItem value="PENDING">Pending</MenuItem>
                                            <MenuItem value="APPROVED">Approved</MenuItem>
                                            <MenuItem value="REJECTED">Rejected</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors.status?.message as string}</FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Stack>
                    </CardContent>
                </Card>

                <Divider textAlign="left">Program Details</Divider>

                <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
                    <Controller
                        name="program"
                        control={control}
                        rules={{ required: "Program is required" }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.program}>
                                <InputLabel>Program</InputLabel>
                                <Select
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Program"
                                >
                                    <MenuItem value="volunteer">Volunteer Program</MenuItem>
                                    <MenuItem value="internship">Internship</MenuItem>
                                    <MenuItem value="cultural-exchange">Cultural Exchange</MenuItem>
                                    <MenuItem value="homestay">Homestay Only</MenuItem>
                                </Select>
                                <FormHelperText>{errors.program?.message as string}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="duration"
                        control={control}
                        rules={{ required: "Duration is required" }}
                        render={({ field }) => (
                            <FormControl fullWidth error={!!errors.duration}>
                                <InputLabel>Duration</InputLabel>
                                <Select
                                    {...field}
                                    value={field.value ?? ""}
                                    label="Duration"
                                >
                                    <MenuItem value="1-week">1 Week</MenuItem>
                                    <MenuItem value="2-weeks">2 Weeks</MenuItem>
                                    <MenuItem value="1-month">1 Month</MenuItem>
                                    <MenuItem value="2-months">2 Months</MenuItem>
                                    <MenuItem value="3-months+">3 Months+</MenuItem>
                                </Select>
                                <FormHelperText>{errors.duration?.message as string}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Box>

                <Divider textAlign="left">Applicant Information</Divider>

                <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
                    <MuiTextField
                        label="Full Name"
                        defaultValue={record.fullName}
                        InputProps={{ readOnly: true }}
                        helperText="Read-only"
                    />
                    <MuiTextField
                        label="Email"
                        defaultValue={record.email}
                        InputProps={{ readOnly: true }}
                        helperText="Read-only"
                    />
                    <MuiTextField
                        label="WhatsApp"
                        defaultValue={record.whatsApp || "N/A"}
                        InputProps={{ readOnly: true }}
                        helperText="Read-only"
                    />
                    <MuiTextField
                        label="Requested Start Date"
                        defaultValue={new Date(record.startDate).toLocaleDateString()}
                        InputProps={{ readOnly: true }}
                        helperText="Read-only"
                    />
                    <MuiTextField
                        label="Requested End Date"
                        defaultValue={record.endDate ? new Date(record.endDate).toLocaleDateString() : "N/A"}
                        InputProps={{ readOnly: true }}
                        helperText="Read-only"
                    />
                </Box>

                <Box>
                    <MuiTextField
                        label="Message from Applicant"
                        defaultValue={record.message || "No message provided."}
                        multiline
                        minRows={4}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                        helperText="Read-only"
                    />
                </Box>
            </Stack>
        </Edit>
    );
}
