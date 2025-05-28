require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const readImage = async () => {
    const response = await client.responses.create({
        model: "gpt-4.1-nano",
        input: [
            { role: "user", content: "O que você enxerga nessa imagem?" },
            {
                role: "user",
                content: [
                    {
                        type: "input_image",
                        image_url: "https://www.shutterstock.com/image-photo/multiple-dogs-playing-water-swimming-600nw-2191098347.jpg",
                    }
                ],
            },
        ]
    });

    console.log(response.output_text);
}

readImage();


// INFORMAÇÕES ÚTEIS

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/quickstart?api-mode=responses#analyze-image-inputs