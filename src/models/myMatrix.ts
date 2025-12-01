export class MyMatix {
    private _matrix: number[][];
  
    private static from2DArray(array: number[][]) {
      let matrix: number[][] = [];
  
      if (array.length === 0) {
        throw new Error("Неможливо створити матрицю без значень");
      }
      const height = array.length;
      const width = array[0].length;
  
      for (let i = 0; i < height; i++) {
        matrix[i] = [];
        for (let j = 0; j < width; j++) { 
          matrix[i][j] = array[i][j];
        }
      }
  
      return matrix;
    }
  
    private static fromString(str: string) {
      let matrix: number[][] = [];
      const rows = str.trim().split("\n");
  
      for (let i = 0; i < rows.length; i++) {
        const values = rows[i].trim().split(" ").map(Number);
        matrix.push(values);
      }
  
      return matrix;
    }
  
    private static fromStringArray(arr: string[]) {
      let matrix: number[][] = [];
  
      for (let i = 0; i < arr.length; i++) {
        const values = arr[i].trim().split(" ").map(Number);
        matrix.push(values);
      }
  
      return matrix;
    }
  
    private static fromMyMatrix(mat: MyMatix) {
      return mat._matrix;
    }
  
    constructor(data: number[][] | string | string[] | MyMatix) {
      if (Array.isArray(data)) {
        if (data.length === 0 || Array.isArray(data[0])) {
          this._matrix = MyMatix.from2DArray(data as number[][]);
        } else {
          this._matrix = MyMatix.fromStringArray(data as string[]);
        }
      } else if (typeof data === "string") {
        this._matrix = MyMatix.fromString(data);
      } else if (data instanceof MyMatix) {
        this._matrix = MyMatix.fromMyMatrix(data);
      } else {
        throw new Error("Непідтримуваний тип даних для створення матриці");
      }
    }
  
    get Height(): number {
      return this._matrix.length;
    }
  
    get Width(): number {
      return this._matrix[0].length;
    }
  
    static toString(matrix: MyMatix): string {
      let result: string = "";
      for (let i = 0; i < matrix.Height; i++) {
        result += matrix._matrix[i].join("\t") + "\n";
      }
      return result.trim();
    }
  
    public static add(a: MyMatix, b: MyMatix): MyMatix {
      if (a.Height !== b.Height || a.Width !== b.Width) {
        throw new Error(
          "Матриці повинні мати однакові розміри для додавання"
        );
      }
  
      let result: number[][] = [];
  
      for (let i = 0; i < a.Height; i++) {
        result[i] = [];
        for (let j = 0; j < a.Width; j++) {
          result[i][j] = a._matrix[i][j] + b._matrix[i][j];
        }
      }
  
      return new MyMatix(result);
    }
  
    public static multiply(a: MyMatix, b: MyMatix): MyMatix {
      if (a.Width !== b.Height) {
        throw new Error(
          "Кількість стовпців першої матриці повинна дорівнювати кількості рядків другої матриці для множення"
        );
      }
  
      let result: number[][] = [];
  
      for (let i = 0; i < a.Height; i++) {
        result[i] = [];
        for (let j = 0; j < b.Width; j++) {
          result[i][j] = 0;
          for (let k = 0; k < a.Width; k++) {
            result[i][j] += a._matrix[i][k] * b._matrix[k][j];
          }
        }
      }
  
      return new MyMatix(result);
    }
  
    public static getTranspose(matrix: MyMatix): MyMatix {
      let result: number[][] = [];
  
      for (let i = 0; i < matrix.Width; i++) {
        result[i] = [];
        for (let j = 0; j < matrix.Height; j++) {
          result[i][j] = matrix._matrix[j][i];
        }
      }
  
      return new MyMatix(result);
    }
  
    public static getTransposeCopy(matrix: MyMatix): MyMatix {
      return MyMatix.getTranspose(matrix);
    }
  
    public static calcDeterminant(matrix: MyMatix): number {
      if (matrix.Height !== matrix.Width) {
        throw new Error(
          "Матриця повинна бути квадратною для обчислення визначника"
        );
      }
  
      const n = matrix.Height;
  
      if (n === 1) {
        return matrix._matrix[0][0];
      }
  
      if (n === 2) {
        return (
          matrix._matrix[0][0] * matrix._matrix[1][1] -
          matrix._matrix[0][1] * matrix._matrix[1][0]
        );
      }
  
      let determinant = 0;
  
      for (let col = 0; col < n; col++) {
        let subMatrix: number[][] = [];
  
        for (let i = 1; i < n; i++) {
          subMatrix[i - 1] = [];
          for (let j = 0; j < n; j++) {
            if (j !== col) {
              subMatrix[i - 1].push(matrix._matrix[i][j]);
            }
          }
        }
  
        determinant +=
          (col % 2 === 0 ? 1 : -1) *
          matrix._matrix[0][col] *
          MyMatix.calcDeterminant(new MyMatix(subMatrix));
      }
  
      return determinant;
    }
  }
  