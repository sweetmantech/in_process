const getBlob = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const type = response.headers.get("content-type") || "";
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type });
    return { blob, type };
  } catch (error) {
    throw new Error(error as string);
  }
};

export default getBlob;
