"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      codice_fiscale: "BNCGPP85M01F839A",
      trattamento: "Laser Medical Therapy",
      consenso_firmato: "SI (Dati sensibili)",
      operatore: "Dr.ssa Elena Valenti",
      data_inserimento: "2026-02-14",
      confidence: "99.9%",
    },
  },
];

interface GeneratedRecord {
  id: string;
  name: string;
  role: string;
  status: "ACTIVE" | "PENDING" | "VERIFIED";
  score: number;
  timestamp: string;
}

export function LabContent() {
  const { t, locale } = useI18n();

  // State Tabs
  const [activeTab, setActiveTab] = useState<"ocr" | "grid" | "theme">("ocr");

  // State OCR Demo
  const [selectedDoc, setSelectedDoc] = useState(sampleDocs[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1800);
  };

  // State Virtual Grid Demo
  const [recordsCount, setRecordsCount] = useState<number>(0);
  const [records, setRecords] = useState<GeneratedRecord[]>([]);
  const [generationTime, setGenerationTime] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRecords = (count: number) => {
    setIsGenerating(true);
    const start = performance.now();

    const roles = ["Fullstack Dev", "AI Specialist", "Lead Architect", "Frontend Eng", "Security Auditor"];
    const statuses: GeneratedRecord["status"][] = ["ACTIVE", "PENDING", "VERIFIED"];

    const newRecords: GeneratedRecord[] = Array.from({ length: count }, (_, i) => ({
      id: `USR-${(i + 1).toString().padStart(5, "0")}`,
      name: `Engineer ${i + 1}`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      score: Math.floor(Math.random() * 50) + 50,
      timestamp: new Date(Date.now() - i * 60000).toISOString().split("T")[0],
    }));

    const duration = performance.now() - start;
    setRecords(newRecords);
    setRecordsCount(count);
    setGenerationTime(Math.round(duration));
    setIsGenerating(false);
  };

  // State Theme & Glass Demo
  const [blurIntensity, setBlurIntensity] = useState(16);
  const [glowPower, setGlowPower] = useState(25);
  const [accentColor, setAccentColor] = useState("#181818");

  const filteredRecords = records.filter(
    (r) =>
      r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="mb-12 border-b border-[var(--color-border)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-70 mb-2 block">
              {t.lab.eyebrow}
            </span>
            <h1 className="[font-family:var(--font-display)] uppercase text-5xl sm:text-7xl lg:text-8xl text-[var(--foreground)] tracking-tight leading-[0.88]">
              {t.lab.title}
            </h1>
            <p className="mt-4 text-[var(--foreground)] opacity-75 text-[16px] sm:text-[18px] max-w-xl font-medium leading-relaxed">
              {t.lab.subtitle}
            </p>
          </div>

          {/* Spencer Gabor Tab Switcher Pills */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-border)] shadow-sm self-start md:self-auto shrink-0">
            <button
              onClick={() => setActiveTab("ocr")}
              className={`btn-elastic flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "ocr"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{t.lab.tabOcr}</span>
            </button>
            <button
              onClick={() => setActiveTab("grid")}
              className={`btn-elastic flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "grid"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{t.lab.tabGrid}</span>
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`btn-elastic flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "theme"
                  ? "bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] shadow-sm"
                  : "text-[var(--foreground)] opacity-70 hover:opacity-100"
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
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--foreground)] opacity-80 inline-block mb-1">
                  {t.lab.ocrMockDisclaimer}
                </span>

                <h3 className="font-mono text-xs text-[var(--foreground)] opacity-75 uppercase tracking-wider font-bold mb-2">
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
                    className={`btn-elastic w-full p-4 rounded-3xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedDoc.id === doc.id
                        ? "bg-[var(--color-surface)] border-[var(--color-pill-bg)] shadow-md"
                        : "bg-[var(--color-surface)] border-[var(--color-border)] opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-[var(--color-pill-bg)] text-[var(--color-pill-text)]">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--foreground)]">{doc.title}</div>
                        <div className="font-mono text-xs text-[var(--foreground)] opacity-60">{doc.type} • {doc.size}</div>
                      </div>
                    </div>
                    {selectedDoc.id === doc.id && <Check className="w-4 h-4 text-[var(--foreground)]" />}
                  </button>
                ))}

                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className="btn-elastic w-full py-4 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] font-mono text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4 hover:scale-102 active:scale-98 transition-transform disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isScanning ? t.lab.ocrScanning : t.lab.ocrRunScan}</span>
                </button>
              </div>

              {/* PDF Preview & Laser Scanner */}
              <div className="lg:col-span-4">
                <div
                  className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
                  style={{
                    boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
                  }}
                >
                  {/* Glowing Laser Scan Line */}
                  {isScanning && (
                    <motion.div
                      initial={{ y: 0 }}
                      animate={{ y: [0, 320, 0] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 left-0 right-0 h-1 bg-[var(--foreground)] shadow-[0_0_20px_currentColor] z-30 pointer-events-none"
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-4">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-70">
                        {t.lab.ocrPdfPreview}
                      </span>
                      <span className="font-mono text-[10.5px] px-2.5 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                        PDF 300 DPI
                      </span>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--background)] border border-[var(--color-border)] space-y-3 font-mono text-xs select-none">
                      <div className="w-2/3 h-3 bg-[var(--color-border)] rounded animate-pulse" />
                      <div className="w-full h-2 bg-[var(--color-border)] rounded opacity-60" />
                      <div className="w-5/6 h-2 bg-[var(--color-border)] rounded opacity-60" />
                      <div className="w-4/6 h-2 bg-[var(--color-border)] rounded opacity-60" />
                      <div className="w-full h-12 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-2.5 text-[var(--foreground)] font-semibold">
                        [{t.lab.ocrExtractedTable}: {selectedDoc.title.toUpperCase()}]
                      </div>
                      <div className="w-3/4 h-2 bg-[var(--color-border)] rounded opacity-60" />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex justify-between items-center text-xs font-mono">
                    <span className="text-[var(--foreground)] opacity-60">{t.lab.ocrStatusLabel}</span>
                    <span className={isScanning ? "animate-pulse font-bold text-[var(--foreground)]" : "font-bold text-[var(--foreground)]"}>
                      {isScanning ? t.lab.ocrStatusProcessing : t.lab.ocrStatusReady}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live JSON Result Column */}
              <div className="lg:col-span-4">
                <div
                  className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 font-mono text-xs flex flex-col justify-between min-h-[400px]"
                  style={{
                    boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-bold text-[var(--foreground)]">{t.lab.ocrJsonResult}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--color-border)] text-[var(--foreground)]">
                        {t.lab.ocrAccuracy}: {scanComplete ? selectedDoc.extracted.confidence : isScanning ? t.lab.ocrAnalyzingShort : "0.0%"}
                      </span>
                    </div>

                    {isScanning ? (
                      <div className="h-[240px] flex flex-col items-center justify-center text-center p-6 bg-[var(--background)] rounded-2xl border border-[var(--color-border)] text-[var(--foreground)]">
                        <div className="w-8 h-8 rounded-full border-2 border-[var(--color-pill-bg)] border-t-transparent animate-spin mb-3" />
                        <p className="font-mono text-xs font-bold animate-pulse">{t.lab.ocrAnalyzingFull}</p>
                      </div>
                    ) : scanComplete ? (
                      <motion.pre
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[var(--foreground)] bg-[var(--background)] p-4 rounded-2xl border border-[var(--color-border)] overflow-x-auto text-[11px] leading-relaxed max-h-[260px]"
                      >
                        {JSON.stringify(selectedDoc.extracted, null, 2)}
                      </motion.pre>
                    ) : (
                      <div className="h-[240px] flex flex-col items-center justify-center text-center p-6 bg-[var(--background)] rounded-2xl border border-[var(--color-border)]">
                        <FileText className="w-10 h-10 opacity-30 mb-3" />
                        <p className="font-mono text-xs text-[var(--foreground)] opacity-75 mb-1">{t.lab.ocrNotExtracted}</p>
                        <p className="text-[11px] text-[var(--foreground)] opacity-60 font-medium max-w-xs">
                          {t.lab.ocrClickToStart.split("{button}")[0]}
                          <span className="font-bold">&quot;{t.lab.ocrRunScan}&quot;</span>
                          {t.lab.ocrClickToStart.split("{button}")[1]}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-[var(--foreground)] opacity-75 pt-2 border-t border-[var(--color-border)]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.lab.ocrReadyForDb}</span>
                  </div>
                </div>
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
            <div
              className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-8"
              style={{
                boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
              }}
            >
              {/* Controls Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6 mb-6">
                <div>
                  <h3 className="[font-family:var(--font-display)] uppercase text-3xl text-[var(--foreground)] tracking-tight">
                    {t.lab.gridTitle}
                  </h3>
                  <p className="text-sm text-[var(--foreground)] opacity-75 font-medium mt-1">
                    {t.lab.gridSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleGenerateRecords(1000)}
                    disabled={isGenerating}
                    className="btn-elastic px-4 py-2.5 rounded-full bg-[var(--background)] border-2 border-[var(--color-border)] text-[var(--foreground)] font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:bg-[var(--color-surface)]"
                  >
                    {t.lab.gridGenerate1k}
                  </button>
                  <button
                    onClick={() => handleGenerateRecords(10000)}
                    disabled={isGenerating}
                    className="btn-elastic px-5 py-2.5 rounded-full bg-[var(--color-pill-bg)] text-[var(--color-pill-text)] font-mono text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{t.lab.gridGenerate10k}</span>
                  </button>
                </div>
              </div>

              {/* Live Metric Stats Bar */}
              {recordsCount > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="font-mono text-xs text-[var(--foreground)] opacity-60 uppercase">{t.lab.gridRecordsInMemory}</div>
                    <div className="font-mono text-xl font-bold text-[var(--foreground)] mt-1">{recordsCount.toLocaleString(locale)}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="font-mono text-xs text-[var(--foreground)] opacity-60 uppercase">{t.lab.gridRenderTime}</div>
                    <div className="font-mono text-xl font-bold text-[var(--foreground)] mt-1">{generationTime} ms</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--color-border)]">
                    <div className="font-mono text-xs text-[var(--foreground)] opacity-60 uppercase">{t.lab.gridReactiveFilter}</div>
                    <div className="font-mono text-xl font-bold text-[var(--foreground)] mt-1">{t.lab.gridImmediate}</div>
                  </div>
                </div>
              )}

              {/* Search Bar */}
              <div className="relative mb-5">
                <Search className="absolute left-4 top-3.5 w-4 h-4 opacity-50" />
                <input
                  type="text"
                  placeholder={t.lab.gridSearchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--background)] border-2 border-[var(--color-border)] rounded-2xl pl-11 pr-4 py-3 font-mono text-xs text-[var(--foreground)] placeholder:text-[var(--foreground)] placeholder:opacity-40 focus:border-[var(--color-pill-bg)] focus:outline-none transition-all"
                />
              </div>

              {/* HTML table */}
              <div className="border-2 border-[var(--color-border)] rounded-2xl overflow-hidden bg-[var(--background)] max-h-[360px] overflow-y-auto">
                {recordsCount === 0 ? (
                  <div className="py-16 text-center text-[var(--foreground)] opacity-50 font-mono text-xs">
                    {t.lab.gridEmptyState}
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse font-mono text-xs">
                    <thead className="bg-[var(--color-surface)] text-[var(--foreground)] opacity-80 sticky top-0 border-b border-[var(--color-border)] z-10">
                      <tr>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColId}</th>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColName}</th>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColRole}</th>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColStatus}</th>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColScore}</th>
                        <th className="p-3.5 font-bold uppercase">{t.lab.gridColTimestamp}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {filteredRecords.slice(0, 50).map((row) => (
                        <tr key={row.id} className="hover:bg-[var(--color-surface)] transition-colors">
                          <td className="p-3.5 font-bold text-[var(--foreground)]">{row.id}</td>
                          <td className="p-3.5 font-medium text-[var(--foreground)]">{row.name}</td>
                          <td className="p-3.5 text-[var(--foreground)] opacity-70">{row.role}</td>
                          <td className="p-3.5">
                            <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[10px] font-bold">
                              {row.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-[var(--foreground)] font-semibold">{row.score}</td>
                          <td className="p-3.5 text-[var(--foreground)] opacity-60">{row.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
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
              <div
                className="rounded-3xl bg-[var(--color-surface)] border-2 border-[var(--color-border)] p-6 sm:p-7 space-y-6"
                style={{
                  boxShadow: "var(--shadow-sticker, 0 6px 0 rgba(0,0,0,0.22))",
                }}
              >
                <div>
                  <h3 className="[font-family:var(--font-display)] uppercase text-2xl text-[var(--foreground)] mb-1">
                    {t.lab.themeTitle}
                  </h3>
                  <p className="text-xs text-[var(--foreground)] opacity-70 font-medium">
                    {t.lab.themeSubtitle}
                  </p>
                </div>

                {/* Accent Color Selector */}
                <div>
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--foreground)] opacity-75 mb-2.5 block">
                    {t.lab.themeAccentColor}
                  </label>
                  <div className="flex gap-3">
                    {[
                      { name: "Monochrome Black", hex: "#181818" },
                      { name: "Oat Orange", hex: "#ff7906" },
                      { name: "Electric Blue", hex: "#0779ff" },
                      { name: "Acid Lime", hex: "#d4ff00" },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        onClick={() => setAccentColor(c.hex)}
                        className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                          accentColor === c.hex ? "scale-110 border-[var(--foreground)] shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Blur Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs text-[var(--foreground)] mb-2">
                    <span className="font-bold uppercase">{t.lab.themeBlur}</span>
                    <span>{blurIntensity}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={blurIntensity}
                    onChange={(e) => setBlurIntensity(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[var(--color-pill-bg)]"
                  />
                </div>

                {/* Glow Slider */}
                <div>
                  <div className="flex justify-between font-mono text-xs text-[var(--foreground)] mb-2">
                    <span className="font-bold uppercase">{t.lab.themeGlow}</span>
                    <span>{glowPower}px</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={glowPower}
                    onChange={(e) => setGlowPower(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[var(--color-pill-bg)]"
                  />
                </div>
              </div>
            </div>

            {/* Live Interactive Card Result */}
            <div className="lg:col-span-7 flex items-center justify-center p-8 rounded-3xl bg-[var(--background)] border-2 border-[var(--color-border)] relative overflow-hidden">
              <div
                className="w-full max-w-md p-8 rounded-3xl transition-all duration-300 border-2"
                style={{
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: `blur(${blurIntensity}px)`,
                  borderColor: "var(--color-border)",
                  boxShadow: `0 10px ${glowPower}px rgba(0,0,0,0.15)`,
                }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span
                    className="font-mono text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: accentColor,
                      color: accentColor === "#d4ff00" ? "#181818" : "#ffffff",
                    }}
                  >
                    {t.lab.themeLivePreviewToken}
                  </span>
                  <Sparkles className="w-5 h-5 text-[var(--foreground)] opacity-70" />
                </div>

                <h4 className="[font-family:var(--font-display)] uppercase text-3xl text-[var(--foreground)] mb-2">
                  {t.lab.themeCardTitle}
                </h4>
                <p className="text-sm text-[var(--foreground)] opacity-75 font-medium leading-relaxed mb-6">
                  {t.lab.themeCardDesc}
                </p>

                <button
                  className="btn-elastic w-full py-3.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer transition-transform hover:scale-102 active:scale-98"
                  style={{
                    backgroundColor: accentColor,
                    color: accentColor === "#d4ff00" ? "#181818" : "#ffffff",
                  }}
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
