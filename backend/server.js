const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(fileUpload());

// Diretórios para armazenar e servir os arquivos
const uploadsDir = path.join(__dirname, 'uploads');
const convertedDir = path.join(__dirname, 'frontend', 'converted');

// Criar os diretórios se eles não existirem
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(convertedDir, { recursive: true });

// Configuração para servir arquivos estáticos
app.use(express.static('frontend/public'));
app.use('/uploads', express.static(uploadsDir));
app.use('/converted', express.static(convertedDir));

// Endpoint para upload de arquivos
app.post('/upload', (req, res) => {
    console.log('Recebendo arquivo...');

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('Nenhum arquivo foi enviado.');
        return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    let uploadedFile = req.files.pdfFile;
    let uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.pdf';
    let uploadPath = path.join(uploadsDir, uniqueName);

    console.log(`Salvando arquivo como: ${uploadPath}`);

    uploadedFile.mv(uploadPath, function(err) {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send(err);
        }

        console.log(`Arquivo salvo em ${uploadPath}`);
        res.send({filePath: `uploads/${uniqueName}`});
    });
});

// Endpoint para converter PDF em HTML
app.get('/convert', (req, res) => {
    let uploadedFilePath = req.query.file;
    let fileName = path.basename(uploadedFilePath, '.pdf');
    let uploadPath = path.join(uploadsDir, fileName + '.pdf');
    let convertedPath = path.join(fileName + '.html');

    console.log(`Iniciando conversão de ${uploadPath} para HTML`);

    exec(`pdf2htmlEX --embed cfijo ${uploadPath} ${convertedPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Erro no processo de conversão:', err);
            return res.status(500).send('Erro no processo de conversão.');
        }

        console.log('Conversão completa. Movendo o arquivo...');

        let finalConvertedPath = path.join(convertedDir, fileName + '.html');
        fs.renameSync(convertedPath, finalConvertedPath);

        console.log(`Arquivo movido para ${finalConvertedPath}`);
        res.send({filePath: `converted/${fileName}.html`});
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
