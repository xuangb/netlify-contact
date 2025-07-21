"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("form-name", "contact");

    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Form submission failed.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <p className="text-green-600">Thanks for reaching out!</p>;
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      className="space-y-4"
    >
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
