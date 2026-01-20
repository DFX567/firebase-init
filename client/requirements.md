## Packages
firebase | Required for Firebase Auth and integration
framer-motion | Complex animations and page transitions
lucide-react | Iconography

## Notes
Firebase Auth integration required in client/src/lib/firebase.ts
Environment variables VITE_FIREBASE_API_KEY, etc. are expected
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
