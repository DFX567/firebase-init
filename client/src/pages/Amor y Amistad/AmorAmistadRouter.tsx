import AmorAmistadHome from "./AmorAmistadHome";

interface AmorAmistadRouterProps {
  onBack: () => void;
}

export default function AmorAmistadRouter({ onBack }: AmorAmistadRouterProps) {
  return <AmorAmistadHome onBack={onBack} />;
}
