import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#0b1320] bg-[#00040D] w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <img
              alt="Robotics Club Logo"
              className="h-12 w-auto mb-4"
              src="./logo.png"
            />
            <p className="text-gray-400 mt-2">
              Email:{" "}
              <a
                className="hover:text-[#fead53] transition-colors underline underline-offset-2"
                href="mailto:contact@rcvitc.com"
              >
                contact@rcvitc.com
              </a>
            </p>
            <p className="text-gray-400">
              Phone:{" "}
              <a
                className="hover:text-[#fead53] transition-colors underline underline-offset-2"
                href="tel:+917702669040"
              >
                +91 77026 69040
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#fead53] mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-400 hover:text-[#fead53] transition-colors"
                  href="https://robotics-club-weld.vercel.app/#about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-[#fead53] transition-colors"
                  href="#"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-[#fead53] transition-colors"
                  href="https://robotics-club-weld.vercel.app/events_page.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#fead53] mb-3">
              Follow Us
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                className="text-gray-300 hover:text-[#fead53] transition-colors"
                href="https://instagram.com/robotics_club_vitc"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6" strokeWidth={2} />
              </a>
              <a
                className="text-gray-300 hover:text-[#fead53] transition-colors"
                href="https://linkedin.com/company/robotics-club-vitc/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6" strokeWidth={2} />
              </a>
              <a
                className="text-gray-300 hover:text-[#fead53] transition-colors"
                href="https://github.com/rcvitc"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© 2025 Robotics Club. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
