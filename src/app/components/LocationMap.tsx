import { Phone, MessageCircle, Facebook, Twitter, Linkedin, Mail, MapPin } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface LocationMapProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  phone?: string;
  whatsapp?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export function LocationMap({
  latitude = 19.0340,
  longitude = 73.0315,
  address = 'Room no-17, Plot No-46, Sahyadri CHS, Sector 16A, Nerul, Navi Mumbai, Maharashtra 400706',
  phone = '+91-93210-06900',
  whatsapp = '9321006900',
  socialLinks = {
    facebook: 'https://facebook.com/jayashreefoundation',
    twitter: 'https://twitter.com/jayashreefdn',
    linkedin: 'https://linkedin.com/company/jayashree-foundation',
  },
}: LocationMapProps) {
  const { isDark } = useTheme();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
  const mergedSocialLinks = {
    ...socialLinks,
    email: socialLinks.email ?? contactEmail,
  };

  const mapsUrl = 'https://maps.app.goo.gl/6ogYQotHceBX6B3m6';
  const whatsappUrl = `https://wa.me/${whatsapp}?text=Hello%20Jayashree%20Foundation`;
  const phoneUrl = `tel:${phone}`;
  const emailUrl = `mailto:${mergedSocialLinks.email}`;

  return (
    <section className={`px-4 md:px-8 py-12 md:py-20 transition-colors duration-200 ${
      isDark ? 'bg-slate-900' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-medium leading-9 mb-4 transition-colors duration-200 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>Find Us</h2>
          <p className={`text-base font-normal leading-6 transition-colors duration-200 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Get in touch with Jayashree Foundation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border overflow-hidden transition-colors duration-200 ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            }`}>
              <iframe
                width="100%"
                height="450"
                frameBorder="0"
                title="Jayashree Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.590264802744!2d73.0115605!3d19.037768399999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c36be802857d%3A0x5f699ad9ae2e7f0f!2sJayashree%20Foundation%20%7C%20Navi%20Mumbai!5e0!3m2!1sen!2sin!4v1776792058828!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className={`rounded-2xl border p-6 md:p-8 transition-colors duration-200 ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'
          }`}>
            <h3 className={`text-xl font-bold mb-6 transition-colors duration-200 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Contact Information
            </h3>

            {/* Address */}
            <div className="mb-6">
              <div className="flex items-start gap-3 mb-2">
                <MapPin className={`w-5 h-5 mt-1 transition-colors duration-200 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <div>
                  <p className={`text-sm font-medium transition-colors duration-200 ${
                    isDark ? 'text-slate-200' : 'text-slate-900'
                  }`}>
                    Address
                  </p>
                  <p className={`text-sm transition-colors duration-200 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {address}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>

              <a
                href={phoneUrl}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium"
                style={{
                  borderColor: isDark ? '#475569' : '#cbd5e1',
                  color: isDark ? '#e2e8f0' : '#334155',
                }}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t" style={{
              borderColor: isDark ? '#475569' : '#e2e8f0',
            }}>
              <p className={`text-sm font-medium mb-4 transition-colors duration-200 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}>
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                {mergedSocialLinks.facebook && (
                  <a
                    href={mergedSocialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 p-0 rounded-lg flex items-center justify-center leading-none transition-colors ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-blue-100'
                    }`}
                    title="Facebook"
                  >
                    <Facebook className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                  </a>
                )}
                {mergedSocialLinks.twitter && (
                  <a
                    href={mergedSocialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 p-0 rounded-lg flex items-center justify-center leading-none transition-colors ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-blue-100'
                    }`}
                    title="Twitter"
                  >
                    <Twitter className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                  </a>
                )}
                {mergedSocialLinks.linkedin && (
                  <a
                    href={mergedSocialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 p-0 rounded-lg flex items-center justify-center leading-none transition-colors ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-blue-100'
                    }`}
                    title="LinkedIn"
                  >
                    <Linkedin className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                  </a>
                )}
                {mergedSocialLinks.email && (
                  <a
                    href={emailUrl}
                    className={`w-10 h-10 p-0 rounded-lg flex items-center justify-center leading-none transition-colors ${
                      isDark ? 'hover:bg-slate-700' : 'hover:bg-blue-100'
                    }`}
                    title="Email"
                  >
                    <Mail className={`w-5 h-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
