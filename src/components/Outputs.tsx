import React from "react";

interface OutputsProps {
  detResult: number | null;
  result: any;
  error: string | null;
  getResultAsString: () => string;
}

export const Outputs: React.FC<OutputsProps> = ({
  detResult,
  result,
  error,
  getResultAsString,
}) => {
  return (
    <section className="flex-1">
      <h2 className="text-lg font-semibold mb-5 text-white">Outputs:</h2>
      <div className="flex flex-col gap-4">
        {detResult !== null && (
          <div className="bg-green-500/10 border border-green-500/30 p-5 rounded text-white">
            <p className="text-base">
              Визначник: <strong>{detResult}</strong>
            </p>
          </div>
        )}
        {result && (
          <div className="bg-white/95 p-5 rounded text-gray-900 font-mono text-2xl min-h-24 max-h-96 overflow-y-auto break-words whitespace-pre-wrap">
            <pre>{getResultAsString()}</pre>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 p-5 rounded text-red-600">
            <p>Помилка: {error}</p>
          </div>
        )}
      </div>
    </section>
  );
};
