'use client';
import { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, AUTH_LINKS } from '@/utils/constants/navigation';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 h-full w-64 bg-white shadow-xl">
        <div className="p-4">
          <button
            className="p-2 float-right"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-8 px-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="block py-2 text-base font-medium text-gray-700 hover:text-gray-900"
              onClick={onClose}
            >
              {link.title}
            </Link>
          ))}
          <div className="mt-6 space-y-4">
            {AUTH_LINKS.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block w-full px-4 py-2 text-center text-sm font-medium rounded-md
                  ${
                    link.variant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                onClick={onClose}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;