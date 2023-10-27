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
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.pdfFile;
    let uploadPath = path.join(uploadsDir, uploadedFile.name);
    let convertedPath = path.join(convertedDir, uploadedFile.name.replace('.pdf', '.html'));

    uploadedFile.mv(uploadPath, function(err) {
        if (err) return res.status(500).send(err);

        exec(`pdf2htmlEX --embed cfijo ${uploadPath} ${convertedPath}`, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error in conversion process.');
            }
            res.send({filePath: `converted/${uploadedFile.name.replace('.pdf', '.html')}`});
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
