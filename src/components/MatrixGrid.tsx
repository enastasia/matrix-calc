import React from "react";
import type { MatrixInput } from "../stores/matrixStore";

interface MatrixGridProps {
  input: MatrixInput;
  onValueChange: (row: number, col: number, value: number) => void;
}

export const MatrixGrid: React.FC<MatrixGridProps> = ({
  input,
  onValueChange,
}) => {
  return (
    <div className="flex flex-col gap-1 bg-white/5 p-3 rounded border border-white/10">
      {input.data.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((value, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="number"
              value={value}
              onChange={(e) =>
                onValueChange(
                  rowIndex,
                  colIndex,
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-16 h-10 p-2 bg-white/90 border border-gray-300 rounded text-sm text-center text-gray-900 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 hover:border-gray-500 transition-all"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
