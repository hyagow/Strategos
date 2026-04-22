import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  DollarSign,
  Target,
  Clock,
  Zap,
  Plus,
  Trash2,
  Info,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Layers,
  Wallet,
  ArrowUpRight,
  PieChart as PieChartIcon,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from 'recharts';

const App = () => {
  const [salary, setSalary] = useState(0);
  const [displaySalary, setDisplaySalary] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [isFocusMode, setIsFocusMode] = useState(false);
  
  const [expenses, setExpenses] = useState([
    { id: 1, label: 'Habitação', value: 0, category: 'Obrigatório' },
    { id: 2, label: 'Alimentação', value: 0, category: 'Obrigatório' },
    { id: 3, label: 'Subscrições & Lazer', value: 0, category: 'Não-Obrigatório' },
  ]);

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const numericValue = parseFloat(value) / 100 || 0;
    setSalary(numericValue);
    setDisplaySalary(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue));
  };

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now(), label: '', value: 0, category: 'Não-Obrigatório' }]);
  };

  const updateExpense = (id, field, val) => {
    setExpenses(expenses.map(exp => {
      if (exp.id === id) {
        if (field === 'value') {
          const numericValue = parseFloat(val.replace(/\D/g, '')) / 100 || 0;
          return { ...exp, [field]: numericValue };
        }
        return { ...exp, [field]: val };
      }
      return exp;
    }));
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const calc = useMemo(() => {
    const mandatoryReal = expenses.filter(e => e.category === 'Obrigatório').reduce((acc, curr) => acc + curr.value, 0);
    const optionalReal = expenses.filter(e => e.category === 'Não-Obrigatório').reduce((acc, curr) => acc + curr.value, 0);
    const totalExpenses = mandatoryReal + optionalReal;
    const assetsReal = Math.max(salary - totalExpenses, 0);

    const mandatoryIdeal = salary * 0.30;
    const optionalIdeal = salary * 0.20;
    const assetsIdeal = salary * 0.50;

    const monthlyCost = totalExpenses > 0 ? totalExpenses : (mandatoryIdeal + optionalIdeal);
    const fireNumber = (monthlyCost || 1) * 12 * 25; 
    
    const healthScore = salary > 0 ? (assetsReal / salary) * 100 : 0;

    return { 
      mandatoryReal, optionalReal, totalExpenses, assetsReal,
      mandatoryIdeal, optionalIdeal, assetsIdeal,
      fireNumber, healthScore, monthlyCost
    };
  }, [salary, expenses]);

  const projectionData = useMemo(() => {
    if (salary <= 0) return [];
    let currentWealth = 0;
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
    const data = [];
    const monthlyAporte = calc.assetsReal;

    for (let year = 0; year <= 35; year++) {
      data.push({
        ano: `${year}a`,
        valor: Math.round(currentWealth),
        meta: calc.fireNumber
      });
      for (let m = 0; m < 12; m++) {
        currentWealth = (currentWealth + monthlyAporte) * (1 + monthlyReturn);
      }
      if (currentWealth > calc.fireNumber * 2.2) break;
    }
    return data;
  }, [salary, calc.assetsReal, calc.fireNumber, annualReturn]);

  const yearsToFire = useMemo(() => {
    if (salary <= 0 || calc.assetsReal <= 0) return "∞";
    let currentWealth = 0;
    const monthlyReturn = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
    let months = 0;
    while (currentWealth < calc.fireNumber && months < 720) {
      currentWealth = (currentWealth + calc.assetsReal) * (1 + monthlyReturn);
      months++;
    }
    return months >= 720 ? "> 60" : (months / 12).toFixed(1);
  }, [salary, calc.assetsReal, calc.fireNumber, annualReturn]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  const theme = isDarkMode 
    ? { 
        bg: 'bg-[#050505]', 
        card: 'bg-[#0d0d0f] border-[#1a1a1e]', 
        text: 'text-zinc-100', 
        muted: 'text-zinc-500',
        input: 'bg-zinc-900/50 border-zinc-800' 
      }
    : { 
        bg: 'bg-zinc-50', 
        card: 'bg-white border-zinc-200 shadow-sm', 
        text: 'text-zinc-900', 
        muted: 'text-zinc-400',
        input: 'bg-zinc-100 border-zinc-200' 
      };

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme.bg} ${theme.text} font-sans selection:bg-emerald-500/20 ${isDarkMode ? 'dark' : ''}`}>
      <div className={`mx-auto transition-all duration-500 ${isFocusMode ? 'max-w-full px-4 md:px-12' : 'max-w-6xl p-4 md:p-8'}`}>
        
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity size={22} className="text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Strategos</h1>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${theme.muted}`}>Wealth Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className={`text-[9px] font-bold uppercase tracking-widest ${theme.muted}`}>Rendimento Anual</span>
              <div className="flex items-center gap-3">
                <input 
                  type="range" min="4" max="18" step="0.5" value={annualReturn} onChange={(e) => setAnnualReturn(parseFloat(e.target.value))}
                  className="w-24 accent-emerald-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-black text-emerald-500">{annualReturn}%</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleFocusMode} 
                title={isFocusMode ? "Sair do Modo Foco" : "Modo Foco"}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${theme.card} ${isFocusMode ? 'border-emerald-500 text-emerald-500' : ''}`}
              >
                {isFocusMode ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${theme.card}`}
              >
                {isDarkMode ? <Zap size={18} className="text-amber-400" /> : <Clock size={18} />}
              </button>
            </div>
          </div>
        </nav>

        <div className={`grid grid-cols-1 ${isFocusMode ? 'lg:grid-cols-12 gap-10' : 'lg:grid-cols-12 gap-8'} items-start`}>
          
          {/* Left Column: Input & Controls */}
          <div className={`${isFocusMode ? 'lg:col-span-4' : 'lg:col-span-5'} space-y-6`}>
            <div className={`p-8 rounded-3xl border ${theme.card} relative overflow-hidden group`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all"></div>
               
               <label className={`text-[10px] font-black mb-4 block uppercase tracking-[0.2em] ${theme.muted}`}>Receita Mensal Líquida</label>
               <div className="relative flex items-center">
                 <input
                   type="text"
                   className={`w-full bg-transparent font-black outline-none tracking-tighter transition-all focus:text-emerald-500 ${isFocusMode ? 'text-6xl' : 'text-5xl'}`}
                   placeholder="R$ 0,00"
                   value={displaySalary}
                   onChange={handleSalaryChange}
                 />
               </div>

               <div className="mt-10 pt-8 border-t border-zinc-800/50">
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-sm font-bold flex items-center gap-2">
                     <Layers size={16} className="text-emerald-500" /> Fluxo de Caixa
                   </h3>
                   <button 
                     onClick={addExpense} 
                     className="text-[10px] font-bold text-emerald-500 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-500/10 transition-all uppercase"
                   >
                     Adicionar
                   </button>
                 </div>

                 <div className={`space-y-3 overflow-y-auto pr-2 custom-scrollbar ${isFocusMode ? 'max-h-[550px]' : 'max-h-[400px]'}`}>
                   {expenses.map((exp) => (
                     <div key={exp.id} className={`p-4 rounded-2xl border transition-all hover:border-emerald-500/40 ${theme.input}`}>
                       <div className="flex justify-between gap-4 mb-2">
                         <input 
                           type="text" 
                           value={exp.label}
                           onChange={(e) => updateExpense(exp.id, 'label', e.target.value)}
                           className="bg-transparent text-xs font-semibold outline-none w-full"
                         />
                         <button onClick={() => removeExpense(exp.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                           <Trash2 size={14} />
                         </button>
                       </div>
                       <div className="flex items-center justify-between">
                         <select 
                           value={exp.category}
                           onChange={(e) => updateExpense(exp.id, 'category', e.target.value)}
                           className={`bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer ${exp.category === 'Obrigatório' ? 'text-blue-500' : 'text-zinc-500'}`}
                         >
                           <option value="Obrigatório">30% Fixo</option>
                           <option value="Não-Obrigatório">20% Variável</option>
                         </select>
                         <input 
                           type="text" 
                           value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(exp.value)}
                           onChange={(e) => updateExpense(exp.id, 'value', e.target.value)}
                           className="bg-transparent text-sm font-black text-right outline-none w-24"
                         />
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-6 rounded-3xl border ${theme.card}`}>
                <p className={`text-[9px] font-bold uppercase mb-1 ${theme.muted}`}>Despesas Totais</p>
                <p className="text-xl font-bold text-blue-500">{formatCurrency(calc.totalExpenses)}</p>
              </div>
              <div className={`p-6 rounded-3xl border ${theme.card}`}>
                <p className={`text-[9px] font-bold uppercase mb-1 ${theme.muted}`}>Capacidade de Aporte</p>
                <p className="text-xl font-bold text-emerald-500">{formatCurrency(calc.assetsReal)}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard & Visualization */}
          <div className={`${isFocusMode ? 'lg:col-span-8' : 'lg:col-span-7'} space-y-8`}>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className={`p-8 rounded-[2rem] border relative overflow-hidden group ${theme.card}`}>
                <div className="absolute -bottom-4 -right-4 text-emerald-500/10 group-hover:scale-110 transition-transform">
                  <Target size={120} />
                </div>
                <div className="relative z-10">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>Target Independence</span>
                  <h2 className={`font-black mt-2 mb-1 tracking-tight text-emerald-500 ${isFocusMode ? 'text-4xl' : 'text-3xl'}`}>{formatCurrency(calc.fireNumber)}</h2>
                  <p className="text-[10px] font-medium opacity-50 flex items-center gap-1">
                    Custo de vida mensal coberto: {formatCurrency(calc.monthlyCost)}
                  </p>
                </div>
              </div>

              <div className={`p-8 rounded-[2rem] border flex items-center gap-5 ${theme.card}`}>
                <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
                  <Clock size={32} />
                </div>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${theme.muted}`}>Horizonte</span>
                  <h2 className={`font-black tracking-tight ${isFocusMode ? 'text-4xl' : 'text-3xl'}`}>{yearsToFire} <span className="text-sm font-bold opacity-40">Anos</span></h2>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[2rem] border ${theme.card}`}>
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                   <ShieldCheck size={16} className="text-emerald-500" /> Auditoria 30/20/50
                </h3>
                <div className={`text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 uppercase`}>
                  Score: {Math.round(calc.healthScore)}
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                    <span className={theme.muted}>Essenciais (Limite 30%)</span>
                    <span className={calc.mandatoryReal > calc.mandatoryIdeal ? 'text-red-500' : 'text-blue-500'}>
                      {formatCurrency(calc.mandatoryReal)} / {formatCurrency(calc.mandatoryIdeal)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 rounded-full ${calc.mandatoryReal > calc.mandatoryIdeal ? 'bg-red-500' : 'bg-blue-500'}`} 
                      style={{ width: `${salary > 0 ? Math.min((calc.mandatoryReal / salary) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                    <span className={theme.muted}>Lifestyle (Limite 20%)</span>
                    <span className={calc.optionalReal > calc.optionalIdeal ? 'text-amber-500' : 'text-zinc-300'}>
                      {formatCurrency(calc.optionalReal)} / {formatCurrency(calc.optionalIdeal)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-zinc-500 transition-all duration-700 rounded-full" 
                      style={{ width: `${salary > 0 ? Math.min((calc.optionalReal / salary) * 100, 100) : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-800/30">
                   <div className="flex justify-between items-center mb-4">
                     <div>
                       <span className="text-sm font-black uppercase text-emerald-500">Aporte Mensal Estimado</span>
                       <p className={`text-[10px] ${theme.muted}`}>Seu veículo para a independência</p>
                     </div>
                     <div className="text-right">
                       <p className="text-2xl font-black text-emerald-500 tracking-tighter">{formatCurrency(calc.assetsReal)}</p>
                       <p className="text-[10px] font-bold opacity-40 italic">Meta: {formatCurrency(calc.assetsIdeal)}</p>
                     </div>
                   </div>
                   <div className="h-4 w-full bg-zinc-800/50 rounded-xl overflow-hidden p-1 shadow-inner border border-zinc-800">
                     <div 
                       className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.3)]" 
                       style={{ width: `${salary > 0 ? Math.min((calc.assetsReal / salary) * 100, 100) : 0}%` }}
                     ></div>
                   </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-[2rem] border ${theme.card}`}>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <ArrowUpRight size={16} className="text-emerald-500" /> Projeção de Património
                  </h3>
                  <p className={`text-[10px] ${theme.muted}`}>Simulação composta de longo prazo</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[9px] font-bold uppercase opacity-50">Wealth</span>
                  </div>
                  <div className="flex items-center gap-1.5 ml-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
                    <span className="text-[9px] font-bold uppercase opacity-50">Alvo FIRE</span>
                  </div>
                </div>
              </div>
              <div className={isFocusMode ? 'h-96' : 'h-64'}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <defs>
                      <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#222' : '#eee'} />
                    <XAxis 
                      dataKey="ano" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fontWeight: 'bold', fill: isDarkMode ? '#555' : '#aaa'}} 
                      interval={Math.floor(projectionData.length / 5)}
                    />
                    <YAxis hide domain={[0, 'auto']} />
                    <RechartsTooltip 
                      cursor={{ stroke: '#10B981', strokeWidth: 1, strokeDasharray: '4 4' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-[#0a0a0b] border border-[#222] p-4 rounded-xl shadow-2xl">
                              <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">{payload[0].payload.ano} de acumulação</p>
                              <p className="text-base font-black text-emerald-500">{formatCurrency(payload[0].value)}</p>
                              <p className="text-[9px] text-blue-500 font-bold uppercase mt-1">Progresso FIRE: {Math.round((payload[0].value / calc.fireNumber) * 100)}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="meta" stroke="#3B82F6" strokeWidth={1} strokeDasharray="6 6" fill="transparent" />
                    <Area type="monotone" dataKey="valor" stroke="#10B981" strokeWidth={3} fill="url(#colorWealth)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;