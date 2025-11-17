import { Button } from "../ui/button";

export default function CTAButton() {
  return (
    <section className="max-w-4xl mx-auto px-4">
      <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Never Miss an Update
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest articles delivered
          straight to your inbox
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg text-white focus:outline-none border-2 border-white focus:ring-2 focus:ring-white"
          />
          <Button
            size="lg"
            variant="secondary"
            className="whitespace-nowrap font-semibold"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
