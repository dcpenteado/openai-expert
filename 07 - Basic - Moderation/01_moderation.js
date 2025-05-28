require('dotenv').config()
const { OpenAI } = require("openai");
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const createModeration = async () => {
    const response = await client.moderations.create({
        model: "omni-moderation-latest",
        input: "vou te bater até quase te matar"
    });

    console.log(response);

    if (response.results && response.results[0] && response.results[0].flagged) {
        console.log('CONTEÚDO IMPRÓPRIO DETECTADO!');
        console.log(response.results[0].categories)
    }
}

createModeration();

// INFORMAÇÕES ÚTEIS

// - CLASSIFICAÇÃO DE CONTEÚDO
// harassment: Conteúdo que expressa, incita ou promove linguagem de assédio contra qualquer alvo.
// harassment/threatening: Conteúdo de assédio que também inclui violência ou danos graves contra qualquer alvo.
// hate: Conteúdo que expressa, incita ou promove ódio com base em raça, gênero, etnia, religião, nacionalidade, orientação sexual, deficiência ou casta. Conteúdo odioso direcionado a grupos não protegidos (ex: jogadores de xadrez) é considerado assédio.
// hate/threatening: Conteúdo odioso que também inclui violência ou danos graves contra o grupo-alvo com base em raça, gênero, etnia, religião, nacionalidade, orientação sexual, deficiência ou casta.
// illicit: Conteúdo que oferece conselhos ou instruções sobre como cometer atos ilícitos. Uma frase como "como furtar" se encaixa nessa categoria.
// illicit/violent: Os mesmos tipos de conteúdo sinalizados pela categoria ilícita, mas que também incluem referências à violência ou à obtenção de uma arma.
// self-harm: Conteúdo que promove, incentiva ou retrata atos de automutilação, como suicídio, cortes e distúrbios alimentares.
// self-harm/intent: Conteúdo em que a pessoa expressa que está praticando ou pretende praticar atos de automutilação, como suicídio, cortes e distúrbios alimentares.
// self-harm/instructions: Conteúdo que incentiva a realização de atos de automutilação, como suicídio, cortes e distúrbios alimentares, ou que dá instruções ou conselhos sobre como cometer tais atos.
// sexual: Conteúdo com a intenção de provocar excitação sexual, como descrição de atividade sexual ou promoção de serviços sexuais (exceto educação sexual e bem-estar).
// sexual/minors: Conteúdo sexual que inclui um indivíduo com menos de 18 anos.
// violence: Conteúdo que retrata morte, violência ou lesão física.
// violence/graphic: Conteúdo que retrata morte, violência ou lesão física com detalhes gráficos.

// -DOCUMENTAÇÃO
// https://platform.openai.com/docs/guides/moderation#page-top