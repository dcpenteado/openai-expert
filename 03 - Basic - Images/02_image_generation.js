require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fs = require('fs');

const createImage = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: "Crie a imagem de um pug sorridente usando uma coleira vermelha",
        tools: [{ type: "image_generation" }],
    });

    const response_output = response.output.filter((output) => output.type === "image_generation_call");
    const image_data = response_output[0].result;

    if (image_data) {
        fs.writeFileSync("imagem_criada.png", Buffer.from(image_data, "base64"));
    }
}

createImage();


// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/image-generation?image-generation-model=gpt-image-1&api=responses