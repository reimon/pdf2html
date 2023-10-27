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
        console.log('No file uploaded');
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.pdfFile;
    let uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    let uploadPath = path.join(uploadsDir, uniqueName + '.pdf');
    let convertedPath = path.join(convertedDir, uniqueName + '.html');

    console.log(`Saving file as: ${uploadPath}`);

    uploadedFile.mv(uploadPath, function(err) {
        if (err) {
            console.error('Error saving the file:', err);
            return res.status(500).send(err);
        }

        console.log(`File saved. Starting conversion to HTML: ${convertedPath}`);

        exec(`pdf2htmlEX  ${uploadPath} ${convertedPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error('Error in conversion process:', err);
                return res.status(500).send('Error in conversion process.');
            }
            console.log('Conversion complete.');
            res.send({filePath: `converted/${uniqueName}.html`});
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
