"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerAction, FormState } from "@/actions/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const initialState: FormState = {
  success: false,
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-11 text-base shadow-lg hover:shadow-xl transition-all"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Account...
        </>
      ) : (
        <>
          Create Account
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function RegisterPage() {
  const [formState, formAction] = useFormState(registerAction, initialState);
  const formAlert: FormState | null = formState.message ? formState : null;

  return (
    <motion.div
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join our community of writers</p>
      </motion.div>

      {formAlert && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            variant={formAlert.success ? "default" : "destructive"}
            className={`mb-6 ${
              formAlert.success
                ? "bg-green-50 border-green-200 text-green-900"
                : ""
            }`}
          >
            {formAlert.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle className={formAlert.success ? "text-green-900" : ""}>
              {formAlert.success ? "Success!" : "Registration Failed"}
            </AlertTitle>
            <AlertDescription
              className={formAlert.success ? "text-green-800" : ""}
            >
              {formAlert.message}
              {formAlert.success && (
                <Link
                  href="/login"
                  className="font-bold underline ml-1 hover:text-green-950"
                >
                  Please sign in.
                </Link>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <form action={formAction} className="space-y-5">
        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
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

        <motion.div variants={itemVariants} className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
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

        <motion.div variants={itemVariants} className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {formState.errors?.password && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {formState.errors.password[0]}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          <SubmitButton />
        </motion.div>
      </form>

      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-sm text-gray-600"
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Sign in instead
        </Link>
      </motion.p>
    </motion.div>
  );
}
