document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = new FormData(this);
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = `<a href="${data.filePath}" target="_blank">View Converted HTML</a>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
