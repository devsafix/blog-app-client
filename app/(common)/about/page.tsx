import { Metadata } from "next";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import CTASection from "@/components/shared/CTASection";

export const metadata: Metadata = {
  title: "About Us | DSX-B",
  description:
    "Learn about DSX-B, our mission, values, and the team behind our blog platform. Discover how we're helping writers share their stories with the world.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | DSX-B",
    description:
      "Learn about DSX-B and our mission to help writers share their stories.",
    type: "website",
  },
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide a platform where writers can share their knowledge, experiences, and stories with a global audience, fostering a community of learning and growth.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology to create the best possible reading and writing experience, constantly evolving to meet the needs of our community.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Our community is at the heart of everything we do. We're committed to creating a supportive, inclusive environment for all voices.",
  },
  {
    icon: Award,
    title: "Quality Content",
    description:
      "We maintain high standards for content quality, ensuring that our readers always find valuable, well-researched, and engaging articles.",
  },
];

const stats = [
  { number: "10K+", label: "Active Readers" },
  { number: "500+", label: "Published Articles" },
  { number: "50+", label: "Writers" },
  { number: "95%", label: "Reader Satisfaction" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
            backgroundSize: "40px 40px",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            About <span className="text-blue-600">DSX-B</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            We&apos;re on a mission to empower writers and connect readers with
            meaningful content that inspires, educates, and entertains.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
          Our Story
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            DSX-B was founded in 2024 with a simple yet powerful vision: to
            create a platform where quality content meets passionate readers. We
            noticed a gap in the blogging world—too many platforms prioritized
            algorithms over authenticity, and engagement metrics over genuine
            connection.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We set out to build something different. A platform where writers
            could focus on what they do best—creating amazing content—while we
            handle the technical complexities. Where readers could discover
            articles that truly matter to them, curated by real people, not just
            algorithms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, DSX-B is home to hundreds of writers and thousands of readers
            who share our values of quality, authenticity, and community.
            We&apos;re just getting started, and we&apos;d love for you to join
            us on this journey.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
