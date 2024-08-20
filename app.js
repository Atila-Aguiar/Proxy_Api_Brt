const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();

app.use(cors());
var onibus_linhas_importantes = []
setInterval(async () => {
  let url = "https://dados.mobilidade.rio/gps/brt"
    const response = await axios.get(url)
    onibus_linhas_importantes = response.data.veiculos.filter(x => parseInt(x.linha) != 0 && x.ignicao != 0 && x.velocidade != 0)
}, 20000);

app.get('/', async (req, res) => {
    res.json(onibus_linhas_importantes);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Servidor rodando na porta 5000');
});