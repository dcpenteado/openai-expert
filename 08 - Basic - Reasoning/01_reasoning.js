require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "o3-mini", //UM MODELO COM BOM CUSTO BENEFÍCIO QUE ACEITA REASONING
        reasoning: {
            effort: "medium", //high, medium, low
            summary: 'detailed'
        },
        input: "Quantas telhas cerâmicas possui em média um telhado de uma casa de 100 metros quadrados?"
    });

    console.log(`Resposta: ${response.output_text}`);

    //RACIOCÍNIO
    const reasoning = response.output.find(o => o.type === 'reasoning')
    console.log(`**************** RACIOCÍNIO PARA CHEGAR NA RESPOSTA ****************`);

    if (reasoning && reasoning.summary) {
        reasoning.summary.forEach(s => {
            console.log(s.text)
        })
    }
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/responses/create
// https://platform.openai.com/docs/guides/reasoning-best-practices#page-top