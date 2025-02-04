import React, { useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to the server
      const response = await axios.post('/api/contact', formData);
      if (response.status === 200) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }
    } catch (err) {
      setError('There was an issue with your request. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contact Us</h1>

      <div className="space-y-8">
        {/* Contact Information */}
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Contact Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-700">Customer Support Details</h2>
            <p className="mt-4 text-lg text-gray-600">
              We're here to help! If you have any questions or concerns, reach out to us through the following methods:
            </p>

            <div className="mt-6">
              <div className="mb-4">
                <span className="font-medium text-gray-700">Email: </span>
                <a href="mailto:support@ecommerce.com" className="text-blue-600 hover:underline">support@ecommerce.com</a>
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Phone: </span>
                <span className="text-gray-600">+91 9876543210</span>
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Customer Support Hours: </span>
                <span className="text-gray-600">24 hours / 7 days</span>
              </div>

              <div className="mb-4">
                <span className="font-medium text-gray-700">Address: </span>
                <span className="text-gray-600">456 E-commerce St, Chennai, India, 630 008</span>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-700">Visit Our Store</h2>
            <div className="mt-4">
              <iframe
                title="Our Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1232565874695!2d144.96305801587065!3d-37.813611079751925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d67e69d9a9b%3A0x6f7311e2682892c4!2sFederation+Square!5e0!3m2!1sen!2sus!4v1615785292903!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700">Submit a Support Request</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800"
              >
                Submit
              </button>
            </form>

            {submitted && <p className="mt-4 text-green-600">Thank you for contacting us. We will get back to you shortly!</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>

          {/* Social Media Links */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-700">Follow Us</h2>
            <div className="mt-4 flex space-x-6 justify-center">
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;