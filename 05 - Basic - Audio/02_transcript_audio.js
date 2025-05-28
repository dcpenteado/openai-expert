require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const fs = require('fs');

const transcriptAudio = async () => {
    const response = await client.audio.transcriptions.create({
        model: "gpt-4o-transcribe",
        file: fs.createReadStream("./audio_criado.mp3"), //ESSE ARQUIVO PRECISA EXISTIR NA RAIZ DO PROJETO
    });

    console.log(response.text);
}

transcriptAudio();

// INFORMAÇÕES ÚTEIS


// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/api-reference/audio/createTranscription