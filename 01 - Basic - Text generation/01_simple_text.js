require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: "Escreva um parágrafo de uma aula de node.js"
    });

    console.log(response.output_text);
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/quickstart?api-mode=responses#page-top