import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-center items-center text-center text-sm md:text-base">
        <p className="leading-relaxed">
          © {currentYear} Get Me a Coffee — All rights reserved!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
