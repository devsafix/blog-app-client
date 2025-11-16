"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction, FormState } from "@/actions/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
// Initial state for the form
const initialState: FormState = {
  success: false,
  message: "",
};

// --- Submit Button Component ---
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? "Signing In..." : "Sign In"}
    </Button>
  );
}

// --- Login Page ---
export default function LoginPage() {
  const [formState, formAction] = useFormState(loginAction, initialState);
  const error =
    formState.success === false && formState.message ? formState.message : null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Sign In
      </h2>

      {/* --- Error Alert --- */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* --- Login Form --- */}
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <SubmitButton />
      </form>

      {/* --- Link to Register --- */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
