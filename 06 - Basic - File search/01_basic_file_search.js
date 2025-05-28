require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fs = require('fs');

const createResponse = async () => {
    const file = await client.files.create({
        file: fs.createReadStream("files/receita_de_bolo.pdf"), //IMPORTANTE: O ARQUIVO PRECISA EXISTIR
        purpose: "user_data",
    });


    const response = await client.responses.create({
        model: "gpt-4.1-mini", //UM MODELO COM BOM CUSTO BENEFÍCIO QUE ACEITA FILE_SEARCH
        input: [
            {
                role: "user",
                content: [
                    {
                        type: "input_file",
                        file_id: file.id,
                    },
                    {
                        type: "input_text",
                        text: "Quantos ovos são necessários para fazer o bolo?",
                    },
                ],
            },
        ]
    });

    console.log(response.output_text);
}

createResponse();

// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/pdf-files?api-mode=responses