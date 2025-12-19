"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z
    .object({
        fullName: z.string().min(2, {
            message: "Full name must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        whatsApp: z.string().optional(),
        startDate: z.date({
            message: "A start date is required.",
        }),
        endDate: z.date({
            message: "An end date is required.",
        }),
        duration: z.string({
            message: "Please select a duration.",
        }),
        program: z.string({
            message: "Please select a program.",
        }),
        message: z.string().optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
        path: ["endDate"],
        message: "End date must be after start date",
    });

import { submitApplication } from "@/app/actions/application";

export function ApplicationForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            whatsApp: "",
            startDate: undefined as any,
            endDate: undefined as any,
            message: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const result = await submitApplication(values);

            if (!result.success) {
                throw new Error(result.error || "Failed to submit application");
            }

            toast.success("Application submitted successfully! We will contact you soon.");
            form.reset();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="whatsApp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>WhatsApp (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+1234567890" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Include country code.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="program"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Program</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a program" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="volunteer">Volunteer Program</SelectItem>
                                        <SelectItem value="internship">Internship</SelectItem>
                                        <SelectItem value="cultural-exchange">Cultural Exchange</SelectItem>
                                        <SelectItem value="homestay">Homestay Only</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1-week">1 Week</SelectItem>
                                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                                        <SelectItem value="1-month">1 Month</SelectItem>
                                        <SelectItem value="2-months">2 Months</SelectItem>
                                        <SelectItem value="3-months+">3 Months+</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormDescription>Choose a future date to begin your program.</FormDescription>
                            <FormControl>
                                <Input
                                    type="date"
                                    min={format(new Date(), "yyyy-MM-dd")}
                                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        field.onChange(val ? new Date(val) : undefined);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormDescription>Choose your planned end date.</FormDescription>
                            <FormControl>
                                <Input
                                    type="date"
                                    min={(() => {
                                        const start = form.watch("startDate");
                                        return format(start ?? new Date(), "yyyy-MM-dd");
                                    })()}
                                    value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        field.onChange(val ? new Date(val) : undefined);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a bit about yourself and why you want to join..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Application
                </Button>
            </form>
        </Form>
    );
}
