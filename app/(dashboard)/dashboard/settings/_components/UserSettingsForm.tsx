"use client";

import { useActionState } from "react";
import { updateUserAction, FormState } from "@/actions/actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormStatus } from "react-dom";

// Initial state for the form
const initialState: FormState = { success: false, message: "" };

// Submit button that shows a loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

// The Edit Form component
export function UserSettingsForm({ user }: { user: User }) {
  const [formState, formAction] = useActionState(
    updateUserAction,
    initialState
  );

  // Show a toast notification on success or error
  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast.success(formState.message);
      } else {
        toast.error(formState.message);
      }
    }
  }, [formState]);

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
        <CardDescription>
          This information will be displayed publicly on your posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" defaultValue={user.name} required />
            {formState.errors?.name && (
              <p className="text-sm text-red-600">{formState.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
            />
            {formState.errors?.email && (
              <p className="text-sm text-red-600">
                {formState.errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              defaultValue={user.phone || ""}
              placeholder="+1 234 567 890"
            />
            {formState.errors?.phone && (
              <p className="text-sm text-red-600">
                {formState.errors.phone[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="picture">Picture URL (Optional)</Label>
            <Input
              id="picture"
              name="picture"
              defaultValue={user.picture || ""}
              placeholder="https://..."
            />
            {formState.errors?.picture && (
              <p className="text-sm text-red-600">
                {formState.errors.picture[0]}
              </p>
            )}
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
