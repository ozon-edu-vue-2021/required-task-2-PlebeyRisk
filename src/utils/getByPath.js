export default function getByPath(obj, path, separate = '/') {
  let result;
  const parts = path.split(separate).filter(part => part.length);
  if (!parts.length) {
    return obj;
  }
  if (parts.length && obj.name === parts[0]) {
    for (let i = 0; i < obj.contents.length; i++) {
      if (parts.length && obj.name === parts[0]) {
        result = getByPath(obj.contents[0], parts.slice(1, parts.length - 1).join('/'));
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}