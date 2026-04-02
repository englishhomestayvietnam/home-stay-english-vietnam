"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { ApplicationForm } from "@/components/application-form";

export default function ApplyClient() {
    const router = useRouter();
    const { data: session, isPending: sessionLoading } = useSession();
    const user = session?.user;

    // Redirect if not logged in
    useEffect(() => {
        if (!sessionLoading && !user) {
            toast.error("Please sign in to apply");
            router.replace("/sign-in?redirectTo=/apply");
        }
    }, [user, sessionLoading, router]);

    if (sessionLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-3xl">
            <div className="space-y-6 text-center mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-primary">
                    Start Your Journey
                </h1>
                <p className="text-muted-foreground text-lg">
                    Fill out the form below to apply for our programs. We're excited to hear from you!
                </p>
            </div>

            <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
                <ApplicationForm />
            </div>
        </div>
    );
}
