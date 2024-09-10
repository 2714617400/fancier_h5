export default function () {
  let imgs = document.getElementsByTagName("img");
  Array.from(imgs).forEach((el) => {
    el.addEventListener("click", () => {
      const previewContainer = document.createElement("div");
      previewContainer.style.position = "fixed";
      previewContainer.style.top = 0;
      previewContainer.style.bottom = 0;
      previewContainer.style.left = 0;
      previewContainer.style.right = 0;
      previewContainer.style.backgroundColor = "rgba(0,0,0,0.8)";
      previewContainer.style.display = "flex";
      previewContainer.style.justifyContent = "center";
      previewContainer.style.alignItems = "center";
      document.body.appendChild(previewContainer);

      const previewImage = document.createElement("img");
      previewImage.src = el.src;
      previewImage.style.maxWidth = "80%";
      previewImage.style.maxHeight = "80%";
      previewContainer.appendChild(previewImage);

      previewContainer.addEventListener("click", () => {
        document.body.removeChild(previewContainer);
      });
    });
  });
}
