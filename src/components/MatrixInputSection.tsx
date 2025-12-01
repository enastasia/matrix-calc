import React from "react";
import type { MatrixInput } from "../stores/matrixStore";
import { MatrixGrid } from "./MatrixGrid";

interface MatrixInputSectionProps {
  label: string;
  input: MatrixInput;
  onValueChange: (row: number, col: number, value: number) => void;
}

export const MatrixInputSection: React.FC<MatrixInputSectionProps> = ({
  label,
  input,
  onValueChange,
}) => {
  return (
    <div className="flex flex-col overflow-scroll gap-2">
      <label className="font-semibold text-gray-400 text-sm">{label}</label>
      <MatrixGrid input={input} onValueChange={onValueChange} />
    </div>
  );
};