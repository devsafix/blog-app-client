import { Metadata } from "next";
import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | DSX-B",
  description:
    "Read the Terms of Service for DSX-B. Understand your rights and responsibilities when using our blogging platform.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | DSX-B",
    description: "Terms and conditions for using DSX-B platform.",
    type: "website",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using DSX-B ('the Service'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, please do not use the Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.",
  },
  {
    title: "2. Description of Service",
    content:
      "DSX-B is a blogging platform that allows users to create, publish, and share written content. We provide tools for writers and a platform for readers to discover quality content. The Service may include advertisements and other forms of monetization.",
  },
  {
    title: "3. User Accounts",
    subsections: [
      {
        subtitle: "Account Creation",
        text: "You must be at least 13 years old to create an account. You must provide accurate, current, and complete information during registration and keep your account information updated.",
      },
      {
        subtitle: "Account Security",
        text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.",
      },
      {
        subtitle: "Account Termination",
        text: "We reserve the right to suspend or terminate your account if you violate these Terms or engage in harmful behavior. You may delete your account at any time through your account settings.",
      },
    ],
  },
  {
    title: "4. Content Guidelines",
    subsections: [
      {
        subtitle: "Your Content",
        text: "You retain all rights to the content you create and publish on DSX-B. By publishing content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content on the Service.",
      },
      {
        subtitle: "Prohibited Content",
        text: "You may not publish content that: infringes on intellectual property rights; contains hate speech, harassment, or threats; promotes illegal activities; contains malware or spam; is sexually explicit or exploitative; impersonates others; or violates any laws or regulations.",
      },
      {
        subtitle: "Content Moderation",
        text: "We reserve the right to remove any content that violates these Terms or our Community Guidelines. We are not obligated to monitor content but may do so at our discretion.",
      },
    ],
  },
  {
    title: "5. Intellectual Property",
    subsections: [
      {
        subtitle: "Our IP",
        text: "The Service, including its design, features, and functionality, is owned by DSX-B and is protected by copyright, trademark, and other intellectual property laws.",
      },
      {
        subtitle: "User IP",
        text: "You retain ownership of your original content. However, you represent and warrant that you have all necessary rights to publish your content and that it does not infringe on third-party rights.",
      },
      {
        subtitle: "DMCA Policy",
        text: "We respect intellectual property rights. If you believe your work has been copied in a way that constitutes copyright infringement, please contact us with a detailed notice.",
      },
    ],
  },
  {
    title: "6. User Conduct",
    content:
      "You agree not to: use the Service for any illegal purpose; attempt to gain unauthorized access to any part of the Service; interfere with or disrupt the Service; use automated systems to access the Service without permission; collect user information without consent; or engage in any conduct that restricts or inhibits anyone's use of the Service.",
  },
  {
    title: "7. Third-Party Links and Services",
    content:
      "The Service may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party services is at your own risk.",
  },
  {
    title: "8. Disclaimers",
    content:
      "THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be uninterrupted, secure, or error-free.",
  },
  {
    title: "9. Limitation of Liability",
    content:
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, DSX-B SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR OTHER INTANGIBLE LOSSES.",
  },
  {
    title: "10. Indemnification",
    content:
      "You agree to indemnify, defend, and hold harmless DSX-B and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of the Service or violation of these Terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts located in San Francisco, California.",
  },
  {
    title: "12. Changes to Terms",
    content:
      "We reserve the right to modify these Terms at any time. We will notify users of material changes by posting a notice on the Service or sending an email. Your continued use of the Service after such modifications constitutes acceptance of the updated Terms.",
  },
  {
    title: "13. Contact Information",
    content:
      "If you have any questions about these Terms, please contact us at legal@dsxb.com or through our contact form.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Terms of Service
        </h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <p>Last Updated: November 16, 2025</p>
        </div>
        <p className="text-lg text-gray-600 leading-relaxed">
          Please read these Terms of Service carefully before using DSX-B. These
          Terms govern your access to and use of our platform.
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

                {section.content && (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {section.content}
                  </p>
                )}

                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {subsection.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Points Box */}
        <div className="mt-12 bg-amber-50 rounded-xl p-8 border border-amber-200">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Key Points to Remember
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-1">•</span>
              <span>
                You retain ownership of your content but grant us a license to
                use it
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-1">•</span>
              <span>
                You&apos;re responsible for the content you publish and must
                respect others&apos; rights
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-1">•</span>
              <span>We may remove content that violates our guidelines</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-1">•</span>
              <span>
                The service is provided &quot;as is&quot; without warranties
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 font-bold mt-1">•</span>
              <span>We may update these terms at any time</span>
            </li>
          </ul>
        </div>

        {/* Related Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/faq"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            FAQ
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/contact"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
