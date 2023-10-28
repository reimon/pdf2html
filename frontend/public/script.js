const uploadBtn = document.getElementById('uploadBtn');
const convertBtn = document.getElementById('convertBtn');
let uploadedFilePath = '';

uploadBtn.addEventListener('click', function() {
    var formData = new FormData(document.getElementById('uploadForm'));
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        uploadedFilePath = data.filePath;
        document.getElementById('result').innerHTML = `<a href="${uploadedFilePath}" target="_blank">Download Uploaded PDF</a>`;
        convertBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

convertBtn.addEventListener('click', function() {
    fetch(`/convert?file=${uploadedFilePath}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML += `<br><a href="${data.filePath}" target="_blank">View Converted HTML</a>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
