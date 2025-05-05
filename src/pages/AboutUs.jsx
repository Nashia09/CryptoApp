import React from 'react'
import { About } from '../components/About'

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Our Company</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          We are a leading cryptocurrency platform dedicated to making trading accessible, 
          educational, and enjoyable for everyone.
        </p>
      </div>

      {/* Reuse the existing About component */}
      <About />

      <div className="py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-600 mb-6">
                Founded in 2023, our platform emerged from a simple vision: to demystify 
                cryptocurrency trading and create an intuitive experience that both beginners 
                and experts would appreciate.
              </p>
              <p className="text-gray-600">
                As cryptocurrency enthusiasts ourselves, we recognized the challenges newcomers 
                face when entering this complex market. We built our platform to address these 
                pain points, offering transparent information, educational resources, and 
                reliable trading tools.
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-6">
                Today, our growing team of over 110 members from 24 different nationalities 
                works tirelessly to improve our platform, adding new features, enhancing 
                security measures, and expanding our educational resources.
              </p>
              <p className="text-gray-600">
                With $9.6M in funding, we're committed to continuous innovation and growth, 
                always keeping our users' needs at the center of everything we do.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-10 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Empower Users</h3>
              <p className="text-gray-600">
                We provide the tools, resources, and knowledge necessary for users to make informed decisions in the cryptocurrency market.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ensure Security</h3>
              <p className="text-gray-600">
                We prioritize the security of our users' assets and data, implementing robust measures to protect against potential threats.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Foster Community</h3>
              <p className="text-gray-600">
                We build and nurture a diverse, inclusive community of cryptocurrency enthusiasts, from beginners to experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-8">
        <h2 className="text-3xl font-semibold mb-6">Join Our Journey</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Whether you're new to cryptocurrency or an experienced trader, we invite you to be part of our growing community.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg">
          Start Trading Now
        </button>
      </div>
    </div>
  )
}

export default AboutUs 