// components/ContactForm.tsx
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Required for Netlify to process the form
    formData.append("form-name", "contact");

    try {
      await fetch("/", {
        method: "POST",
        body: formData,
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p className="text-green-500">Thank you for your message!</p>;
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* This hidden input is required for Netlify */}
      <input type="hidden" name="form-name" value="contact" />

      <div>
        <label htmlFor="name">Name</label>
        <input name="name" type="text" required className="border px-2 py-1" />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          required
          className="border px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea name="message" required className="border px-2 py-1 w-full" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 bg-blue-600 text-white rounded ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
