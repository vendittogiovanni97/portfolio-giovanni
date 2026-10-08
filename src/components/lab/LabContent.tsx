"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassPanel, Chip } from "@/components/ui";
import { useI18n } from "@/i18n";
import {
  Scan,
  FileText,
  Zap,
  Sliders,
  CheckCircle2,
  Play,
  Sparkles,
  Search,
  Check,
} from "lucide-react";

// Mock Documents for OCR Simulator
const sampleDocs = [
  {
    id: "contratto",
    title: "Contratto di Servizio SaaS",
    type: "PDF Document",
    size: "1.2 MB",
    extracted: {
      document_type: "Contratto Commerciale",
      cliente: "TechCorp Italia S.r.l.",
      partita_iva: "IT09876543210",
      importo_totale: "€ 14.500,00",
      scadenza: "2026-12-31",
      firmatario: "Marco Rossi (CEO)",
      stato_verifica: "VALIDATO 100%",
      confidence: "99.8%",
    },
  },
  {
    id: "fattura",
    title: "Fattura Elettronica PA",
    type: "XML / PDF",
    size: "450 KB",
    extracted: {
      document_type: "Fattura Elettronica",
      fornitore: "Agilae Software S.r.l.",
      numero_fattura: "FT-2026/0492",
      imponibile: "€ 8.200,00",
      iva_22: "€ 1.804,00",
      totale_fattura: "€ 10.004,00",
      iban_pagamento: "IT60X0542811101000000123456",
      confidence: "99.6%",
    },
  },
  {
    id: "nagma",
    title: "Consenso Informato Nagma Studio",
    type: "PDF Inserimento",
    size: "820 KB",
    extracted: {
      document_type: "Modulo Privacy & Consenso",
      cliente_studio: "Giuseppe Bianchi",
      codice_fiscale: "BNCGPP95A15F839Z",
      servizio_scelto: "Tatuaggio Microrealismo 15cm",
      consenso_privacy: "ACCETTATO",
      data_trattamento: "2026-08-12",
      confidence: "99.9%",
    },
  },
];

interface GridRecord {
  id: string;
  name: string;
  role: string;
  status: string;
  score: string;
  timestamp: string;
}

// Mock Generator for 10k Records
function generateRecords(count: number): GridRecord[] {
  const names = ["Marco", "Giuseppe", "Elena", "Francesca", "Luca", "Sara", "Davide", "Chiara", "Alessandro", "Martina"];
  const surnames = ["Rossi", "Ferrari", "Russo", "Esposito", "Bianchi", "Romano", "Colombo", "Ricci", "Marino", "Greco"];
  const roles = ["Fullstack Engineer", "Frontend Lead", "Backend Dev", "UI Designer", "Project Manager"];
  const statuses = ["Attivo", "Completato", "In Revisione", "Priorità Alta"];

  return Array.from({ length: count }, (_, i) => ({
    id: `REC-${10000 + i}`,
    name: `${names[i % names.length]} ${surnames[(i * 3) % surnames.length]}`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    score: (85 + (i % 15) + (i % 3) * 0.1).toFixed(1) + "%",
    timestamp: `${(i % 24).toString().padStart(2, "0")}:${((i * 7) % 60).toString().padStart(2, "0")}:00`,
  }));
}

