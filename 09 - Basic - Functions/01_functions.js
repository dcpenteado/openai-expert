require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const tools = [
    {
        type: "function",
        name: "busca_previsao_do_tempo",
        description: "Busca a previsão do tempo na localidade especificada.",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "A cidade em questão",
                }
            },
            required: ["location"],
        },
    },
];

//Perguntas
//São Paulo tem bons pontos turísticos para visitar?
//Qual a previsão do tempo em São Paulo hoje?

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        tools: tools,
        instructions: "Você é um guia turístico de cidades. Você sabe tudo sobre os pontos turísticos de cada cidade, ajuda pessoas a encontrarem bons lugares para conhecer.",
        input: "Qual a previsão do tempo em São Paulo hoje?", 
        tool_choice: "auto"
    });

    if (response.output_text) {
        console.log(response.output_text)
    }
    else {
        console.log('********** O SISTEMA DECIDIU CONSULTAR UMA FUNCTION! **********')

        if (response.output && response.output.filter(o => o.type === 'function_call')) {
            const call = response.output.filter(o => o.type === 'function_call')[0];

            if (call.name === 'busca_previsao_do_tempo') {
                try {
                    const args = JSON.parse(call.arguments);
                    console.log(`Buscando a previsão do tempo em ${args.location}`);
                }
                catch (err) {
                    console.log('Erro ao tratar argumentos!')
                }
            }

        }
    }
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/quickstart?api-mode=responses#page-top