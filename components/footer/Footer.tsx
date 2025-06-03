"use client";
import React, { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

// Tipos para los enlaces y menús
type SocialLink = {
  href: string;
  icon: React.ElementType;
  disabled?: boolean; // Asegúrate de que esta propiedad esté aquí
};

type MenuLink = {
  href: string;
  label: string;
};

// Definición de los enlaces de redes sociales y menús
const socialLinks: SocialLink[] = [
  { href: "https://www.facebook.com", icon: FaFacebookF },
  { href: "https://www.instagram.com", icon: FaInstagram },
  { href: "https://wa.me/51942051076", icon: FaWhatsapp, disabled: false }, // Deshabilitado
  { href: "https://www.tiktok.com", icon: FaTiktok, disabled: true }, // Deshabilitado
  { href: "https://www.youtube.com", icon: FaYoutube, disabled: true }, // Deshabilitado
];

const menuLinks: MenuLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/diplomados", label: "Diplomados" },
  { href: "/certs", label: "Certificados" },
  { href: "/aula-virtual", label: "Aula Virtual" },
];

const diplomaLinks: string[] = [
  "Ingeniería Agronoma",
  "Ingeniería Civil",
  "Ingeniería Ambiental",
  "Ingeniería de Industrias Alimentarias",
  "Derecho",
];

// Componente para manejar enlaces de redes sociales
const SocialLink: React.FC<{
  href: string;
  icon: React.ElementType;
  disabled?: boolean;
}> = ({ href, icon: Icon, disabled }) => {
  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar mensaje

  return (
    <div className="relative">
      <Link
        href={disabled ? "#" : href} // Previene la navegación si está deshabilitado
        target={disabled ? undefined : "_blank"}
        className={`p-2 rounded-full transition-transform transform hover:scale-150 shadow-xl ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={disabled ? (e) => e.preventDefault() : undefined} // Previene la acción si está deshabilitado
        onMouseEnter={() => disabled && setShowMessage(true)} // Muestra mensaje al pasar el cursor
        onMouseLeave={() => disabled && setShowMessage(false)} // Oculta mensaje al quitar el cursor
      >
        <Icon size={24} />
      </Link>
      {/* Mensaje de indisponibilidad */}
      {disabled && showMessage && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-red-500 text-sm">
          Aún no disponible
        </div>
      )}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="bg-blue-500 text-white py-16 px-6 w-full overflow-visible"
    >
      <div className="container mx-auto w-full h-full overflow-visible">
        {/* Redes Sociales */}
        <div className="flex justify-center lg:justify-between items-center mb-12">
          <p className="text-center lg:text-left">
            Síguenos en nuestras redes sociales
          </p>
          <div className="flex justify-center lg:justify-end space-x-4 mt-4 lg:mt-0">
            {socialLinks.map(({ href, icon, disabled }, idx) => (
              <SocialLink
                key={idx}
                href={href}
                icon={icon}
                disabled={disabled}
              />
            ))}
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="border-t border-white/40 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logotipo y Descripción */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <Image
                src="/image/logo_inal_vert.png"
                alt="Corporación Inalta"
                width={180}
                height={60}
                priority
                className="mb-4"
              />
              <p className="mt-2 text-sm text-center md:text-left">
                Proporcionamos cursos y diplomados con aval de la EPG-UNP.
              </p>
              <Link href="/book">
                <div className="mt-2 text-sm text-white hover:underline flex items-center">
                  <Image
                    src="/image/reclamos.png"
                    alt="Libro de Reclamaciones"
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  Libro de Reclamaciones
                </div>
              </Link>
            </div>

            {/* Nuestra Empresa */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4">NUESTRA EMPRESA:</h3>
              <ul className="space-y-2">
                {menuLinks.map(({ href, label }, idx) => (
                  <li key={idx}>
                    <Link href={href}>
                      <span className="text-white hover:text-blue-100 transition duration-150">
                        {label}
                      </span>
                    </Link>
                  </li>
                ))}
                <li>
                  <span className="hover:underline cursor-pointer">
                    ¡Inscríbete!
                  </span>
                </li>
              </ul>
            </div>

            {/* Nuestros Diplomados */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4">
                NUESTROS DIPLOMADOS EN:
              </h3>
              <ul className="space-y-2">
                {diplomaLinks.map((diploma, idx) => (
                  <li key={idx}>
                    <Link href="/diplomados">
                      <span className="text-white hover:text-blue-100 transition duration-150">
                        {diploma}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-4">CONTACTO</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <HiOutlineMail size={20} className="mr-2" />
                  <Link href="mailto:capacitaciones@inalta.edu.pe">
                    <span className="hover:underline">
                      capacitaciones@inalta.edu.pe
                    </span>
                  </Link>
                </li>
                <li className="flex items-center">
                  <HiOutlinePhone size={20} className="mr-2" />
                  <Link href="tel:+51984040264">
                    <span className="hover:underline">+51 942 051 076</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Derechos Reservados */}
        {/* Derechos Reservados */}
        {/* Derechos Reservados */}
<div className="relative mt-8 text-center text-sm text-gray-300">
  <p>© 2024 Copyright: Inalta</p>
  {/* Texto oculto a la misma altura que el copyright */}
  <p className="opacity-0 text-gray-300">pagina protegido por el omnissiah</p>
</div>

      </div>
    </footer>
  );
};

// Exportar el componente memoizado para optimizar el renderizado
export default memo(Footer);
