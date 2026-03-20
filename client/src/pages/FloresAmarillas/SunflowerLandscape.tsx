export default function SunflowerLandscape() {
  const sunflowers = [
    { left: "3%", height: 180, delay: "0s", duration: "3.2s" },
    { left: "10%", height: 210, delay: "0.4s", duration: "3.8s" },
    { left: "17%", height: 160, delay: "0.8s", duration: "3.0s" },
    { left: "24%", height: 230, delay: "0.2s", duration: "4.0s" },
    { left: "31%", height: 175, delay: "1.0s", duration: "3.5s" },
    { left: "38%", height: 200, delay: "0.6s", duration: "3.3s" },
    { left: "45%", height: 220, delay: "1.2s", duration: "3.7s" },
    { left: "52%", height: 165, delay: "0.3s", duration: "3.1s" },
    { left: "59%", height: 240, delay: "0.9s", duration: "4.2s" },
    { left: "66%", height: 185, delay: "0.5s", duration: "3.4s" },
    { left: "73%", height: 210, delay: "1.1s", duration: "3.6s" },
    { left: "80%", height: 170, delay: "0.7s", duration: "3.0s" },
    { left: "87%", height: 225, delay: "0.1s", duration: "3.9s" },
    { left: "93%", height: 190, delay: "1.3s", duration: "3.2s" },
  ];

  const clouds = [
    { top: "8%", left: "8%", width: 100, delay: "0s", duration: "18s" },
    { top: "14%", left: "55%", width: 140, delay: "4s", duration: "22s" },
    { top: "6%", left: "78%", width: 90, delay: "9s", duration: "16s" },
    { top: "18%", left: "30%", width: 120, delay: "2s", duration: "20s" },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden">
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-6deg); transform-origin: bottom center; }
          50% { transform: rotate(6deg); transform-origin: bottom center; }
        }
        @keyframes sway-alt {
          0%, 100% { transform: rotate(5deg); transform-origin: bottom center; }
          50% { transform: rotate(-5deg); transform-origin: bottom center; }
        }
        @keyframes float-cloud {
          0% { transform: translateX(-120px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120vw); opacity: 0; }
        }
        @keyframes sun-pulse {
          0%, 100% { box-shadow: 0 0 40px 20px rgba(253,224,71,0.4), 0 0 80px 40px rgba(251,191,36,0.2); }
          50% { box-shadow: 0 0 60px 30px rgba(253,224,71,0.6), 0 0 120px 60px rgba(251,191,36,0.3); }
        }
        @keyframes spin-petal {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200" />

      <div
        className="absolute rounded-full bg-yellow-300"
        style={{
          width: 90,
          height: 90,
          top: "6%",
          right: "12%",
          animation: "sun-pulse 3s ease-in-out infinite",
          boxShadow: "0 0 40px 20px rgba(253,224,71,0.4), 0 0 80px 40px rgba(251,191,36,0.2)",
        }}
      />

      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: cloud.top,
            left: cloud.left,
            animation: `float-cloud ${cloud.duration} linear ${cloud.delay} infinite`,
          }}
        >
          <div className="relative" style={{ width: cloud.width }}>
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{ width: cloud.width * 0.6, height: cloud.width * 0.35, top: "40%", left: "20%" }}
            />
            <div
              className="absolute bg-white rounded-full opacity-90"
              style={{ width: cloud.width * 0.5, height: cloud.width * 0.3, top: "20%", left: "30%" }}
            />
            <div
              className="absolute bg-white rounded-full opacity-85"
              style={{ width: cloud.width * 0.4, height: cloud.width * 0.25, top: "30%", left: "5%" }}
            />
            <div
              className="bg-white rounded-full opacity-90"
              style={{ width: cloud.width, height: cloud.width * 0.4 }}
            />
          </div>
        </div>
      ))}

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "32%",
          background: "linear-gradient(to bottom, #4ade80, #16a34a)",
        }}
      />

      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "30%",
          height: 18,
          background: "linear-gradient(to bottom, #65a30d, #4ade80)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        }}
      />

      {sunflowers.map((sf, i) => {
        const isAlt = i % 2 === 1;
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: sf.left,
              bottom: "28%",
              height: sf.height,
              width: 40,
              transformOrigin: "bottom center",
              animation: `${isAlt ? "sway-alt" : "sway"} ${sf.duration} ease-in-out ${sf.delay} infinite`,
            }}
          >
            <svg
              width={sf.height > 200 ? 44 : 36}
              height={sf.height > 200 ? 44 : 36}
              viewBox="0 0 44 44"
              style={{ flexShrink: 0 }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <ellipse
                  key={angle}
                  cx="22"
                  cy="22"
                  rx="7"
                  ry="13"
                  fill="#facc15"
                  opacity="0.95"
                  transform={`rotate(${angle}, 22, 22) translate(0, -14)`}
                />
              ))}
              <circle cx="22" cy="22" r="10" fill="#92400e" />
              <circle cx="22" cy="22" r="6" fill="#78350f" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <circle
                  key={a}
                  cx={22 + 4 * Math.cos((a * Math.PI) / 180)}
                  cy={22 + 4 * Math.sin((a * Math.PI) / 180)}
                  r="1.2"
                  fill="#451a03"
                  opacity="0.6"
                />
              ))}
            </svg>

            <div
              style={{
                flex: 1,
                width: 5,
                background: "linear-gradient(to bottom, #65a30d, #4ade80)",
                borderRadius: 4,
                position: "relative",
              }}
            >
              {sf.height > 170 && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "25%",
                      left: -12,
                    }}
                  >
                    <svg width="20" height="14" viewBox="0 0 20 14">
                      <ellipse cx="12" cy="7" rx="10" ry="6" fill="#4ade80" transform="rotate(-30, 12, 7)" />
                    </svg>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "45%",
                      right: -12,
                    }}
                  >
                    <svg width="20" height="14" viewBox="0 0 20 14">
                      <ellipse cx="8" cy="7" rx="10" ry="6" fill="#4ade80" transform="rotate(30, 8, 7)" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
