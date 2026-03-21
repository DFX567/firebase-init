import { useEffect, useRef } from "react";

const W = 320; // ancho fijo del ramo

function Sunflower({ size = 90, angle = 0 }: { size?: number; angle?: number }) {
  const cx = size / 2, cy = size / 2;
  const pLen = size * 0.46, pW = size * 0.17, cR = size * 0.19;
  const id = `sf${size}${angle < 0 ? "n" : "p"}${Math.abs(angle)}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ transform:`rotate(${angle}deg)`, display:"block", overflow:"visible" }}>
      <defs>
        <radialGradient id={`pa-${id}`} cx="50%" cy="8%" r="92%">
          <stop offset="0%" stopColor="#fef9c3"/><stop offset="38%" stopColor="#fde047"/><stop offset="100%" stopColor="#ca8a04"/>
        </radialGradient>
        <radialGradient id={`pb-${id}`} cx="50%" cy="8%" r="92%">
          <stop offset="0%" stopColor="#fef08a"/><stop offset="55%" stopColor="#facc15"/><stop offset="100%" stopColor="#a16207"/>
        </radialGradient>
        <radialGradient id={`cc-${id}`} cx="36%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#b45309"/><stop offset="48%" stopColor="#78350f"/><stop offset="100%" stopColor="#3b1200"/>
        </radialGradient>
      </defs>
      {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((a,i)=>(
        <ellipse key={`b${i}`} cx={cx} cy={cy-pLen*0.5} rx={pW*0.48} ry={pLen*0.5}
          fill={`url(#pb-${id})`} opacity="0.72" transform={`rotate(${a+10},${cx},${cy})`}/>
      ))}
      {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((a,i)=>(
        <ellipse key={`f${i}`} cx={cx} cy={cy-pLen*0.52} rx={pW*0.54} ry={pLen*0.52}
          fill={`url(#pa-${id})`} opacity="0.95" transform={`rotate(${a},${cx},${cy})`}/>
      ))}
      <circle cx={cx} cy={cy} r={cR*1.12} fill="#1c0500" opacity="0.22"/>
      <circle cx={cx} cy={cy} r={cR} fill={`url(#cc-${id})`}/>
      {Array.from({length:38},(_,i)=>{
        const t=i/38,sa=i*137.5*Math.PI/180,r=cR*0.87*Math.sqrt(t);
        return <circle key={`s${i}`} cx={cx+r*Math.cos(sa)} cy={cy+r*Math.sin(sa)}
          r={size*0.015} fill="#1c0500" opacity={0.42+t*0.48}/>;
      })}
      <ellipse cx={cx-cR*0.28} cy={cy-cR*0.3} rx={cR*0.3} ry={cR*0.17} fill="rgba(255,215,120,0.22)"/>
    </svg>
  );
}

// Configuración de las 5 flores dentro del ramo (posiciones en % del ancho W)
const FLOWERS = [
  { xPct:0.20, stemH:210, size:76,  angle:-20, leafL:true  },
  { xPct:0.35, stemH:235, size:84,  angle: -7, leafL:true  },
  { xPct:0.50, stemH:255, size:90,  angle:  1, leafL:false },
  { xPct:0.65, stemH:233, size:82,  angle:  9, leafL:false },
  { xPct:0.80, stemH:208, size:76,  angle: 22, leafL:false },
];

const WRAP_H  = 105;
const WRAP_W  = W * 0.56;
const WRAP_X  = (W - WRAP_W) / 2;
const TOTAL_H = 370; // altura total del componente ramo

