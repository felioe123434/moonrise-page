'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Props = {
  linkClassName?: string;
  triggerKey?: string; // chave do texto do link
  dot?: boolean;
  label?: ReactNode; 
  className?: string; 
};

export default function LegalDisclaimer({
  linkClassName = 'text-sm text-purple-300 underline underline-offset-4 hover:text-purple-100',
  triggerKey = 'disclaimer.trigger',
  dot = true,
}: Props) {
  const { t } = useTranslation('legal');
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastActive.current = document.activeElement as HTMLElement;
    setTimeout(() => closeBtnRef.current?.focus(), 30);
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastActive.current?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={linkClassName}>
        {dot && <span className="mr-2">🔎</span>}
        {t(triggerKey)}
      </button>

      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="legal-disclaimer-title"
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 8 }}
                >
                  <div className="w-full max-w-3xl rounded-2xl border border-gray-800 bg-[#0b0b12] shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 p-4 border-b border-gray-800">
                      <div>
                        <h3 id="legal-disclaimer-title" className="text-base font-semibold text-gray-100">
                          {t('disclaimer.title')}
                        </h3>
                        <p className="text-[11px] text-gray-400">
                          {t('disclaimer.updated')} {t('disclaimer.updatedDate')}
                        </p>
                      </div>
                      <button
                        ref={closeBtnRef}
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-xs hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        aria-label={t('disclaimer.actions.close')}
                      >
                        {t('disclaimer.actions.close')}
                      </button>
                    </div>

                    {/* Body: “letras miúdas” */}
                    <div className="p-4 max-h-[70vh] overflow-y-auto text-xs leading-6 text-gray-300">
                      <div className="rounded-lg bg-purple-500/10 border border-purple-500/30 p-3 mb-4">
                        <strong className="text-purple-200 block mb-1">{t('disclaimer.alertTitle')}</strong>
                        <span className="text-[12px] text-gray-200">{t('disclaimer.alertText')}</span>
                      </div>

                      {(t('disclaimer.sections', { returnObjects: true }) as { heading: string; items: string[] }[]).map(
                        (sec, idx) => (
                          <section key={idx} className="mb-4">
                            <h4 className="text-[12.5px] font-semibold text-gray-100 mb-1">{sec.heading}</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {sec.items.map((li, i) => (
                                <li key={i}>{li}</li>
                              ))}
                            </ul>
                          </section>
                        )
                      )}

                      <p className="mt-5 text-[11.5px] text-gray-400">{t('disclaimer.footer')}</p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-2 p-3 border-t border-gray-800">
                      <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {t('disclaimer.actions.gotIt')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
