export function fileToBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      res(reader.result);
    };

    reader.onerror = function () {
      rej(reader.error);
    };
  });
}
