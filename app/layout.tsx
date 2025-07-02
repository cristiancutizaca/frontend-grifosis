import type { Metadata } from 'next';
import ClientLayout from './clientLayout';
import './globals.css';

export const metadata: Metadata = {
  title: 'GAS STATION',
  icons: {
    icon: '/image/logo_grifosis.png', // Asegúrate de tener este archivo en /public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
