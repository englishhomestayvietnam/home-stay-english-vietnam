"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from "@mui/material/CircularProgress";
import { signIn } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

interface SignInModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  callbackURL?: string;
  title?: string;
  description?: string;
}

export function SignInModal({
  trigger,
  open,
  onOpenChange,
  callbackURL,
  title,
  description,
}: SignInModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

  const targetCallbackURL = callbackURL || pathname || "/";
  const modalTitle = title || "Welcome Back";
  const modalDescription =
    description || "Sign in with Google to write reviews, manage applications, and explore homestays.";

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const res = await signIn.social(
        {
          provider: "google",
          callbackURL: targetCallbackURL,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message || "Google sign-in failed");
            setIsLoading(false);
          },
        }
      );

      // Explicitly navigate to Google OAuth URL if not automatically redirected
      if (res?.data?.url) {
        window.location.assign(res.data.url);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md p-6 bg-white/95 backdrop-blur-md border border-gray-100 shadow-2xl rounded-2xl">
        <DialogHeader className="text-center space-y-2 pt-2">
          <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight text-center">
            {modalTitle}
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="pt-6 pb-2 space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="w-full cursor-pointer h-13 text-base font-medium flex items-center justify-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-sm transition-all hover:shadow hover:border-gray-300"
          >
            {isLoading ? (
              <>
                <CircularProgress size={20} thickness={4} color="inherit" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <GoogleIcon className="h-5 w-5 text-red-500" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>

          <p className="pt-2 text-center text-xs text-gray-400">
            By continuing, you agree to our{" "}
            <a href="/terms" className="underline hover:text-gray-600 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
