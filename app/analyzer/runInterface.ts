export const runInference = async (imageUri: string) => {
  if (model && imageUri && isImageLoaded) {
    // Carregar a imagem
    const image = await loadImage(imageUri); // Carrega a imagem usando uma função personalizada

    // Converte a imagem carregada para um tensor
    const imageTensor = tf.browser.fromPixels(image);

    // Normaliza a imagem conforme o seu modelo exigir
    const processedImage = imageTensor.div(tf.scalar(255)).expandDims(0); // Normalização exemplo

    // Fazendo a previsão com o modelo
    const predictionResult = await model.predict(processedImage) as tf.Tensor;
    setPrediction(predictionResult.dataSync()); // Mostra o resultado da inferência
  }
};

const loadImage = (uri: string) => {
    return new Promise<Image>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = uri; // Carrega a imagem
    });
  };