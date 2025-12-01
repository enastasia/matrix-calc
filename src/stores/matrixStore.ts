import { create } from "zustand";
import { MyMatix } from "../models/myMatrix";

export interface MatrixInput {
  rows: number;
  cols: number;
  data: number[][];
}

export interface MatrixStoreState {
  matrix1Input: MatrixInput;
  matrix2Input: MatrixInput;
  result: MyMatix[] | null;

  setMatrix1Rows: (rows: number) => void;
  setMatrix1Cols: (cols: number) => void;
  setMatrix1Value: (row: number, col: number, value: number) => void;
  addMatrix1Row: () => void;
  addMatrix1Column: () => void;
  removeMatrix1Row: () => void;
  removeMatrix1Column: () => void;

  setMatrix2Rows: (rows: number) => void;
  setMatrix2Cols: (cols: number) => void;
  setMatrix2Value: (row: number, col: number, value: number) => void;
  addMatrix2Row: () => void;
  addMatrix2Column: () => void;
  removeMatrix2Row: () => void;
  removeMatrix2Column: () => void;

  add: () => void;
  multiply: () => void;
  transpose: (matrixNumber: 1 | 2) => void;
  determinant: (matrixNumber: 1 | 2) => number | null;
  fillMatrixesRandomly: () => void;

  getResultAsString: () => string;

  error: string | null;
  setError: (error: string | null) => void;

  clearAll: () => void;
}

const createEmptyMatrix = (rows: number, cols: number): number[][] => {
  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
};

const copyMatrix = (data: number[][]): number[][] => {
  return data.map((row) => [...row]);
};

