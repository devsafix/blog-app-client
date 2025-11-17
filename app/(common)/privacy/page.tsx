import { Metadata } from "next";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | DSX-B",
  description:
    "Learn how DSX-B collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | DSX-B",
    description: "Our commitment to protecting your privacy and data.",
    type: "website",
  },
};

type ContentItem = {
  subtitle?: string;
  text: string;
};

type Section = {
  title: string;
  content: ContentItem[];
};

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you create an account, we collect your name, email address, and password. If you choose to write content, we collect the articles, comments, and other content you create.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "We automatically collect certain information about your device, including your IP address, browser type, operating system, and browsing behavior on our platform through cookies and similar technologies.",
      },
      {
        subtitle: "Information from Third Parties",
        text: "If you sign up using a third-party service (like Google), we receive basic profile information from that service.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "To Provide Our Services",
        text: "We use your information to operate, maintain, and improve DSX-B, including personalizing your experience and recommending content.",
      },
      {
        subtitle: "Communication",
        text: "We may send you technical notices, updates, security alerts, and support messages. With your consent, we'll also send promotional communications.",
      },
      {
        subtitle: "Analytics and Improvement",
        text: "We analyze how users interact with our platform to improve functionality, fix bugs, and develop new features.",
      },
      {
        subtitle: "Legal Compliance",
        text: "We may use your information to comply with legal obligations, respond to legal requests, and protect the rights and safety of our users.",
      },
    ],
  },
  {
    title: "3. Information Sharing and Disclosure",
    content: [
      {
        subtitle: "Public Content",
        text: "Articles and comments you publish are publicly visible to all users of the platform. Your profile information may also be publicly visible.",
      },
      {
        subtitle: "Service Providers",
        text: "We share information with third-party service providers who perform services on our behalf, such as hosting, analytics, and email delivery. These providers are bound by confidentiality agreements.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, legal process, or government request, or to protect the rights and safety of DSX-B and our users.",
      },
      {
        subtitle: "Business Transfers",
        text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you of any such change.",
      },
    ],
  },
  {
    title: "4. Data Security",
    content: [
      {
        text: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.",
      },
    ],
  },
  {
    title: "5. Your Rights and Choices",
    content: [
      {
        subtitle: "Access and Update",
        text: "You can access and update your account information at any time through your account settings.",
      },
      {
        subtitle: "Delete Your Account",
        text: "You can request deletion of your account by contacting us. We will delete your personal information, though some information may be retained as required by law.",
      },
      {
        subtitle: "Marketing Communications",
        text: "You can opt out of promotional emails by clicking the unsubscribe link in any marketing email.",
      },
      {
        subtitle: "Cookies",
        text: "You can control cookies through your browser settings. Note that disabling cookies may affect your experience on our platform.",
      },
      {
        subtitle: "Data Portability",
        text: "You have the right to request a copy of your personal data in a machine-readable format.",
      },
    ],
  },
  {
    title: "6. Children's Privacy",
    content: [
      {
        text: "DSX-B is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we learn that we have collected information from a child under 13, we will delete it promptly.",
      },
    ],
  },
  {
    title: "7. International Data Transfers",
    content: [
      {
        text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date. We encourage you to review this policy periodically.",
      },
    ],
  },
  {
    title: "9. Contact Us",
    content: [
      {
        text: "If you have questions about this Privacy Policy or our data practices, please contact us at: privacy@dsxb.com or through our contact form.",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <p>Last Updated: November 16, 2025</p>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          At DSX-B, we take your privacy seriously. This Privacy Policy explains
          how we collect, use, disclose, and safeguard your information when you
          use our platform.
        </p>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <div key={index} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {section.title}
                </h2>
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-6 last:mb-0">
                    {item.subtitle && (
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        {item.subtitle}
                      </h3>
                    )}
                    <p className="text-gray-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Summary Box */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8 border border-blue-100">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Privacy at a Glance
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>
                We collect only the information necessary to provide our
                services
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>
                We never sell your personal information to third parties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>
                You have full control over your data and can delete it anytime
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>
                We use industry-standard security measures to protect your data
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>
                We&apos;re transparent about how we use your information
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
