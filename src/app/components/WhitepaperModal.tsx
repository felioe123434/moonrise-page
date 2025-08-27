'use client';

import { useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from 'react-i18next';

type Props = {
  label?: string;
  className?: string;
  showIcon?: boolean;
};

const SUPPORTED = ['pt', 'en', 'es', 'fr', 'de', 'zh', 'ru', 'hi'] as const;

export default function WhitepaperModal({
  label = 'Whitepaper',
  className = 'text-[12px] text-purple-300 underline underline-offset-4 hover:text-purple-100',
  showIcon = true,
}: Props) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [md, setMd] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  const lang = useMemo(() => {
    const lc = (i18n.language || 'en').slice(0, 2).toLowerCase();
    return (SUPPORTED as readonly string[]).includes(lc) ? lc : 'en';
  }, [i18n.language]);

  const pathFor = (lc: string) => `/whitepaper/whitepaper.${lc}.md`;

  // ---- carregar markdown quando abrir
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    fetch(pathFor(lang))
      .then((r) => (r.ok ? r.text() : fetch(pathFor('en')).then((r2) => r2.text())))
      .then((text) => !cancelled && setMd(text))
      .catch(async () => {
        const fallback = await fetch(pathFor('en')).then((r) => r.text());
        if (!cancelled) setMd(fallback);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [open, lang]);

  // ---- acessibilidade / foco / ESC
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

  // ---- ações
  const onPrint = () => window.print();
  const onDownloadMd = () => {
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whitepaper_${lang}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  // ======== UX: SUMÁRIO + ÂNCORAS ========
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s\-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  // extrai h2/h3 do markdown para TOC
  const toc = useMemo(() => {
    const lines = md.split('\n');
    const items: { level: 2 | 3; text: string; id: string }[] = [];
    for (const raw of lines) {
      const line = raw.trim();
      const m = /^(#{2,3})\s+(.+)$/.exec(line);
      if (!m) continue;
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/\*\*/g, '').trim();
      items.push({ level, text, id: slugify(text) });
    }
    return items;
  }, [md]);

  // componentes custom p/ dar foco aos títulos e respiro
  const H2 = ({ children }: { children: ReactNode }) => {
    const text = String(children as any);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="scroll-mt-24 mt-10 pt-6 border-t border-white/10 text-[15px] md:text-[18px] font-semibold text-gray-100 flex items-center gap-2"
      >
        <span className="inline-block h-3 w-3 rounded-full bg-purple-400/80" />
        {text}
        <a href={`#${id}`} className="ml-1 text-purple-300/70 hover:text-purple-200">#</a>
      </h2>
    );
  };

  const H3 = ({ children }: { children: ReactNode }) => {
    const text = String(children as any);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="scroll-mt-24 mt-6 text-[13px] md:text-[15px] font-semibold text-gray-100"
      >
        {text}
      </h3>
    );
  };

  const P = (props: any) => (
    <p {...props} className="my-3 leading-7 text-[13px] text-gray-200" />
  );

  const LI = (props: any) => (
    <li {...props} className="my-1.5 leading-7 text-[13px] text-gray-200" />
  );

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {showIcon && <span className="mr-1.5">📄</span>}
        {label}
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
                  aria-labelledby="whitepaper-title"
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: 8 }}
                >
                  <div className="w-full max-w-5xl rounded-2xl border border-gray-800 bg-[#0b0b12] shadow-2xl">
                    {/* Header (sticky dentro do card p/ manter ações visíveis) */}
                    <div className="sticky top-0 z-10 bg-gradient-to-b from-[#0b0b12] to-transparent">
                      <div className="flex items-start justify-between gap-4 p-4 border-b border-white/10">
                        <div>
                          <h3 id="whitepaper-title" className="text-[16px] font-semibold text-gray-100">
                            Whitepaper — MoonRise
                          </h3>
                          <p className="text-[11px] text-gray-400">
                            Idioma: <span className="uppercase">{lang}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={onPrint}
                            className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-[12px] hover:border-gray-500"
                          >
                            Imprimir / Salvar PDF
                          </button>
                          <button
                            onClick={onDownloadMd}
                            className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-[12px] hover:border-gray-500"
                          >
                            Baixar .MD
                          </button>
                          <button
                            ref={closeBtnRef}
                            onClick={() => setOpen(false)}
                            className="rounded-lg border border-gray-700 px-2.5 py-1.5 text-[12px] hover:border-gray-500"
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Body com SUMÁRIO lateral + artigo */}
                    <div className="p-0 max-h-[75vh] overflow-y-auto text-gray-200">
                      {loading ? (
                        <div className="p-6 text-gray-400">Carregando…</div>
                      ) : (
                        <div className="grid md:grid-cols-[220px_1fr] gap-4 p-4">
                          {/* TOC */}
                          <aside className="hidden md:block sticky top-16 self-start max-h-[68vh] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-3">
                            <div className="text-[12px] font-semibold text-gray-200 mb-2">Sumário</div>
                            <ul className="space-y-1.5 text-[12px] text-gray-400">
                              {toc.map((it, i) => (
                                <li key={i} className={it.level === 3 ? 'pl-4' : ''}>
                                  <a
                                    href={`#${it.id}`}
                                    className="hover:text-purple-200 underline underline-offset-4"
                                  >
                                    {it.text}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </aside>

                          {/* Artigo */}
                          <article className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-5">
                        <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    h2: ({ node, ...props }) => <H2>{props.children}</H2>,
    h3: ({ node, ...props }) => <H3>{props.children}</H3>,
    p:  ({ node, ...props }) => <P {...props} />,
    li: ({ node, ...props }) => <LI {...props} />,
  }}
>
  {md}
</ReactMarkdown>
                          </article>
                        </div>
                      )}
                    </div>

                    {/* Print styles */}
                    <style jsx global>{`
                      @media print {
                        body { background: #fff !important; }
                        .prose-invert, .text-gray-200 { color: #000 !important; }
                        a { text-decoration: none !important; }
                      }
                    `}</style>
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
