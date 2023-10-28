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

// Ensure uploads and converted directories exist
fs.mkdirSync(uploadsDir, { recursive: true });
fs.mkdirSync(convertedDir, { recursive: true });

// Endpoint to handle file uploads
app.post('/upload', (req, res) => {
    console.log('Receiving file...');

    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('No file uploaded');
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.pdfFile;
    let uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.pdf';
    let uploadPath = path.join(uploadsDir, uniqueName);

    console.log(`Saving file as: ${uploadPath}`);

    uploadedFile.mv(uploadPath, function(err) {
        if (err) {
            console.error('Error saving the file:', err);
            return res.status(500).send(err);
        }

        console.log(`File saved at ${uploadPath}`);
        res.send({filePath: `uploads/${uniqueName}`});
    });
});

// Endpoint for converting PDF to HTML
app.get('/convert', (req, res) => {
    let uploadedFilePath = req.query.file;
    let fileName = path.basename(uploadedFilePath, '.pdf');
    let uploadPath = path.join(uploadsDir, fileName + '.pdf');
    let convertedPath = path.join(convertedDir, fileName + '.html');

    console.log(`Starting conversion of ${uploadPath} to HTML`);

    exec(`pdf2htmlEX --embed cfijo ${uploadPath} ${convertedPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Error in conversion process:', err);
            return res.status(500).send('Error in conversion process.');
        }
        console.log('Conversion complete.');
        res.send({filePath: `converted/${fileName}.html`});
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
