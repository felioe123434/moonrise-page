interface Window {
  fbq?: (...args: unknown[]) => void; // Facebook
  ttq?: { track: (...args: unknown[]) => void }; // TikTok
  twq?: (...args: unknown[]) => void; // Twitter (X)
}
