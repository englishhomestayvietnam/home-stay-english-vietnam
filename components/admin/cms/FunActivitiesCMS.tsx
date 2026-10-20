"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  alpha,
} from "@mui/material";
import { Save, CloudUpload, Delete, Edit, Add } from "@mui/icons-material";
import Image from "next/image";

interface FunActivity {
  id?: string;
  title: string;
  subtitle: string;
  schedule: string;
  icon: string;
  description: string;
  highlights: string[];
  images: string[];
  order: number;
}

export default function FunActivitiesCMS() {
  const [activities, setActivities] = useState<FunActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; severity: "success" | "error" } | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<FunActivity | null>(null);
  const [newHighlight, setNewHighlight] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/fun-activities");
      const data = await res.json();
      if (Array.isArray(data)) {
        setActivities(data);
      } else {
        console.error("API returned non-array:", data);
        setActivities([]);
        showNotification(data?.error || "Failed to load activities", "error");
      }
    } catch (error) {
      console.error("Failed to fetch activities", error);
      showNotification("Failed to load activities", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (activity?: FunActivity) => {
    if (activity) {
      setCurrentActivity(activity);
    } else {
      setCurrentActivity({
        title: "",
        subtitle: "",
        schedule: "",
        icon: "Compass",
        description: "",
        highlights: [],
        images: [],
        order: activities.length,
      });
    }
    setNewHighlight("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentActivity(null);
  };

  const handleSave = async () => {
    if (!currentActivity) return;
    setSaving(true);
    try {
      const isEditing = !!currentActivity.id;
      const url = isEditing ? `/api/fun-activities/${currentActivity.id}` : "/api/fun-activities";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentActivity),
      });

      if (!res.ok) throw new Error("Failed to save");

      showNotification(`Activity ${isEditing ? "updated" : "created"} successfully!`, "success");
      handleCloseModal();
      fetchActivities();
    } catch (error) {
      showNotification("Failed to save activity", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteActivity = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      const res = await fetch(`/api/fun-activities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showNotification("Activity deleted successfully!", "success");
      fetchActivities();
    } catch (error) {
      showNotification("Failed to delete activity", "error");
    }
  };

  const handleChange = (field: keyof FunActivity, value: any) => {
    if (currentActivity) {
      setCurrentActivity({ ...currentActivity, [field]: value });
    }
  };

  const handleAddHighlight = () => {
    if (currentActivity && newHighlight.trim()) {
      setCurrentActivity({
        ...currentActivity,
        highlights: [...currentActivity.highlights, newHighlight.trim()],
      });
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    if (currentActivity) {
      const newHighlights = [...currentActivity.highlights];
      newHighlights.splice(index, 1);
      setCurrentActivity({ ...currentActivity, highlights: newHighlights });
    }
  };

  const handleDeleteImage = (index: number) => {
    if (currentActivity) {
      const newImages = [...currentActivity.images];
      newImages.splice(index, 1);
      setCurrentActivity({ ...currentActivity, images: newImages });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentActivity) return;
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
      if (!uploadData.url) throw new Error("No image URL returned from server");

      const updatedImages = [...currentActivity.images, uploadData.url];
      setCurrentActivity({ ...currentActivity, images: updatedImages });
      showNotification("Image uploaded temporarily. Don't forget to save!", "success");
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

  return (
    <>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: "-0.5px" }}>
            Fun Activities Manager
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
            sx={{
              borderRadius: "2px",
              boxShadow: "none !important",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Add New Activity
          </Button>
        </Box>

        <List disablePadding>
          {activities.length === 0 ? (
            <Typography color="textSecondary" align="center" py={4}>
              No fun activities found. Click "Add New Activity" to create one.
            </Typography>
          ) : (
            activities.map((activity) => (
              <Paper
                variant="outlined"
                sx={{
                  mb: 2,
                  borderRadius: "2px",
                  boxShadow: "none !important",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": { bgcolor: alpha("#46b96c", 0.03) },
                }}
                key={activity.id}
              >
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemText
                    primary={<Typography variant="subtitle1" fontWeight={700}>{activity.title}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" component="span" display="block" color="text.secondary">
                          {activity.subtitle}
                        </Typography>
                        <Typography variant="caption" color="primary.main" fontWeight={600}>
                          {activity.schedule} • {activity.images.length} images
                        </Typography>
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleOpenModal(activity)}
                      sx={{
                        mr: 1,
                        borderRadius: "2px",
                        color: "primary.main",
                        "&:hover": { bgcolor: alpha("#46b96c", 0.1) },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteActivity(activity.id!)}
                      color="error"
                      sx={{
                        borderRadius: "2px",
                        "&:hover": { bgcolor: alpha("#f44336", 0.1) },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Paper>
            ))
          )}
        </List>
      </Box>

      {/* Edit/Create Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "2px",
            boxShadow: "none !important",
            border: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: "1px solid", borderColor: "divider" }}>
          {currentActivity?.id ? "Edit Activity" : "Create Activity"}
        </DialogTitle>
        <DialogContent dividers sx={{ pt: 2.5 }}>
          {currentActivity && (
            <Stack spacing={3} sx={{ mt: 1, "& .MuiOutlinedInput-root": { borderRadius: "2px" } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Title"
                    fullWidth
                    value={currentActivity.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Subtitle"
                    fullWidth
                    value={currentActivity.subtitle}
                    onChange={(e) => handleChange("subtitle", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Schedule"
                    fullWidth
                    placeholder="e.g. Every Saturday"
                    value={currentActivity.schedule}
                    onChange={(e) => handleChange("schedule", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Icon Name"
                    fullWidth
                    placeholder="e.g. Compass, Utensils"
                    value={currentActivity.icon}
                    onChange={(e) => handleChange("icon", e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    minRows={3}
                    value={currentActivity.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </Grid>

                {/* Highlights */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Highlights
                  </Typography>
                  <List dense disablePadding>
                    {currentActivity.highlights.map((hl, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemText primary={`• ${hl}`} />
                        <ListItemSecondaryAction>
                          <IconButton size="small" edge="end" onClick={() => handleRemoveHighlight(index)} sx={{ borderRadius: "2px" }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Box display="flex" gap={1} mt={1}>
                    <TextField
                      label="Add Highlight"
                      size="small"
                      fullWidth
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddHighlight()}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddHighlight}
                      sx={{ borderRadius: "2px", boxShadow: "none !important", textTransform: "none", fontWeight: 700 }}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>

                {/* Images */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Images
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUpload />}
                    disabled={uploading}
                    sx={{
                      mb: 2,
                      borderRadius: "2px",
                      boxShadow: "none !important",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    {uploading ? "Uploading..." : "Upload Image"}
                    <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                  </Button>

                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {currentActivity.images.map((img, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          position: "relative",
                          width: 120,
                          height: 90,
                          borderRadius: "2px",
                          overflow: "hidden",
                          boxShadow: "none !important",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Image src={img} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
                        <IconButton
                          size="small"
                          color="error"
                          sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            bgcolor: "white",
                            borderRadius: "2px",
                            boxShadow: "none !important",
                            "&:hover": { bgcolor: "#ffebee" },
                          }}
                          onClick={() => handleDeleteImage(idx)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                    {currentActivity.images.length === 0 && (
                      <Typography variant="body2" color="text.secondary">
                        No images uploaded yet.
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Button onClick={handleCloseModal} disabled={saving} sx={{ borderRadius: "2px", textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              borderRadius: "2px",
              boxShadow: "none !important",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {saving ? "Saving..." : "Save Activity"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!notification}
        autoHideDuration={5000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setNotification(null)} severity={notification?.severity} sx={{ width: "100%" }} variant="filled">
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
