import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Sparkles, Loader2, Type, Trash2, Image as ImageIcon,
  Square, Circle as CircleIcon, Star, Upload, Copy, ArrowUp, ArrowDown,
  RotateCw, Wand2, Check, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";

/* ──────────────── Catalog ──────────────── */
type CategoryId = "men" | "women" | "kids" | "accessories";
type GarmentVariant =
  | "tshirt" | "tshirt-full" | "polo" | "tshirt-oversized"
  | "hoodie" | "hoodie-oversized" | "sweatshirt"
  | "croptop" | "crophoodie" | "croptank" | "tshirt-women"
  | "tshirt-kids" | "tshirt-toddler"
  | "mask" | "mug" | "notebook" | "coaster" | "mousepad" | "poster" | "popgrip";

interface Product { id: string; name: string; variant: GarmentVariant; isNew?: boolean; }
interface Category { id: CategoryId; name: string; emoji: string; products: Product[]; }

const CATEGORIES: Category[] = [
  {
    id: "men", name: "Men's Clothing", emoji: "👕",
    products: [
      { id: "m-half", name: "Half Sleeve Round Neck T-Shirt", variant: "tshirt" },
      { id: "m-full", name: "Full Sleeve Round Neck T-Shirt", variant: "tshirt-full" },
      { id: "m-hoodie", name: "Hoodies", variant: "hoodie" },
      { id: "m-sweat", name: "Sweatshirts", variant: "sweatshirt" },
      { id: "m-polo", name: "Polo T-shirts", variant: "polo" },
      { id: "m-over-t", name: "Oversized Tshirts", variant: "tshirt-oversized" },
      { id: "m-over-h", name: "Oversized Hoodies", variant: "hoodie-oversized", isNew: true },
    ],
  },
  {
    id: "women", name: "Women's Clothing", emoji: "👚",
    products: [
      { id: "w-half", name: "Women's Half Sleeve Round Neck T-Shirt", variant: "tshirt-women" },
      { id: "w-crop-top", name: "Crop Tops", variant: "croptop" },
      { id: "w-crop-h", name: "Crop Hoodies", variant: "crophoodie" },
      { id: "w-crop-tank", name: "Crop Tank Top", variant: "croptank" },
    ],
  },
  {
    id: "kids", name: "Kids", emoji: "🧒",
    products: [
      { id: "k-toddler", name: "Toddler Half Sleeve Round Neck T-Shirt", variant: "tshirt-toddler" },
      { id: "k-half", name: "Kids Half Sleeve Round Neck T-Shirt", variant: "tshirt-kids" },
    ],
  },
  {
    id: "accessories", name: "Accessories", emoji: "🎒",
    products: [
      { id: "a-mask", name: "Plain Face Mask", variant: "mask" },
      { id: "a-mug", name: "Mugs", variant: "mug" },
      { id: "a-notebook", name: "Notebooks", variant: "notebook" },
      { id: "a-coaster", name: "Coasters", variant: "coaster", isNew: true },
      { id: "a-mousepad", name: "Mouse Pads", variant: "mousepad" },
      { id: "a-poster", name: "Posters", variant: "poster", isNew: true },
      { id: "a-popgrip", name: "Pop Grips", variant: "popgrip" },
    ],
  },
];

/* ──────────────── Visuals ──────────────── */
type Side = "front" | "back";
type LayerKind = "text" | "image" | "shape";
type ShapeKind = "rect" | "circle" | "star";

interface BaseLayer { id: string; kind: LayerKind; x: number; y: number; w: number; rotation: number; }
interface TextLayer extends BaseLayer { kind: "text"; text: string; color: string; size: number; font: string; weight: number; }
interface ImageLayer extends BaseLayer { kind: "image"; src: string; ai?: boolean; name?: string; }
interface ShapeLayer extends BaseLayer { kind: "shape"; shape: ShapeKind; color: string; opacity: number; }
type Layer = TextLayer | ImageLayer | ShapeLayer;
interface SideState { bgColor: string; layers: Layer[]; }
const initialSide = (): SideState => ({ bgColor: "#ffffff", layers: [] });

