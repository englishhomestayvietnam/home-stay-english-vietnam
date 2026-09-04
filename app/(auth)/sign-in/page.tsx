"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleIcon from "@mui/icons-material/Google"; // MUI Google icon
import CircularProgress from "@mui/material/CircularProgress"; // MUI loading spinner
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState, Suspense } from "react";

function SignInContent() {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  // All hooks at the top — always called in same order
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (session?.data?.user) {
      toast.success("You are already signed in.");
      router.push("/");
    }
  }, [session?.data?.user, router]);

  if (session?.data?.user) {
    return null;
  }
  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const res = await signIn.social(
        {
          provider: "google",
          callbackURL: redirectTo,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message || "Google sign-in failed");
            setIsLoading(false);
          },
        }
      );

      // Explicitly redirect to Google OAuth URL if not automatically navigated
      if (res?.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-20 shadow-lg">
      <CardHeader className="text-center space-y-3">
        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Sign in with Google to write reviews and manage your bookings
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          size="lg"
          variant="outline"
          className="w-full cursor-pointer h-14 text-base font-medium flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} thickness={4} color="inherit" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <GoogleIcon className="h-6 w-6 text-red-500" />
              <span>Continue with Google</span>
            </>
          )}
        </Button>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </p>
      </CardContent>
    </Card>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
