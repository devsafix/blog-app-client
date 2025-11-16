"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "hello@dsxb.com",
    link: "mailto:hello@dsxb.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Office",
    content: "123 Blog Street, San Francisco, CA 94102",
    link: "#",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    setTimeout(() => {
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
          Get in <span className="text-blue-600">Touch</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Have a question or want to work together? We&apos;d love to hear from
          you. Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <info.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">
                {info.title}
              </h3>
              <p className="text-gray-600">{info.content}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Send us a Message
            </h2>

            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-gray-900 font-medium">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-2"
                />
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="mt-2"
                />
              </div>

              {/* Subject Field */}
              <div>
                <Label htmlFor="subject" className="text-gray-900 font-medium">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="mt-2"
                />
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-gray-900 font-medium">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="mt-2 resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-sm text-gray-500 mt-4">
                * Required fields. We&apos;ll get back to you within 24-48
                hours.
              </p>
            </form>
          </div>
        </div>

        {/* FAQ Link Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Looking for quick answers?</p>
          <Button asChild variant="outline" size="lg">
            <a href="/faq">Check our FAQ</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
