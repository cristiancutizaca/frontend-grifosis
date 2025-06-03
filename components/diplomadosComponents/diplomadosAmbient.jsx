"use client";
import Curso from "./diplomadosAccordion";

const DiploAmbient = () => {
  // Array de objetos que contienen los datos de cada curso
  const cursosData = [

    {
      area: "INGENIERÍA AMBIENTAL",
      titulo: "Monitoreo y Evaluación de la Calidad Ambiental",
      imagen: "/image/diplomados/dip/MECA.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "04 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Bachilleres, titulados y profesionales de las carreras de ingenierías ambiental, químicos, agrónomo, sanitarios, biólogos y ramas afines que se encuentran involucrados en las actividades ambientales en empresas mineras o instituciones públicas como MINAM, MEM, OEFA y SERNANP. ",
      modulos: [
        "Conceptos básicos y marco normativo. (Introducción)",
        "Monitoreo de la calidad del agua.",
        "Monitoreo de la calidad de aire.",
        "Monitoreo de ruido ambiental.",
        "Monitoreo de la calidad de suelo.",
        " Monitoreo de radiaciones no ionizantes.",
        "Monitoreo biológicos.",
        "Monitoreo de agentes ocupacionales.",
        "Calibración de equipos de monitoreo ambiental.",
        "Interpretación de informes de laboratorios.",
      ],
    },

    {
      area: "INGENIERÍA AMBIENTAL",
      titulo: "Gestión y manejo integral de residuos sólidos",
      imagen: "/image/diplomados/dip/GMIRS.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "04 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Bachilleres, titulados y profesionales de las carreras de ingeniería ambiental, industrial, civil, biología, química, agronómica y ramas afines.",
      modulos: [
            "Formulación de proyectos de inversión pública de residuos sólidos.",
            "Gestión y manejo de residuos sólidos industriales.",
            "Tratamiento y reaprovechamiento de residuos sólidos.",
            "Diseño de Rellenos sanitarios.",
            "Residuos sólidos y economía circular.",
            "Operatividad de las EO-RS.",
            "Gestión y manejo de residuos sólidos municipales.",
            "Estudio de caracterización de residuos sólidos.",
            "Valorización de residuos sólidos.",
            " Gestión y manejo de residuos sólidos en minería.",
            "Gestión y manejo de residuos sólidos de construcción.",
            "Gestión y manejo de residuos sólidos hospitalarios.",

      ],
    },

    {
      area: "INGENIERÍA AMBIENTAL",
      titulo: "SSOMA (Seguridad y Salud Ocupacional y Medio Ambiente)",
      imagen: "/image/diplomados/dip/SSOMA.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "El diplomado especializado está dirigido a ingenieros y supervisores de seguridad, prevencionistas, capataces y jefes, miembros del comité de seguridad, profesionales en general, estudiantes universitarios, bachilleres, técnicos y a todos aquellos interesados en el manejo competente de los asuntos de seguridad y salud ocupacional.",
      modulos: [
        "Investigación y reporte de accidentes laborales",
        "Prevención de riesgos laborales",
        "Fiscalización y auditorias de SSO - SUNAFIL",
        "Fiscalización ambiental",
        "Supervisor SSOMA",
        "Auditor Interno SSOMA",
        "Gestión ambiental - ISO 14001",
        "Implementación de sistema de gestión de SST",
        "Elaboración de matriz IPERC - mapa de riesgos",
        "Comité de seguridad y salud en el trabajo",
        "Primeros auxilios y formación de brigadas de emergencia",
        "Seguridad en trabajo de alto riesgo",
      ],
    },
    
    {
      area: "INGENIERÍA AMBIENTAL",
      titulo: "Gestión Ambiental Municipal y Regional",
      imagen: "/image/diplomados/dip/GAMR.webp",
      fechaInicio: "próximamente",
      modalidad: "Virtual",
      duracion: "4 meses",
      horas: "420 horas correspondientes a 26 créditos.",
      descripcion:
        "Gerentes municipales, gerentes de gestión ambiental, sub gerentes de gestión ambiental, sub gerentes de medio ambientes de las municipalidades provinciales y distritales, jefes de áreas en gestión ambiental, jefes de área de residuos sólidos, asistentes administrativos, practicantes, funcionarios de las municipalidades, profesionales interesados en la materia, y estudiantes universitarios.",
      modulos: [
        "Gestión ambiental municipal, gobernanza ambiental y participación ciudadana.",
        "Gestión del cambio climático.",
        "Gestión y manejo de residuos sólidos municipales.",
        "Estudio de caracterización de residuos sólidos municipales.",
        "Gestión de área técnica municipal (ATM).",
        "Saneamiento ambiental, JASS y Diseño de UBS.",
        "Tratamiento de aguas residuales.",
        "Certificación ambiental para proyectos.",
        "Fiscalización ambiental.",
        "Diseño, construcción, operación y cierre de rellenos sanitarios.",
        "Ecoeficiencia municipal y regional.",
      ],
    },
    

    // Puedes agregar más cursos aquí si es necesario
  ];

  return (
    <div>
      {cursosData.map((curso, index) => (
        <Curso key={index} curso={curso} />
      ))}
    </div>
  );
};

export default DiploAmbient;
