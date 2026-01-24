export const anniversaryTheme = () => {
  const root = document.documentElement;
  root.style.setProperty("--background", "330 100% 96%");
  root.style.setProperty("--foreground", "330 40% 20%");
  root.style.setProperty("--primary", "330 80% 55%");
  root.style.setProperty("--secondary", "350 90% 88%");
};

export const sanValentinTheme = {
  background: "bg-gradient-to-br from-rose-900 via-red-900 to-black",
  card: "bg-white/10 backdrop-blur-xl border border-white/20",
  accent: "text-rose-300",
  button: "bg-rose-500 hover:bg-rose-600 text-white",
};

export const cumpleTheme = {
  background: "bg-gradient-to-br from-indigo-900 via-purple-900 to-black",
  accent: "text-purple-300",
  card: "bg-white/10 backdrop-blur-xl",
  buttonActive: "bg-purple-500 text-white",
  buttonInactive: "bg-white/10 text-white/70 hover:bg-white/20",
};
