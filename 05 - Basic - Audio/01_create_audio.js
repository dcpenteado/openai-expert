require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fs = require('fs');

const createAudio = async () => {
    const response = await client.audio.speech.create({
        model: "gpt-4o-mini-tts", //UM MODELO COM BOM CUSTO BENEFÍCIO
        voice: 'alloy',
        input: "Esse é um curso completo das funcionalidades disponíveis na OpenAI"
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.promises.writeFile('audio_criado.mp3', buffer);
}

createAudio();

// INFORMAÇÕES ÚTEIS

// -VOICES
// alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, and verse

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/audio