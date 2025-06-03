'use client';
// components/ClientLayout.tsx
import NavLinks from "./nav-links"; 
import React from 'react';
import Header from '@/app/navBar';
import Footer from '@/components/footer/Footer';
import ScrollToTopButton from '@/components/home/slideup';
import { ThemeProvider } from '@/components/ThemeProvider';
import Whatsapp from '@/components/whatsapp/Index';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-roboto bg-white ">
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >

        <link rel="icon" href="/image/iconoinalt.png" />  {/* Asegúrate de que la ruta sea correcta */}
        
        {/* <Header /> */}
        <main>{children}</main>
        <Whatsapp />
        <Footer />
        <ScrollToTopButton />
      </ThemeProvider>
    </div>

    
  );
}
