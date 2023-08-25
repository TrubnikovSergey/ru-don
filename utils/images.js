export function createNameImageWithID(img) {
  const { name, _id } = img;
  const extention = name.split(".")[1];

  return `${_id}.${extention}`;
}
