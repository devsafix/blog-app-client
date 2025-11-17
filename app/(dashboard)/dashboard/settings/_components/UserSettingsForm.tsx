"use client";

import { useActionState } from "react";
import { updateUserAction, FormState } from "@/actions/actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  User as UserIcon,
  Mail,
  Phone,
  AlertCircle,
} from "lucide-react";
import { User } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFormStatus } from "react-dom";
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
      {pending ? "Saving Changes..." : "Save Changes"}
    </Button>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function UserSettingsForm({ user }: { user: User }) {
  const [formState, formAction] = useActionState(
    updateUserAction,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="max-w-2xl border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Profile Details</CardTitle>
          <CardDescription className="text-base">
            This information will be displayed publicly on your posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.form
            action={formAction}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Full Name */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name}
                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {formState.errors?.name && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.name[0]}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              {formState.errors?.email && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.email[0]}
                </p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number <span className="text-gray-400">(Optional)</span>
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={user.phone || ""}
                  placeholder="+1 234 567 890"
                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {formState.errors?.phone && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.phone[0]}
                </p>
              )}
            </motion.div>

            {/* Picture URL */}
            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="picture"
                className="text-sm font-medium text-gray-700"
              >
                Profile Picture URL{" "}
                <span className="text-gray-400">(Optional)</span>
              </Label>
              <div className="relative">
                <Input
                  id="picture"
                  name="picture"
                  defaultValue={user.picture || ""}
                  placeholder="https://example.com/avatar.jpg"
                  className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {formState.errors?.picture && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.picture[0]}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <SubmitButton />
            </motion.div>
          </motion.form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
