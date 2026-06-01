import { useState } from "react";

const WAREHOUSES = [
  { id:"WH-001", name:"Mumbai Central Hub",    city:"Mumbai",    state:"Maharashtra", country:"India", capacity:5000, used:3820, type:"Distribution", status:"Active",   temp:"Ambient",  shipments:142, carbon:"18 kg/day", manager:"Rohan Mehta",   lat:19.0760, lng:72.8777 },
  { id:"WH-002", name:"Delhi North Depot",     city:"Delhi",     state:"Delhi",       country:"India", capacity:3200, used:2100, type:"Storage",       status:"Active",   temp:"Cold",     shipments:89,  carbon:"12 kg/day", manager:"Priya Sharma",  lat:28.7041, lng:77.1025 },
  { id:"WH-003", name:"Chennai Port Facility", city:"Chennai",   state:"Tamil Nadu",  country:"India", capacity:7500, used:6200, type:"Port",          status:"Active",   temp:"Ambient",  shipments:210, carbon:"31 kg/day", manager:"Arun Kumar",    lat:13.0827, lng:80.2707 },
  { id:"WH-004", name:"Bangalore Tech Park",   city:"Bangalore", state:"Karnataka",   country:"India", capacity:2800, used:980,  type:"Distribution",  status:"Active",   temp:"Controlled",shipments:54, carbon:"9 kg/day",  manager:"Sneha Rao",     lat:12.9716, lng:77.5946 },
  { id:"WH-005", name:"Kolkata East Gate",     city:"Kolkata",   state:"West Bengal", country:"India", capacity:4100, used:3950, type:"Storage",       status:"Critical", temp:"Ambient",  shipments:176, carbon:"24 kg/day", manager:"Debashish Paul", lat:22.5726, lng:88.3639 },
  { id:"WH-006", name:"Pune Logistics Park",   city:"Pune",      state:"Maharashtra", country:"India", capacity:3600, used:1440, type:"Distribution",  status:"Active",   temp:"Cold",     shipments:67,  carbon:"11 kg/day", manager:"Amit Joshi",    lat:18.5204, lng:73.8567 },
  { id:"WH-007", name:"Hyderabad Central",     city:"Hyderabad", state:"Telangana",   country:"India", capacity:4800, used:2900, type:"Distribution",  status:"Active",   temp:"Ambient",  shipments:98,  carbon:"15 kg/day", manager:"Kavya Reddy",   lat:17.3850, lng:78.4867 },
  { id:"WH-008", name:"Ahmedabad West Depot",  city:"Ahmedabad", state:"Gujarat",     country:"India", capacity:2200, used:440,  type:"Storage",       status:"Inactive", temp:"Ambient",  shipments:0,   carbon:"0 kg/day",  manager:"Nilesh Patel",  lat:23.0225, lng:72.5714 },
];

const STATUS_STYLE = (s) => {
  if (s === "Active")   return { bg:"rgba(74,222,128,0.12)",  color:"#4ade80", dot:"#1db954" };
  if (s === "Critical") return { bg:"rgba(248,113,113,0.12)", color:"#f87171", dot:"#ef4444" };
  if (s === "Inactive") return { bg:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.4)", dot:"#555" };
  return { bg:"rgba(255,255,255,0.06)", color:"#aaa", dot:"#aaa" };
};

const TYPE_ICON = { Distribution:"🏭", Storage:"📦", Port:"⚓" };
const TEMP_ICON = { Ambient:"🌡", Cold:"❄️", Controlled:"🎛" };