const COLORS: { name: string; hex: string }[] = [
  { name: "White", hex: "#ffffff" }, { name: "Black", hex: "#111111" },
  { name: "Cream", hex: "#f4ead5" }, { name: "Maroon", hex: "#5a1a1a" },
  { name: "Yellow", hex: "#f4dc52" }, { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Brick Red", hex: "#a0392c" }, { name: "Coffee", hex: "#6b4226" },
  { name: "Mustard", hex: "#e0a514" }, { name: "Lavender", hex: "#b8a8d6" },
  { name: "Off White", hex: "#f3eee3" }, { name: "Baby Pink", hex: "#f5c8d4" },
  { name: "Mint", hex: "#9fe3a3" }, { name: "Wine", hex: "#5e1726" },
  { name: "Grey", hex: "#bcbcbc" }, { name: "Beige", hex: "#d6a774" },
  { name: "Navy", hex: "#1c2a4a" }, { name: "Bottle Green", hex: "#1e3a2b" },
  { name: "Orange", hex: "#e87622" }, { name: "Purple", hex: "#3a1d6e" },
  { name: "Red", hex: "#d31e1e" }, { name: "Royal Blue", hex: "#1d3fa0" },
  { name: "Sky Blue", hex: "#3eb6e8" }, { name: "Indigo", hex: "#2c3a64" },
  { name: "Powder Blue", hex: "#bcd8e6" },
];
const SIZES_APPAREL = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const SIZES_KIDS = ["1-2y", "3-4y", "5-6y", "7-8y", "9-10y", "11-12y"];
const FONTS = ["Inter", "Georgia", "Impact", "Courier New", "Comic Sans MS", "Times New Roman", "Verdana"];

/* Print area as percent of canvas: {left, top, width, height} */
const PRINT_AREAS: Record<GarmentVariant, { l: number; t: number; w: number; h: number }> = {
  "tshirt":            { l: 32, t: 30, w: 36, h: 38 },
  "tshirt-full":       { l: 32, t: 30, w: 36, h: 38 },
  "tshirt-oversized":  { l: 30, t: 28, w: 40, h: 42 },
  "tshirt-women":      { l: 34, t: 30, w: 32, h: 36 },
  "tshirt-kids":       { l: 34, t: 30, w: 32, h: 32 },
  "tshirt-toddler":    { l: 36, t: 32, w: 28, h: 28 },
  "polo":              { l: 32, t: 34, w: 36, h: 34 },
  "hoodie":            { l: 32, t: 38, w: 36, h: 36 },
  "hoodie-oversized":  { l: 30, t: 36, w: 40, h: 40 },
  "crophoodie":        { l: 33, t: 36, w: 34, h: 26 },
  "sweatshirt":        { l: 32, t: 32, w: 36, h: 36 },
  "croptop":           { l: 34, t: 32, w: 32, h: 22 },
  "croptank":          { l: 36, t: 28, w: 28, h: 24 },
  "mask":              { l: 22, t: 32, w: 56, h: 30 },
  "mug":               { l: 26, t: 30, w: 48, h: 40 },
  "notebook":          { l: 22, t: 22, w: 56, h: 56 },
  "coaster":           { l: 25, t: 25, w: 50, h: 50 },
  "mousepad":          { l: 18, t: 28, w: 64, h: 44 },
  "poster":            { l: 18, t: 14, w: 64, h: 72 },
  "popgrip":           { l: 36, t: 36, w: 28, h: 28 },
};

/* Garment SVG renderer (5 base shapes mapped from variants) */
function GarmentSVG({ variant, color, side }: { variant: GarmentVariant; color: string; side: Side }) {
  const stroke = "rgba(0,0,0,0.18)";
  const sw = 1.5;
  const isShortSleeve = ["tshirt","tshirt-oversized","tshirt-women","tshirt-kids","tshirt-toddler","polo"].includes(variant);
  const isFullSleeve = variant === "tshirt-full" || variant === "sweatshirt";
  const isHoodie = variant === "hoodie" || variant === "hoodie-oversized" || variant === "crophoodie";
  const isCropTop = variant === "croptop";
  const isCropTank = variant === "croptank";
  const isMask = variant === "mask";
  const isMug = variant === "mug";
  const isNotebook = variant === "notebook";
  const isCoaster = variant === "coaster";
  const isMousepad = variant === "mousepad";
  const isPoster = variant === "poster";
  const isPopgrip = variant === "popgrip";

  if (isMug) {
    return (
      <svg viewBox="0 0 400 480" className="w-full h-full">
        <rect x="80" y="120" width="220" height="240" rx="14" fill={color} stroke={stroke} strokeWidth={sw}/>
        <path d="M300 170 q60 0 60 60 t-60 60" fill="none" stroke={stroke} strokeWidth={sw*2}/>
      </svg>
    );
  }
  if (isNotebook || isCoaster || isPoster || isMousepad || isPopgrip) {
    const w = isPoster ? 240 : isMousepad ? 300 : isPopgrip ? 180 : 240;
    const h = isPoster ? 340 : isMousepad ? 200 : isPopgrip ? 180 : 280;
    const rx = isPopgrip || isCoaster ? w/2 : 14;
    return (
      <svg viewBox="0 0 400 480" className="w-full h-full">
        <rect x={(400-w)/2} y={(480-h)/2} width={w} height={h} rx={rx} fill={color} stroke={stroke} strokeWidth={sw}/>
      </svg>
    );
  }
  if (isMask) {
    return (
      <svg viewBox="0 0 400 480" className="w-full h-full">
        <path d="M70 180 Q200 130 330 180 L320 320 Q200 380 80 320 Z" fill={color} stroke={stroke} strokeWidth={sw}/>
        <path d="M70 180 q-30 60 0 140" fill="none" stroke={stroke} strokeWidth={sw}/>
        <path d="M330 180 q30 60 0 140" fill="none" stroke={stroke} strokeWidth={sw}/>
      </svg>
    );
  }

  // Apparel base body shape
  const oversized = variant === "tshirt-oversized" || variant === "hoodie-oversized";
  const cropBottom = isCropTop ? 280 : isCropTank ? 280 : 460;
  const sleeveSpread = oversized ? 60 : 40;

  // Sleeves
  let sleeves: JSX.Element | null = null;
  if (isFullSleeve) {
    sleeves = (
      <>
        <path d={`M40 130 L10 ${cropBottom-120} L70 ${cropBottom-100} L90 200 Z`} fill={color} stroke={stroke} strokeWidth={sw}/>
        <path d={`M360 130 L390 ${cropBottom-120} L330 ${cropBottom-100} L310 200 Z`} fill={color} stroke={stroke} strokeWidth={sw}/>
      </>
    );
  } else if (isCropTank) {
    sleeves = null; // straps only
  }

  // Neckline
  let neck: JSX.Element;
  if (isHoodie && side === "front") {
    neck = <path d="M150 80 Q200 130 250 80 L240 60 Q200 90 160 60 Z" fill={color} stroke={stroke} strokeWidth={sw}/>;
  } else if (isHoodie && side === "back") {
    // hood
    neck = <path d="M130 90 Q200 20 270 90 Q260 130 200 130 Q140 130 130 90 Z" fill={color} stroke={stroke} strokeWidth={sw}/>;
  } else if (variant === "polo") {
    neck = (
      <>
        <path d="M170 80 L200 150 L230 80" fill="none" stroke={stroke} strokeWidth={sw}/>
        <path d="M180 80 L200 130 L220 80" fill={color} stroke={stroke} strokeWidth={sw}/>
      </>
    );
  } else if (isCropTank) {
    neck = (
      <>
        <path d="M150 60 L170 220" fill="none" stroke={stroke} strokeWidth={sw*2}/>
        <path d="M250 60 L230 220" fill="none" stroke={stroke} strokeWidth={sw*2}/>
      </>
    );
  } else {
    neck = <path d="M140 70 Q200 120 260 70" fill="none" stroke={stroke} strokeWidth={sw}/>;
  }

  // Body
  const bodyD = isCropTank
    ? `M170 220 L150 ${cropBottom-180} L250 ${cropBottom-180} L230 220 Z`
    : oversized
    ? `M70 80 L20 130 L0 230 L60 250 L60 ${cropBottom} L340 ${cropBottom} L340 250 L400 230 L380 130 L330 80 L260 70 Q200 120 140 70 Z`
    : `M80 80 L40 130 L20 220 L70 240 L70 ${cropBottom} L330 ${cropBottom} L330 240 L380 220 L360 130 L320 80 L260 70 Q200 120 140 70 Z`;

  return (
    <svg viewBox="0 0 400 480" className="w-full h-full">
      <defs><filter id="gsh"><feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.12"/></filter></defs>
      <g filter="url(#gsh)">
        {!isCropTank && <path d={bodyD} fill={color} stroke={stroke} strokeWidth={sw}/>}
        {isCropTank && <path d={bodyD} fill={color} stroke={stroke} strokeWidth={sw}/>}
        {sleeves}
        {neck}
        {isHoodie && side === "front" && (
          <>
            <path d="M180 240 L150 380 L160 400 L240 400 L250 380 L220 240" fill={color} stroke={stroke} strokeWidth={sw} opacity="0.85"/>
            <line x1="200" y1="100" x2="200" y2="240" stroke={stroke} strokeWidth={sw}/>
          </>
        )}
      </g>
    </svg>
  );
}

function ShapeSVG({ shape, color, opacity }: { shape: ShapeKind; color: string; opacity: number }) {
  const common = { fill: color, opacity };
  if (shape === "rect") return <svg viewBox="0 0 100 100" className="w-full h-full"><rect width="100" height="100" rx="6" {...common}/></svg>;
  if (shape === "circle") return <svg viewBox="0 0 100 100" className="w-full h-full"><circle cx="50" cy="50" r="50" {...common}/></svg>;
  return <svg viewBox="0 0 100 100" className="w-full h-full"><polygon points="50,2 61,38 98,38 68,60 79,96 50,74 21,96 32,60 2,38 39,38" {...common}/></svg>;
}

/* ──────────────── Component ──────────────── */
type Step = "category" | "product" | "design";

const Customizer = () => {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<Category | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const [side, setSide] = useState<Side>("front");
  const [size, setSize] = useState("M");
  const [front, setFront] = useState<SideState>(initialSide());
  const [back, setBack] = useState<SideState>(initialSide());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [hoverColor, setHoverColor] = useState<{ name: string; hex: string } | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const printAreaRef = useRef<HTMLDivElement>(null);
  const frontCaptureRef = useRef<HTMLDivElement>(null);
  const backCaptureRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const variant = product?.variant ?? "tshirt";
  const printArea = PRINT_AREAS[variant];
  const sizeList = ["tshirt-kids","tshirt-toddler"].includes(variant) ? SIZES_KIDS : SIZES_APPAREL;

  const current = side === "front" ? front : back;
  const setCurrent = (u: (s: SideState) => SideState) => side === "front" ? setFront(u) : setBack(u);
  const active = current.layers.find((l) => l.id === activeId) || null;
  const currentColorName = COLORS.find((c) => c.hex.toLowerCase() === current.bgColor.toLowerCase())?.name || "Custom";
  const allLayers = [...front.layers, ...back.layers];

  const setBothColor = (hex: string) => {
    setFront((s) => ({ ...s, bgColor: hex }));
    setBack((s) => ({ ...s, bgColor: hex }));
  };

  const addLayer = (l: Layer) => {
    setCurrent((s) => ({ ...s, layers: [...s.layers, l] }));
    setActiveId(l.id);
  };
  const updateLayer = (id: string, patch: Partial<Layer>) =>
    setCurrent((s) => ({ ...s, layers: s.layers.map((l) => l.id === id ? { ...l, ...patch } as Layer : l) }));
  const removeLayer = (id: string) => {
    setFront((s) => ({ ...s, layers: s.layers.filter((l) => l.id !== id) }));
    setBack((s) => ({ ...s, layers: s.layers.filter((l) => l.id !== id) }));
    if (activeId === id) setActiveId(null);
  };
  const duplicateLayer = (id: string) => {
    const l = current.layers.find((x) => x.id === id);
    if (!l) return;
    addLayer({ ...l, id: crypto.randomUUID(), x: Math.min(95, l.x + 5), y: Math.min(95, l.y + 5) } as Layer);
  };
  const moveLayer = (id: string, dir: 1 | -1) => {
    setCurrent((s) => {
      const i = s.layers.findIndex((l) => l.id === id);
      if (i < 0) return s;
      const j = i + dir;
      if (j < 0 || j >= s.layers.length) return s;
      const arr = [...s.layers]; [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...s, layers: arr };
    });
  };

  const addText = () => addLayer({
    id: crypto.randomUUID(), kind: "text", text: "Your text",
    x: 50, y: 50, w: 70, rotation: 0,
    color: "#111111", size: 24, font: "Inter", weight: 700,
  });
  const addShape = (shape: ShapeKind) => addLayer({
    id: crypto.randomUUID(), kind: "shape", shape,
    x: 50, y: 50, w: 50, rotation: 0, color: "#2563eb", opacity: 1,
  });

  const onUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please use an image under 5MB.", variant: "destructive" });
      return;
    }
    setUploadedFiles((prev) => [...prev, file]);
    const reader = new FileReader();
    reader.onload = () => {
      addLayer({
        id: crypto.randomUUID(), kind: "image", src: String(reader.result),
        name: file.name, x: 50, y: 50, w: 80, rotation: 0,
      });
    };
    reader.readAsDataURL(file);
  };

  const startDrag = (e: React.PointerEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    setActiveId(id);
    const rect = printAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const move = (ev: PointerEvent) => {
      const x = ((ev.clientX - rect.left) / rect.width) * 100;
      const y = ((ev.clientY - rect.top) / rect.height) * 100;
      updateLayer(id, { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const startResize = (e: React.PointerEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    const layer = current.layers.find((l) => l.id === id);
    const rect = printAreaRef.current?.getBoundingClientRect();
    if (!layer || !rect) return;
    const cx = rect.left + (layer.x / 100) * rect.width;
    const cy = rect.top + (layer.y / 100) * rect.height;
    const startDist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const startW = layer.w;
    const move = (ev: PointerEvent) => {
      const d = Math.hypot(ev.clientX - cx, ev.clientY - cy);
      const ratio = d / Math.max(1, startDist);
      const nw = Math.max(10, Math.min(100, startW * ratio));
      if (layer.kind === "text") updateLayer(id, { w: nw, size: Math.max(10, Math.min(120, (layer as TextLayer).size * ratio)) });
      else updateLayer(id, { w: nw });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };
  const startRotate = (e: React.PointerEvent, id: string) => {
    e.preventDefault(); e.stopPropagation();
    const layer = current.layers.find((l) => l.id === id);
    const rect = printAreaRef.current?.getBoundingClientRect();
    if (!layer || !rect) return;
    const cx = rect.left + (layer.x / 100) * rect.width;
    const cy = rect.top + (layer.y / 100) * rect.height;
    const move = (ev: PointerEvent) => {
      const angle = (Math.atan2(ev.clientY - cy, ev.clientX - cx) * 180) / Math.PI + 90;
      updateLayer(id, { rotation: Math.round(angle) });
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeId) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Delete" || e.key === "Backspace") removeLayer(activeId);
      if ((e.metaKey || e.ctrlKey) && e.key === "d") { e.preventDefault(); duplicateLayer(activeId); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, current.layers]);

  const generateAI = async () => {
    if (!aiPrompt.trim()) { toast({ title: "Enter a prompt" }); return; }
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-tshirt-design", {
        body: { prompt: aiPrompt, side },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      addLayer({ id: crypto.randomUUID(), kind: "image", src: data.imageUrl, ai: true, name: "AI Design", x: 50, y: 50, w: 80, rotation: 0 });
      toast({ title: "AI design added!", description: `Generated for the ${side}.` });
    } catch (e: any) {
      toast({ title: "Generation failed", description: e?.message || "Please try again.", variant: "destructive" });
    } finally { setAiLoading(false); }
  };

  const renderLayer = (l: Layer, interactive: boolean) => {
    // x,y,w are percentages within the print area
    const wrap: React.CSSProperties = {
      position: "absolute", left: `${l.x}%`, top: `${l.y}%`, width: `${l.w}%`,
      transform: `translate(-50%, -50%) rotate(${l.rotation}deg)`,
      cursor: interactive ? "move" : "default",
    };
    const isActive = interactive && activeId === l.id;
    const handleProps = interactive ? { onPointerDown: (e: React.PointerEvent) => startDrag(e, l.id) } : {};
    if (l.kind === "text") {
      return (
        <div key={l.id} style={wrap} {...handleProps} className={isActive ? "outline-dashed outline-2 outline-primary outline-offset-4" : ""}>
          <div style={{ color: l.color, fontSize: `${l.size}px`, fontFamily: l.font, fontWeight: l.weight, textAlign: "center", lineHeight: 1.05, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{l.text}</div>
          {isActive && <ActiveHandles onResize={(e) => startResize(e, l.id)} onRotate={(e) => startRotate(e, l.id)} />}
        </div>
      );
    }
    if (l.kind === "image") {
      return (
        <div key={l.id} style={wrap} {...handleProps} className={isActive ? "outline-dashed outline-2 outline-primary outline-offset-4" : ""}>
          <img src={l.src} crossOrigin="anonymous" draggable={false} className="w-full h-auto pointer-events-none select-none" alt=""/>
          {isActive && <ActiveHandles onResize={(e) => startResize(e, l.id)} onRotate={(e) => startRotate(e, l.id)} />}
        </div>
      );
    }
    return (
      <div key={l.id} style={wrap} {...handleProps} className={isActive ? "outline-dashed outline-2 outline-primary outline-offset-4" : ""}>
        <ShapeSVG shape={l.shape} color={l.color} opacity={l.opacity}/>
        {isActive && <ActiveHandles onResize={(e) => startResize(e, l.id)} onRotate={(e) => startRotate(e, l.id)} />}
      </div>
    );
  };

  /* Capture & WhatsApp */
  const captureSide = async (el: HTMLElement | null): Promise<Blob | null> => {
    if (!el) return null;
    const canvas = await html2canvas(el, { backgroundColor: null, useCORS: true, scale: 2 });
    return await new Promise((res) => canvas.toBlob((b) => res(b), "image/png"));
  };
  const uploadBlob = async (blob: Blob, name: string): Promise<string> => {
    const path = `${Date.now()}-${crypto.randomUUID()}-${name}.png`;
    const { error } = await supabase.storage.from("designs").upload(path, blob, { contentType: "image/png" });
    if (error) throw error;
    return supabase.storage.from("designs").getPublicUrl(path).data.publicUrl;
  };
  const sendToWhatsApp = async () => {
    setSending(true);
    try {
      const fb = await captureSide(frontCaptureRef.current);
      const bb = await captureSide(backCaptureRef.current);
      if (!fb || !bb) throw new Error("Capture failed");
      toast({ title: "Uploading designs…" });
      const uploads: Promise<string>[] = [uploadBlob(fb, "front"), uploadBlob(bb, "back")];
      uploadedFiles.forEach((f) => uploads.push((async () => {
        const path = `${Date.now()}-${crypto.randomUUID()}-${f.name}`;
        const { error } = await supabase.storage.from("designs").upload(path, f, { contentType: f.type });
        if (error) throw error;
        return supabase.storage.from("designs").getPublicUrl(path).data.publicUrl;
      })()));
      const urls = await Promise.all(uploads);
      const [fu, bu, ...assetUrls] = urls;
      const assetLines = assetUrls.length
        ? `\n📎 Source images:\n${assetUrls.map((u, i) => `   ${i+1}. ${u}`).join("\n")}`
        : "";
      const msg =
        `Hi Hustler 👋, I designed a custom ${product?.name} on your site.\n\n` +
        `Category: ${category?.name}\n` +
        `Size: ${size} · Color: ${currentColorName}\n\n` +
        `🎨 Front design: ${fu}\n🎨 Back design: ${bu}` +
        assetLines + `\n\nPlease contact me to finalize the order.`;
      window.open(`https://wa.me/918247244596?text=${encodeURIComponent(msg)}`, "_blank");
      toast({ title: "Opening WhatsApp", description: "Designs attached." });
    } catch (e: any) {
      toast({ title: "Couldn't send", description: e?.message || "Please try again.", variant: "destructive" });
    } finally { setSending(false); }
  };

  /* ──────────────── STEP 1: Category ──────────────── */
  if (step === "category") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header step={step} category={category} product={product}
          onBack={() => setStep("category")} onProductBack={() => setStep("product")} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-10">
            <h1 className="font-display font-black text-3xl sm:text-5xl">Choose a category</h1>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base">Pick what you'd like to customize today.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => { setCategory(c); setStep("product"); }}
                className="group relative p-8 rounded-2xl border border-border bg-gradient-card hover:border-primary/50 transition shadow-sm text-left">
                <div className="text-5xl mb-4">{c.emoji}</div>
                <h3 className="font-display font-bold text-xl">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.products.length} product{c.products.length>1?"s":""}</p>
                <ChevronRight className="absolute top-5 right-5 text-muted-foreground group-hover:text-primary transition" size={18}/>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* ──────────────── STEP 2: Product ──────────────── */
  if (step === "product" && category) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header step={step} category={category} product={product}
          onBack={() => setStep("category")} onProductBack={() => setStep("product")} />
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <button onClick={() => setStep("category")} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2 mb-6">
            <ArrowLeft size={14}/> Back to categories
          </button>
          <h1 className="font-display font-black text-3xl sm:text-4xl">{category.name}</h1>
          <p className="text-muted-foreground mt-2">Pick a product to start designing.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {category.products.map((p) => (
              <button key={p.id} onClick={() => { setProduct(p); setFront(initialSide()); setBack(initialSide()); setStep("design"); }}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition text-left">
                <div className="w-20 h-20 rounded-lg bg-muted/40 border border-border flex items-center justify-center shrink-0">
                  <div className="w-16 h-16"><GarmentSVG variant={p.variant} color="#e5e7eb" side="front"/></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                    {p.isNew && <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">NEW</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1">Customize <ChevronRight size={12}/></p>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  /* ──────────────── STEP 3: Design ──────────────── */
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header step={step} category={category} product={product}
        onBack={() => setStep("category")} onProductBack={() => setStep("product")} />

      <div className="flex-1 max-w-[1500px] w-full mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[1fr_1.1fr] gap-8">
        {/* LEFT pane */}
        <div className="space-y-6 overflow-y-auto lg:max-h-[calc(100vh-180px)] lg:pr-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{category?.name}</p>
            <h1 className="font-display font-extrabold text-2xl mt-1">{product?.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">Designs stay inside the print area.</p>
          </div>

          {/* Color */}
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Color</Label>
              <span className="text-xs text-muted-foreground">{hoverColor?.name || currentColorName}</span>
            </div>
            <div className="grid grid-cols-9 gap-2 mt-3">
              {COLORS.map((c) => {
                const sel = current.bgColor.toLowerCase() === c.hex.toLowerCase();
                return (
                  <button key={c.hex} title={c.name}
                    onMouseEnter={() => setHoverColor(c)} onMouseLeave={() => setHoverColor(null)}
                    onClick={() => setBothColor(c.hex)}
                    style={{ background: c.hex }}
                    className={`aspect-square rounded-md border transition shadow-sm ${
                      sel ? "ring-2 ring-primary ring-offset-2 ring-offset-background border-primary" : "border-border hover:scale-105"
                    }`}>
                    {sel && <Check size={12} className="m-auto" style={{ color: c.hex === "#ffffff" ? "#000" : "#fff" }}/>}
                  </button>
                );
              })}
            </div>
            <input type="color" value={current.bgColor} onChange={(e) => setBothColor(e.target.value)}
              className="mt-2 h-8 w-full rounded-md border border-border bg-transparent cursor-pointer"/>
          </div>

          {/* Size */}
          <div>
            <Label className="text-sm font-semibold">Size</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {sizeList.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`min-w-12 h-10 px-3 rounded-md border text-sm font-semibold transition ${
                    size === s ? "border-primary text-primary bg-primary/5" : "border-border hover:border-foreground/40"
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Tools */}
          <Tabs defaultValue="add">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="add"><Wand2 size={14} className="mr-1"/>Add</TabsTrigger>
              <TabsTrigger value="ai"><Sparkles size={14} className="mr-1"/>AI</TabsTrigger>
              <TabsTrigger value="props">Edit</TabsTrigger>
            </TabsList>

            <TabsContent value="add" className="space-y-3 mt-4">
              <input ref={fileInputRef} type="file" accept="image/*" hidden
                onChange={(e) => { const f = e.target.files?.[0]; if (f) onUpload(f); e.target.value = ""; }}/>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full justify-start">
                <Upload size={14}/> Upload an image
              </Button>
              <Button onClick={addText} variant="outline" className="w-full justify-start">
                <Type size={14}/> Add text
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => addShape("rect")}><Square size={14}/></Button>
                <Button variant="outline" size="sm" onClick={() => addShape("circle")}><CircleIcon size={14}/></Button>
                <Button variant="outline" size="sm" onClick={() => addShape("star")}><Star size={14}/></Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-3 mt-4">
              <Input placeholder="e.g. retro mountain sunset, bold typography"
                value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)}/>
              <Button onClick={generateAI} disabled={aiLoading} variant="hero" className="w-full">
                {aiLoading ? <><Loader2 className="animate-spin"/> Generating…</> : <><Sparkles/> Generate for {side}</>}
              </Button>
              <div className="grid grid-cols-2 gap-1.5">
                {["minimalist line art mountain", "vintage 70s sunset", "anime samurai dragon", "abstract geometric burst"].map((p) => (
                  <button key={p} onClick={() => setAiPrompt(p)}
                    className="text-left text-[11px] px-2 py-1.5 rounded-md border border-border hover:border-primary/40 hover:bg-primary/5">{p}</button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="props" className="mt-4">
              {!active && <p className="text-xs text-muted-foreground">Select a layer on the canvas or below.</p>}
              {active && (
                <div className="space-y-3">
                  <div className="flex gap-1 justify-end">
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveLayer(active.id, 1)}><ArrowUp size={12}/></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => moveLayer(active.id, -1)}><ArrowDown size={12}/></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => duplicateLayer(active.id)}><Copy size={12}/></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => removeLayer(active.id)}><Trash2 size={12}/></Button>
                  </div>
                  {active.kind === "text" && (
                    <>
                      <div><Label className="text-xs">Text</Label>
                        <Input value={active.text} onChange={(e) => updateLayer(active.id, { text: e.target.value })}/></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><Label className="text-xs">Color</Label>
                          <input type="color" value={active.color} onChange={(e) => updateLayer(active.id, { color: e.target.value })}
                            className="w-full h-9 rounded-md border border-border bg-transparent cursor-pointer"/></div>
                        <div><Label className="text-xs">Size {active.size}</Label>
                          <input type="range" min={10} max={120} value={active.size}
                            onChange={(e) => updateLayer(active.id, { size: Number(e.target.value) })} className="w-full"/></div>
                      </div>
                      <div><Label className="text-xs">Font</Label>
                        <select value={active.font} onChange={(e) => updateLayer(active.id, { font: e.target.value })}
                          className="w-full h-9 rounded-md border border-border bg-background px-2 text-sm">
                          {FONTS.map((f) => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                        </select></div>
                    </>
                  )}
                  {active.kind === "shape" && (
                    <div className="grid grid-cols-2 gap-2">
                      <div><Label className="text-xs">Color</Label>
                        <input type="color" value={active.color} onChange={(e) => updateLayer(active.id, { color: e.target.value })}
                          className="w-full h-9 rounded-md border border-border bg-transparent cursor-pointer"/></div>
                      <div><Label className="text-xs">Opacity {Math.round(active.opacity * 100)}%</Label>
                        <input type="range" min={0.1} max={1} step={0.05} value={active.opacity}
                          onChange={(e) => updateLayer(active.id, { opacity: Number(e.target.value) })} className="w-full"/></div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                    <div><Label className="text-xs">Width {Math.round(active.w)}%</Label>
                      <input type="range" min={10} max={100} value={active.w}
                        onChange={(e) => updateLayer(active.id, { w: Number(e.target.value) })} className="w-full"/></div>
                    <div><Label className="text-xs flex items-center gap-1"><RotateCw size={10}/>{active.rotation}°</Label>
                      <input type="range" min={-180} max={180} value={active.rotation}
                        onChange={(e) => updateLayer(active.id, { rotation: Number(e.target.value) })} className="w-full"/></div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {allLayers.filter((l) => l.kind === "image").length > 0 && (
            <div className="space-y-2 pt-2 border-t border-border">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Your designs</Label>
              {(allLayers.filter((l) => l.kind === "image") as ImageLayer[]).map((l) => (
                <div key={l.id} onClick={() => setActiveId(l.id)}
                  className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition ${
                    activeId === l.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40"
                  }`}>
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0 border border-border">
                    <img src={l.src} alt="" className="w-full h-full object-contain"/>
                  </div>
                  <span className="text-sm flex-1 truncate">{l.name || (l.ai ? "AI Design" : "Image")}</span>
                  <button onClick={(e) => { e.stopPropagation(); removeLayer(l.id); }} className="text-muted-foreground hover:text-destructive p-1">
                    <Trash2 size={14}/>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <Tabs value={side} onValueChange={(v) => setSide(v as Side)}>
            <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-border rounded-none h-12 p-0">
              <TabsTrigger value="front"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none text-sm font-bold tracking-wider">FRONT</TabsTrigger>
              <TabsTrigger value="back"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none text-sm font-bold tracking-wider">BACK</TabsTrigger>
            </TabsList>
          </Tabs>

          <div onPointerDown={() => setActiveId(null)}
            className="relative w-full aspect-[5/6] mx-auto bg-gradient-to-br from-muted/20 to-background overflow-hidden touch-none select-none mt-4">
            <GarmentSVG variant={variant} color={current.bgColor} side={side}/>
            {/* Print area — clips designs to its bounds */}
            <div ref={printAreaRef}
              className="absolute border-2 border-dashed border-foreground/70 overflow-hidden"
              style={{
                left: `${printArea.l}%`, top: `${printArea.t}%`,
                width: `${printArea.w}%`, height: `${printArea.h}%`,
              }}
              onPointerDown={(e) => e.stopPropagation()}>
              {current.layers.map((l) => renderLayer(l, true))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Designs placed beyond the dashed border will be cropped.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card sticky bottom-0">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
          <p className="text-xs text-muted-foreground">Front & back designs will be sent over WhatsApp.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setStep("product")}>Change product</Button>
            <Button variant="hero" onClick={sendToWhatsApp} disabled={sending}>
              {sending ? <><Loader2 className="animate-spin" size={14}/> Sending…</> : "Send on WhatsApp"}
            </Button>
          </div>
        </div>
      </div>

      {/* Off-screen capture (front + back) */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden>
        <div ref={frontCaptureRef} className="relative" style={{ width: 600, height: 720, background: "transparent" }}>
          <GarmentSVG variant={variant} color={front.bgColor} side="front"/>
          <div className="absolute overflow-hidden" style={{
            left: `${printArea.l}%`, top: `${printArea.t}%`,
            width: `${printArea.w}%`, height: `${printArea.h}%`,
          }}>
            {front.layers.map((l) => renderLayer(l, false))}
          </div>
        </div>
        <div ref={backCaptureRef} className="relative" style={{ width: 600, height: 720, background: "transparent" }}>
          <GarmentSVG variant={variant} color={back.bgColor} side="back"/>
          <div className="absolute overflow-hidden" style={{
            left: `${printArea.l}%`, top: `${printArea.t}%`,
            width: `${printArea.w}%`, height: `${printArea.h}%`,
          }}>
            {back.layers.map((l) => renderLayer(l, false))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Header({ step, category, product, onBack, onProductBack }:{
  step: Step; category: Category | null; product: Product | null;
  onBack: () => void; onProductBack: () => void;
}) {
  return (
    <header className="border-b border-border bg-card">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16}/> Back to site
        </Link>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <button onClick={onBack} className={step === "category" ? "text-foreground font-semibold" : "hover:text-foreground"}>1. Category</button>
          <ChevronRight size={12}/>
          <button onClick={category ? onProductBack : undefined} disabled={!category}
            className={step === "product" ? "text-foreground font-semibold" : (category ? "hover:text-foreground" : "opacity-40")}>
            2. Product {category && `(${category.name})`}
          </button>
          <ChevronRight size={12}/>
          <span className={step === "design" ? "text-foreground font-semibold" : "opacity-40"}>
            3. Design {product && `(${product.name})`}
          </span>
        </div>
        <div className="font-display font-extrabold tracking-tight text-sm sm:text-base">
          HUSTLER · STUDIO<span className="text-primary">.</span>
        </div>
      </div>
    </header>
  );
}

function ActiveHandles({ onResize, onRotate }: { onResize: (e: React.PointerEvent) => void; onRotate: (e: React.PointerEvent) => void }) {
  return (
    <>
      <div onPointerDown={onRotate}
        className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-grab shadow-md">
        <RotateCw size={10}/>
      </div>
      <div onPointerDown={onResize}
        className="absolute -bottom-2 -right-2 w-4 h-4 rounded-sm bg-primary border-2 border-background cursor-nwse-resize shadow-md"/>
    </>
  );
}

export default Customizer;
