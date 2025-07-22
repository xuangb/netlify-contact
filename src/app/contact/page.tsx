"use client";
import ContactForm from "../_components/contactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We`&apos;`d love to hear from you. Send us a message and
            we`&apos;`ll respond as soon as possible.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