// ─── Capacity Ring ────────────────────────────────────────────────────────────
function CapacityRing({ used, capacity, size = 56 }) {
  const pct = used / capacity;
  const R = (size / 2) - 5;
  const circ = 2 * Math.PI * R;
  const dash = pct * circ;
  const color = pct >= 0.9 ? "#f87171" : pct >= 0.7 ? "#f59e0b" : "#1db954";
  const cx = size / 2, cy = size / 2;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeDashoffset={circ * 0.25}
        strokeLinecap="round"
        style={{ transform:`rotate(0deg)`, transition:"stroke-dasharray 0.6s ease" }}
      />
      <text x={cx} y={cy + 4} textAnchor="middle" style={{ fill: color, fontSize: size * 0.2, fontFamily:"'Syne',sans-serif", fontWeight:800 }}>
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

// ─── Map Visual ───────────────────────────────────────────────────────────────
function IndiaMap({ warehouses, selected, onSelect }) {
  // Simplified SVG map of India with warehouse dots
  const toXY = (lat, lng) => ({
    x: ((lng - 68) / (98 - 68)) * 320 + 20,
    y: ((37 - lat) / (37 - 8)) * 360 + 20,
  });

  return (
    <div style={{ position:"relative", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden", height:420 }}>
      <div style={{ position:"absolute", top:16, left:16, fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#fff", zIndex:2 }}>Warehouse Locations</div>
      <svg viewBox="0 0 360 420" style={{ width:"100%", height:"100%", opacity:0.9 }}>
        {/* India outline (simplified) */}
        <path d="M120,20 L200,15 L240,30 L280,60 L310,100 L320,150 L310,200 L290,240 L270,280 L240,320 L210,360 L190,390 L175,400 L160,380 L140,340 L110,300 L90,260 L70,220 L60,180 L65,130 L80,80 L100,50 Z"
          fill="rgba(29,185,84,0.06)" stroke="rgba(29,185,84,0.2)" strokeWidth="1.5" />
        {/* State lines hint */}
        <path d="M120,20 L200,15 M80,80 L310,100 M70,180 L310,180 M90,260 L270,260" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

        {warehouses.map(wh => {
          const pos = toXY(wh.lat, wh.lng);
          const isSelected = selected?.id === wh.id;
          const st = STATUS_STYLE(wh.status);
          const pct = wh.used / wh.capacity;
          const dotColor = pct >= 0.9 ? "#f87171" : pct >= 0.7 ? "#f59e0b" : "#1db954";
          return (
            <g key={wh.id} onClick={() => onSelect(wh)} style={{ cursor:"pointer" }}>
              {isSelected && <circle cx={pos.x} cy={pos.y} r={18} fill={dotColor} opacity={0.15} />}
              <circle cx={pos.x} cy={pos.y} r={isSelected ? 8 : 6}
                fill={dotColor} stroke={isSelected ? "#fff" : "rgba(5,20,10,0.8)"} strokeWidth={isSelected ? 2 : 1.5}
                style={{ filter: isSelected ? `drop-shadow(0 0 6px ${dotColor})` : "none", transition:"all 0.2s" }}
              />
              {isSelected && (
                <text x={pos.x + 12} y={pos.y + 4} style={{ fill:"#fff", fontSize:9, fontFamily:"'DM Sans',sans-serif" }}>
                  {wh.name.split(" ").slice(0,2).join(" ")}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={{ position:"absolute", bottom:12, left:12, display:"flex", gap:12 }}>
        {[{color:"#1db954",label:"<70%"},{color:"#f59e0b",label:"70–90%"},{color:"#f87171",label:">90%"}].map(l => (
          <div key={l.label} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:l.color }} />
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Warehouse Card ───────────────────────────────────────────────────────────
function WarehouseCard({ wh, selected, onClick }) {
  const st = STATUS_STYLE(wh.status);
  const pct = wh.used / wh.capacity;
  return (
    <div onClick={onClick} style={{
      background: selected ? "rgba(29,185,84,0.07)" : "rgba(255,255,255,0.03)",
      border: `1px solid ${selected ? "rgba(29,185,84,0.3)" : "rgba(255,255,255,0.07)"}`,
      borderRadius:14, padding:"16px", cursor:"pointer", transition:"all 0.2s",
    }}
    onMouseEnter={e => { if(!selected){ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.12)"; }}}
    onMouseLeave={e => { if(!selected){ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; }}}
    >
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:16 }}>{TYPE_ICON[wh.type]}</span>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#fff" }}>{wh.name}</span>
          </div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{wh.city}, {wh.state}</div>
        </div>
        <span style={{ fontSize:10, fontWeight:600, padding:"3px 9px", borderRadius:20, background:st.bg, color:st.color, display:"inline-flex", alignItems:"center", gap:4, whiteSpace:"nowrap", flexShrink:0 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:st.dot, display:"inline-block" }} />
          {wh.status}
        </span>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <CapacityRing used={wh.used} capacity={wh.capacity} size={52} />
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>Capacity</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>{wh.used.toLocaleString()} / {wh.capacity.toLocaleString()} m²</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:2, width:`${pct*100}%`, background: pct>=0.9?"#f87171":pct>=0.7?"#f59e0b":"#1db954", transition:"width 0.6s ease" }} />
          </div>
          <div style={{ display:"flex", gap:10, marginTop:8 }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>📦 {wh.shipments} shipments</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>🌿 {wh.carbon}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ wh, onClose }) {
  if (!wh) return (
    <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:"40px 24px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:12, color:"rgba(255,255,255,0.3)" }}>
      <div style={{ fontSize:40 }}>🏭</div>
      <div style={{ fontSize:14 }}>Select a warehouse to view details</div>
    </div>
  );

  const st  = STATUS_STYLE(wh.status);
  const pct = wh.used / wh.capacity;

  return (
    <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:"22px", animation:"fadeUp 0.3s ease both" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
        <div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, color:"#fff", marginBottom:4 }}>{wh.name}</div>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{wh.id} · {wh.city}, {wh.state}</div>
        </div>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none", color:"rgba(255,255,255,0.5)", width:28, height:28, borderRadius:7, cursor:"pointer", fontSize:14 }}>✕</button>
      </div>

      {/* Status + type row */}
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        <span style={{ fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:20, background:st.bg, color:st.color, display:"inline-flex", alignItems:"center", gap:4 }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:st.dot, display:"inline-block" }} />{wh.status}
        </span>
        <span style={{ fontSize:11, padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)" }}>{TYPE_ICON[wh.type]} {wh.type}</span>
        <span style={{ fontSize:11, padding:"4px 10px", borderRadius:20, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.5)" }}>{TEMP_ICON[wh.temp]} {wh.temp}</span>
      </div>

      {/* Capacity visual */}
      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"16px", marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <CapacityRing used={wh.used} capacity={wh.capacity} size={72} />
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:"#fff" }}>{wh.used.toLocaleString()} <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)", fontWeight:400 }}>/ {wh.capacity.toLocaleString()} m²</span></div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:4 }}>Storage capacity used</div>
            <div style={{ height:5, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden", marginTop:10 }}>
              <div style={{ height:"100%", borderRadius:3, width:`${pct*100}%`, background:pct>=0.9?"#f87171":pct>=0.7?"#f59e0b":"linear-gradient(90deg,#1db954,#4ade80)", transition:"width 0.8s ease" }} />
            </div>
            {pct >= 0.9 && <div style={{ fontSize:11, color:"#f87171", marginTop:6 }}>⚠️ Near capacity — consider redistribution</div>}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
        {[
          { label:"Active Shipments", value:wh.shipments, icon:"📦" },
          { label:"Carbon / Day",     value:wh.carbon,    icon:"🌿" },
          { label:"Manager",          value:wh.manager,   icon:"👤" },
          { label:"Temperature",      value:wh.temp,      icon:TEMP_ICON[wh.temp] },
        ].map(s => (
          <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, padding:"12px" }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:5 }}>{s.label}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{s.icon} {s.value}</div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        <button style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(22,163,74,0.25)" }}>
          Manage Inventory →
        </button>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          <button style={{ padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer" }}>📊 View Report</button>
          <button style={{ padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.6)", fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer" }}>🔔 Set Alert</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Warehouses() {
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState("All");
  const [view,     setView]     = useState("grid"); // grid | table

  const filtered = WAREHOUSES.filter(wh => {
    const q = search.toLowerCase();
    if (q && ![wh.name, wh.city, wh.id].some(v => v.toLowerCase().includes(q))) return false;
    if (filter !== "All" && wh.status !== filter) return false;
    return true;
  });

  const totals = {
    capacity: WAREHOUSES.reduce((s, w) => s + w.capacity, 0),
    used:     WAREHOUSES.reduce((s, w) => s + w.used, 0),
    shipments:WAREHOUSES.reduce((s, w) => s + w.shipments, 0),
    active:   WAREHOUSES.filter(w => w.status === "Active").length,
  };

  return (
    <div style={{ padding:"32px 36px", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}} .wh-search{padding:10px 14px 10px 38px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;width:240px;transition:border-color 0.2s;box-sizing:border-box;} .wh-search:focus{border-color:rgba(29,185,84,0.5);} .wh-search::placeholder{color:rgba(255,255,255,0.25);}`}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28, animation:"fadeUp 0.4s ease both" }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.5px" }}>Warehouses</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>Manage storage facilities · Track capacity · Monitor carbon output</p>
        </div>
        <button style={{ padding:"10px 18px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(22,163,74,0.25)" }}>+ Add Warehouse</button>
      </div>

      {/* KPI Row */}
      <div style={{ display:"flex", gap:16, marginBottom:28, flexWrap:"wrap", animation:"fadeUp 0.4s ease 0.05s both" }}>
        {[
          { icon:"🏭", label:"Total Warehouses",  value:WAREHOUSES.length,                   color:"#1db954" },
          { icon:"✅", label:"Active",             value:totals.active,                       color:"#4ade80" },
          { icon:"📐", label:"Total Capacity",     value:`${(totals.capacity/1000).toFixed(1)}k m²`, color:"#3b82f6" },
          { icon:"📊", label:"Avg Utilization",    value:`${Math.round(totals.used/totals.capacity*100)}%`, color:"#f59e0b" },
          { icon:"📦", label:"Active Shipments",   value:totals.shipments,                    color:"#a78bfa" },
        ].map(k => (
          <div key={k.label} style={{ flex:"1 1 140px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"16px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-16, right:-16, width:60, height:60, background:k.color, borderRadius:"50%", opacity:0.07, filter:"blur(12px)", pointerEvents:"none" }} />
            <div style={{ fontSize:20, marginBottom:8 }}>{k.icon}</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:k.color }}>{k.value}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20, animation:"fadeUp 0.4s ease 0.1s both" }}>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Filters + view toggle */}
          <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            <div style={{ position:"relative", flex:1, minWidth:200 }}>
              <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"rgba(255,255,255,0.3)" }}>🔍</span>
              <input className="wh-search" style={{ width:"100%" }} placeholder="Search by name, city, ID…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {["All","Active","Critical","Inactive"].map(f => (
                <button key={f} onClick={() => setFilter(f)} style={{ padding:"7px 14px", borderRadius:8, border:"none", background:filter===f?"rgba(29,185,84,0.15)":"rgba(255,255,255,0.05)", color:filter===f?"#4ade80":"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, cursor:"pointer", outline:filter===f?"1px solid rgba(29,185,84,0.3)":"none", transition:"all 0.15s" }}>{f}</button>
              ))}
            </div>
            <div style={{ display:"flex", gap:4, background:"rgba(255,255,255,0.05)", borderRadius:9, padding:3 }}>
              {[["grid","⊞"],["table","☰"]].map(([v,icon]) => (
                <button key={v} onClick={() => setView(v)} style={{ padding:"6px 12px", borderRadius:7, border:"none", background:view===v?"rgba(255,255,255,0.12)":"transparent", color:view===v?"#fff":"rgba(255,255,255,0.4)", fontSize:14, cursor:"pointer", transition:"all 0.15s" }}>{icon}</button>
              ))}
            </div>
          </div>

          {/* Grid view */}
          {view === "grid" && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {filtered.map(wh => (
                <WarehouseCard key={wh.id} wh={wh} selected={selected?.id===wh.id} onClick={() => setSelected(selected?.id===wh.id ? null : wh)} />
              ))}
              {filtered.length === 0 && (
                <div style={{ gridColumn:"1/-1", padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:14 }}>No warehouses match your search</div>
              )}
            </div>
          )}

          {/* Table view */}
          {view === "table" && (
            <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                    {["ID","Name","City","Type","Capacity","Utilization","Shipments","Carbon","Status"].map(h => (
                      <th key={h} style={{ padding:"11px 14px", textAlign:"left", fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:500, whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(wh => {
                    const st = STATUS_STYLE(wh.status);
                    const pct = wh.used / wh.capacity;
                    return (
                      <tr key={wh.id} onClick={() => setSelected(selected?.id===wh.id?null:wh)}
                        style={{ borderTop:"1px solid rgba(255,255,255,0.04)", cursor:"pointer", background:selected?.id===wh.id?"rgba(29,185,84,0.05)":"transparent", transition:"background 0.15s" }}
                        onMouseEnter={e => { if(selected?.id!==wh.id) e.currentTarget.style.background="rgba(255,255,255,0.03)"; }}
                        onMouseLeave={e => { if(selected?.id!==wh.id) e.currentTarget.style.background="transparent"; }}
                      >
                        <td style={{ padding:"12px 14px", fontSize:12, color:"#4ade80", fontFamily:"'Syne',sans-serif", fontWeight:700 }}>{wh.id}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:"#fff", fontWeight:500 }}>{wh.name}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)" }}>{wh.city}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)" }}>{TYPE_ICON[wh.type]} {wh.type}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)" }}>{wh.capacity.toLocaleString()} m²</td>
                        <td style={{ padding:"12px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <div style={{ width:50, height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
                              <div style={{ height:"100%", borderRadius:2, width:`${pct*100}%`, background:pct>=0.9?"#f87171":pct>=0.7?"#f59e0b":"#1db954" }} />
                            </div>
                            <span style={{ fontSize:11, color: pct>=0.9?"#f87171":pct>=0.7?"#f59e0b":"#4ade80", fontWeight:600 }}>{Math.round(pct*100)}%</span>
                          </div>
                        </td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)" }}>{wh.shipments}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:"rgba(255,255,255,0.6)" }}>{wh.carbon}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <span style={{ fontSize:10, fontWeight:600, padding:"3px 9px", borderRadius:20, background:st.bg, color:st.color, display:"inline-flex", alignItems:"center", gap:4 }}>
                            <span style={{ width:4, height:4, borderRadius:"50%", background:st.dot, display:"inline-block" }} />{wh.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Map */}
          <IndiaMap warehouses={WAREHOUSES} selected={selected} onSelect={wh => setSelected(selected?.id===wh.id?null:wh)} />
        </div>

        {/* Detail Panel */}
        <div>
          <DetailPanel wh={selected} onClose={() => setSelected(null)} />
        </div>
      </div>
    </div>
  );
}