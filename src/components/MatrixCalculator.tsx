import React, { useState } from "react";
import { useMatrixStore } from "../stores/matrixStore";
import { MatrixInputSection } from "./MatrixInputSection";
import { OperationsPanel } from "./OperationPanel";
import { Outputs } from "./Outputs";

export const MatrixCalculator: React.FC = () => {
  const {
    matrix1Input,
    matrix2Input,
    result,
    error,
    setMatrix1Value,
    setMatrix2Value,
    addMatrix1Row,
    addMatrix1Column,
    removeMatrix1Row,
    removeMatrix1Column,
    addMatrix2Row,
    addMatrix2Column,
    removeMatrix2Row,
    removeMatrix2Column,
    add,
    multiply,
    transpose,
    determinant,
    getResultAsString,
    clearAll,
    fillMatrixesRandomly,
  } = useMatrixStore();

  const [detResult, setDetResult] = useState<number | null>(null);

  const handleDeterminant = (matrixNumber: 1 | 2) => {
    const result = determinant(matrixNumber);
    setDetResult(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-200 p-5">
      <header className="flex justify-between items-center mb-10 border-b border-gray-700 pb-5">
        <h1 className="text-4xl font-bold text-white">Matrix calculator</h1>
      </header>

      <div className="flex flex-col gap-10">
        <section className="flex-1">
          <h2 className="text-lg font-semibold mb-5 text-white">Inputs:</h2>

          <div className="grid grid-cols-3 gap-8 items-start">
            {/* Matrix 1 */}
            <MatrixInputSection
              label="Matrix 1:"
              input={matrix1Input}
              onValueChange={setMatrix1Value}
            />

            {/* Operations Panel */}
            <OperationsPanel
              onAdd={add}
              onMultiply={multiply}
              onTranspose={() => transpose(1)}
              onDeterminant={() => handleDeterminant(1)}
              onClear={clearAll}
              onAddRow1={addMatrix1Row}
              onAddRow2={addMatrix2Row}
              onAddCol1={addMatrix1Column}
              onAddCol2={addMatrix2Column}
              onRemoveRow1={removeMatrix1Row}
              onRemoveRow2={removeMatrix2Row}
              onRemoveCol1={removeMatrix1Column}
              onRemoveCol2={removeMatrix2Column}
              onFillRandomly={fillMatrixesRandomly}
            />

            {/* Matrix 2 */}
            <MatrixInputSection
              label="Matrix 2:"
              input={matrix2Input}
              onValueChange={setMatrix2Value}
            />
          </div>
        </section>

        {/* Outputs */}
        <Outputs
          detResult={detResult}
          result={result}
          error={error}
          getResultAsString={getResultAsString}
        />
      </div>
    </div>
  );
};