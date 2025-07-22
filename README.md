# 📬 Create a Contact Form in Next.js for Netlify Deployment

This guide walks you through building a fully functional contact form in a Next.js app, with Netlify-friendly features like spam protection and static form detection.

---

## ✅ Step 1: Create a Next.js App

```bash
npx create-next-app@latest
```

📖 For more details: [https://nextjs.org/docs](https://nextjs.org/docs)

---

## 🧱 Step 2: Create the Contact Form Component

📄 **File:** `components/contact-form.tsx`

This file contains the entire logic: input handling, validation, and submission.

---

## 🧠 Step 3: Understand the Structure

The component includes:

- `useState()` for form state management
- `validateForm()` to check required/invalid fields
- `handleChange()` to sync input values
- `handleSubmit()` to send data via `fetch()` to Netlify

---

## ✍️ Step 4: Define TypeScript Interfaces

```ts
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
```

✅ Helps with type safety for state and form error handling.

---

## ⚙️ Step 5: Setup State Hooks

```ts
const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const [errors, setErrors] = useState<FormErrors>({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
```

- `formData`: input values
- `errors`: validation feedback
- `isSubmitting`: disables form while submitting
- `submitStatus`: shows success/error messages

---

## 🎯 Step 6: Handle Input Changes

```ts
const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  setFormData((prev) => ({ ...prev, [name]: value }));

  // Clear error when user starts typing
  if (errors[name as keyof FormErrors]) {
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }
};
```

✅ Keeps form state in sync and clears errors dynamically.

---

## ✅ Step 7: Validate Form Fields

```ts
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.name.trim()) newErrors.name = "Name is required";
  if (!formData.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }
  if (!formData.subject.trim()) newErrors.subject = "Subject is required";
  if (!formData.message.trim()) newErrors.message = "Message is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

📌 Returns `true` if no validation errors exist.

---

## 📤 Step 8: Handle Form Submission

```ts
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitStatus("idle");

  try {
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);

    const formEntries: Record<string, string> = {};
    formDataObj.forEach((value, key) => {
      formEntries[key] = value.toString();
    });

    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formEntries).toString(),
    });

    if (response.ok) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

📌 Converts form data to `application/x-www-form-urlencoded` and posts to Netlify.

---

## 🔧 Step 9: Add Netlify Form Configuration

In your form JSX, add these attributes and hidden fields:

```tsx
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  onSubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
  ...
</form>
```

✅ This makes Netlify recognize the form and protect it from spam bots.

---

## 📅 Step 10: Add Inputs with Error Handling

Each input:

- uses `value={formData.field}`
- runs `onChange={handleChange}`
- disables during `isSubmitting`
- shows red border and message if `errors.field` is set

Example for Email:

```tsx
<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  disabled={isSubmitting}
  className={`${
    errors.email ? "border-red-500" : "border-gray-300"
  } ...`}
/>
{errors.email && (
  <p className="text-red-600">{errors.email}</p>
)}
```

---

## ✅ Step 11: Add Submit Feedback

Show confirmation or error messages based on `submitStatus`:

```tsx
{submitStatus === "success" && (
  <div className="bg-green-100 text-green-700 p-4 rounded">
    Thank you! Your message has been sent successfully.
  </div>
)}

{submitStatus === "error" && (
  <div className="bg-red-100 text-red-700 p-4 rounded">
    Sorry, there was an error sending your message.
  </div>
)}
```

---

## 📄 Step 12: Create the Contact Page

📄 **File:** `app/contact/page.tsx` (App Router)\
OR `pages/contact.tsx` (Pages Router)

```tsx
"use client";
import ContactForm from "../_components/contactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
```

---

## 📁 Step 13: Install Netlify Plugin

```bash
npm install -D @netlify/plugin-nextjs
```

---

## 📂 Step 14: Add `netlify.toml` to Root Directory

```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## 📓 Step 15: Create `__forms.html` in `public/`

This enables **Netlify static form detection** during build time.

📄 `public/__forms.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Netlify Forms Detection</title>
  </head>
  <body>
    <!-- This file is used for Netlify form detection only -->

    <form name="contact" data-netlify="true" hidden>
      <input type="hidden" name="form-name" value="contact" />
      <input name="name" type="text" />
      <input name="email" type="email" />
      <input name="subject" type="text" />
      <textarea name="message"></textarea>
    </form>
  </body>
</html>
```

---

## 📌 Checklist Before Deployment

✅ Make sure:

- Form `name="contact"` matches hidden field `form-name`
- `data-netlify="true"` and `netlify-honeypot="bot-field"` are set
- `__forms.html` exists in the `public/` folder
- You run a build before deploying

```bash
npm run build
```

---

## 🚀 Deployment

You can now deploy your project to Netlify!

📘️ Docs: [https://docs.netlify.com/deploy/deploy-overview/](https://docs.netlify.com/deploy/deploy-overview/)

