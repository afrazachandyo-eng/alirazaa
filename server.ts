import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
  });

  // AI Product Recommendation Endpoint
  app.post("/api/ai/recommendations", async (req, res) => {
    try {
      const { userContext, products } = req.body;
      
      const prompt = `You are an expert e-commerce recommendation engine for a Pakistani kids brand "LittleHaven". 
      Based on the current user context: "${userContext}", select the top 3 most relevant products from this list: ${JSON.stringify(products)}.
      Return only the IDs of the products in a JSON array.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          }
        }
      });

      const responseText = result.response.text();
      const recommendedIds = JSON.parse(responseText || "[]");
      res.json({ recommendedIds });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
