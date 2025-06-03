"use client";
import React, { useState } from "react";
import CursoAmbientaly from "@/components/cursos/IngAmbientaly/CursoAmbientaly";
import CursoIrrigation from "@/components/cursos/IngAgronomy/CursoIrrigation";
import CursoSolidWaste from "@/components/cursos/IngAmbientaly/CursoSolidWaste";
import CursoTechnicalIrrigation from "@/components/cursos/IngAgronomy/CursoTechnicalIrrigation";
import GraduateTechnicalAssistant from "@/components/cursos/IngCivil/GraduateTechnicalAssistant";
import GraduateIngVial from "@/components/cursos/IngCivil/GraduateIngVial";
import GraduateIngBridge from "@/components/cursos/IngCivil/GraduateIngBridge";
import GraduateWorksSupervision from "@/components/cursos/IngCivil/GraduateWorksSupervision";
import GraduateFoodQuality from "@/components/cursos/IngAlimentary/GraduateFoodQuality";
import GraduateSsoma from "@/components/cursos/ssoma/GraduateSsoma";
import Whatsapp from "@/components/whatsapp/Index";
import CursoQualityMonitoringAmbientaly from "@/components/cursos/IngAmbientaly/CursoQualityMonitoringAmbientaly";
import CursoManagementAmbientaly from "@/components/cursos/IngAmbientaly/CursoManagementAmbientaly";

const Graduate = () => {
  // Cambiamos el estado a un array
  const [activeSections, setActiveSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setActiveSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((s) => s !== section) // Remover si ya está abierto
        : [...prevSections, section] // Añadir a las secciones activas
    );
  };

  const sections = [
    { id: "GraduateIngVial", title: "CURSOS EN INGENIERIA VIAL", content: <GraduateIngVial /> },
    { id: "GraduateWorksSupervision", title: "CURSOS EN RESIDENCIA Y SUPERVISIÓN DE OBRAS", content: <GraduateWorksSupervision /> },
    { id: "GraduateIngBridge", title: "CURSOS EN INGENIERIA DE PUENTES", content: <GraduateIngBridge /> },
    { id: "GraduateTechnicalAssistant", title: "CURSOS EN ASISTENTE TÉCNICO EN OBRAS", content: <GraduateTechnicalAssistant /> },
    { id: "ambiental", title: "CURSOS EN INGENIERÍA AMBIENTAL", content: <CursoAmbientaly /> },
    { id: "agronoma", title: "CURSOS EN INGENIERÍA AGRÓNOMA", content: <CursoIrrigation /> },
    { id: "civil", title: "CURSOS EN INGENIERÍA CIVIL", content: <GraduateTechnicalAssistant /> },
    { id: "alimentaria", title: "CURSOS EN INGENIERÍA ALIMENTARIA", content: <GraduateFoodQuality /> },
    { id: "CursoManagementAmbientaly", title: "CURSOS EN GESTION AMBIENTAL MUNICIPAL Y REGIONAL", content: <CursoManagementAmbientaly /> },
    { id: "CursoIrrigation", title: "CURSOS EN RIEGO Y FERTIRRIEGO", content: <CursoIrrigation /> },
    { id: "CursoTechnicalIrrigation", title: "CURSOS EN SISTEMA DE RIEGO TECNIFICADO", content: <CursoTechnicalIrrigation /> },
    { id: "GraduateFoodQuality", title: "CURSOS EN GESTIÓN DE LA CALIDAD E INOCUIDAD ALIMENTARIA", content: <GraduateFoodQuality /> },
    { id: "GraduateSsoma", title: "CURSOS EN SEGURIDAD, SALUD OCUPACIONAL Y MEDIO AMBIENTE (SSOMA)", content: <GraduateSsoma /> },
  ];

  return (
    <section id="/cursos">
      <div className="relative pt-20 pb-20 bg-gradient-to-t from-white to-blue-400">
        <div className="relative mx-auto inset-0 flex flex-col justify-center items-center text-center text-gray-800 px-4">
          <h1 className="font-extrabold text-4xl lg:text-6xl mt-10">Nuestros Cursos</h1>
          <p className="mt-4 text-lg md:text-2xl mb-10">
            ¡Brindamos un servicio de excelencia para garantizar el éxito en tu carrera profesional!
          </p>
        </div>
      </div>

      <div className="p-4 relative z-10 bg-gradient-to-b from-white via-blue-300 to-white ">
        <div className="ml-20 mr-20 bg-gradient-to-br rounded-md shadow-md text-black ">
          {sections.map((section) => (
            <div key={section.id} className="border-b">
              <button
                className="w-full text-left p-4 bg-transparent focus:outline-none bg-blue-500"
                onClick={() => toggleSection(section.id)}
              >
                <span className="font-bold">{section.title}</span>
                <span className="float-right">{activeSections.includes(section.id) ? "▲" : "▼"}</span>
              </button>
              {activeSections.includes(section.id) && (
                <div className="p-4 bg-transparent">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Whatsapp />
    </section>
  );
};

export default Graduate;
