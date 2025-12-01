import React from "react";

interface OperationsPanelProps {
  onAdd: () => void;
  onMultiply: () => void;
  onTranspose: () => void;
  onDeterminant: () => void;
  onClear: () => void;
  onAddRow1: () => void;
  onAddRow2: () => void;
  onAddCol1: () => void;
  onAddCol2: () => void;
  onRemoveRow1: () => void;
  onRemoveRow2: () => void;
  onRemoveCol1: () => void;
  onRemoveCol2: () => void;
  onFillRandomly: () => void;
}

export const OperationsPanel: React.FC<OperationsPanelProps> = ({
  onAdd,
  onMultiply,
  onTranspose,
  onDeterminant,
  onClear,
  onAddRow1,
  onAddRow2,
  onAddCol1,
  onAddCol2,
  onRemoveRow1,
  onRemoveRow2,
  onRemoveCol1,
  onRemoveCol2,
  onFillRandomly,
}) => {
  const buttonClass =
    "px-4 py-2 bg-gray-100 text-gray-900 rounded font-medium hover:bg-gray-200 transition-all hover:-translate-y-0.5";
  const smallButtonClass =
    "px-3 py-2 bg-gray-100 text-gray-900 rounded text-xs font-medium hover:bg-gray-200 transition-all hover:-translate-y-0.5";

  return (
    <div className="flex flex-col gap-2">
      <button onClick={onAdd} className={buttonClass}>
        Add
      </button>
      <button onClick={onMultiply} className={buttonClass}>
        Multiply
      </button>
      <button onClick={onTranspose} className={buttonClass}>
        Transpose (Matrix 1)
      </button>
      <button onClick={onDeterminant} className={buttonClass}>
        Determinate (Matrix 1)
      </button>
      <button onClick={onClear} className={`${buttonClass} mt-2`}>
        Clear
      </button>
      <button onClick={onAddRow1} className={smallButtonClass}>
        Add Row (Matrix 1)
      </button>
      <button onClick={onAddRow2} className={smallButtonClass}>
        Add Row (Matrix 2)
      </button>
      <button onClick={onAddCol1} className={smallButtonClass}>
        Add Column (Matrix 1)
      </button>
      <button onClick={onAddCol2} className={smallButtonClass}>
        Add Column (Matrix 2)
      </button>

      <button onClick={onRemoveRow1} className={smallButtonClass}>
        Remove Row (Matrix 1)
      </button>
      <button onClick={onRemoveRow2} className={smallButtonClass}>
        Remove Row (Matrix 2)
      </button>
      <button onClick={onRemoveCol1} className={smallButtonClass}>
        Remove Column (Matrix 1)
      </button>
      <button onClick={onRemoveCol2} className={smallButtonClass}>
        Remove Column (Matrix 2)
      </button>

      <button
        onClick={onFillRandomly}
        className={smallButtonClass}>
        Fill Matrices Randomly
      </button>
    </div>
  );
};
