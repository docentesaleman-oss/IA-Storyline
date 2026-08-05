import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (index.html, css, js, imágenes, etc.)
app.use(express.static(__dirname));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Chat con Groq
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
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});