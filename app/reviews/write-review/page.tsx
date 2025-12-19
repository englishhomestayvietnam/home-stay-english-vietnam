'use client';

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { Home, BookOpen } from "lucide-react";

const formSchema = z.object({
  stayDuration: z.string().min(1, "Please enter stay duration"),
  stayPeriod: z.string().min(1, "Please enter travel date"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().optional(),
  nationality: z.string().min(1, "Please select or enter your country"),
  countryFlag: z.string().min(1),
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  { name: "United States", flag: "United States" },
  { name: "United Kingdom", flag: "United Kingdom" },
  { name: "Canada", flag: "Canada" },
  { name: "Vietnam", flag: "Vietnam" },
  { name: "Australia", flag: "Australia" },
  { name: "Germany", flag: "Germany" },
  { name: "France", flag: "France" },
  { name: "Japan", flag: "Japan" },
  { name: "Thailand", flag: "Thailand" },
  { name: "Indonesia", flag: "Indonesia" },
];

export default function WriteReviewPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [isCheckingReview, setIsCheckingReview] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtherCountry, setIsOtherCountry] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      stayDuration: "",
      stayPeriod: "",
      rating: 0,
      title: "",
      nationality: "",
      countryFlag: "",
      reviewText: "",
    },
  });

  const rating = form.watch("rating");

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !user) {
      toast.error("Please sign in to write a review");
      router.replace("/sign-in?redirectTo=/reviews/write-review");
    }
  }, [user, sessionLoading, router]);

  // Check if user already submitted a review
  useEffect(() => {
    if (!user) return;

    const checkExisting = async () => {
      try {
        const res = await fetch(`/api/reviews/exists?userId=${user.id}`);
        const data = await res.json();

        if (data.exists) {
          setHasReviewed(true);
          toast.success("You've already shared your experience! Thank you");
          router.replace("/reviews/thank-you");
        }
      } catch (err) {
        // failed to check review status
      } finally {
        setIsCheckingReview(false);
      }
    };

    checkExisting();
  }, [user, router]);

  const handleCountryChange = (value: string) => {
    if (value === "Other") {
      setIsOtherCountry(true);
      form.setValue("nationality", "");
      form.setValue("countryFlag", "Earth");
    } else {
      setIsOtherCountry(false);
      const country = countries.find((c) => c.name === value);
      if (country) {
        form.setValue("nationality", country.name);
        form.setValue("countryFlag", country.flag);
      }
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (!user) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          userId: user.id,
          userName: user.name ?? "Anonymous",
          userImage: user.image ?? null,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        if (error.includes("already")) {
          toast.success("You've already submitted a review!");
          router.push("/reviews/thank-you");
          return;
        }
        throw new Error(error);
      }

      toast.success("Thank you!", {
        description: "Your review has been submitted successfully.",
      });

      router.push("/reviews/thank-you");
    } catch (error) {
      toast.error("Submission failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading states
  if (sessionLoading || isCheckingReview) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#46b96c]"></div>
      </div>
    );
  }

  if (!user || hasReviewed) {
    return null; // Redirect already happened
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>Share your experience to help future volunteers</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Star Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overall Rating <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            className="transition-transform hover:scale-110"
                          >
                            {star <= rating ? (
                              <StarIcon className="h-12 w-12 text-yellow-500 fill-yellow-500 drop-shadow" />
                            ) : (
                              <StarBorderIcon className="h-12 w-12 text-gray-400" />
                            )}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Amazing volunteer experience!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Review Text */}
              <FormField
                control={form.control}
                name="reviewText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your stay..."
                        className="min-h-40 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>At least 10 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stay Duration & Period */}
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="stayDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stay Duration <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2 weeks" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stayPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When did you stay? <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. November 2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Country Selector */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country / Nationality <span className="text-red- 500">*</span></FormLabel>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                      <div className="flex-1 w-full">
                        <Select onValueChange={handleCountryChange} value={isOtherCountry ? "Other" : field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((c) => (
                              <SelectItem key={c.name} value={c.name}>
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl">{c.flag}</span>
                                  <span>{c.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                            <SelectItem value="Other">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">Earth</span>
                                <span>Other</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {isOtherCountry && (
                        <Input
                          placeholder="Enter your country"
                          className="w-full sm:w-64"
                          autoFocus
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            form.setValue("countryFlag", "Earth");
                          }}
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-[#46b96c] hover:bg-[#3a9959] text-white"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-3 mt-6 w-full justify-between">
        <Button asChild variant="outline" className="border-[#46b96c] text-[#46b96c] hover:bg-[#46b96c]/5">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-[#46b96c] text-[#46b96c] hover:bg-[#46b96c]/5">
          <Link href="/reviews">
            <BookOpen className="w-4 h-4 mr-2" />
            Read Reviews
          </Link>
        </Button>
      </div>
    </div>
  );
}