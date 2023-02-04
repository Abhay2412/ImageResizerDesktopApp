// UI variables and has IDs from the HTML file
const form = document.querySelector('#img-form');
const img = document.querySelector('#img');
const outputPath = document.querySelector('#output-path');
const filename = document.querySelector('#filename');
const heightInput = document.querySelector('#height');
const widthInput = document.querySelector('#width');

function loadOriginalImage(e) {
    const file = e.target.files[0];
    if(!fileImageChecker(file)) {
        console.log('Please select an image');
        return;
    }
    
    form.style.display = 'block';
    filename.innerText = file.name;
}

// Ensure the file is image
function fileImageChecker(file) {
    const allowedImageTypes = ['image/gif', 'image/png', 'image/jpeg'];
    return file && allowedImageTypes.includes(file['type']);
}

img.addEventListener('change', loadOriginalImage);