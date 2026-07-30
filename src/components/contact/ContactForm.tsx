import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SERVICES } from '@/data/services';

type FormStatus = 'idle' | 'submitting' | 'sent';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[15px] text-white placeholder:text-white/45 focus:outline-none focus:border-[rgba(36,172,124,0.4)] transition-colors duration-200';

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  // No backend exists yet — this is a no-op placeholder.
  // TODO: wire to a real backend/email service.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    window.setTimeout(() => setStatus('sent'), 800);
  };

  if (status === 'sent') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[28px] border border-[rgba(36,172,124,0.25)] bg-[rgba(36,172,124,0.08)] p-8 text-center"
      >
        <p className="text-[18px] font-bold text-white mb-2">Thanks for reaching out.</p>
        <p className="text-[15px] text-white/60">We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Submitting your message…' : ''}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-[13px] font-bold text-white/60 mb-2">
            Name
          </label>
          <input id="contact-name" name="name" type="text" required className={inputClasses} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-[13px] font-bold text-white/60 mb-2">
            Email
          </label>
          <input id="contact-email" name="email" type="email" required className={inputClasses} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-project-type" className="block text-[13px] font-bold text-white/60 mb-2">
          Project Type
        </label>
        <select id="contact-project-type" name="projectType" required defaultValue="" className={inputClasses}>
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[13px] font-bold text-white/60 mb-2">
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={5} className={inputClasses} />
      </div>

      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  );
};
