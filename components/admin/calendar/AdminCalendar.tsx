"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Button,
    Chip,
    Stack,
    TextField,
    InputAdornment,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Alert,
    Tooltip,
    useTheme,
    alpha,
} from "@mui/material";
import {
    ChevronLeft,
    ChevronRight,
    Today,
    Search,
    Close,
    CheckCircle,
    HourglassEmpty,
    Cancel,
    OpenInNew,
    Edit as EditIcon,
    Email as EmailIcon,
    WhatsApp as WhatsAppIcon,
    FlightLand,
    FlightTakeoff,
    EventNote,
} from "@mui/icons-material";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
} from "date-fns";
import { useSession } from "@/lib/auth-client";

// Strict styling constants: NO shadow effect, rounded-sm (2px) only
const ROUNDED_SM = "2px";
const NO_SHADOW = "none !important";

interface GroupMember {
    id?: string;
    fullName: string;
    sex: string;
    country: string;
}

interface Application {
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
    status: "PENDING" | "APPROVED" | "REJECTED" | string;
    createdAt: string;
    updatedAt: string;
    userImage?: string | null;
    groupMembers?: GroupMember[];
}

interface CalendarDayEvent {
    person: Application;
    type: "ARRIVAL" | "DEPARTURE";
    date: Date;
}

