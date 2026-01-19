"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LayoutDashboard, Calendar, Briefcase, TrendingUp, UserCheck } from 'lucide-react';

// DADOS 2025: 4 ADVOGADOS X 10 CATEGORIAS X 12 MESES
const DADOS_EQUIPE = {
  "Dra. Johanna": [
    { setor: 'Marketing', Jan: 2, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Judicial', Jan: 6, Fev: 2, Mar: 3, Abr: 9, Mai: 6, Jun: 9, Jul: 6, Ago: 16, Set: 8, Out: 9, Nov: 8, Dez: 2 },
    { setor: 'Administrativo', Jan: 1, Fev: 0, Mar: 0, Abr: 2, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Recursal', Jan: 5, Fev: 3, Mar: 0, Abr: 3, Mai: 0, Jun: 1, Jul: 1, Ago: 1, Set: 2, Out: 1, Nov: 0, Dez: 0 },
    { setor: 'Execução', Jan: 2, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 1, Set: 1, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Financeiro', Jan: 1, Fev: 0, Mar: 0, Abr: 1, Mai: 1, Jun: 3, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Arquivamento', Jan: 3, Fev: 1, Mar: 0, Abr: 4, Mai: 3, Jun: 1, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 1, Dez: 0 },
    { setor: 'Consultivo', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Negociação', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
  ],
  "Dr. William": [
    { setor: 'Marketing', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 1, Dez: 0 },
    { setor: 'Negociação', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 1, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Consultoria', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Administrativo', Jan: 2, Fev: 1, Mar: 2, Abr: 0, Mai: 1, Jun: 3, Jul: 6, Ago: 4, Set: 2, Out: 8, Nov: 6, Dez: 8 },
    { setor: 'Judicial', Jan: 1, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 4, Jul: 0, Ago: 0, Set: 3, Out: 3, Nov: 6, Dez: 4 },
    { setor: 'Recursal', Jan: 1, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 1, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Execução', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Financeiro', Jan: 1, Fev: 0, Mar: 1, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 1, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Arquivamento', Jan: 2, Fev: 0, Mar: 1, Abr: 0, Mai: 0, Jun: 3, Jul: 1, Ago: 1, Set: 0, Out: 2, Nov: 0, Dez: 1 }
  ],
  "Dr. Felipe Silva": [
    { setor: 'Marketing', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Negociação', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Consultoria', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Administrativo', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 1, Dez: 0 },
    { setor: 'Judicial', Jan: 16, Fev: 6, Mar: 0, Abr: 0, Mai: 5, Jun: 0, Jul: 0, Ago: 9, Set: 7, Out: 8, Nov: 5, Dez: 3 },
    { setor: 'Recursal', Jan: 1, Fev: 0, Mar: 0, Abr: 0, Mai: 1, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Execução', Jan: 2, Fev: 1, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Financeiro', Jan: 2, Fev: 0, Mar: 0, Abr: 0, Mai: 1, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Arquivamento', Jan: 3, Fev: 0, Mar: 1, Abr: 1, Mai: 3, Jun: 0, Jul: 0, Ago: 3, Set: 2, Out: 1, Nov: 1, Dez: 1 }
  ],
  "Dra. Emily Lima": [
    { setor: 'Marketing', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Negociação', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 1, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 1 },
    { setor: 'Consultoria', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Administrativo', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 1, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Judicial', Jan: 2, Fev: 4, Mar: 1, Abr: 3, Mai: 5, Jun: 10, Jul: 4, Ago: 11, Set: 7, Out: 2, Nov: 6, Dez: 8 },
    { setor: 'Recursal', Jan: 3, Fev: 0, Mar: 0, Abr: 0, Mai: 3, Jun: 0, Jul: 0, Ago: 4, Set: 0, Out: 1, Nov: 1, Dez: 0 },
    { setor: 'Execução', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Financeiro', Jan: 1, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Arquivamento', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 1, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 }
  ],
  
};

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function DashboardJuridico() {
  const [advogadoSelecionado, setAdvogadoSelecionado] = useState("Dra. Johanna");

  const dadosAtuais = DADOS_EQUIPE[advogadoSelecionado];

  // Cálculo do total anual dinâmico
  const totalAnual = dadosAtuais.reduce((acc, curr) => {
    const somaSetor = MESES.reduce((soma, mes) => soma + (curr[mes] || 0), 0);
    return acc + somaSetor;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8 border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <LayoutDashboard className="text-blue-600" /> Gestão de Produção 2025
          </h1>
          <p className="text-slate-500 font-medium">Relatórios detalhados por setor e negociação</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2 tracking-widest">
            <UserCheck size={14} /> Selecionar Advogado
          </label>
          <select 
            value={advogadoSelecionado}
            onChange={(e) => setAdvogadoSelecionado(e.target.value)}
            className="bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          >
            {Object.keys(DADOS_EQUIPE).map(nome => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase mb-2">Responsável</p>
          <p className="text-2xl font-bold text-slate-800">{advogadoSelecionado}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-xs text-slate-400 font-bold uppercase mb-2">Produtividade Média</p>
          <p className="text-2xl font-bold text-blue-600">{(totalAnual / 12).toFixed(1)} / mês</p>
        </div>
        <div className="bg-blue-600 p-6 rounded-2xl shadow-lg flex flex-col justify-center">
          <p className="text-xs text-blue-100 font-bold uppercase mb-1">Total Consolidado 2025</p>
          <p className="text-3xl font-black text-white">{totalAnual} processos</p>
        </div>
      </div>

      {/* Gráfico Detalhado */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold mb-8 text-slate-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} /> Distribuição de Atividades (Incluindo Negociação)
        </h2>
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosAtuais} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="setor" 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
                tick={{fill: '#64748b', fontSize: 12, fontWeight: 700}} 
              />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              />
              <Legend verticalAlign="top" height={50} iconType="circle"/>
              {MESES.map((mes, index) => (
                <Bar 
                  key={mes} 
                  dataKey={mes} 
                  fill={index % 2 === 0 ? "#2563eb" : "#93c5fd"} 
                  radius={[2, 2, 0, 0]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}