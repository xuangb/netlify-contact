"use client";
import ContactForm from "./_components/contactForm";

export default function Home() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <ContactForm />
    </div>
  );
}
