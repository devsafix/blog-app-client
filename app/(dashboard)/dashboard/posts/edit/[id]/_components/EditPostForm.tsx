"use client";

import { useFormStatus } from "react-dom";
import { updatePostAction, FormState } from "@/actions/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Post } from "@/types";

// Initial state for the form
const initialState: FormState = { success: false, message: "" };

// Submit button that shows a loading state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Updating..." : "Update Post"}
    </Button>
  );
}

// The Edit Form component
export function EditPostForm({ post }: { post: Post }) {
  // 1. Bind the postId to the Server Action
  // This is the standard way to pass extra args to a form action
  const updatePostActionWithId = updatePostAction.bind(null, post.id);

  // 2. Initialize useFormState with the bound action
  const [formState, formAction] = useActionState(
    updatePostActionWithId,
    initialState
  );

  // 3. Show a toast notification on success or error
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
    <form action={formAction} className="space-y-6 max-w-3xl">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" defaultValue={post.title} required />
        {formState.errors?.title && (
          <p className="text-sm text-red-600">{formState.errors.title[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content (supports HTML)</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={post.content}
          rows={15}
          required
        />
        {formState.errors?.content && (
          <p className="text-sm text-red-600">{formState.errors.content[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          defaultValue={post.thumbnail || ""}
          placeholder="https://..."
        />
        {formState.errors?.thumbnail && (
          <p className="text-sm text-red-600">
            {formState.errors.thumbnail[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={post.tags.join(", ")}
          placeholder="e.g., nextjs, react, typescript"
        />
        {formState.errors?.tags && (
          <p className="text-sm text-red-600">{formState.errors.tags[0]}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isFeatured"
          name="isFeatured"
          defaultChecked={post.isFeatured}
        />
        <Label htmlFor="isFeatured">Mark as Featured</Label>
      </div>

      <SubmitButton />
    </form>
  );
}
