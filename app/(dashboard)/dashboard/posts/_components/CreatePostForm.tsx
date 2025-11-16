"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createPostAction, FormState } from "@/actions/actions";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const initialState: FormState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Creating..." : "Create Post"}
    </Button>
  );
}

export function CreatePostForm() {
  const [formState, formAction] = useFormState(createPostAction, initialState);

  useEffect(() => {
    if (formState.message) {
      toast.success(formState.message);
      if (formState.success) {
        // TODO: Close the sheet
      }
    }
  }, [formState]);

  return (
    <form action={formAction} className="space-y-6 py-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
        {formState.errors?.title && (
          <p className="text-sm text-red-600">{formState.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (supports HTML)</Label>
        <Textarea id="content" name="content" rows={15} required />
        {formState.errors?.content && (
          <p className="text-sm text-red-600">{formState.errors.content[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input id="thumbnail" name="thumbnail" placeholder="https://..." />
        {formState.errors?.thumbnail && (
          <p className="text-sm text-red-600">
            {formState.errors.thumbnail[0]}
          </p>
        )}
      </div>

      {/* TODO: Add a tag input component */}

      <div className="flex items-center space-x-2">
        <Checkbox id="isFeatured" name="isFeatured" />
        <Label htmlFor="isFeatured">Mark as Featured</Label>
      </div>

      <SubmitButton />
    </form>
  );
}
