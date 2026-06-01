import { useState } from "react";
import ShipmentTable from "../components/ShipmentTable";

const ALL_SHIPMENTS = [
  { id:"SH-4821", origin:"Mumbai",    dest:"Delhi",       mode:"Rail", status:"In Transit", carbon:"62 kg",  weight:"340 kg", eta:"Today 4pm",  merchant:"Tata Retail",    eco:94 },
  { id:"SH-4820", origin:"Chennai",   dest:"Kolkata",     mode:"Sea",  status:"In Transit", carbon:"44 kg",  weight:"820 kg", eta:"Jun 4",       merchant:"Infosys Supply", eco:97 },
  { id:"SH-4819", origin:"Chennai",   dest:"Bangalore",   mode:"Road", status:"Delivered",  carbon:"18 kg",  weight:"120 kg", eta:"Done",        merchant:"Flipkart",       eco:71 },
  { id:"SH-4818", origin:"Delhi",     dest:"Jaipur",      mode:"Road", status:"Delivered",  carbon:"12 kg",  weight:"95 kg",  eta:"Done",        merchant:"Amazon IN",      eco:68 },
  { id:"SH-4817", origin:"Pune",      dest:"Hyderabad",   mode:"Air",  status:"Pending",    carbon:"210 kg", weight:"60 kg",  eta:"Tomorrow",    merchant:"Zomato B2B",     eco:28 },
  { id:"SH-4816", origin:"Kolkata",   dest:"Bhubaneswar", mode:"Rail", status:"In Transit", carbon:"38 kg",  weight:"510 kg", eta:"Today 9pm",   merchant:"Tata Steel",     eco:91 },
  { id:"SH-4815", origin:"Kolkata",   dest:"Mumbai",      mode:"Air",  status:"In Transit", carbon:"542 kg", weight:"200 kg", eta:"Today 8pm",   merchant:"Reliance",       eco:24 },
  { id:"SH-4814", origin:"Ahmedabad", dest:"Surat",       mode:"Road", status:"Delivered",  carbon:"8 kg",   weight:"75 kg",  eta:"Done",        merchant:"Meesho",         eco:80 },
  { id:"SH-4813", origin:"Bangalore", dest:"Pune",        mode:"Rail", status:"Pending",    carbon:"54 kg",  weight:"430 kg", eta:"Jun 5",       merchant:"Wipro Logistics",eco:88 },
  { id:"SH-4812", origin:"Delhi",     dest:"Jaipur",      mode:"Road", status:"Delivered",  carbon:"6 kg",   weight:"50 kg",  eta:"Done",        merchant:"Amazon IN",      eco:76 },
  { id:"SH-4811", origin:"Mumbai",    dest:"Goa",         mode:"Sea",  status:"In Transit", carbon:"22 kg",  weight:"980 kg", eta:"Jun 3",       merchant:"Maersk IN",      eco:96 },
  { id:"SH-4810", origin:"Hyderabad", dest:"Chennai",     mode:"Rail", status:"Delivered",  carbon:"41 kg",  weight:"290 kg", eta:"Done",        merchant:"TCS Supply",     eco:89 },
];

const STATUS_STYLE = (s) => {
  if (s === "In Transit") return { bg:"rgba(59,130,246,0.12)", color:"#60a5fa", dot:"#3b82f6" };
  if (s === "Delivered")  return { bg:"rgba(74,222,128,0.12)", color:"#4ade80", dot:"#1db954" };
  if (s === "Pending")    return { bg:"rgba(251,191,36,0.12)", color:"#fbbf24", dot:"#f59e0b" };
  return { bg:"rgba(255,255,255,0.06)", color:"#aaa", dot:"#aaa" };
};
const MODE_ICON = { Air:"✈️", Rail:"🚂", Road:"🚛", Sea:"🚢" };

