"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Tabs,
    Tab,
    TextField,
    Button,
    Stack,
    Divider,
    IconButton,
    CircularProgress,
    Alert,
    Snackbar,
    Grid,
    Card,
    CardContent,
    CardHeader
} from "@mui/material";
import { Save, CloudUpload, Delete, Visibility } from "@mui/icons-material";

// Import frontend components for preview
import { HeroSectionDemo } from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";

interface ContentSection {
    section: string;
    title: string;
    subtitle: string;
    description: string;
    images: string[];
    videoUrl: string;
}

const SECTIONS = ["hero", "about", "programs", "benefits", "gallery"];

const DEFAULTS: Record<string, Partial<ContentSection>> = {
    hero: {
        title: "Teach. Travel. Connect.", // Keeping it simple for text input
        subtitle: "STAY FREE • TEACH ENGLISH • LIVE LOCAL",
        description: "Live with passionate Vietnamese learners. Share your language. Build lifelong bonds.",
        images: [
            "/home_stay_vietnam_1.jpg",
            "/home_stay_vietnam_2.jpg",
            "/home_stay_vietnam_3.jpg",
            "/home_stay_vietnam_4.jpg",
            "/home_stay_vietnam_5.jpg",
            "/home_stay_vietnam_6.jpg",
            "/home_stay_vietnam_7.jpg",
        ]
    },
    about: {
        title: "About Us",
        subtitle: "What is English Homestay Vietnam?",
        description: "We are a bridge between cultures, connecting passionate travelers with eager Vietnamese learners in an authentic homestay experience.",
        images: ["/home_stay_vietnam_7.jpg"]
    },
    programs: {
        title: "Our Programs",
        description: "Choose the experience that fits your journey. Both programs offer unique opportunities for cultural exchange and personal growth.",
    },
    benefits: {
        title: "Why Choose Us?",
        description: "We offer more than just a place to stay. Join our community and discover the benefits of cultural exchange.",
    },
    gallery: {
        title: "Life at English Homestay Vietnam",
        subtitle: "Watch Our Story",
        description: "See what daily life looks like in our homestay community. These moments capture the friendships, learning, and cultural exchange that make our program special.",
        videoUrl: "0dPxWVHBR8g" // ID only default
    }
};

