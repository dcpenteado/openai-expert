require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: "Escreva um parágrafo de uma aula de node.js",
        stream: true
    });

    for await (const event of response) {
        if (event.type === 'response.output_text.delta') process.stdout.write(event.delta);
    }

    console.log('\n\nFim da resposta!')
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/responses/create