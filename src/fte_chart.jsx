import React from "react";
import { useMemo, useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Input } from "./components/ui/input";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from "recharts";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

// Data rows: [entity, schoolYear, fte]
const rows = [
  ["Bilingual Education","2021-2022",4],
  ["Bilingual Education","2022-2023",4],
  ["Bilingual Education","2023-2024",4],
  ["Bilingual Education","2024-2025",3.5],
  ["Bilingual Education","2025-2026",3.5],
  ["Business Services","2021-2022",8],
  ["Business Services","2022-2023",9],
  ["Business Services","2023-2024",9],
  ["Business Services","2024-2025",10],
  ["Business Services","2025-2026",10],
  ["Camp Colton","2021-2022",3],
  ["Camp Colton","2022-2023",3],
  ["Camp Colton","2023-2024",3],
  ["Camp Colton","2024-2025",3],
  ["Camp Colton","2025-2026",3],
  ["Coconino High School","2021-2022",125.1748],
  ["Coconino High School","2022-2023",122.2185],
  ["Coconino High School","2023-2024",123.0121],
  ["Coconino High School","2024-2025",128.7994],
  ["Coconino High School","2025-2026",123.8621],
  ["College and Career Development","2021-2022",4],
  ["College and Career Development","2022-2023",3],
  ["College and Career Development","2023-2024",4],
  ["College and Career Development","2024-2025",5],
  ["College and Career Development","2025-2026",4],
  ["Communications and Public Relations","2021-2022",2],
  ["Communications and Public Relations","2022-2023",2],
  ["Communications and Public Relations","2023-2024",2],
  ["Communications and Public Relations","2024-2025",2],
  ["Communications and Public Relations","2025-2026",2],
  ["Cromer Elementary School","2021-2022",41.9186],
  ["Cromer Elementary School","2022-2023",43.8309],
  ["Cromer Elementary School","2023-2024",47.5946],
  ["Cromer Elementary School","2024-2025",46.0682],
  ["Cromer Elementary School","2025-2026",45.0809],
  ["Curriculum and Instruction","2021-2022",5.4],
  ["Curriculum and Instruction","2022-2023",6.4],
  ["Curriculum and Instruction","2023-2024",6.4],
  ["Curriculum and Instruction","2024-2025",7.4],
  ["Curriculum and Instruction","2025-2026",5.65],
  ["DeMiguel Elementary School","2021-2022",52.0924],
  ["DeMiguel Elementary School","2022-2023",52.5985],
  ["DeMiguel Elementary School","2023-2024",58.5359],
  ["DeMiguel Elementary School","2024-2025",59.3486],
  ["DeMiguel Elementary School","2025-2026",54.8299],
  ["Educational Enrichment","2021-2022",9.85],
  ["Educational Enrichment","2022-2023",11.0562],
  ["Educational Enrichment","2023-2024",11.375],
  ["Educational Enrichment","2024-2025",13.4687],
  ["Educational Enrichment","2025-2026",10.1375],
  ["Exceptional Student Services","2021-2022",52.5],
  ["Exceptional Student Services","2022-2023",54.0562],
  ["Exceptional Student Services","2023-2024",57.3062],
  ["Exceptional Student Services","2024-2025",58.3],
  ["Exceptional Student Services","2025-2026",57.6625],
  ["Facilities Maintenance Services","2021-2022",31],
  ["Facilities Maintenance Services","2022-2023",35],
  ["Facilities Maintenance Services","2023-2024",40.75],
  ["Facilities Maintenance Services","2024-2025",40],
  ["Facilities Maintenance Services","2025-2026",35.4],
  ["Flagstaff High School","2021-2022",126.7183],
  ["Flagstaff High School","2022-2023",133.3558],
  ["Flagstaff High School","2023-2024",139.7232],
  ["Flagstaff High School","2024-2025",138.9794],
  ["Flagstaff High School","2025-2026",134.3857],
  ["Food Services","2021-2022",1],
  ["Food Services","2022-2023",1],
  ["Food Services","2023-2024",1],
  ["Food Services","2025-2026",0.9],
  ["Governing Board and Superintendent","2021-2022",2],
  ["Governing Board and Superintendent","2022-2023",2],
  ["Governing Board and Superintendent","2023-2024",2],
  ["Governing Board and Superintendent","2024-2025",2],
  ["Governing Board and Superintendent","2025-2026",3],
  ["Human Resources","2021-2022",8],
  ["Human Resources","2022-2023",8],
  ["Human Resources","2023-2024",10],
  ["Human Resources","2024-2025",8],
  ["Human Resources","2025-2026",9],
  ["Indigenous Education","2021-2022",5.9375],
  ["Indigenous Education","2022-2023",5.9375],
  ["Indigenous Education","2023-2024",1.9375],
  ["Indigenous Education","2024-2025",2],
  ["Indigenous Education","2025-2026",2.25],
  ["Killip Elementary School","2021-2022",43.8123],
  ["Killip Elementary School","2022-2023",47.8558],
  ["Killip Elementary School","2023-2024",52.6184],
  ["Killip Elementary School","2024-2025",54.8619],
  ["Killip Elementary School","2025-2026",50.8935],
  ["Kinsey Elementary School","2021-2022",49.6998],
  ["Kinsey Elementary School","2022-2023",47.9933],
  ["Kinsey Elementary School","2023-2024",43.3807],
  ["Kinsey Elementary School","2024-2025",42.2371],
  ["Kinsey Elementary School","2025-2026",37.3309],
  ["Knoles Elementary School","2021-2022",54.6807],
  ["Knoles Elementary School","2022-2023",53.1368],
  ["Knoles Elementary School","2023-2024",57.8303],
  ["Knoles Elementary School","2024-2025",54.124],
  ["Knoles Elementary School","2025-2026",48.6302],
  ["Leupp Elementary School","2021-2022",27.5872],
  ["Leupp Elementary School","2022-2023",25.2124],
  ["Leupp Elementary School","2023-2024",29.9873],
  ["Leupp Elementary School","2024-2025",28.3561],
  ["Leupp Elementary School","2025-2026",26.256],
  ["Marshall Elementary School","2021-2022",50.7871],
  ["Marshall Elementary School","2022-2023",49.9117],
  ["Marshall Elementary School","2023-2024",48.6557],
  ["Marshall Elementary School","2024-2025",52.2444],
  ["Marshall Elementary School","2025-2026",46.6938],
  ["Mount Elden Middle School","2021-2022",72.1872],
  ["Mount Elden Middle School","2022-2023",66.5372],
  ["Mount Elden Middle School","2023-2024",69.3935],
  ["Mount Elden Middle School","2024-2025",66.1748],
  ["Mount Elden Middle School","2025-2026",63.1187],
  ["Northern Arizona Distance Learning","2021-2022",2],
  ["Northern Arizona Distance Learning","2022-2023",2],
  ["Northern Arizona Distance Learning","2023-2024",2],
  ["Northern Arizona Distance Learning","2024-2025",1],
  ["Northern Arizona Distance Learning","2025-2026",1],
  ["Operations Services","2021-2022",3],
  ["Operations Services","2022-2023",3],
  ["Operations Services","2023-2024",5],
  ["Operations Services","2024-2025",5],
  ["Operations Services","2025-2026",8],
  ["Procurement Services","2021-2022",4],
  ["Procurement Services","2022-2023",4],
  ["Procurement Services","2023-2024",4],
  ["Procurement Services","2024-2025",4],
  ["Procurement Services","2025-2026",4],
  ["Puente de Hozho Elementary School","2021-2022",41.9936],
  ["Puente de Hozho Elementary School","2022-2023",42.3187],
  ["Puente de Hozho Elementary School","2023-2024",43.5438],
  ["Puente de Hozho Elementary School","2024-2025",45.1436],
  ["Puente de Hozho Elementary School","2025-2026",42.9874],
  ["Research and Assessment Services","2021-2022",2],
  ["Research and Assessment Services","2022-2023",1],
  ["Research and Assessment Services","2023-2024",1],
  ["Research and Assessment Services","2024-2025",1],
  ["Research and Assessment Services","2025-2026",1],
  ["Sechrist Elementary School","2021-2022",42.8558],
  ["Sechrist Elementary School","2022-2023",44.8432],
  ["Sechrist Elementary School","2023-2024",47.6244],
  ["Sechrist Elementary School","2024-2025",47.1683],
  ["Sechrist Elementary School","2025-2026",42.0494],
  ["Sinagua Middle School","2021-2022",89.7171],
  ["Sinagua Middle School","2022-2023",91.5743],
  ["Sinagua Middle School","2023-2024",96.9931],
  ["Sinagua Middle School","2024-2025",96.2493],
  ["Sinagua Middle School","2025-2026",94.3868],
  ["Student Support Services","2021-2022",9],
  ["Student Support Services","2022-2023",7],
  ["Student Support Services","2023-2024",8.875],
  ["Student Support Services","2024-2025",7],
  ["Student Support Services","2025-2026",6],
  ["Student Transportation","2021-2022",81.425],
  ["Student Transportation","2022-2023",92.375],
  ["Student Transportation","2023-2024",102.625],
  ["Student Transportation","2024-2025",90.75],
  ["Student Transportation","2025-2026",77.875],
  ["Summit High School","2021-2022",18.2625],
  ["Summit High School","2022-2023",18.85],
  ["Summit High School","2023-2024",18.55],
  ["Summit High School","2024-2025",16.6],
  ["Summit High School","2025-2026",15.0375],
  ["Technology Services","2021-2022",18],
  ["Technology Services","2022-2023",19],
  ["Technology Services","2023-2024",22],
  ["Technology Services","2024-2025",21],
  ["Technology Services","2025-2026",19],
  ["Thomas Elementary School","2021-2022",41.9061],
  ["Thomas Elementary School","2022-2023",44.2622],
  ["Thomas Elementary School","2023-2024",49.6245],
  ["Thomas Elementary School","2024-2025",47.9932],
  ["Thomas Elementary School","2025-2026",44.9182],
];

