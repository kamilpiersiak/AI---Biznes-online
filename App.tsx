
import React, { useState, useCallback, useMemo } from 'react';
import { AppState, Parameter, Package } from './types';
import { DEFAULT_PARAMETERS, PACKAGES, PROMPT_TEMPLATE } from './constants';
import { generateBusinessPortrait } from './geminiService';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  Download, 
  ChevronRight, 
  Settings2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Image as ImageIcon
} from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generatedImage: null,
    isGenerating: false,
    activePackage: 'business',
    parameters: DEFAULT_PARAMETERS,
  });
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, originalImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePackageSelect = (pkgId: string) => {
    const pkg = PACKAGES.find(p => p.id === pkgId);
    if (!pkg) return;

    const newParams = state.parameters.map(param => ({
      ...param,
      value: pkg.defaultValues[param.id] || param.value
    }));

    setState(prev => ({
      ...prev,
      activePackage: pkgId,
      parameters: newParams
    }));
  };

  const handleParamChange = (id: string, value: string) => {
    setState(prev => ({
      ...prev,
      parameters: prev.parameters.map(p => p.id === id ? { ...p, value } : p)
    }));
  };

  const constructPrompt = () => {
    let finalPrompt = PROMPT_TEMPLATE;
    state.parameters.forEach(param => {
      finalPrompt = finalPrompt.replace(`[${param.id}]`, param.value);
    });
    return finalPrompt;
  };

  const handleGenerate = async () => {
    if (!state.originalImage) {
      setError("Proszę najpierw wgrać zdjęcie.");
      return;
    }

    setError(null);
    setState(prev => ({ ...prev, isGenerating: true }));

    try {
      const prompt = constructPrompt();
      const result = await generateBusinessPortrait(state.originalImage, prompt);
      setState(prev => ({ ...prev, generatedImage: result, isGenerating: false }));
    } catch (err: any) {
      setError("Wystąpił błąd podczas generowania zdjęcia. Spróbuj ponownie.");
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const downloadImage = () => {
    if (!state.generatedImage) return;
    const link = document.createElement('a');
    link.href = state.generatedImage;
    link.download = `business_portrait_${state.activePackage}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">AI Business Studio</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline-block text-sm text-slate-500 font-medium">Model: Nano Banana (Gemini 2.5)</span>
            <button 
              onClick={handleGenerate}
              disabled={state.isGenerating || !state.originalImage}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center space-x-2 shadow-sm"
            >
              {state.isGenerating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              <span>{state.isGenerating ? 'Generowanie...' : 'Generuj Portret'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input & Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                Twoje Zdjęcie
              </h2>
              
              <div className="relative aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center transition-all hover:border-indigo-300">
                {state.originalImage ? (
                  <img src={state.originalImage} alt="Original" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">Wgraj zdjęcie źródłowe</p>
                    <p className="text-slate-400 text-sm mt-1">Najlepiej portret z dobrą widocznością twarzy</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Wynik AI
              </h2>
              
              <div className="relative aspect-square rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center">
                {state.isGenerating ? (
                  <div className="w-full h-full shimmer flex items-center justify-center">
                    <div className="text-center bg-white/80 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
                      <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mx-auto mb-3" />
                      <p className="text-indigo-900 font-bold">Magia w toku...</p>
                      <p className="text-slate-500 text-sm">Tworzymy Twój profesjonalny wizerunek</p>
                    </div>
                  </div>
                ) : state.generatedImage ? (
                  <>
                    <img src={state.generatedImage} alt="Generated" className="w-full h-full object-cover" />
                    <button 
                      onClick={downloadImage}
                      className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-xl shadow-lg transition-all border border-slate-100 flex items-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span className="font-semibold text-sm">Pobierz</span>
                    </button>
                  </>
                ) : (
                  <div className="text-center p-8 text-slate-400">
                    <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-6 h-6" />
                    </div>
                    <p>Skonfiguruj parametry i kliknij generuj</p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Configuration */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Packages */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4">Wybierz Pakiet Docelowy</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PACKAGES.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      state.activePackage === pkg.id 
                      ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-500/20' 
                      : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{pkg.icon}</div>
                    <div className={`text-xs font-bold leading-tight ${state.activePackage === pkg.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {pkg.name}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4 px-1 italic">
                {PACKAGES.find(p => p.id === state.activePackage)?.description}
              </p>
            </div>

            {/* Parameters Grid */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-indigo-600" />
                  Parametry Personalizacji (20)
                </h2>
                <span className="bg-slate-100 text-slate-500 text-[10px] uppercase tracking-widest font-bold py-1 px-3 rounded-full">
                  Ultra Detail Config
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {state.parameters.map((param) => (
                  <div key={param.id} className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-tight ml-1">
                      {param.label}
                    </label>
                    <input
                      type="text"
                      value={param.value}
                      placeholder={param.placeholder}
                      onChange={(e) => handleParamChange(param.id, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Prompt Preview (Debug/Transparency) */}
            <details className="bg-slate-900 rounded-2xl overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer text-slate-300 font-bold text-sm flex items-center justify-between list-none">
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                  Podgląd Promptu AI
                </div>
                <span className="text-slate-500 text-[10px]">Zaawansowane</span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <pre className="text-xs text-emerald-400/80 font-mono whitespace-pre-wrap leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                  {constructPrompt()}
                </pre>
              </div>
            </details>
          </div>
        </div>
      </main>

      {/* Footer / CTA Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-3 px-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">© 2024 Professional AI Business Studio. Powered by Gemini 2.5.</p>
          <div className="flex space-x-2">
            <button 
              onClick={() => setState(prev => ({ ...prev, parameters: DEFAULT_PARAMETERS }))}
              className="text-slate-600 hover:text-slate-900 text-xs font-bold px-4 py-2"
            >
              Resetuj wszystko
            </button>
            <button 
              onClick={handleGenerate}
              disabled={state.isGenerating || !state.originalImage}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              {state.isGenerating ? 'Trwa generowanie...' : 'Generuj teraz'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
