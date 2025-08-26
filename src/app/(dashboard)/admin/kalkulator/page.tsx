import { StuntingCalculator } from "../../_components/stunting-calculator";

export default function AdminCalculatorPage() {
  return (
    <div>
      <StuntingCalculator
        title="Admin Kalkulator Stunting"
        description="Panel admin untuk menghitung status stunting anak"
        className="max-w-6xl mx-auto"
        showSubVillageFilter={true}
        showMeasurementHistory={true}
      />
    </div>
  );
}
