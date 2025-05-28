require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createResponse = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-mini", //UM MODELO COM BOM CUSTO BENEFÍCIO QUE ACEITA WEB_SEARCH
        tools: [{ type: "web_search_preview" }],
        input: "Qual é a notícia mais recente que se tem sobre os EUA?"
    });

    //console.log(response.output_text);

    const messages = response.output.filter(o => o.type === 'message');

    messages.forEach(message => {
        if (message.content && message.content.length > 0) {
            message.content.forEach(content => {
                console.log(`Texto: ${content.text}`);

                if (content.annotations && content.annotations.length > 0) {
                    console.log('Annotations:')
                    content.annotations.forEach(annotation => {
                        console.log(annotation);
                    })
                }

            })
        }
    })
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/tools-web-search?api-mode=responses#page-top