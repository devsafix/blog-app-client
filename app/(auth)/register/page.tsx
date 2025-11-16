"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerAction, FormState } from "@/actions/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
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
      {pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

// --- Register Page ---
export default function RegisterPage() {
  const [formState, formAction] = useFormState(registerAction, initialState);
  // Derive alert state directly from formState to avoid calling setState synchronously in an effect
  const formAlert: FormState | null = formState.message ? formState : null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Create Account
      </h2>

      {/* --- Alert (Success or Error) --- */}
      {formAlert && (
        <Alert
          variant={formAlert.success ? "default" : "destructive"}
          className={`mb-4 ${
            formAlert.success ? "bg-green-50 border-green-200" : ""
          }`}
        >
          {formAlert.success ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {formAlert.success ? "Success!" : "Registration Failed"}
          </AlertTitle>
          <AlertDescription>
            {formAlert.message}
            {formAlert.success && (
              <Link href="/login" className="font-bold underline ml-1">
                Please sign in.
              </Link>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* --- Register Form --- */}
      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" required />
          {formState.errors?.name && (
            <p className="text-sm text-red-600">{formState.errors.name[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
          {formState.errors?.email && (
            <p className="text-sm text-red-600">{formState.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
          {formState.errors?.password && (
            <p className="text-sm text-red-600">
              {formState.errors.password[0]}
            </p>
          )}
        </div>

        <SubmitButton />
      </form>

      {/* --- Link to Login --- */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
