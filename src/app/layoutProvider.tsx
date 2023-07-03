'use client';
import { EdgeUIProvider } from '@edge-ui/react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export function LayoutProvider(props: React.PropsWithChildren) {
  return (
    <EdgeUIProvider fontSans={manrope.style.fontFamily}>
      <div className='p-16'>{props.children}</div>
    </EdgeUIProvider>
  );
}
