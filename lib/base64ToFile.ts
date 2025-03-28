function base64ToFile(base64String: string, fileName: string) {
  const base64Data = base64String.replace(
    /^data:image\/(png|jpeg|jpg);base64,/,
    "",
  );
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });
  const imageFile = new File([blob], fileName, { type: "image/png" });

  return imageFile;
}

export default base64ToFile;
