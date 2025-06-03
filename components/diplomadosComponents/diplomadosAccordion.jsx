import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { IoMdSchool } from "react-icons/io";

// Componente dinámico
const DashboardSkeleton = dynamic(() => import("@/components/home/skeletons"));

const Curso = ({ curso }) => {
  // Estado para habilitar/deshabilitar botones
  const [isDisabled, setIsDisabled] = useState(false);

  // Función para convertir números a números romanos
  function toRoman(num) {
    const romanNumerals = [
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";

    for (const pair of romanNumerals) {
      while (num >= pair.value) {
        result += pair.numeral;
        num -= pair.value;
      }
    }

    return result;
  }

  // Función para generar el enlace a WhatsApp
  const generarEnlaceWhatsapp = (cursoTitulo, modulo) => {
    const mensaje = `Hola, busco información sobre el módulo "${modulo}" del curso "${cursoTitulo}".`;
    const url = `https://api.whatsapp.com/send?phone=51942051076&text=${encodeURIComponent(
      mensaje
    )}&app_absent=0`;
    return url;
  };

  return (
    <div className="flex flex-col md:flex-row bg-transparent border-transparent rounded-lg overflow-hidden mb-8 mt-20 ml-36">
      {/* Contenedor de la imagen con estilos responsivos */}
      <div
  className="relative w-full md:w-1/3 lg:w-1/2 xl:w-1/3"
  style={{ height: "600px" }} // Establecer una altura fija
>
  <Image
    src={curso.imagen}
    alt="Curso"
    layout="fill"
    objectFit="cover"
    className="rounded-lg"
  />
</div>


      {/* Contenido del curso */}
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-2/3 p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
            {curso.area}
          </h2>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {curso.titulo}
          </h1>
          <p className="text-gray-700 mb-4">{curso.descripcion}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-bold">Fecha de inicio:</p>
              <p>{curso.fechaInicio}</p>
            </div>
            <div>
              <p className="font-bold">Modalidad:</p>
              <p>{curso.modalidad}</p>
            </div>
            <div>
              <p className="font-bold">Duración:</p>
              <p>{curso.duracion}</p>
            </div>
            <div>
              <p className="font-bold">Horas del curso:</p>
              <p>{curso.horas}</p>
            </div>
          </div>

          {/* Acordeón de módulos */}
          <Accordion defaultExpandedKeys={["1"]} bordered shadow>
            <AccordionItem
              key="3"
              title={
                <h3 className="text-lg font-medium text-gray-900 ">
                  Módulos del diplomado
                </h3>
              }
              expandIcon={<FaChevronDown className="text-gray-600 w-6 h-6" />}
            >
              <ul className="list-disc pl-5 text-gray-800 dark:text-white">
                {curso.modulos.map((modulo, moduloIndex) => (
                  <li
                    key={moduloIndex}
                    className={`flex items-center bg-blue-50 justify-between border-2 border-blue-400 rounded-lg py-2 px-4 text-gray-800 ${
                      isDisabled ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <Link
                      href={
                        isDisabled
                          ? "#"
                          : generarEnlaceWhatsapp(curso.titulo, modulo)
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 w-full ${
                        isDisabled ? "pointer-events-none" : ""
                      }`}
                    >
                      <FaWhatsapp className="text-green-500 w-5 h-5" />
                      <span className="text-lg font-semibold">
                        MÓDULO {toRoman(moduloIndex + 1)}:
                      </span>
                      <span className="text-md">{modulo}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col md:flex-row justify-around items-center gap-4 mt-6">
          <Link
            href={
              isDisabled
                ? "#"
                : generarEnlaceWhatsapp(curso.titulo, "Información general")
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 rounded-full py-2 px-6 w-full lg:w-auto ${
              isDisabled ? "pointer-events-none" : ""
            }`}
          >
            <FaWhatsapp className="w-5 h-5 mr-2" />
            MÁS INFORMACIÓN
          </Link>
          <a
            href="#"
            className="flex items-center justify-center border-2 border-red-400 text-red-400 bg-gray-200 rounded-full py-2 px-6 w-full lg:w-auto cursor-not-allowed"
            style={{ pointerEvents: "none" }}
          >
            <MdOutlinePictureAsPdf className="w-5 h-5 mr-2" />
            PLAN DE ESTUDIOS
          </a>
          <a
            href="#"
            className="flex items-center justify-center border-2 border-blue-400 text-blue-400 bg-gray-200 rounded-full py-2 px-6 w-full lg:w-auto cursor-not-allowed"
            style={{ pointerEvents: "none" }}
          >
            <MdOutlinePictureAsPdf className="w-5 h-5 mr-2" />
            CERTIFICACIONES
          </a>
        </div>
      </div>
    </div>
  );
};

export default Curso;
