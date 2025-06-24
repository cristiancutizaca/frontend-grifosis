'use client'

import React from 'react'
import Layout from '../../src/components/Layout'

const GrifoReportes: React.FC = () => {
    return (
    <Layout currentPage="reportes">
        <div className="p-6">
            <h1 className="text-2xl font-bold text-white">Configuración del Grifo</h1>
            <p className="text-slate-400 mt-2">Próximamente podrás ver aquí la configuración detallada.</p>
        </div>
    </Layout>
    )
}

export default GrifoReportes
