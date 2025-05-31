require('dotenv').config();
const { OpenAI } = require('openai');
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: [
            {
                role: "system",
                content: "Você é um assistente de programação especialista em node.js"
            },
            {
                role: "user",
                content: "meu nome é Diego"
            },
            {
                role: "user",
                content: "como você está se sentindo hoje?"
            },
            {
                role: "user",
                content: "preciso que me ajude com uma tarefa da faculdade!"
            },
            {
                role: "user",
                content: "Você lembra meu nome? Me explique a diferença entre let e const no node.js"
            }
        ]
    });

    console.log(response.output_text);
}

createResponse();