export const useMatrixStore = create<MatrixStoreState>((set, get) => ({
  matrix1Input: {
    rows: 2,
    cols: 2,
    data: createEmptyMatrix(2, 2),
  },
  matrix2Input: {
    rows: 2,
    cols: 2,
    data: createEmptyMatrix(2, 2),
  },
  result: null,
  error: null,

  setMatrix1Rows: (rows) => {
    if (rows < 1) {
      get().setError("Мінімум 1 рядок");
      return;
    }
    set((state) => {
      const newData = createEmptyMatrix(rows, state.matrix1Input.cols);
      for (let i = 0; i < Math.min(rows, state.matrix1Input.data.length); i++) {
        for (let j = 0; j < state.matrix1Input.cols; j++) {
          newData[i][j] = state.matrix1Input.data[i][j];
        }
      }
      return {
        matrix1Input: { rows, cols: state.matrix1Input.cols, data: newData },
        error: null,
      };
    });
  },

  setMatrix1Cols: (cols) => {
    if (cols < 1) {
      get().setError("Мінімум 1 стовпець");
      return;
    }
    set((state) => {
      const newData = createEmptyMatrix(state.matrix1Input.rows, cols);
      for (let i = 0; i < state.matrix1Input.rows; i++) {
        for (let j = 0; j < Math.min(cols, state.matrix1Input.cols); j++) {
          newData[i][j] = state.matrix1Input.data[i][j];
        }
      }
      return {
        matrix1Input: { rows: state.matrix1Input.rows, cols, data: newData },
        error: null,
      };
    });
  },

  setMatrix1Value: (row, col, value) => {
    set((state) => {
      const newData = copyMatrix(state.matrix1Input.data);
      if (row < newData.length && col < newData[row].length) {
        newData[row][col] = value;
      }
      return {
        matrix1Input: { ...state.matrix1Input, data: newData },
        error: null,
      };
    });
  },

  addMatrix1Row: () => {
    set((state) => {
      const newRow = Array(state.matrix1Input.cols).fill(0);
      const newData = [...copyMatrix(state.matrix1Input.data), newRow];
      return {
        matrix1Input: {
          rows: state.matrix1Input.rows + 1,
          cols: state.matrix1Input.cols,
          data: newData,
        },
        error: null,
      };
    });
  },

  addMatrix1Column: () => {
    set((state) => {
      const newData = copyMatrix(state.matrix1Input.data).map((row) => [
        ...row,
        0,
      ]);
      return {
        matrix1Input: {
          rows: state.matrix1Input.rows,
          cols: state.matrix1Input.cols + 1,
          data: newData,
        },
        error: null,
      };
    });
  },

  removeMatrix1Row: () => {
    set((state) => {
      if (state.matrix1Input.rows <= 1) {
        return { error: "Не можна видалити останній рядок" };
      }
      const newData = copyMatrix(state.matrix1Input.data).slice(0, -1);
      return {
        matrix1Input: {
          rows: state.matrix1Input.rows - 1,
          cols: state.matrix1Input.cols,
          data: newData,
        },
        error: null,
      };
    });
  },

  removeMatrix1Column: () => {
    set((state) => {
      if (state.matrix1Input.cols <= 1) {
        return { error: "Не можна видалити останній стовпець" };
      }
      const newData = copyMatrix(state.matrix1Input.data).map((row) =>
        row.slice(0, -1)
      );
      return {
        matrix1Input: {
          rows: state.matrix1Input.rows,
          cols: state.matrix1Input.cols - 1,
          data: newData,
        },
        error: null,
      };
    });
  },

  setMatrix2Rows: (rows) => {
    if (rows < 1) {
      get().setError("Мінімум 1 рядок");
      return;
    }
    set((state) => {
      const newData = createEmptyMatrix(rows, state.matrix2Input.cols);
      for (let i = 0; i < Math.min(rows, state.matrix2Input.data.length); i++) {
        for (let j = 0; j < state.matrix2Input.cols; j++) {
          newData[i][j] = state.matrix2Input.data[i][j];
        }
      }
      return {
        matrix2Input: { rows, cols: state.matrix2Input.cols, data: newData },
        error: null,
      };
    });
  },

  setMatrix2Cols: (cols) => {
    if (cols < 1) {
      get().setError("Мінімум 1 стовпець");
      return;
    }
    set((state) => {
      const newData = createEmptyMatrix(state.matrix2Input.rows, cols);
      for (let i = 0; i < state.matrix2Input.rows; i++) {
        for (let j = 0; j < Math.min(cols, state.matrix2Input.cols); j++) {
          newData[i][j] = state.matrix2Input.data[i][j];
        }
      }
      return {
        matrix2Input: { rows: state.matrix2Input.rows, cols, data: newData },
        error: null,
      };
    });
  },

  setMatrix2Value: (row, col, value) => {
    set((state) => {
      const newData = copyMatrix(state.matrix2Input.data);
      if (row < newData.length && col < newData[row].length) {
        newData[row][col] = value;
      }
      return {
        matrix2Input: { ...state.matrix2Input, data: newData },
        error: null,
      };
    });
  },

  addMatrix2Row: () => {
    set((state) => {
      const newRow = Array(state.matrix2Input.cols).fill(0);
      const newData = [...copyMatrix(state.matrix2Input.data), newRow];
      return {
        matrix2Input: {
          rows: state.matrix2Input.rows + 1,
          cols: state.matrix2Input.cols,
          data: newData,
        },
        error: null,
      };
    });
  },

  addMatrix2Column: () => {
    set((state) => {
      const newData = copyMatrix(state.matrix2Input.data).map((row) => [
        ...row,
        0,
      ]);
      return {
        matrix2Input: {
          rows: state.matrix2Input.rows,
          cols: state.matrix2Input.cols + 1,
          data: newData,
        },
        error: null,
      };
    });
  },

  removeMatrix2Row: () => {
    set((state) => {
      if (state.matrix2Input.rows <= 1) {
        return { error: "Не можна видалити останній рядок" };
      }
      const newData = copyMatrix(state.matrix2Input.data).slice(0, -1);
      return {
        matrix2Input: {
          rows: state.matrix2Input.rows - 1,
          cols: state.matrix2Input.cols,
          data: newData,
        },
        error: null,
      };
    });
  },

  removeMatrix2Column: () => {
    set((state) => {
      if (state.matrix2Input.cols <= 1) {
        return { error: "Не можна видалити останній стовпець" };
      }
      const newData = copyMatrix(state.matrix2Input.data).map((row) =>
        row.slice(0, -1)
      );
      return {
        matrix2Input: {
          rows: state.matrix2Input.rows,
          cols: state.matrix2Input.cols - 1,
          data: newData,
        },
        error: null,
      };
    });
  },

  add: () => {
    try {
      const { matrix1Input, matrix2Input } = get();
      const m1 = new MyMatix(matrix1Input.data);
      const m2 = new MyMatix(matrix2Input.data);

      const result = MyMatix.add(m1, m2);
      const current = get().result;
      set({ result: current ? [...current, result] : [result], error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка при додаванні";
      set({ error: message });
    }
  },

  multiply: () => {
    try {
      const { matrix1Input, matrix2Input } = get();
      const m1 = new MyMatix(matrix1Input.data);
      const m2 = new MyMatix(matrix2Input.data);

      const result = MyMatix.multiply(m1, m2);
      const current = get().result;
      set({ result: current ? [...current, result] : [result], error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка при множенні";
      set({ error: message });
    }
  },

  transpose: (matrixNumber) => {
    try {
      const input =
        matrixNumber === 1 ? get().matrix1Input : get().matrix2Input;
      const matrix = new MyMatix(input.data);
      const result = MyMatix.getTranspose(matrix);
      const current = get().result;
      set({ result: current ? [...current, result] : [result], error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Помилка при транспонуванні";
      set({ error: message });
    }
  },

  determinant: (matrixNumber) => {
    try {
      const input =
        matrixNumber === 1 ? get().matrix1Input : get().matrix2Input;
      const matrix = new MyMatix(input.data);

      if (matrix.Height !== matrix.Width) {
        throw new Error("Матриця має бути квадратною");
      }

      const det = MyMatix.calcDeterminant(matrix);
      set({ error: null });
      return det;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Помилка при обчисленні визначника";
      set({ error: message });
      return null;
    }
  },

  getResultAsString: () => {
    const { result } = get();
    if (!result) return "";
    const lines: string[] = [];
    result.forEach((matrix, index) => {
      lines.push(`Результат ${index + 1}:\n${MyMatix.toString(matrix)}\n`);
    });
    return lines.join("\n");
  },

  setError: (error: string | null) => {
    set({ error });
  },

  fillMatrixesRandomly: () => {
    set((state) => {
      const fillRandom = (rows: number, cols: number): number[][] => {
        const data: number[][] = [];
        for (let i = 0; i < rows; i++) {
          data[i] = [];
          for (let j = 0; j < cols; j++) {
            data[i][j] = Math.floor(Math.random() * 25) - 12; // Випадкові числа від -12 до 12
          }
        }
        return data;
      };

      return {
        matrix1Input: {
          ...state.matrix1Input,
          data: fillRandom(
            state.matrix1Input.rows,
            state.matrix1Input.cols
          ),
        },
        matrix2Input: {
          ...state.matrix2Input,
          data: fillRandom(
            state.matrix2Input.rows,
            state.matrix2Input.cols
          ),
        },
        error: null,
      };
    });
  },

  clearAll: () => {
    set({
      matrix1Input: {
        rows: 2,
        cols: 2,
        data: createEmptyMatrix(2, 2),
      },
      matrix2Input: {
        rows: 2,
        cols: 2,
        data: createEmptyMatrix(2, 2),
      },
      result: null,
      error: null,
    });
  },
}));