const YEARS = ["2021-2022", "2022-2023", "2023-2024", "2024-2025", "2025-2026"];

function groupByEntity(data) {
  const map = new Map();
  for (const [entity, year, fte] of data) {
    if (!map.has(entity)) map.set(entity, { entity, series: [] });
    map.get(entity).series.push({ year, fte });
  }
  // Ensure years are ordered and missing years are filled as nulls (optional: keep sparse?)
  for (const v of map.values()) {
    v.series.sort((a, b) => YEARS.indexOf(a.year) - YEARS.indexOf(b.year));
  }
  return map;
}

function computeYoY(series) {
  const out = [];
  for (let i = 0; i < series.length; i++) {
    if (i === 0) out.push({ year: series[i].year, delta: 0 });
    else out.push({ year: series[i].year, delta: Number((series[i].fte - series[i - 1].fte).toFixed(3)) });
  }
  return out;
}

function computeSinceBase(series) {
  if (!series.length) return [];
  const base = series[0].fte;
  return series.map((p) => ({ year: p.year, delta: Number((p.fte - base).toFixed(3)) }));
}

const formatter = new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 });

export default function FTEDashboard() {
  const grouped = useMemo(() => groupByEntity(rows), []);
  const entities = useMemo(() => Array.from(grouped.keys()).sort(), [grouped]);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query) return entities;
    const q = query.toLowerCase();
    return entities.filter((e) => e.toLowerCase().includes(q));
  }, [query, entities]);
  const [selected, setSelected] = useState(filtered[0] || entities[0] || "");
  const [deltaMode, setDeltaMode] = useState("yoy");

  const selectedSeries = grouped.get(selected)?.series || [];
  const yoy = computeYoY(selectedSeries);
  const base = computeSinceBase(selectedSeries);

  // Leaderboard: total change since 2021-2022
  const leaderboard = useMemo(() => {
    const items = [];
    grouped.forEach(({ entity, series }) => {
      const start = series.find((s) => s.year === "2021-2022")?.fte || series[0]?.fte || 0;
      const end = series.find((s) => s.year === "2025-2026")?.fte || series[series.length - 1]?.fte || 0;
      const change = Number((end - start).toFixed(3));
      const pct = start !== 0 ? Number(((change / start) * 100).toFixed(2)) : 0;
      items.push({ entity, start, end, change, pct });
    });
    return items.sort((a, b) => b.change - a.change);
  }, [grouped]);

  return (
    <div className="w-full p-6 space-y-6">
      <motion.h1 className="text-2xl md:text-3xl font-semibold" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        FTE Trends by Department & School (2021–2026)
      </motion.h1>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-4 md:p-6 grid gap-3 md:gap-4 md:grid-cols-3 items-end">
          <div className="md:col-span-1 space-y-2">
            <label className="text-sm text-muted-foreground">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter entities…" className="pl-8" />
            </div>
          </div>

          <div className="md:col-span-1 space-y-2">
            <label className="text-sm text-muted-foreground">Entity</label>
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose entity" />
              </SelectTrigger>
              <SelectContent className="max-h-80 bg-card">
                {filtered.map((e) => (
                  <SelectItem key={e} value={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-1 flex items-end gap-2">
            <div className="space-y-2 w-full">
              <label className="text-sm text-muted-foreground">Show change</label>
              <div className="flex gap-2">
                <Button variant={deltaMode === "yoy" ? "default" : "outline"} onClick={() => setDeltaMode("yoy")} className="rounded-2xl">
                  Year over Year
                </Button>
                <Button variant={deltaMode === "base" ? "default" : "outline"} onClick={() => setDeltaMode("base")} className="rounded-2xl">
                  Since 2021–22
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardContent className="p-4 md:p-6 space-y-2">
            <h2 className="text-lg font-medium">{selected || "(select an entity)"} — FTE by Year</h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedSeries} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => formatter.format(v)} allowDecimals />
                  <Tooltip formatter={(v) => formatter.format(v)} />
                  <Legend />
                  <Line type="monotone" dataKey="fte" name="FTE" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4 md:p-6 space-y-2">
            <h2 className="text-lg font-medium">{selected || "(select an entity)"} — {deltaMode === "yoy" ? "Year-over-Year Change" : "Change Since 2021–22"}</h2>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deltaMode === "yoy" ? yoy : base} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(v) => formatter.format(v)} allowDecimals />
                  <Tooltip formatter={(v) => formatter.format(v)} />
                  <Legend />
                  <ReferenceLine y={0} strokeDasharray="4 4" />
                  <Bar dataKey="delta" name="Δ FTE" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="p-4 md:p-6 space-y-4">
          <h2 className="text-lg font-medium">Biggest Gains/Losses Since 2021–22</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leaderboard.slice(0, 12)} layout="vertical" margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => formatter.format(v)} allowDecimals />
                  <YAxis type="category" dataKey="entity" width={180} />
                  <Tooltip formatter={(v) => formatter.format(v)} />
                  <Legend />
                  <ReferenceLine x={0} strokeDasharray="4 4" />
                  <Bar dataKey="change" name="Δ FTE since 2021–22" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[...leaderboard].reverse().slice(0, 12)} layout="vertical" margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tickFormatter={(v) => formatter.format(v)} allowDecimals />
                  <YAxis type="category" dataKey="entity" width={180} />
                  <Tooltip formatter={(v) => formatter.format(v)} />
                  <Legend />
                  <ReferenceLine x={0} strokeDasharray="4 4" />
                  <Bar dataKey="change" name="Δ FTE since 2021–22" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Tip: use the search box to quickly jump to a school or department, then toggle between Year-over-Year or Since 2021–22 deltas.</p>
        </CardContent>
      </Card>
    </div>
  );
}
