import React from "react";
import Navbar from "../Components/NavBar/Navbar";
import Footer from "../Components/Footer/Footer";

function About() {
  return (
    <>
        <Navbar/>
        <div className="container mx-auto mt-12 text-center">
          <h1 className="text-4xl font-bold text-[#2F3542] mb-6">About Us</h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
            Welcome to our blog platform! Our mission is to share insightful,
            inspiring, and informative content with our readers. We believe in
            the power of words and the importance of storytelling in connecting
            people and communities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div className="p-8 shadow-lg bg-white rounded-lg">
              <h3 className="text-2xl font-semibold text-[#2F3542] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To become a platform where ideas and creativity come together to
                inform and inspire readers globally.
              </p>
            </div>
            <div className="p-8 shadow-lg bg-white rounded-lg">
              <h3 className="text-2xl font-semibold text-[#2F3542] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide high-quality, engaging, and diverse content across
                various topics to educate and entertain our audience.
              </p>
            </div>
          </div>
        </div>
    </>
  );
}

export default About;
