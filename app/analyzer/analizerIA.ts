import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';

export const analizerIA = async (img: string, modelPath?:string) => {
  try {
    await tf.ready();

    const base64Image = img.replace(/^data:image\/\w+;base64,/, "");
    const imageData = new Uint8Array(Buffer.from(base64Image, 'base64'));
    const imageTensor = decodeJpeg(imageData);
    
    if (modelPath) expecifcIA(imageTensor, modelPath)
    else if (!modelPath) genericIA(imageTensor)
    else return 'No prediction available';
    
  } catch (err) {
    console.log("response err: "+err);
  }
};

async function genericIA(imageTensor: tf.Tensor3D) {
  const model = await mobilenet.load()
  const prediction = await model.classify(imageTensor);
  return `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`;
}

async function expecifcIA(imageTensor: tf.Tensor3D, modelPath:string) {
  // const model = await tf.loadLayersModel('local-model-url/model.json');
  const model = await tf.loadLayersModel(modelPath);
  const prediction = await model.predict(imageTensor.expandDims(0));
  return `Prediction result: ${prediction}`;
}