function StemsSVG() {
  const stemBase = TOTAL_H - WRAP_H + WRAP_H * 0.12;
  return (
    <svg width={W} height={TOTAL_H} viewBox={`0 0 ${W} ${TOTAL_H}`}
      style={{ position:"absolute", top:0, left:0, pointerEvents:"none" }}>
      <defs>
        <linearGradient id="wg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7"/><stop offset="45%" stopColor="#fde68a"/><stop offset="100%" stopColor="#f59e0b"/>
        </linearGradient>
        <linearGradient id="ws2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.13)"/><stop offset="25%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="75%" stopColor="rgba(0,0,0,0)"/><stop offset="100%" stopColor="rgba(0,0,0,0.13)"/>
        </linearGradient>
      </defs>

      {FLOWERS.map((f, i) => {
        const tx = W * f.xPct;
        const ty = TOTAL_H - f.stemH;
        const bx = WRAP_X + WRAP_W * (0.15 + i * 0.175);
        const by = stemBase;
        const cpx = (tx + bx) / 2 + (f.leafL ? -10 : 10);
        const cpy = ty + (by - ty) * 0.55;
        const ly1 = ty + (by - ty) * 0.32;
        const ly2 = ty + (by - ty) * 0.60;
        return (
          <g key={i}>
            <path d={`M${tx},${ty} Q${cpx},${cpy} ${bx},${by}`}
              stroke="#3d6b35" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
            <path d={`M${tx},${ty} Q${cpx},${cpy} ${bx},${by}`}
              stroke="#5a9e4e" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45"/>
            {/* hoja 1 */}
            <path d={f.leafL
              ? `M${tx},${ly1} Q${tx-22},${ly1-15} ${tx-34},${ly1+2} Q${tx-10},${ly1+6} ${tx},${ly1}Z`
              : `M${tx},${ly1} Q${tx+22},${ly1-15} ${tx+34},${ly1+2} Q${tx+10},${ly1+6} ${tx},${ly1}Z`}
              fill="#4a7c3f" opacity="0.88"/>
            {/* hoja 2 */}
            <path d={!f.leafL
              ? `M${tx},${ly2} Q${tx-20},${ly2-13} ${tx-32},${ly2+2} Q${tx-8},${ly2+5} ${tx},${ly2}Z`
              : `M${tx},${ly2} Q${tx+20},${ly2-13} ${tx+32},${ly2+2} Q${tx+8},${ly2+5} ${tx},${ly2}Z`}
              fill="#5a9e4e" opacity="0.75"/>
          </g>
        );
      })}

      {/* Envoltorio */}
      <path d={`M${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08} L${WRAP_X+WRAP_W*0.12},${TOTAL_H} L${WRAP_X+WRAP_W*0.88},${TOTAL_H} L${WRAP_X+WRAP_W},${TOTAL_H-WRAP_H+WRAP_H*0.08} Q${W/2},${TOTAL_H-WRAP_H-WRAP_H*0.02} ${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08}Z`}
        fill="url(#wg2)"/>
      <path d={`M${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08} L${WRAP_X+WRAP_W*0.12},${TOTAL_H} L${WRAP_X+WRAP_W*0.28},${TOTAL_H} L${WRAP_X+WRAP_W*0.22},${TOTAL_H-WRAP_H+WRAP_H*0.08}Z`}
        fill="rgba(251,191,36,0.4)"/>
      <path d={`M${WRAP_X+WRAP_W},${TOTAL_H-WRAP_H+WRAP_H*0.08} L${WRAP_X+WRAP_W*0.88},${TOTAL_H} L${WRAP_X+WRAP_W*0.72},${TOTAL_H} L${WRAP_X+WRAP_W*0.78},${TOTAL_H-WRAP_H+WRAP_H*0.08}Z`}
        fill="rgba(251,191,36,0.4)"/>
      <path d={`M${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08} L${WRAP_X+WRAP_W*0.12},${TOTAL_H} L${WRAP_X+WRAP_W*0.88},${TOTAL_H} L${WRAP_X+WRAP_W},${TOTAL_H-WRAP_H+WRAP_H*0.08} Q${W/2},${TOTAL_H-WRAP_H-WRAP_H*0.02} ${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08}Z`}
        fill="url(#ws2)"/>
      <path d={`M${WRAP_X},${TOTAL_H-WRAP_H+WRAP_H*0.08} Q${W/2},${TOTAL_H-WRAP_H-WRAP_H*0.05} ${WRAP_X+WRAP_W},${TOTAL_H-WRAP_H+WRAP_H*0.08}`}
        stroke="#f59e0b" strokeWidth="2" fill="none" opacity="0.7"/>
      {Array.from({length:5},(_,i)=>(
        <line key={i}
          x1={WRAP_X+WRAP_W*(0.16+i*0.155)} y1={TOTAL_H-WRAP_H+WRAP_H*0.1}
          x2={WRAP_X+WRAP_W*(0.13+i*0.155)} y2={TOTAL_H-WRAP_H*0.18}
          stroke="rgba(202,138,4,0.28)" strokeWidth="1.5"/>
      ))}
      {/* Lazo */}
      <g transform={`translate(${W/2},${TOTAL_H-WRAP_H+WRAP_H*0.04})`}>
        <path d="M0,0 Q-22,-24 -34,-9 Q-20,-2 0,0Z" fill="#d97706" opacity="0.95"/>
        <path d="M0,0 Q22,-24 34,-9 Q20,-2 0,0Z"  fill="#d97706" opacity="0.95"/>
        <circle cx="0" cy="0" r="6.5" fill="#f59e0b"/>
        <circle cx="0" cy="0" r="3.5" fill="#fbbf24"/>
      </g>
    </svg>
  );
}

