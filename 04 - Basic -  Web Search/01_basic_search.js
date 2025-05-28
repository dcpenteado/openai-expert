require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-mini", //UM MODELO COM BOM CUSTO BENEFÍCIO QUE ACEITA WEB_SEARCH
        tools: [ { type: "web_search_preview" } ],
        input: "Qual é a notícia mais recente que se tem sobre os EUA?"
    });

    console.log(response.output_text);
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/tools-web-search?api-mode=responses#page-top