import { Languages } from "./types/languages";

class Compiler {
  constructor() {}

  async compileCode(code: string, language: Languages) {
    try {
      const data = await fetch(`${process.env.COMPILER_URI}/api/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const parsedData: {
        result: string;
      } = await data.json();

      return parsedData;
    } catch (e) {
      throw e;
    }
  }

  async compileFile(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      formData.append("originalname", file.name);
      const data = await fetch(`${process.env.COMPILER_URI}/api/compile-file`, {
        method: "POST",
        body: formData,
      });

      const parsedData: {
        result: string;
      } = await data.json();

      return parsedData;
    } catch (e) {
      throw e;
    }
  }

  async prettier(code: string, language: Languages) {
    try {
      const data = await fetch(`${process.env.COMPILER_URI}/api/prettier`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language }),
      });

      const parsedData: {
        formattedCode: string;
      } = await data.json();

      return parsedData;
    } catch (e) {
      throw e;
    }
  }
}

export { Compiler, Languages };
