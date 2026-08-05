import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const completion = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            messages: [
  {
    role: "system",
    content: "Eres un asistente virtual. Responde siempre en español, de forma clara y natural. No mezcles idiomas salvo que el usuario lo solicite."
  },
  {
    role: "user",
    content: message
  }
],

            temperature: 0.7

        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: "Error al conectar con Groq."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});