export default function AdminCalendar() {
    const theme = useTheme();
    const { data: session } = useSession();
    const isSuperAdmin = session?.user?.role === "superAdmin";

    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Event & Status Filters
    const [eventFilter, setEventFilter] = useState<"ALL" | "ARRIVALS" | "DEPARTURES">("ARRIVALS");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "APPROVED" | "PENDING" | "REJECTED">("ALL");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Selected volunteer for info drawer/dialog
    const [selectedEvent, setSelectedEvent] = useState<CalendarDayEvent | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);

    // Fetch applications
    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch("/api/applications");
            if (!res.ok) {
                throw new Error(`Failed to load: ${res.statusText}`);
            }
            const data: Application[] = await res.json();
            setApplications(data);
        } catch (err: any) {
            console.error("Error fetching applications:", err);
            setError(err.message || "Failed to load calendar data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Helper for initials
    const getInitials = (name: string) => {
        if (!name) return "?";
        const parts = name.trim().split(" ");
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    // Helper for avatar URL
    const getAvatarUrl = (app: Application) => {
        if (app.userImage) return app.userImage;
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
            app.fullName
        )}&background=46b96c&color=ffffff&bold=true&size=128`;
    };

    // Filter applications by status and search query
    const filteredApps = useMemo(() => {
        return applications.filter((app) => {
            // Status filter
            if (statusFilter !== "ALL" && app.status !== statusFilter) return false;

            // Search filter
            if (searchQuery.trim() !== "") {
                const q = searchQuery.toLowerCase();
                const matchName = app.fullName.toLowerCase().includes(q);
                const matchCountry = app.country.toLowerCase().includes(q);
                const matchEmail = app.email.toLowerCase().includes(q);
                if (!matchName && !matchCountry && !matchEmail) return false;
            }

            return true;
        });
    }, [applications, statusFilter, searchQuery]);

    // Calendar Grid Days
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const calendarDays = useMemo(
        () => eachDayOfInterval({ start: calendarStart, end: calendarEnd }),
        [calendarStart, calendarEnd]
    );

    // Month Counts for Filter Pills
    const monthStats = useMemo(() => {
        let arrivalsCount = 0;
        let departuresCount = 0;
        let approvedCount = 0;
        let pendingCount = 0;
        let rejectedCount = 0;

        applications.forEach((app) => {
            const start = app.startDate ? new Date(app.startDate) : null;
            const end = app.endDate ? new Date(app.endDate) : null;

            const isStartThisMonth = start && isSameMonth(start, currentMonth);
            const isEndThisMonth = end && isSameMonth(end, currentMonth);

            if (isStartThisMonth) arrivalsCount++;
            if (isEndThisMonth) departuresCount++;

            if (isStartThisMonth || isEndThisMonth) {
                if (app.status === "APPROVED") approvedCount++;
                if (app.status === "PENDING") pendingCount++;
                if (app.status === "REJECTED") rejectedCount++;
            }
        });

        return {
            arrivals: arrivalsCount,
            departures: departuresCount,
            totalEvents: arrivalsCount + departuresCount,
            approved: approvedCount,
            pending: pendingCount,
            rejected: rejectedCount,
        };
    }, [applications, currentMonth]);

    // Quick Status Update
    const handleQuickStatusUpdate = async (appId: string, newStatus: "APPROVED" | "REJECTED" | "PENDING") => {
        try {
            setUpdatingStatus(true);
            const res = await fetch(`/api/applications/${appId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            setApplications((prev) =>
                prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
            );
            if (selectedEvent?.person.id === appId) {
                setSelectedEvent({
                    ...selectedEvent,
                    person: { ...selectedEvent.person, status: newStatus },
                });
            }

            setActionSuccess(`Status updated to ${newStatus}`);
            setTimeout(() => setActionSuccess(null), 3000);
        } catch (err: any) {
            alert("Error: " + err.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    return (
        <Box sx={{ width: "100%", pb: 8 }}>
            {/* Top Bar: Title & Month Navigation */}
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: ROUNDED_SM,
                    boxShadow: NO_SHADOW,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", md: "center" },
                    gap: 2,
                }}
            >
                {/* Title */}
                <Box>
                    <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ letterSpacing: "-0.5px" }}>
                        Volunteer Calendar
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Click on any volunteer's photo to view their schedule, arrival/departure dates, and full details.
                    </Typography>
                </Box>

                {/* Month Navigation */}
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        size="small"
                        onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: ROUNDED_SM,
                            boxShadow: NO_SHADOW,
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>

                    <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ minWidth: 160, textAlign: "center", userSelect: "none" }}
                    >
                        {format(currentMonth, "MMMM yyyy")}
                    </Typography>

                    <IconButton
                        size="small"
                        onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: ROUNDED_SM,
                            boxShadow: NO_SHADOW,
                        }}
                    >
                        <ChevronRight />
                    </IconButton>

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Today />}
                        onClick={() => setCurrentMonth(new Date())}
                        sx={{
                            borderColor: "divider",
                            textTransform: "none",
                            borderRadius: ROUNDED_SM,
                            boxShadow: NO_SHADOW,
                            fontWeight: 600,
                            ml: 1,
                        }}
                    >
                        Today
                    </Button>
                </Stack>
            </Paper>

            {/* Comprehensive & Clean Filter Bar */}
            <Paper
                variant="outlined"
                sx={{
                    p: 1.5,
                    mb: 2.5,
                    borderRadius: ROUNDED_SM,
                    boxShadow: NO_SHADOW,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                }}
            >
                {/* Row 1: Event Type Filters (Arrivals vs Departures vs All) */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    {/* Event Type Filter Buttons */}
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ mr: 0.5 }}>
                            SHOW:
                        </Typography>

                        {/* Arrivals Filter */}
                        <Button
                            variant={eventFilter === "ARRIVALS" ? "contained" : "outlined"}
                            size="small"
                            startIcon={<FlightLand />}
                            onClick={() => setEventFilter("ARRIVALS")}
                            sx={{
                                textTransform: "none",
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                bgcolor: eventFilter === "ARRIVALS" ? "primary.main" : "transparent",
                                color: eventFilter === "ARRIVALS" ? "#fff" : "text.secondary",
                                borderColor: "divider",
                                "&:hover": { boxShadow: NO_SHADOW },
                            }}
                        >
                            Arrivals ({monthStats.arrivals})
                        </Button>

                        {/* Departures Filter */}
                        <Button
                            variant={eventFilter === "DEPARTURES" ? "contained" : "outlined"}
                            size="small"
                            startIcon={<FlightTakeoff />}
                            onClick={() => setEventFilter("DEPARTURES")}
                            sx={{
                                textTransform: "none",
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                bgcolor: eventFilter === "DEPARTURES" ? "#2563eb" : "transparent",
                                color: eventFilter === "DEPARTURES" ? "#fff" : "text.secondary",
                                borderColor: "divider",
                                "&:hover": { boxShadow: NO_SHADOW },
                            }}
                        >
                            Departures ({monthStats.departures})
                        </Button>

                        {/* All Events (Both) */}
                        <Button
                            variant={eventFilter === "ALL" ? "contained" : "outlined"}
                            size="small"
                            startIcon={<EventNote />}
                            onClick={() => setEventFilter("ALL")}
                            sx={{
                                textTransform: "none",
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                bgcolor: eventFilter === "ALL" ? "#475569" : "transparent",
                                color: eventFilter === "ALL" ? "#fff" : "text.secondary",
                                borderColor: "divider",
                                "&:hover": { boxShadow: NO_SHADOW },
                            }}
                        >
                            All Events ({monthStats.totalEvents})
                        </Button>
                    </Stack>

                    {/* Quick Search Input */}
                    <TextField
                        size="small"
                        placeholder="Search volunteer or country..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" sx={{ color: "text.secondary" }} />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontSize: "0.85rem",
                                height: 34,
                            },
                        }}
                        sx={{ width: { xs: "100%", sm: 240 } }}
                    />
                </Box>

                {/* Row 2: Status Filter Chips & Legend */}
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1.5,
                        pt: 1,
                        borderTop: "1px dashed",
                        borderColor: "divider",
                    }}
                >
                    {/* Status Chips */}
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                        <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ mr: 0.5 }}>
                            STATUS:
                        </Typography>

                        <Chip
                            label="All Status"
                            onClick={() => setStatusFilter("ALL")}
                            variant={statusFilter === "ALL" ? "filled" : "outlined"}
                            color={statusFilter === "ALL" ? "primary" : "default"}
                            size="small"
                            sx={{
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        />

                        <Chip
                            label={`🟢 Approved (${monthStats.approved})`}
                            onClick={() => setStatusFilter("APPROVED")}
                            variant={statusFilter === "APPROVED" ? "filled" : "outlined"}
                            color={statusFilter === "APPROVED" ? "success" : "default"}
                            size="small"
                            sx={{
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        />

                        <Chip
                            label={`🟡 Pending (${monthStats.pending})`}
                            onClick={() => setStatusFilter("PENDING")}
                            variant={statusFilter === "PENDING" ? "filled" : "outlined"}
                            color={statusFilter === "PENDING" ? "warning" : "default"}
                            size="small"
                            sx={{
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        />

                        <Chip
                            label={`🔴 Rejected (${monthStats.rejected})`}
                            onClick={() => setStatusFilter("REJECTED")}
                            variant={statusFilter === "REJECTED" ? "filled" : "outlined"}
                            color={statusFilter === "REJECTED" ? "error" : "default"}
                            size="small"
                            sx={{
                                borderRadius: ROUNDED_SM,
                                boxShadow: NO_SHADOW,
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        />
                    </Stack>

                    {/* Visual Indicators Legend */}
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Box sx={{ width: 10, height: 10, bgcolor: "#16a34a", borderRadius: ROUNDED_SM }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                Green Ring = Arrival
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Box sx={{ width: 10, height: 10, bgcolor: "#2563eb", borderRadius: ROUNDED_SM }} />
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>
                                Blue Ring = Departure
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            {/* Notification alert */}
            {actionSuccess && (
                <Alert
                    severity="success"
                    sx={{ mb: 2, borderRadius: ROUNDED_SM, boxShadow: NO_SHADOW }}
                    onClose={() => setActionSuccess(null)}
                >
                    {actionSuccess}
                </Alert>
            )}

            {/* Loading state */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Error state */}
            {error && (
                <Alert severity="error" sx={{ mb: 2, borderRadius: ROUNDED_SM, boxShadow: NO_SHADOW }}>
                    {error}
                </Alert>
            )}

            {/* Calendar Grid - Clean, Spacious, Image-First */}
            {!loading && !error && (
                <Paper
                    variant="outlined"
                    sx={{
                        borderRadius: ROUNDED_SM,
                        overflow: "hidden",
                        boxShadow: NO_SHADOW,
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    {/* Weekday Names Header */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            bgcolor: alpha("#46b96c", 0.05),
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            textAlign: "center",
                            py: 1.2,
                        }}
                    >
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                            (dayName) => (
                                <Typography
                                    key={dayName}
                                    variant="caption"
                                    fontWeight={800}
                                    color="text.secondary"
                                    textTransform="uppercase"
                                    sx={{ letterSpacing: "0.5px" }}
                                >
                                    {dayName}
                                </Typography>
                            )
                        )}
                    </Box>

                    {/* Month Days Grid */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            bgcolor: "divider",
                            gap: "1px",
                        }}
                    >
                        {calendarDays.map((day) => {
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isCurrentDay = isToday(day);

                            // Collect events for this day according to eventFilter
                            const dayEvents: CalendarDayEvent[] = [];

                            filteredApps.forEach((app) => {
                                // Arrival on this day?
                                if (eventFilter === "ALL" || eventFilter === "ARRIVALS") {
                                    if (app.startDate && isSameDay(new Date(app.startDate), day)) {
                                        dayEvents.push({
                                            person: app,
                                            type: "ARRIVAL",
                                            date: new Date(app.startDate),
                                        });
                                    }
                                }

                                // Departure on this day?
                                if (eventFilter === "ALL" || eventFilter === "DEPARTURES") {
                                    if (app.endDate && isSameDay(new Date(app.endDate), day)) {
                                        dayEvents.push({
                                            person: app,
                                            type: "DEPARTURE",
                                            date: new Date(app.endDate),
                                        });
                                    }
                                }
                            });

                            return (
                                <Box
                                    key={day.toISOString()}
                                    sx={{
                                        bgcolor: isCurrentMonth ? "background.paper" : alpha("#f1f5f9", 0.5),
                                        minHeight: 125,
                                        p: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "background 0.15s ease",
                                        position: "relative",
                                        "&:hover": {
                                            bgcolor: isCurrentMonth
                                                ? alpha("#46b96c", 0.04)
                                                : alpha("#f1f5f9", 0.8),
                                        },
                                    }}
                                >
                                    {/* Date Number Header */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            fontWeight={isCurrentDay ? 900 : isCurrentMonth ? 700 : 400}
                                            sx={{
                                                color: isCurrentDay
                                                    ? "primary.main"
                                                    : isCurrentMonth
                                                    ? "text.primary"
                                                    : "text.disabled",
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: isCurrentDay ? 24 : "auto",
                                                height: isCurrentDay ? 24 : "auto",
                                                borderRadius: ROUNDED_SM,
                                                bgcolor: isCurrentDay ? alpha("#46b96c", 0.15) : "transparent",
                                            }}
                                        >
                                            {format(day, "d")}
                                        </Typography>

                                        {dayEvents.length > 0 && (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: "0.68rem",
                                                    color: "text.secondary",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {dayEvents.length} {dayEvents.length > 1 ? "people" : "person"}
                                            </Typography>
                                        )}
                                    </Box>

                                    {/* Volunteer Images ONLY */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.8,
                                            alignItems: "center",
                                            alignContent: "flex-start",
                                            flexGrow: 1,
                                        }}
                                    >
                                        {dayEvents.map((ev, index) => {
                                            const person = ev.person;
                                            const isArrival = ev.type === "ARRIVAL";

                                            // Ring color: Green for Arrival, Blue for Departure
                                            // Status pill indicator inside tooltip
                                            const ringColor = isArrival ? "#16a34a" : "#2563eb";

                                            return (
                                                <Tooltip
                                                    key={`${person.id}-${ev.type}-${index}`}
                                                    title={
                                                        <Box sx={{ p: 0.5 }}>
                                                            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.3 }}>
                                                                {isArrival ? (
                                                                    <FlightLand sx={{ fontSize: "14px !important", color: "#16a34a" }} />
                                                                ) : (
                                                                    <FlightTakeoff sx={{ fontSize: "14px !important", color: "#2563eb" }} />
                                                                )}
                                                                <Typography
                                                                    variant="caption"
                                                                    fontWeight={800}
                                                                    sx={{ color: isArrival ? "#16a34a" : "#2563eb" }}
                                                                >
                                                                    {isArrival ? "ARRIVAL / CHECK-IN" : "DEPARTURE / CHECKOUT"}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography variant="subtitle2" fontWeight={800}>
                                                                {person.fullName}
                                                            </Typography>
                                                            <Typography variant="caption" display="block">
                                                                {person.country} • {person.duration}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                fontWeight={700}
                                                                sx={{
                                                                    color:
                                                                        person.status === "APPROVED"
                                                                            ? "#16a34a"
                                                                            : person.status === "PENDING"
                                                                            ? "#d97706"
                                                                            : "#ef4444",
                                                                    display: "block",
                                                                    mt: 0.5,
                                                                }}
                                                            >
                                                                ● Status: {person.status}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: "italic", display: "block", mt: 0.5 }}>
                                                                Click to view details
                                                            </Typography>
                                                        </Box>
                                                    }
                                                    arrow
                                                >
                                                    <Box
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedEvent(ev);
                                                        }}
                                                        sx={{
                                                            cursor: "pointer",
                                                            display: "inline-flex",
                                                            position: "relative",
                                                            alignItems: "center",
                                                            p: "2px",
                                                            borderRadius: ROUNDED_SM,
                                                            border: `2px solid ${ringColor}`,
                                                            transition: "transform 0.12s, border-color 0.12s",
                                                            "&:hover": {
                                                                transform: "scale(1.1)",
                                                                borderColor: "primary.main",
                                                            },
                                                        }}
                                                    >
                                                        <Avatar
                                                            src={getAvatarUrl(person)}
                                                            alt={person.fullName}
                                                            sx={{
                                                                width: 36,
                                                                height: 36,
                                                                borderRadius: ROUNDED_SM,
                                                                boxShadow: NO_SHADOW,
                                                                fontSize: "0.8rem",
                                                                fontWeight: 700,
                                                                bgcolor: isArrival ? alpha("#16a34a", 0.15) : alpha("#2563eb", 0.15),
                                                                color: isArrival ? "#16a34a" : "#2563eb",
                                                            }}
                                                        >
                                                            {getInitials(person.fullName)}
                                                        </Avatar>

                                                        {/* Tiny Arrival/Departure icon badge in corner */}
                                                        <Box
                                                            sx={{
                                                                position: "absolute",
                                                                bottom: -4,
                                                                right: -4,
                                                                bgcolor: ringColor,
                                                                color: "#fff",
                                                                width: 14,
                                                                height: 14,
                                                                borderRadius: ROUNDED_SM,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                            }}
                                                        >
                                                            {isArrival ? (
                                                                <FlightLand sx={{ fontSize: "9px !important" }} />
                                                            ) : (
                                                                <FlightTakeoff sx={{ fontSize: "9px !important" }} />
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Tooltip>
                                            );
                                        })}
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                </Paper>
            )}

            {/* Volunteer Info Modal: Opens on photo click */}
            <Dialog
                open={Boolean(selectedEvent)}
                onClose={() => setSelectedEvent(null)}
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
                {selectedEvent && (
                    <>
                        <DialogTitle sx={{ pb: 1, borderBottom: "1px solid", borderColor: "divider" }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    {selectedEvent.type === "ARRIVAL" ? (
                                        <Chip
                                            icon={<FlightLand sx={{ fontSize: "14px !important" }} />}
                                            label="Arrival / Check-in"
                                            size="small"
                                            sx={{
                                                bgcolor: alpha("#16a34a", 0.1),
                                                color: "#16a34a",
                                                fontWeight: 800,
                                                borderRadius: ROUNDED_SM,
                                            }}
                                        />
                                    ) : (
                                        <Chip
                                            icon={<FlightTakeoff sx={{ fontSize: "14px !important" }} />}
                                            label="Departure / Checkout Due"
                                            size="small"
                                            sx={{
                                                bgcolor: alpha("#2563eb", 0.1),
                                                color: "#2563eb",
                                                fontWeight: 800,
                                                borderRadius: ROUNDED_SM,
                                            }}
                                        />
                                    )}
                                    <Typography variant="h6" fontWeight={800}>
                                        Volunteer Details
                                    </Typography>
                                </Stack>
                                <IconButton size="small" onClick={() => setSelectedEvent(null)}>
                                    <Close fontSize="small" />
                                </IconButton>
                            </Box>
                        </DialogTitle>

                        <DialogContent sx={{ pt: 2.5 }}>
                            <Stack spacing={2.5}>
                                {/* Header Card with Avatar + Name + Status */}
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
                                        src={getAvatarUrl(selectedEvent.person)}
                                        alt={selectedEvent.person.fullName}
                                        sx={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: ROUNDED_SM,
                                            boxShadow: NO_SHADOW,
                                            fontSize: "1.2rem",
                                            fontWeight: 800,
                                            border: `2px solid ${
                                                selectedEvent.type === "ARRIVAL" ? "#16a34a" : "#2563eb"
                                            }`,
                                        }}
                                    >
                                        {getInitials(selectedEvent.person.fullName)}
                                    </Avatar>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" fontWeight={800} lineHeight={1.2}>
                                            {selectedEvent.person.fullName}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {selectedEvent.person.country} • {selectedEvent.person.sex}
                                        </Typography>

                                        <Box sx={{ mt: 0.5 }}>
                                            <Chip
                                                label={selectedEvent.person.status}
                                                color={
                                                    selectedEvent.person.status === "APPROVED"
                                                        ? "success"
                                                        : selectedEvent.person.status === "REJECTED"
                                                        ? "error"
                                                        : "warning"
                                                }
                                                size="small"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: "0.7rem",
                                                    borderRadius: ROUNDED_SM,
                                                    boxShadow: NO_SHADOW,
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
                                            <Typography variant="caption" color="text.secondary">
                                                Arrival Date
                                            </Typography>
                                            <Typography variant="body2" fontWeight={800} color="#16a34a">
                                                {format(new Date(selectedEvent.person.startDate), "EEE, dd MMM yyyy")}
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary">
                                                Checkout Due Date
                                            </Typography>
                                            <Typography variant="body2" fontWeight={800} color="#2563eb">
                                                {selectedEvent.person.endDate
                                                    ? format(new Date(selectedEvent.person.endDate), "EEE, dd MMM yyyy")
                                                    : "N/A"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Stay Duration: <strong>{selectedEvent.person.duration}</strong>
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
                                                    href={`mailto:${selectedEvent.person.email}`}
                                                    style={{ color: theme.palette.primary.main, textDecoration: "none" }}
                                                >
                                                    {selectedEvent.person.email}
                                                </a>
                                            </Typography>
                                        </Box>

                                        {selectedEvent.person.whatsApp && (
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <WhatsAppIcon fontSize="small" sx={{ color: "#25D366" }} />
                                                <Typography variant="body2">
                                                    <a
                                                        href={`https://wa.me/${selectedEvent.person.whatsApp.replace(/[^0-9]/g, "")}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ color: "#16a34a", textDecoration: "none", fontWeight: 700 }}
                                                    >
                                                        {selectedEvent.person.whatsApp} (Chat on WhatsApp)
                                                    </a>
                                                </Typography>
                                            </Box>
                                        )}
                                    </Stack>
                                </Paper>

                                {/* Personal Motivation / Note */}
                                {selectedEvent.person.message && (
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
                                                {selectedEvent.person.message}
                                            </Typography>
                                        </Paper>
                                    </Box>
                                )}

                                {/* Admin Quick Decision */}
                                {isSuperAdmin && (
                                    <Box sx={{ pt: 1 }}>
                                        <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 1 }}>
                                            QUICK STATUS DECISION
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            {selectedEvent.person.status !== "APPROVED" && (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={<CheckCircle />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedEvent.person.id, "APPROVED")}
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

                                            {selectedEvent.person.status !== "PENDING" && (
                                                <Button
                                                    variant="outlined"
                                                    color="warning"
                                                    size="small"
                                                    startIcon={<HourglassEmpty />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedEvent.person.id, "PENDING")}
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

                                            {selectedEvent.person.status !== "REJECTED" && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    startIcon={<Cancel />}
                                                    disabled={updatingStatus}
                                                    onClick={() => handleQuickStatusUpdate(selectedEvent.person.id, "REJECTED")}
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
                            <Button
                                component={Link}
                                href={`/admin/applications/show/${selectedEvent.person.id}`}
                                endIcon={<OpenInNew />}
                                size="small"
                                sx={{
                                    textTransform: "none",
                                    borderRadius: ROUNDED_SM,
                                    boxShadow: NO_SHADOW,
                                }}
                            >
                                Open Full Application
                            </Button>

                            <Button
                                onClick={() => setSelectedEvent(null)}
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
        </Box>
    );
}
