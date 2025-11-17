"use client";

import { useFormStatus } from "react-dom";
import { createPostAction, FormState } from "@/actions/actions";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  Image as ImageIcon,
  Tag,
  Star,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const initialState: FormState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all"
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Creating Post..." : "Create Post"}
    </Button>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function CreatePostForm() {
  const [formState, formAction] = useActionState(
    createPostAction,
    initialState
  );

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
    <motion.form
      action={formAction}
      className="space-y-6 py-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          htmlFor="title"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4 text-gray-500" />
          Post Title
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter an engaging title..."
          className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
        {formState.errors?.title && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {formState.errors.title[0]}
          </p>
        )}
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label htmlFor="content" className="text-sm font-medium text-gray-700">
          Content{" "}
          <span className="text-gray-400 text-xs">(HTML supported)</span>
        </Label>
        <Textarea
          id="content"
          name="content"
          rows={15}
          placeholder="Write your post content here..."
          className="font-mono text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
          required
        />
        {formState.errors?.content && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {formState.errors.content[0]}
          </p>
        )}
      </motion.div>

      {/* Thumbnail */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          htmlFor="thumbnail"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4 text-gray-500" />
          Thumbnail URL <span className="text-gray-400">(Optional)</span>
        </Label>
        <Input
          id="thumbnail"
          name="thumbnail"
          placeholder="https://example.com/image.jpg"
          className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
        {formState.errors?.thumbnail && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {formState.errors.thumbnail[0]}
          </p>
        )}
      </motion.div>

      {/* Tags */}
      <motion.div variants={itemVariants} className="space-y-2">
        <Label
          htmlFor="tags"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          <Tag className="w-4 h-4 text-gray-500" />
          Tags <span className="text-gray-400 text-xs">(Comma-separated)</span>
        </Label>
        <Input
          id="tags"
          name="tags"
          placeholder="e.g., nextjs, react, typescript"
          className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </motion.div>

      {/* Featured Checkbox */}
      <motion.div
        variants={itemVariants}
        className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-100"
      >
        <Checkbox
          id="isFeatured"
          name="isFeatured"
          className="border-blue-300"
        />
        <Label
          htmlFor="isFeatured"
          className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-2"
        >
          <Star className="w-4 h-4 text-blue-600" />
          Mark as Featured Post
        </Label>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-4 border-t">
        <SubmitButton />
      </motion.div>
    </motion.form>
  );
}