export default function LandingPageCMS() {
    const [activeTab, setActiveTab] = useState(0);
    const [contents, setContents] = useState<Record<string, ContentSection>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/landing-page");
            const data = await res.json();

            // Merge fetched data with defaults
            const initializedData: Record<string, any> = {};

            SECTIONS.forEach(sec => {
                const fetched = data[sec] || {};
                const def = DEFAULTS[sec] || {};

                initializedData[sec] = {
                    section: sec,
                    title: fetched.title || def.title || "",
                    subtitle: fetched.subtitle || def.subtitle || "",
                    description: fetched.description || def.description || "",
                    images: (fetched.images && fetched.images.length > 0) ? fetched.images : (def.images || []),
                    videoUrl: fetched.videoUrl || def.videoUrl || ""
                };
            });

            setContents(initializedData);
        } catch (error) {
            console.error("Failed to fetch content", error);
            showNotification("Failed to load content", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (section: string) => {
        setSaving(true);
        try {
            const res = await fetch("/api/landing-page", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contents[section]),
            });

            if (!res.ok) throw new Error("Failed to save");

            showNotification("Content saved successfully!", "success");
        } catch {
            showNotification("Failed to save content", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>, section: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setSaving(true); // Reuse saving state for loading indicator
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();

            // Add image URL to section
            setContents(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    images: [...(prev[section].images || []), data.url]
                }
            }));
            showNotification("Image uploaded successfully!", "success");
        } catch {
            showNotification("Upload failed", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteImage = (section: string, index: number) => {
        setContents(prev => {
            const newImages = [...prev[section].images];
            newImages.splice(index, 1);
            return {
                ...prev,
                [section]: { ...prev[section], images: newImages }
            };
        });
    };

    const handleChange = (section: string, field: keyof ContentSection, value: string) => {
        setContents(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const showNotification = (message: string, severity: "success" | "error") => {
        setNotification({ message, severity });
    };

    if (loading) return <CircularProgress />;

    const currentSectionName = SECTIONS[activeTab];
    const data = contents[currentSectionName] || { section: currentSectionName, title: "", subtitle: "", description: "", images: [], videoUrl: "" };

    const renderPreview = () => {
        const previewContent = contents[currentSectionName];
        switch (currentSectionName) {
            case 'hero': return <HeroSectionDemo content={previewContent} />;
            case 'about': return <About content={previewContent} />;
            case 'programs': return <Programs content={previewContent} />;
            case 'benefits': return <Benefits content={previewContent} />;
            case 'gallery': return <Gallery content={previewContent} />;
            default: return null;
        }
    };

    return (
        <Stack spacing={4}>
            <Paper sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5">Landing Page Content</Typography>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={() => handleSave(currentSectionName)}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </Box>

                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {SECTIONS.map((sec) => (
                        <Tab key={sec} label={sec.toUpperCase()} />
                    ))}
                </Tabs>

                <Grid container spacing={4}>
                    {/* Preview Section - Now on Top */}
                    <Grid item xs={12} md={12}>
                        <Card variant="outlined" sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <CardHeader
                                title="Live Preview"
                                subheader="How it looks on the site"
                                avatar={<Visibility />}
                                sx={{ bgcolor: 'action.hover', borderBottom: 1, borderColor: 'divider' }}
                            />
                            <CardContent sx={{ p: 0, bgcolor: '#fff', maxHeight: '600px', overflowY: 'auto' }}>
                                <Box sx={{ transform: 'scale(1)', transformOrigin: 'top left', width: '100%' }}>
                                    {renderPreview()}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Form Section - Now Below */}
                    <Grid item xs={12} md={12}>
                        <Paper variant="outlined" sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Edit Content</Typography>
                            <Stack spacing={3}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    value={data.title || ""}
                                    onChange={(e) => handleChange(currentSectionName, "title", e.target.value)}
                                />
                                {currentSectionName !== 'programs' && currentSectionName !== 'benefits' && (
                                    <TextField
                                        label="Subtitle"
                                        fullWidth
                                        value={data.subtitle || ""}
                                        onChange={(e) => handleChange(currentSectionName, "subtitle", e.target.value)}
                                    />
                                )}
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    minRows={4}
                                    value={data.description || ""}
                                    onChange={(e) => handleChange(currentSectionName, "description", e.target.value)}
                                />

                                {currentSectionName === 'gallery' && (
                                    <TextField
                                        label="Video URL (YouTube ID or Link)"
                                        fullWidth
                                        value={data.videoUrl || ""}
                                        onChange={(e) => handleChange(currentSectionName, "videoUrl", e.target.value)}
                                        helperText="e.g., 0dPxWVHBR8g or https://www.youtube.com/watch?v=0dPxWVHBR8g"
                                    />
                                )}

                                <Divider textAlign="left">Images</Divider>

                                <Box>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id={`upload-file-${currentSectionName}`}
                                        type="file"
                                        onChange={(e) => handleUpload(e, currentSectionName)}
                                        disabled={saving}
                                    />
                                    <label htmlFor={`upload-file-${currentSectionName}`}>
                                        <Button variant="outlined" component="span" startIcon={<CloudUpload />}>
                                            Upload Image
                                        </Button>
                                    </label>
                                </Box>

                                <Box display="flex" flexWrap="wrap" gap={2}>
                                    {data.images?.map((img, index) => (
                                        <Box key={index} position="relative" width={120} height={90}>
                                            <img
                                                src={img}
                                                alt={`Upload ${index}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                                            />
                                            <IconButton
                                                size="small"
                                                color="error"
                                                sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255,255,255,0.8)' }}
                                                onClick={() => handleDeleteImage(currentSectionName, index)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    {(!data.images || data.images.length === 0) && (
                                        <Typography color="text.secondary" variant="body2" sx={{ my: 2 }}>
                                            No images available.
                                        </Typography>
                                    )}
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>

                <Snackbar
                    open={!!notification}
                    autoHideDuration={6000}
                    onClose={() => setNotification(null)}
                >
                    <Alert severity={notification?.severity || "info"} onClose={() => setNotification(null)}>
                        {notification?.message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Stack>
    );
}