export default function SunflowerLandscape() {
  const injected = useRef(false);

  useEffect(()=>{
    if(injected.current) return;
    injected.current = true;
    const s = document.createElement("style");
    s.textContent = `
      @keyframes bouquet-sway {
        0%,100%{ transform:rotate(-2deg); }
        50%    { transform:rotate(2deg);  }
      }
      @keyframes cloud-f { 0%,100%{transform:translateX(0)} 50%{transform:translateX(18px)} }
      @keyframes sun-p {
        0%,100%{box-shadow:0 0 38px 16px rgba(253,224,71,0.55),0 0 75px 38px rgba(251,191,36,0.28);transform:scale(1)}
        50%{box-shadow:0 0 55px 26px rgba(253,224,71,0.65),0 0 105px 52px rgba(251,191,36,0.35);transform:scale(1.06)}
      }
      @keyframes petal-fall {
        0%{opacity:.8;transform:translateY(0) rotate(0deg)}
        100%{opacity:0;transform:translateY(-85px) translateX(22px) rotate(190deg)}
      }
      @keyframes gs  {0%,100%{transform-origin:bottom center;transform:rotate(-3.5deg)} 50%{transform:rotate(3.5deg)}}
      @keyframes gsa {0%,100%{transform-origin:bottom center;transform:rotate(3.5deg)}  50%{transform:rotate(-3.5deg)}}
    `;
    document.head.appendChild(s);
    return ()=>{ try{document.head.removeChild(s);}catch{} };
  },[]);

  const petals = Array.from({length:7},(_,i)=>({
    left:`${18+i*10}%`, bottom:`${42+(i%3)*5}%`,
    delay:`${i*1.1}s`, dur:`${4.5+(i%3)*1.2}s`,
  }));

  return (
    <div className="w-full h-full relative overflow-hidden select-none">

      {/* Cielo */}
      <div className="absolute inset-0" style={{
        background:"linear-gradient(175deg,#bae6fd 0%,#e0f2fe 28%,#fef9c3 55%,#fef08a 76%,#fde047 100%)"
      }}/>
      <div className="absolute inset-0" style={{
        background:"radial-gradient(ellipse 72% 52% at 70% 20%,rgba(255,255,255,0.28) 0%,transparent 65%)"
      }}/>

      {/* Sol */}
      <div style={{position:"absolute",top:"5%",right:"9%",width:70,height:70,borderRadius:"50%",
        background:"radial-gradient(circle,#fef9c3 18%,#fde047 52%,#f59e0b 100%)",
        animation:"sun-p 3s ease-in-out infinite"}}/>

      {/* Nubes */}
      {[{t:"7%",l:"4%",w:108,d:"19s",dl:"0s"},{t:"11%",l:"52%",w:145,d:"25s",dl:"7s"},{t:"5%",l:"73%",w:82,d:"17s",dl:"12s"}].map((c,i)=>(
        <div key={i} style={{position:"absolute",top:c.t,left:c.l,animation:`cloud-f ${c.d} ease-in-out ${c.dl} infinite`,opacity:0.72}}>
          <div style={{position:"relative",width:c.w,height:c.w*0.42}}>
            <div style={{position:"absolute",bottom:0,width:c.w,height:c.w*0.33,background:"white",borderRadius:"50%",opacity:0.92}}/>
            <div style={{position:"absolute",bottom:c.w*0.14,left:"23%",width:c.w*0.46,height:c.w*0.27,background:"white",borderRadius:"50%",opacity:0.87}}/>
            <div style={{position:"absolute",bottom:c.w*0.1,left:"7%",width:c.w*0.31,height:c.w*0.19,background:"white",borderRadius:"50%",opacity:0.8}}/>
          </div>
        </div>
      ))}

      {/* Colinas suaves */}
      <div style={{position:"absolute",bottom:"17%",left:"-10%",right:"-10%",height:"30%",
        background:"linear-gradient(to bottom,#86efac,#4ade80)",
        borderRadius:"60% 60% 0 0/100% 100% 0 0",opacity:0.55,zIndex:1}}/>
      <div style={{position:"absolute",bottom:"17%",left:"-22%",right:"28%",height:"24%",
        background:"linear-gradient(to bottom,#a3e635,#65a30d)",
        borderRadius:"60% 60% 0 0/100% 100% 0 0",opacity:0.45,zIndex:1}}/>
      <div style={{position:"absolute",bottom:"17%",left:"24%",right:"-22%",height:"22%",
        background:"linear-gradient(to bottom,#a3e635,#65a30d)",
        borderRadius:"60% 60% 0 0/100% 100% 0 0",opacity:0.45,zIndex:1}}/>

      {/* Pétalos */}
      {petals.map((p,i)=>(
        <div key={i} style={{position:"absolute",left:p.left,bottom:p.bottom,width:10,height:6,
          background:"linear-gradient(135deg,#fde047,#f59e0b)",borderRadius:"50% 0 50% 0",
          animation:`petal-fall ${p.dur} ease-in-out ${p.delay} infinite`,
          pointerEvents:"none",opacity:0.7,zIndex:3}}/>
      ))}

      {/* Abeja */}
      <div style={{position:"absolute",top:"30%",left:"22%",fontSize:20,pointerEvents:"none",
        zIndex:5,animation:"cloud-f 5s ease-in-out 1s infinite"}}>🐝</div>

      {/* Suelo */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"20%",
        background:"linear-gradient(to bottom,#4ade80 0%,#22c55e 40%,#15803d 100%)",zIndex:8}}/>
      <div style={{position:"absolute",bottom:"18%",left:"-4%",right:"-4%",height:22,
        background:"linear-gradient(to bottom,#65a30d,#86efac)",
        borderRadius:"50% 50% 0 0/100% 100% 0 0",zIndex:8}}/>

      {/* Hierba */}
      {Array.from({length:34},(_,i)=>(
        <div key={i} style={{position:"absolute",bottom:"18%",left:`${(i*3.1)%100}%`,
          width:2.5+(i%3)*0.8,height:10+(i%5)*3,
          background:i%3===0?"#86efac":i%2===0?"#4ade80":"#22c55e",
          borderRadius:"2px 2px 0 0",transformOrigin:"bottom center",
          animation:`${i%2===0?"gs":"gsa"} ${2+(i%3)*0.4}s ease-in-out ${(i*0.1)%1.5}s infinite`,
          zIndex:9,opacity:0.85}}/>
      ))}

      {/* ── Ramo centrado — contenedor con transformOrigin bottom center ── */}
      <div style={{
        position:"absolute",
        bottom:"16%",
        left:"50%",
        marginLeft: -(W/2),
        width: W,
        height: TOTAL_H,
        transformOrigin:"bottom center",
        animation:"bouquet-sway 4.5s ease-in-out infinite",
        zIndex:10,
      }}>
        {/* Tallos + envoltorio SVG */}
        <StemsSVG/>

        {/* Flores posicionadas absolutamente sobre el SVG */}
        {FLOWERS.map((f,i)=>(
          <div key={i} style={{
            position:"absolute",
            left: W * f.xPct - f.size/2,
            top:  TOTAL_H - f.stemH - f.size/2,
            width: f.size,
            height: f.size,
            zIndex: 2,
          }}>
            <Sunflower size={f.size} angle={f.angle}/>
          </div>
        ))}
      </div>

      {/* Flores pequeñas suelo */}
      {["8%","22%","40%","60%","78%","92%"].map((left,i)=>(
        <div key={i} style={{position:"absolute",bottom:"18%",left,fontSize:13,
          zIndex:11,pointerEvents:"none",
          animation:`${i%2===0?"gs":"gsa"} ${2.5+i*0.3}s ease-in-out ${i*0.4}s infinite`}}>🌼</div>
      ))}
    </div>
  );
}
