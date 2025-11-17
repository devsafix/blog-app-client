import { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | DSX-B",
  description:
    "Find answers to common questions about DSX-B, including how to use our platform, account management, content policies, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | DSX-B",
    description: "Get answers to frequently asked questions about DSX-B.",
    type: "website",
  },
};

const faqCategories = [
  {
    category: "General",
    questions: [
      {
        question: "What is DSX-B?",
        answer:
          "DSX-B is a modern blogging platform designed to connect writers and readers. We provide a clean, fast, and user-friendly environment for sharing and discovering quality content across various topics.",
      },
      {
        question: "Is DSX-B free to use?",
        answer:
          "Yes! DSX-B is completely free for readers. Writers can publish content for free as well. We also offer premium features for writers who want advanced analytics and customization options.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click the 'Login' button in the top navigation, then select 'Sign Up'. You can create an account using your email address or sign up with Google. The process takes less than a minute!",
      },
    ],
  },
  {
    category: "For Writers",
    questions: [
      {
        question: "How do I publish my first article?",
        answer:
          "After logging in, navigate to your dashboard and click 'New Post'. Our editor supports rich text formatting, images, and code blocks. Once you're happy with your article, click 'Publish' and it will be live immediately.",
      },
      {
        question: "Can I edit or delete my published articles?",
        answer:
          "Yes! You have full control over your content. You can edit, update, or delete your articles at any time from your dashboard. Changes are reflected immediately on the site.",
      },
      {
        question: "What content guidelines should I follow?",
        answer:
          "We encourage original, high-quality content that adds value to readers. Please avoid plagiarism, hate speech, or misleading information. Review our full content guidelines in the Terms of Service.",
      },
      {
        question: "How can I get my article featured?",
        answer:
          "Featured articles are selected by our editorial team based on quality, engagement, and relevance. Focus on creating well-written, informative content with proper formatting and images to increase your chances.",
      },
    ],
  },
  {
    category: "For Readers",
    questions: [
      {
        question: "Do I need an account to read articles?",
        answer:
          "No! All articles on DSX-B are freely accessible without an account. However, creating an account allows you to bookmark articles, follow writers, and participate in discussions.",
      },
      {
        question: "How can I find articles on specific topics?",
        answer:
          "Use the search bar in the navigation or browse articles by tags. You can also explore our curated collections and featured articles on the homepage.",
      },
      {
        question: "Can I share articles on social media?",
        answer:
          "Absolutely! Every article has social sharing buttons. You can share directly to Twitter, Facebook, LinkedIn, or copy the link to share anywhere you'd like.",
      },
    ],
  },
  {
    category: "Technical & Account",
    questions: [
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Login' and then 'Forgot Password'. Enter your email address, and we'll send you a secure link to reset your password. The link expires after 24 hours for security.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Yes! Go to your account settings and update your email address. You'll need to verify the new email before it takes effect.",
      },
      {
        question: "Is my data secure?",
        answer:
          "We take security seriously. All data is encrypted in transit and at rest. We never share your personal information with third parties without your consent. Read our Privacy Policy for more details.",
      },
      {
        question: "What browsers are supported?",
        answer:
          "DSX-B works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Find answers to common questions about using DSX-B. Can&apos;t find
          what you&apos;re looking for? Contact our support team.
        </p>
      </section>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4">
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
              {category.category}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem
                  key={faqIndex}
                  value={`${categoryIndex}-${faqIndex}`}
                  className="bg-white rounded-lg shadow-sm border px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-20">
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Can&apos;t find the answer you&apos;re looking for? Our support team
            is here to help.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