export function LabContent() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<"ocr" | "grid" | "theme">("ocr");

  // OCR Demo State
  const [selectedDoc, setSelectedDoc] = useState(sampleDocs[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // Client-side table demo state
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [records, setRecords] = useState<GridRecord[]>([]);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Theme Inspector State
  const [accentColor, setAccentColor] = useState("#caa456");
  const [blurIntensity, setBlurIntensity] = useState(16);
  const [glowPower, setGlowPower] = useState(25);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1500);
  };

  const handleGenerateRecords = (count: number) => {
    setIsGenerating(true);
    setTimeout(() => {
      const start = performance.now();
      const data = generateRecords(count);
      const end = performance.now();
      setRecords(data);
      setRecordsCount(count);
      setGenerationTime(parseFloat((end - start).toFixed(2)));
      setIsGenerating(false);
    }, 100);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-36 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="mb-12 border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.lab.eyebrow}</span>
            </div>
            <h1 className="[font-family:var(--font-display)] uppercase text-4xl md:text-5xl text-slate-100 font-extrabold tracking-tight">
              {t.lab.title}
            </h1>
            <p className="mt-2 text-slate-400 text-base max-w-xl font-headline font-light">
              {t.lab.subtitle}
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-slate-900/90 p-1.5 rounded-full border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("ocr")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeTab === "ocr"
                  ? "bg-accent text-slate-950 font-bold shadow-[0_0_15px_rgba(202,164,86,0.3)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{t.lab.tabOcr}</span>
            </button>
            <button
              onClick={() => setActiveTab("grid")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeTab === "grid"
                  ? "bg-accent text-slate-950 font-bold shadow-[0_0_15px_rgba(202,164,86,0.3)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.lab.tabGrid}</span>
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all cursor-pointer ${
                activeTab === "theme"
                  ? "bg-accent text-slate-950 font-bold shadow-[0_0_15px_rgba(202,164,86,0.3)]"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.lab.tabTheme}</span>
            </button>
          </div>
        </div>

        {/* DEMO 1: OCR & AI EXTRACTOR SIMULATOR */}
        {activeTab === "ocr" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Document Selection Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-400 font-mono text-3xs uppercase tracking-widest">
                  <span>{t.lab.ocrMockDisclaimer}</span>
                </div>
                <h3 className="font-mono text-xs text-accent uppercase tracking-widest font-semibold mb-2">
                  {t.lab.ocrSelectPrompt}
                </h3>
                {sampleDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      setSelectedDoc(doc);
                      setScanComplete(false);
                      setIsScanning(false);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedDoc.id === doc.id
                        ? "bg-slate-900/90 border-accent/60 shadow-[0_0_20px_rgba(202,164,86,0.15)]"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-accent">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-headline text-sm font-bold text-slate-100">{doc.title}</div>
                        <div className="font-mono text-2xs text-slate-400">{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                    {selectedDoc.id === doc.id && <Check className="w-4 h-4 text-accent" />}
                  </button>
                ))}

                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className="w-full py-3.5 rounded-xl bg-accent text-slate-950 font-mono text-xs font-bold hover:bg-accent-bright transition-all shadow-[0_0_20px_rgba(202,164,86,0.25)] flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isScanning ? t.lab.ocrScanning : t.lab.ocrRunScan}</span>
                </button>
              </div>

              {/* PDF Preview & Laser Scanner */}
              <div className="lg:col-span-4">
                <GlassPanel padding="lg" className="rounded-2xl h-full border border-slate-800 bg-slate-950/80 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
                  
                  {/* Glowing Laser Scan Line */}
                  {isScanning && (
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: [0, 320, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 right-0 h-1 bg-accent shadow-[0_0_20px_#caa456,0_0_40px_#caa456] z-30 pointer-events-none"
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                      <span className="font-mono text-xs text-slate-400">{t.lab.ocrPdfPreview}</span>
                      <Chip variant="status" size="sm">PDF 300 DPI</Chip>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-3 font-mono text-2xs text-slate-400 select-none">
                      <div className="w-2/3 h-3 bg-slate-800 rounded animate-pulse" />
                      <div className="w-full h-2 bg-slate-800/60 rounded" />
                      <div className="w-5/6 h-2 bg-slate-800/60 rounded" />
                      <div className="w-4/6 h-2 bg-slate-800/60 rounded" />
                      <div className="w-full h-12 bg-slate-950/60 border border-slate-800 rounded p-2 text-slate-300">
                        [{t.lab.ocrExtractedTable}: {selectedDoc.title.toUpperCase()}]
                      </div>
                      <div className="w-3/4 h-2 bg-slate-800/60 rounded" />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">{t.lab.ocrStatusLabel}</span>
                    <span className={isScanning ? "text-amber-400 animate-pulse font-bold" : "text-accent font-bold"}>
                      {isScanning ? t.lab.ocrStatusProcessing : t.lab.ocrStatusReady}
                    </span>
                  </div>
                </GlassPanel>
              </div>

              {/* Live JSON Result Column */}
              <div className="lg:col-span-4">
                <GlassPanel padding="lg" className="rounded-2xl h-full border border-slate-800 bg-slate-900/90 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-slate-200 font-bold">{t.lab.ocrJsonResult}</span>
                    </div>
                    <span className={`text-2xs px-2 py-0.5 rounded transition-all ${
                      scanComplete
                        ? "text-accent bg-accent/10 border border-accent/30 font-bold shadow-[0_0_10px_rgba(202,164,86,0.2)]"
                        : isScanning
                        ? "text-amber-400 bg-amber-500/10 border border-amber-400/30 animate-pulse font-bold"
                        : "text-slate-500 bg-slate-950 border border-slate-800 font-mono"
                    }`}>
                      {t.lab.ocrAccuracy}: {scanComplete ? selectedDoc.extracted.confidence : isScanning ? t.lab.ocrAnalyzingShort : "0.0%"}
                    </span>
                  </div>

                  {isScanning ? (
                    <div className="h-[260px] flex flex-col items-center justify-center text-center p-6 bg-slate-950 rounded-xl border border-amber-400/30 text-amber-300">
                      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mb-3" />
                      <p className="font-mono text-xs font-bold animate-pulse">{t.lab.ocrAnalyzingFull}</p>
                    </div>
                  ) : scanComplete ? (
                    <motion.pre
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-slate-300 bg-slate-950 p-4 rounded-xl border border-accent/40 shadow-[0_0_20px_rgba(202,164,86,0.1)] overflow-x-auto text-2xs leading-relaxed max-h-[300px]"
                    >
                      {JSON.stringify(selectedDoc.extracted, null, 2)}
                    </motion.pre>
                  ) : (
                    <div className="h-[260px] flex flex-col items-center justify-center text-center p-6 bg-slate-950 rounded-xl border border-slate-800/80 text-slate-500">
                      <FileText className="w-10 h-10 text-slate-700 mb-3" />
                      <p className="font-mono text-xs text-slate-400 mb-1">{t.lab.ocrNotExtracted}</p>
                      <p className="font-headline text-2xs text-slate-500 font-light max-w-xs">
                        {t.lab.ocrClickToStart.split("{button}")[0]}
                        <span className="text-accent font-semibold">&quot;{t.lab.ocrRunScan}&quot;</span>
                        {t.lab.ocrClickToStart.split("{button}")[1]}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-2xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>{t.lab.ocrReadyForDb}</span>
                  </div>
                </GlassPanel>
              </div>

            </div>
          </motion.div>
        )}

        {/* DEMO 2: CLIENT-SIDE HTML TABLE */}
        {activeTab === "grid" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <GlassPanel padding="lg" className="rounded-2xl border border-slate-800 bg-slate-900/80">
              
              {/* Controls Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
                <div>
                  <h3 className="font-headline text-xl font-bold text-slate-100">{t.lab.gridTitle}</h3>
                  <p className="font-headline text-sm text-slate-400 font-light">{t.lab.gridSubtitle}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleGenerateRecords(1000)}
                    disabled={isGenerating}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs hover:border-slate-500 transition-all cursor-pointer"
                  >
                    {t.lab.gridGenerate1k}
                  </button>
                  <button
                    onClick={() => handleGenerateRecords(10000)}
                    disabled={isGenerating}
                    className="px-4 py-2 rounded-xl bg-accent text-slate-950 font-mono text-xs font-bold hover:bg-accent-bright transition-all shadow-[0_0_15px_rgba(202,164,86,0.3)] cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-slate-950" />
                    <span>{t.lab.gridGenerate10k}</span>
                  </button>
                </div>
              </div>

              {/* Live Metric Stats Bar */}
              {recordsCount > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-2xs text-slate-400">{t.lab.gridRecordsInMemory}</div>
                    <div className="font-mono text-lg font-bold text-accent">{recordsCount.toLocaleString(locale)}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-2xs text-slate-400">{t.lab.gridRenderTime}</div>
                    <div className="font-mono text-lg font-bold text-slate-100">{generationTime} ms</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-mono text-2xs text-slate-400">{t.lab.gridReactiveFilter}</div>
                    <div className="font-mono text-lg font-bold text-slate-100">{t.lab.gridImmediate}</div>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.lab.gridSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 font-mono text-xs text-slate-100 placeholder:text-slate-500 focus:border-accent focus:outline-none transition-all"
                />
              </div>

              {/* HTML table; only the first 50 filtered rows are rendered. */}
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 max-h-[360px] overflow-y-auto">
                {recordsCount === 0 ? (
                  <div className="py-16 text-center text-slate-500 font-mono text-xs">
                    {t.lab.gridEmptyState}
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse font-mono text-2xs">
                    <thead className="bg-slate-900 text-slate-400 sticky top-0 border-b border-slate-800 z-10">
                      <tr>
                        <th className="p-3 font-semibold">{t.lab.gridColId}</th>
                        <th className="p-3 font-semibold">{t.lab.gridColName}</th>
                        <th className="p-3 font-semibold">{t.lab.gridColRole}</th>
                        <th className="p-3 font-semibold">{t.lab.gridColStatus}</th>
                        <th className="p-3 font-semibold">{t.lab.gridColScore}</th>
                        <th className="p-3 font-semibold">{t.lab.gridColTimestamp}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {filteredRecords.slice(0, 50).map((row) => (
                        <tr key={row.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="p-3 font-bold text-accent">{row.id}</td>
                          <td className="p-3 font-medium text-slate-100">{row.name}</td>
                          <td className="p-3 text-slate-400">{row.role}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-3xs">
                              {row.status}
                            </span>
                          </td>
                          <td className="p-3 text-slate-200">{row.score}</td>
                          <td className="p-3 text-slate-500">{row.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* DEMO 3: UI GLASSMORPHISM & THEME INSPECTOR */}
        {activeTab === "theme" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Sliders Control Panel */}
            <div className="lg:col-span-5">
              <GlassPanel padding="lg" className="rounded-2xl border border-slate-800 bg-slate-900/80 space-y-6">
                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-100 mb-1">{t.lab.themeTitle}</h3>
                  <p className="font-headline text-xs text-slate-400 font-light">{t.lab.themeSubtitle}</p>
                </div>

                {/* Accent Color Selector */}
                <div>
                  <label className="font-mono text-xs text-slate-300 mb-2 block">{t.lab.themeAccentColor}</label>
                  <div className="flex gap-3">
                    {[
                      { name: "Lime Neon", hex: "#caa456" },
                      { name: "Cyan Electric", hex: "#00f0ff" },
                      { name: "Purple Future", hex: "#a855f7" },
                      { name: "Emerald Pulse", hex: "#10b981" },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setAccentColor(c.hex)}
                        className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                          accentColor === c.hex ? "scale-110 border-white shadow-lg" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Blur Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs text-slate-300 mb-2">
                    <span>{t.lab.themeBlur}</span>
                    <span className="text-accent">{blurIntensity}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={blurIntensity}
                    onChange={(e) => setBlurIntensity(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>

                {/* Glow Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs text-slate-300 mb-2">
                    <span>{t.lab.themeGlow}</span>
                    <span className="text-accent">{glowPower}px</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={glowPower}
                    onChange={(e) => setGlowPower(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>
              </GlassPanel>
            </div>

            {/* Live Interactive Card Result */}
            <div className="lg:col-span-7 flex items-center justify-center p-8 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden">
              <div
                className="w-full max-w-md p-8 rounded-3xl transition-all duration-300"
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.65)",
                  backdropFilter: `blur(${blurIntensity}px)`,
                  border: `1px solid ${accentColor}40`,
                  boxShadow: `0 0 ${glowPower}px ${accentColor}25`,
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs px-3 py-1 rounded-full font-bold" style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                    {t.lab.themeLivePreviewToken}
                  </span>
                  <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
                </div>

                <h4 className="font-headline text-2xl font-bold text-slate-100 mb-2">
                  {t.lab.themeCardTitle}
                </h4>
                <p className="font-headline text-slate-300 text-sm font-light leading-relaxed mb-6">
                  {t.lab.themeCardDesc}
                </p>

                <button
                  className="w-full py-3 rounded-full font-mono text-xs font-bold text-slate-950 transition-all cursor-pointer shadow-lg"
                  style={{ backgroundColor: accentColor, boxShadow: `0 0 20px ${accentColor}40` }}
                >
                  {t.lab.themeCardButton}
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
