import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { FOOTER_NAV_GROUPS, LEGAL_LINKS } from '@/data/nav';
import { CONTACT_INFO } from '@/data/contact';
import { PLACEHOLDER_COPY } from '@/data/placeholders';

type NewsletterStatus = 'idle' | 'submitting' | 'sent';

export const Footer: React.FC = () => {
  const [status, setStatus] = useState<NewsletterStatus>('idle');

  // No backend exists yet — this is a no-op placeholder.
  // TODO: wire to a real newsletter/email service.
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    window.setTimeout(() => setStatus('sent'), 600);
  };

  return (
    <footer className="border-t border-white/[0.06]">
      <SectionWrapper size="sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex">
              <Logo />
            </Link>
            <p className="mt-5 text-[15px] leading-[1.7] text-white/60 max-w-[280px]">{PLACEHOLDER_COPY}</p>
            <SocialLinks links={CONTACT_INFO.socials} className="mt-6" />
          </div>

          {FOOTER_NAV_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5">{group.heading}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-[15px] text-white/65 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter (optional per doc) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-5">Newsletter</h3>
            {status === 'sent' ? (
              <p className="text-[15px] text-[#24AC7C]">Thanks — you're on the list.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-white placeholder:text-white/45 focus:outline-none focus:border-[rgba(36,172,124,0.4)] transition-colors duration-200"
                />
                <Button type="submit" variant="ghost" size="sm" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/50">© {new Date().getFullYear()} BEXDRE. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] text-white/50 hover:text-white/70 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
};
