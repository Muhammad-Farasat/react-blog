import React, { useState } from "react";
import Navbar from "../Components/NavBar/Navbar";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Your message has been sent!");
  };

  return (
    <>
        <Navbar/>
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-[#2F3542] mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto text-center mb-12">
            Got a question, feedback, or just want to say hi? Fill out the form
            below, and we’ll get back to you as soon as possible!
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-[#FF4757] focus:border-[#FF4757]"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-[#FF4757] focus:border-[#FF4757]"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:outline-none focus:ring-[#FF4757] focus:border-[#FF4757]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF4757] text-white py-2 rounded-md hover:bg-[#E63946] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
