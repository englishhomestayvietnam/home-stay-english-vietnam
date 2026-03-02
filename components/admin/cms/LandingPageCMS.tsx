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
  CardHeader,
} from "@mui/material";
import { Save, CloudUpload, Delete, Visibility } from "@mui/icons-material";

import { HeroSectionDemo } from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";
import Image from "next/image";

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
    title: "Teach. Travel. Connect.",
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
    ],
  },
  about: {
    title: "About Us",
    subtitle: "What is English Homestay Vietnam?",
    description:
      "We are a bridge between cultures, connecting passionate travelers with eager Vietnamese learners in an authentic homestay experience.",
    images: ["/home_stay_vietnam_7.jpg"],
  },
  programs: {
    title: "Our Programs",
    description:
      "Choose the experience that fits your journey. Both programs offer unique opportunities for cultural exchange and personal growth.",
  },
  benefits: {
    title: "Why Choose Us?",
    description:
      "We offer more than just a place to stay. Join our community and discover the benefits of cultural exchange.",
  },
  gallery: {
    title: "Life at English Homestay Vietnam",
    subtitle: "Watch Our Story",
    description:
      "See what daily life looks like in our homestay community. These moments capture the friendships, learning, and cultural exchange that make our program special.",
    videoUrl: "0dPxWVHBR8g",
  },
};

export default function LandingPageCMS() {
  const [activeTab, setActiveTab] = useState(0);
  const [contents, setContents] = useState<Record<string, ContentSection>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/landing-page");
      const data = await res.json();

      const initializedData: Record<string, ContentSection> = {};

      SECTIONS.forEach((sec) => {
        const fetched = data[sec] || {};
        const def = DEFAULTS[sec] || {};

        initializedData[sec] = {
          section: sec,
          title: fetched.title || def.title || "",
          subtitle: fetched.subtitle || def.subtitle || "",
          description: fetched.description || def.description || "",
          images: fetched.images?.length > 0 ? fetched.images : def.images || [],
          videoUrl: fetched.videoUrl || def.videoUrl || "",
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

  const saveSection = async (section: string, data: ContentSection) => {
    const res = await fetch("/api/landing-page", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to save");
  };

  const handleSave = async (section: string) => {
    setSaving(true);
    try {
      await saveSection(section, contents[section]);
      showNotification("Content saved successfully!", "success");
    } catch {
      showNotification("Failed to save content", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section: string, field: keyof ContentSection, value: string) => {
    setContents((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleDeleteImage = async (section: string, index: number) => {
    const updatedImages = [...(contents[section].images || [])];
    updatedImages.splice(index, 1);

    // Optimistically update state
    setContents((prev) => ({
      ...prev,
      [section]: { ...prev[section], images: updatedImages },
    }));

    // Persist deletion to DB immediately
    try {
      await saveSection(section, { ...contents[section], images: updatedImages });
      showNotification("Image deleted", "success");
    } catch {
      showNotification("Failed to delete image from database", "error");
      // Rollback on failure
      setContents((prev) => ({
        ...prev,
        [section]: { ...prev[section], images: contents[section].images },
      }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Upload failed (${res.status}): ${errText}`);
      }

      const uploadData = await res.json();

      if (!uploadData.url) {
        throw new Error("No image URL returned from server");
      }

      // Build updated images array from current state directly (avoids stale closure)
      const updatedImages = [...(contents[section]?.images || []), uploadData.url];

      // Update local state
      setContents((prev) => ({
        ...prev,
        [section]: { ...prev[section], images: updatedImages },
      }));

      // ✅ Save to DB immediately using fresh data — not stale state
      await saveSection(section, { ...contents[section], images: updatedImages });

      showNotification("Image uploaded and saved successfully", "success");
    } catch (err: any) {
      console.error("Image upload error:", err);
      showNotification(err.message || "Failed to upload image", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const showNotification = (message: string, severity: "success" | "error") => {
    setNotification({ message, severity });
  };

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 8 }} />;

  const currentSectionName = SECTIONS[activeTab];
  const data = contents[currentSectionName] || {
    section: currentSectionName,
    title: "",
    subtitle: "",
    description: "",
    images: [],
    videoUrl: "",
  };

  const renderPreview = () => {
    const previewContent = contents[currentSectionName];
    switch (currentSectionName) {
      case "hero":
        return <HeroSectionDemo content={previewContent} />;
      case "about":
        return <About content={previewContent} />;
      case "programs":
        return <Programs content={previewContent} />;
      case "benefits":
        return <Benefits content={previewContent} />;
      case "gallery":
        return <Gallery content={previewContent} />;
      default:
        return null;
    }
  };

  return (
    <Stack spacing={4} sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" component="h1">
            Landing Page Content Editor
          </Typography>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save />}
            onClick={() => handleSave(currentSectionName)}
            disabled={saving || uploading}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{ mb: 4, borderBottom: 1, borderColor: "divider" }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {SECTIONS.map((sec) => (
            <Tab key={sec} label={sec.toUpperCase()} />
          ))}
        </Tabs>

        <Grid container spacing={4}>
          {/* ── Live Preview ── */}
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ overflow: "hidden" }}>
              <CardHeader
                title="Live Preview"
                subheader="How visitors will see this section"
                avatar={<Visibility />}
                sx={{ bgcolor: "action.hover", borderBottom: 1, borderColor: "divider" }}
              />
              <CardContent sx={{ p: 0, bgcolor: "#fafafa", maxHeight: "680px", overflowY: "auto" }}>
                <Box sx={{ transformOrigin: "top left", width: "100%" }}>
                  {renderPreview()}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* ── Edit Form ── */}
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Edit {currentSectionName.charAt(0).toUpperCase() + currentSectionName.slice(1)}
              </Typography>

              <Stack spacing={3}>
                <TextField
                  label="Title"
                  fullWidth
                  value={data.title || ""}
                  onChange={(e) => handleChange(currentSectionName, "title", e.target.value)}
                />

                {currentSectionName !== "programs" && currentSectionName !== "benefits" && (
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

                {currentSectionName === "gallery" && (
                  <TextField
                    label="YouTube Video ID"
                    fullWidth
                    value={data.videoUrl || ""}
                    onChange={(e) => handleChange(currentSectionName, "videoUrl", e.target.value)}
                    helperText="Example: 0dPxWVHBR8g (from https://youtu.be/0dPxWVHBR8g)"
                  />
                )}

                <Divider textAlign="left" sx={{ my: 2 }}>
                  Images
                </Divider>

                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                    disabled={uploading || saving}
                    sx={{ mb: 2 }}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => handleImageUpload(e, currentSectionName)}
                    />
                  </Button>

                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {data.images?.map((img, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          position: "relative",
                          width: 140,
                          height: 105,
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Image src={img} alt="" fill sizes="140px" style={{ objectFit: "cover" }} />
                        <IconButton
                          size="small"
                          color="error"
                          sx={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            bgcolor: "white",
                            "&:hover": { bgcolor: "#ffebee" },
                          }}
                          onClick={() => handleDeleteImage(currentSectionName, idx)}
                          disabled={uploading || saving}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}

                    {(!data.images || data.images.length === 0) && (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 4, width: "100%", textAlign: "center" }}>
                        No images added yet
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={!!notification}
          autoHideDuration={5000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity={notification?.severity}
            sx={{ width: "100%" }}
            variant="filled"
          >
            {notification?.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Stack>
  );
}