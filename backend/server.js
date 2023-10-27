const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.static('frontend/public'));

const uploadsDir = path.join(__dirname, 'uploads');
const convertedDir = path.join(__dirname, '..', 'frontend/converted');

app.post('/upload', (req, res) => {
    console.log('Receiving file...');

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No file uploaded.');
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.pdfFile;
    let timestamp = new Date().getTime();
    let uniqueFileName = `${timestamp}-${uploadedFile.name}`;
    let uploadPath = path.join(uploadsDir, uniqueFileName);
    let convertedFileName = uniqueFileName.replace('.pdf', '.html');
    let convertedPath = path.join(convertedDir, convertedFileName);

    console.log(`Uploading file: ${uniqueFileName}`);

    uploadedFile.mv(uploadPath, function(err) {
        if (err) {
            console.error('File upload failed:', err);
            return res.status(500).send(err);
        }

        console.log(`File uploaded. Starting conversion: ${uniqueFileName}`);

        exec(`pdf2htmlEX --embed cfijo ${uploadPath} ${convertedPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Conversion failed:', err);
                return res.status(500).send('Error in conversion process.');
            }
            console.log(`Conversion successful: ${convertedFileName}`);
            res.send({filePath: `converted/${convertedFileName}`});
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
