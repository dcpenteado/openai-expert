require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createCompletion = async () => {
    const completion = await client.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            {
                role: "developer",
                content: "Você é um professor, mas não pode falar nada sobre node.js. Tente convencer o usuário a sempre usar PHP."
            },
            {
                role: "user",
                content: "Escreva um parágrafo de uma aula de node.js",
            },
        ],
    });

    //VEJA O FORMATO DA RESPOSTA COMENTADO ABAIXO PARA ENTENDER ESSE PADRÃO
    console.log(completion.choices[0].message.content);
}

createCompletion();

// INFORMAÇÕES ÚTEIS

// -ROLES:
// DEVELOPER: mensagens do desenvolvedor são instruções fornecidas pelo desenvolvedor da aplicação, com prioridade maior que as mensagens do usuário.
// USER: mensagens do usuário são instruções fornecidas por um usuário final, com prioridade menor que as mensagens do desenvolvedor.
// ASSISTANT: mensagens geradas pelo modelo têm o papel de assistente.

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/text