function DetailDrawer({ shipment, onClose }) {
  if (!shipment) return null;
  const st = STATUS_STYLE(shipment.status);
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)", display:"flex", justifyContent:"flex-end" }}>
      <div onClick={e => e.stopPropagation()} style={{ width:380, height:"100%", background:"#0b2014", borderLeft:"1px solid rgba(255,255,255,0.08)", padding:"28px 24px", overflowY:"auto", animation:"slideIn 0.25s ease" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"#fff" }}>{shipment.id}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:2 }}>{shipment.merchant}</div>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.07)", border:"none", color:"#fff", width:32, height:32, borderRadius:8, cursor:"pointer", fontSize:16 }}>✕</button>
        </div>
        <div style={{ background:st.bg, border:`1px solid ${st.dot}44`, borderRadius:12, padding:"13px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:st.dot, boxShadow:`0 0 6px ${st.dot}` }} />
          <span style={{ fontSize:13, fontWeight:600, color:st.color }}>{shipment.status}</span>
          <span style={{ marginLeft:"auto", fontSize:12, color:"rgba(255,255,255,0.4)" }}>ETA: {shipment.eta}</span>
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"16px", marginBottom:16 }}>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:12 }}>Route</div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>From</div>
              <div style={{ fontSize:14, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{shipment.origin}</div>
            </div>
            <div style={{ flex:1, display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.15)" }} />
              <span style={{ fontSize:18 }}>{MODE_ICON[shipment.mode]}</span>
              <div style={{ flex:1, height:1, background:"rgba(255,255,255,0.15)" }} />
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>To</div>
              <div style={{ fontSize:14, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{shipment.dest}</div>
            </div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
          {[{label:"Transport",value:`${MODE_ICON[shipment.mode]} ${shipment.mode}`},{label:"Weight",value:shipment.weight},{label:"Carbon",value:shipment.carbon},{label:"Eco Score",value:`${shipment.eco}/100`}].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"12px" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.7px", marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:14, fontWeight:600, color:"#fff", fontFamily:"'Syne',sans-serif" }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, padding:"14px 16px", marginBottom:20 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.7px" }}>Eco Score</span>
            <span style={{ fontSize:12, fontWeight:700, color:shipment.eco>=80?"#4ade80":shipment.eco>=60?"#fbbf24":"#f87171" }}>{shipment.eco}/100</span>
          </div>
          <div style={{ height:6, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:3, width:`${shipment.eco}%`, background:shipment.eco>=80?"linear-gradient(90deg,#1db954,#4ade80)":shipment.eco>=60?"#f59e0b":"#f87171" }} />
          </div>
        </div>
        <button style={{ width:"100%", padding:"13px", borderRadius:11, border:"none", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(22,163,74,0.25)" }}>Optimize This Route →</button>
      </div>
    </div>
  );
}

export default function Shipments() {
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [modeFilter, setMode]     = useState("All");
  const [sortBy, setSortBy]       = useState("id");
  const [selected, setSelected]   = useState(null);
  const [page, setPage]           = useState(1);
  const PER_PAGE = 8;

  const filtered = ALL_SHIPMENTS
    .filter(s => {
      const q = search.toLowerCase();
      if (q && ![s.id,s.origin,s.dest,s.merchant].some(v => v.toLowerCase().includes(q))) return false;
      if (statusFilter !== "All" && s.status !== statusFilter) return false;
      if (modeFilter   !== "All" && s.mode   !== modeFilter)   return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "eco")    return b.eco - a.eco;
      if (sortBy === "carbon") return parseInt(a.carbon) - parseInt(b.carbon);
      return a.id < b.id ? 1 : -1;
    });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const counts = { total:ALL_SHIPMENTS.length, inTransit:ALL_SHIPMENTS.filter(s=>s.status==="In Transit").length, delivered:ALL_SHIPMENTS.filter(s=>s.status==="Delivered").length, pending:ALL_SHIPMENTS.filter(s=>s.status==="Pending").length };

  return (
    <div style={{ padding:"32px 36px", fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}} .row-hover{transition:background 0.15s;cursor:pointer;} .row-hover:hover{background:rgba(255,255,255,0.04)!important;} .filter-btn{transition:all 0.15s;cursor:pointer;} .eco-search{padding:10px 14px 10px 38px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;outline:none;width:260px;transition:border-color 0.2s;} .eco-search:focus{border-color:rgba(29,185,84,0.5);} .eco-search::placeholder{color:rgba(255,255,255,0.25);}`}</style>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"-0.5px" }}>Shipment Management</h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.35)", margin:"4px 0 0" }}>Track, filter and manage all active shipments</p>
        </div>
        <button style={{ padding:"10px 18px", borderRadius:10, border:"none", background:"linear-gradient(135deg,#16a34a,#15803d)", color:"#fff", fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 16px rgba(22,163,74,0.25)" }}>+ New Shipment</button>
      </div>

      {/* Stat pills */}
      <div style={{ display:"flex", gap:12, marginBottom:28 }}>
        {[{label:"Total",value:counts.total,color:"#fff",bg:"rgba(255,255,255,0.06)"},{label:"In Transit",value:counts.inTransit,color:"#60a5fa",bg:"rgba(59,130,246,0.1)"},{label:"Delivered",value:counts.delivered,color:"#4ade80",bg:"rgba(74,222,128,0.1)"},{label:"Pending",value:counts.pending,color:"#fbbf24",bg:"rgba(251,191,36,0.1)"}].map(s => (
          <div key={s.label} style={{ background:s.bg, borderRadius:10, padding:"10px 18px", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:s.color }}>{s.value}</span>
            <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap", marginBottom:20 }}>
        <div style={{ position:"relative" }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:"rgba(255,255,255,0.3)" }}>🔍</span>
          <input className="eco-search" placeholder="Search ID, city, merchant…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div style={{ width:1, height:28, background:"rgba(255,255,255,0.08)" }} />
        <div style={{ display:"flex", gap:6 }}>
          {["All","In Transit","Delivered","Pending"].map(s => (
            <button key={s} className="filter-btn" onClick={() => { setStatus(s); setPage(1); }} style={{ padding:"6px 12px", borderRadius:8, border:"none", background:statusFilter===s?"rgba(29,185,84,0.15)":"rgba(255,255,255,0.05)", color:statusFilter===s?"#4ade80":"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, outline:statusFilter===s?"1px solid rgba(29,185,84,0.3)":"none" }}>{s}</button>
          ))}
        </div>
        <div style={{ width:1, height:28, background:"rgba(255,255,255,0.08)" }} />
        <div style={{ display:"flex", gap:6 }}>
          {["All","✈️ Air","🚂 Rail","🚛 Road","🚢 Sea"].map(m => {
            const val = m === "All" ? "All" : m.split(" ")[1];
            return <button key={m} className="filter-btn" onClick={() => { setMode(val); setPage(1); }} style={{ padding:"6px 12px", borderRadius:8, border:"none", background:modeFilter===val?"rgba(59,130,246,0.15)":"rgba(255,255,255,0.05)", color:modeFilter===val?"#60a5fa":"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, fontWeight:500, outline:modeFilter===val?"1px solid rgba(59,130,246,0.3)":"none" }}>{m}</button>;
          })}
        </div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>Sort:</span>
          {[["id","Latest"],["eco","Eco Score"],["carbon","Carbon"]].map(([val,lbl]) => (
            <button key={val} className="filter-btn" onClick={() => setSortBy(val)} style={{ padding:"6px 12px", borderRadius:8, border:"none", background:sortBy===val?"rgba(255,255,255,0.1)":"transparent", color:sortBy===val?"#fff":"rgba(255,255,255,0.35)", fontFamily:"'DM Sans',sans-serif", fontSize:12 }}>{lbl}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
              {["Shipment ID","Route","Mode","Merchant","Carbon","Eco Score","Status","ETA"].map(h => (
                <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontSize:10, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.8px", fontWeight:500, whiteSpace:"nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={8} style={{ padding:"40px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:14 }}>No shipments match your filters</td></tr>
            ) : paginated.map(s => {
              const st = STATUS_STYLE(s.status);
              return (
                <tr key={s.id} className="row-hover" style={{ borderTop:"1px solid rgba(255,255,255,0.04)" }} onClick={() => setSelected(s)}>
                  <td style={{ padding:"13px 16px" }}><span style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:"#4ade80" }}>{s.id}</span></td>
                  <td style={{ padding:"13px 16px", fontSize:13, color:"rgba(255,255,255,0.7)", whiteSpace:"nowrap" }}>{s.origin} → {s.dest}</td>
                  <td style={{ padding:"13px 16px" }}><span style={{ fontSize:13 }}>{MODE_ICON[s.mode]}</span><span style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginLeft:5 }}>{s.mode}</span></td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:"rgba(255,255,255,0.55)", whiteSpace:"nowrap" }}>{s.merchant}</td>
                  <td style={{ padding:"13px 16px", fontSize:13, color:parseInt(s.carbon)>200?"#f87171":parseInt(s.carbon)>80?"#fbbf24":"#4ade80", fontWeight:500 }}>{s.carbon}</td>
                  <td style={{ padding:"13px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <div style={{ width:44, height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
                        <div style={{ height:"100%", borderRadius:2, width:`${s.eco}%`, background:s.eco>=80?"#1db954":s.eco>=60?"#f59e0b":"#f87171" }} />
                      </div>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>{s.eco}</span>
                    </div>
                  </td>
                  <td style={{ padding:"13px 16px" }}>
                    <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20, background:st.bg, color:st.color, display:"inline-flex", alignItems:"center", gap:5, whiteSpace:"nowrap" }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:st.dot, display:"inline-block" }} />
                      {s.status}
                    </span>
                  </td>
                  <td style={{ padding:"13px 16px", fontSize:12, color:"rgba(255,255,255,0.45)", whiteSpace:"nowrap" }}>{s.eta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>Showing {Math.min((page-1)*PER_PAGE+1,filtered.length)}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length}</span>
          <div style={{ display:"flex", gap:6 }}>
            {Array.from({length:totalPages},(_,i)=>i+1).map(p => (
              <button key={p} onClick={() => setPage(p)} style={{ width:30, height:30, borderRadius:7, border:"none", background:page===p?"rgba(29,185,84,0.2)":"rgba(255,255,255,0.05)", color:page===p?"#4ade80":"rgba(255,255,255,0.4)", fontFamily:"'DM Sans',sans-serif", fontSize:12, cursor:"pointer" }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {selected && <DetailDrawer shipment={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}