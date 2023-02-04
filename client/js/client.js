// UI variables and has IDs from the HTML file
const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

function loadOriginalImage(e) {
  const file = e.target.files[0];
  if (!fileImageChecker(file)) {
    showError("Please select an image");
    return;
  }

  // Retrieve the original dimensions from the image
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  }

  form.style.display = "block";
  filename.innerText = file.name;
  outputPath.innerText = path.join(os.homeDirectory(), 'imageresizer')
}

// Ensure the file is image
function fileImageChecker(file) {
  const allowedImageTypes = ["image/gif", "image/png", "image/jpeg"];
  return file && allowedImageTypes.includes(file["type"]);
}

function showError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'red',
      color: 'white',
      textAlign: 'center'
    }
  });
}

function showSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: 'green',
      color: 'white',
      textAlign: 'center'
    }
  });
}


img.addEventListener("change", loadOriginalImage);
