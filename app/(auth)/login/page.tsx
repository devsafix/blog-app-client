"use client";

import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircle,
  Loader2,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useActionState, useState } from "react"; // Added useState
import { FormState, loginAction } from "@/actions/actions";

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
          Signing In...
        </>
      ) : (
        <>
          Sign In
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

export default function LoginPage() {
  const [formState, formAction] = useActionState(loginAction, initialState);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // 1. Create state to control the inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const error =
    formState.success === false && formState.message ? formState.message : null;

  // 2. Function to auto-fill credentials
  const handleAdminFill = () => {
    setEmail("devsafix@gmail.com");
    setPassword("12345678");
  };

  return (
    <motion.div
      className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-600">
          {callbackUrl
            ? "Please sign in to continue"
            : "Sign in to continue to your dashboard"}
        </p>
      </motion.div>

      {/* 3. Quick Admin Login Button */}
      <motion.div variants={itemVariants} className="mb-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleAdminFill}
          className="w-full border-dashed border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-400"
        >
          <ShieldCheck className="w-4 h-4 mr-2" />
          Quick Fill: Admin Credentials
        </Button>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {callbackUrl && !error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">
              Authentication Required
            </AlertTitle>
            <AlertDescription className="text-blue-800">
              Please sign in to access this page.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <form action={formAction} className="space-y-5">
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
              // 4. Bind state to input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
              // 5. Bind state to input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          <SubmitButton />
        </motion.div>
      </form>

      <motion.p
        variants={itemVariants}
        className="mt-8 text-center text-sm text-gray-600"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Create one now
        </Link>
      </motion.p>
    </motion.div>
  );
}
