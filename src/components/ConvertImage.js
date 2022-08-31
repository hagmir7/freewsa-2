
function ConvertImage(imageFile) {
    const src = URL.createObjectURL(imageFile);
    // Start converting 
    let canvase = document.createElement('canvas');
    let ctx = canvase.getContext('2d');


    const newImage = new Image();
    newImage.src = src;
    newImage.onload = function () {
        canvase.width = newImage.width;
        canvase.height = newImage.height;
        ctx.drawImage(newImage, 0, 0);

        // convet to webp
        const webpImage = canvase.toDataURL("image/webp", 1);


        function dataURItoBlob(dataURI) {
            var byteString = atob(dataURI.split(',')[1]);

            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }
        const blob = dataURItoBlob(webpImage);
        const resultFile = new File([blob], imageFile.name.split('.')[0] + '.webp');
        window.result = resultFile;
    }
    return window.result;


}

export default ConvertImage;
