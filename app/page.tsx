"use client";
import dynamic from "next/dynamic";

// Importación de componentes dinámicos con carga diferida
const PorqueNosotros = dynamic(() => import("@/components/home/PorqueNosotros"), { loading: () => <p>Cargando...</p>, ssr: false });
const CarouselCursosDestacados = dynamic(() => import("@/components/home/SwiperCursosDestacados"), { loading: () => <p>Cargando...</p>, ssr: false });
const TestimoniosFb = dynamic(() => import("@/components/home/TestimoniosFb"), { loading: () => <p>Cargando...</p>, ssr: false });
const NuestrosDiplomados = dynamic(() => import("@/components/home/NuestrosDiplomados"), { loading: () => <p>Cargando...</p>, ssr: false });
const ContactForm = dynamic(() => import("@/components/home/ContactForm"), { loading: () => <p>Cargando...</p>, ssr: false });
const ScrollToBotButton = dynamic(() => import("@/components/home/bounceDown"), { loading: () => <p>Cargando...</p>, ssr: false });

// Importación directa para componentes de carga inmediata
import PrincipalHome from "@/components/home/PrincipalHome";

export default function Main() {
  return (
    <main className="relative z-0">
      {/* Primera Sección */}
      <div>
        <PrincipalHome />
        <NuestrosDiplomados />
      </div>

      {/* Segunda Sección - PorqueNosotros y Cursos Destacados */}
      <div className="bg-gradient-to-b from-white via-white to-white">
        <PorqueNosotros />
        <CarouselCursosDestacados />
      </div>

      {/* Testimonios */}
      <TestimoniosFb />

      {/* Contact Form */}
      <div className="bg-gradient-to-b from-blue-50 via-blue-300 to-blue-500">
        <ContactForm />
      </div>

      {/* Scroll to Bottom Button */}
      <ScrollToBotButton />
    </main>
  );
}
