export const base64ToBlob = (value: string): Blob => {
  const base64Index: number = value.indexOf(";base64,");
  const fileType: string = value.substring(5, base64Index);
  const base64Data: string = value.substr(base64Index + 8);

  const content: string = atob(base64Data);
  const buffer: ArrayBuffer = new ArrayBuffer(content.length);
  const view: Uint8Array = new Uint8Array(buffer);

  for (let index = 0; index < content.length; index += 1) {
    view[index] = content.charCodeAt(index);
  }

  return new Blob([buffer], { type: fileType });
}

export const downloadFile = (content: string, fileName: string): void => {
  const element = document.createElement("a");
  element.setAttribute("href", content);
  element.setAttribute("download", fileName);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

export const resizeImage = async (imageSource: string, maxHeight: number, maxWidth: number): Promise<string | any> => new Promise((resolve, reject) => {
  try {
    const image: HTMLImageElement = new Image();
    image.src = imageSource;
    image.onload = (): void => {
      let { height } = image;
      let { width } = image;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else if (height > maxHeight) {
        height = maxHeight;
        width = Math.round((width *= maxHeight / height));
      }

      const canvas: HTMLCanvasElement = document.createElement("canvas");
      canvas.height = height;
      canvas.width = width;
      canvas.getContext("2d")!.drawImage(image, 0, 0, width, height);
      const dataUrl: string = canvas.toDataURL("image/jpeg");
      canvas.remove();

      resolve(dataUrl);
    };
    image.onerror = (error: string | Event) => reject(error);
  } catch (error: any) {
    reject(error);
  }
});
