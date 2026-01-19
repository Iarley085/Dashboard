"use client";
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LayoutDashboard, TrendingUp, UserCheck, Briefcase } from 'lucide-react';

// DADOS CONSOLIDADOS 2025 - EQUIPE COMPLETA
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
    { setor: 'Administrativo', Jan: 0, Fev: 0, Mar: 0, Abr: 1, Mai: 1, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Judicial', Jan: 2, Fev: 4, Mar: 1, Abr: 3, Mai: 5, Jun: 10, Jul: 4, Ago: 11, Set: 7, Out: 2, Nov: 6, Dez: 8 },
    { setor: 'Recursal', Jan: 3, Fev: 0, Mar: 0, Abr: 0, Mai: 3, Jun: 0, Jul: 0, Ago: 4, Set: 0, Out: 1, Nov: 1, Dez: 0 },
    { setor: 'Execução', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Financeiro', Jan: 1, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 0, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 },
    { setor: 'Arquivamento', Jan: 0, Fev: 0, Mar: 0, Abr: 0, Mai: 0, Jun: 0, Jul: 1, Ago: 0, Set: 0, Out: 0, Nov: 0, Dez: 0 }
  ],
};

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function DashboardResponsivo() {
  const [advogadoSelecionado, setAdvogadoSelecionado] = useState("Dra. Johanna");
  const dadosAtuais = DADOS_EQUIPE[advogadoSelecionado];

  // Cálculo de produtividade total
  const totalAnual = dadosAtuais.reduce((acc, curr) => {
    const somaSetor = MESES.reduce((soma, mes) => soma + (curr[mes] || 0), 0);
    return acc + somaSetor;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-900">
      {/* Header Responsivo */}
      <header className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b pb-8 border-slate-200">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center justify-center lg:justify-start gap-3">
            <LayoutDashboard className="text-blue-600 shrink-0" /> 
            <span className="truncate">Gestão de Produção 2025</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">Relatórios detalhados por setor e negociação</p>
        </div>

        <div className="flex flex-col gap-2 w-full lg:w-72">
          <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 tracking-widest justify-center lg:justify-start">
            <UserCheck size={12} /> Selecionar Advogado
          </label>
          <select 
            value={advogadoSelecionado}
            onChange={(e) => setAdvogadoSelecionado(e.target.value)}
            className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-center lg:text-left transition-all"
          >
            {Object.keys(DADOS_EQUIPE).map(nome => (
              <option key={nome} value={nome}>{nome}</option>
            ))}
          </select>
        </div>
      </header>

      {/* Cards de Resumo */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 justify-center lg:justify-start">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full sm:w-fit min-w-[180px] lg:max-w-xs transition-all hover:shadow-md">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-2">
            <Briefcase size={12} /> Responsável
          </p>
          <p className="text-lg font-bold text-slate-800 whitespace-nowrap px-1">{advogadoSelecionado}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 w-full sm:w-fit min-w-[180px] lg:max-w-xs transition-all hover:shadow-md">
          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Produtividade Média</p>
          <p className="text-lg font-bold text-blue-600 whitespace-nowrap px-1">{(totalAnual / 12).toFixed(1)} / mês</p>
        </div>
        
        <div className="bg-blue-600 p-5 rounded-2xl shadow-lg flex flex-col justify-center w-full sm:w-fit min-w-[180px] lg:max-w-xs transition-all hover:scale-[1.02]">
          <p className="text-[10px] text-blue-100 font-bold uppercase mb-1 tracking-wider">Total Consolidado 2025</p>
          <p className="text-xl font-black text-white whitespace-nowrap px-1">{totalAnual} processos</p>
        </div>
      </div>

      {/* Container do Gráfico */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <h2 className="text-lg sm:text-xl font-bold mb-8 text-slate-800 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} /> Distribuição de Atividades
        </h2>
        
        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
          <div className="h-[450px] min-w-[700px] lg:min-w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosAtuais} margin={{ top: 20, right: 10, left: -20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="setor" 
                  angle={-45} 
                  textAnchor="end" 
                  interval={0} 
                  tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} 
                  height={80}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                
                {/* ALTERAÇÃO: itemSorter adicionado para ordenar os meses Jan -> Dez no hover */}
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  itemSorter={(item) => MESES.indexOf(item.dataKey)}
                />

                <Legend verticalAlign="top" height={50} iconType="circle" wrapperStyle={{fontSize: '12px', paddingBottom: '20px'}} />
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
        <p className="text-[10px] text-center text-slate-400 mt-4 lg:hidden italic">
          Arraste lateralmente para ver todos os meses e categorias
        </p>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}