import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoonRise",
  description: "A primeira cripto com execução real",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <head>
        {/* 👇 CSS do Reown AppKit (não usar import no TS) */}
        <link rel="stylesheet" href="https://unpkg.com/@reown/appkit@latest/styles.css" />

        {/* Facebook Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src='https://connect.facebook.net/en_US/fbevents.js';
s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script');
fbq('init', '1153619553449209'); fbq('track', 'PageView');` }} />
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
               src="https://www.facebook.com/tr?id=1153619553449209&ev=PageView&noscript=1" alt="" />
        </noscript>

        {/* TikTok Pixel */}
        <script dangerouslySetInnerHTML={{ __html: `!function (w, d, t) {
w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;
e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
ttq.load('D1A4703C77U6QA6SV4N0'); ttq.page();}(window, document, 'ttq');` }} />

        {/* Twitter Pixel (X) */}
        <script dangerouslySetInnerHTML={{ __html: `!function(e,t,n,s,u,a){
e.twq||(s=e.twq=function(){ s.exe ? s.exe.apply(s,arguments) : s.queue.push(arguments); },
s.version='1.1', s.queue=[], u=t.createElement(n), u.async=!0, u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u,a))}(window,document,'script'); twq('config','q1dpa');` }} />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
