import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const handler = async (event: any) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { userContext, products } = JSON.parse(event.body);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
        },
      },
    });

    const prompt = `You are an expert e-commerce recommendation engine for a Pakistani kids brand "LittleHaven". 
    Based on the current user context: "${userContext}", select the top 3 most relevant products from this list: ${JSON.stringify(products)}.
    Return only the IDs of the products in a JSON array.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const recommendedIds = JSON.parse(responseText || "[]");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recommendedIds }),
    };
  } catch (error) {
    console.error("Netlify Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get recommendations" }),
    };
  }
};
