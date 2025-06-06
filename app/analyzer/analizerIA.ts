import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { decode } from "base64-arraybuffer";

import modeltest from "../../assets/IAModels/Models/SkinLesionAnalyzer/model.json";

export const analizerIA = async (img: string, modelPath?: string) => {
  try {
    await tf
      .ready()
      .then(() => console.log("tf ready"))
      .catch((err) => console.log("tf not ready: " + err));

    const base64Image = img.replace(/^data:image\/\w+;base64,/, "");
    const imageData = new Uint8Array(decode(base64Image));
    const imageTensor = decodeJpeg(imageData);

    // old version
    // const base64Image = img.replace(/^data:image\/\w+;base64,/, "");
    // const imageData = new Uint8Array(Buffer.from(base64Image, 'base64'));
    // const imageTensor = decodeJpeg(imageData);

    if (modelPath) return await expecifcIA(imageTensor, modelPath);
    else return await genericIA(imageTensor);
  } catch (error) {
    console.log("Error:", error);
    return "Error during processing";
  }
};

async function genericIA(imageTensor: tf.Tensor3D) {
  try {
    const model = await mobilenet.load();
    const prediction = await model.classify(imageTensor);
    return `${prediction[0].className} (${prediction[0].probability.toFixed(
      3
    )})`;
  } catch (error) {
    console.error("error generic ia, " + error);
  }
}

async function expecifcIA(imageTensor: tf.Tensor3D, modelPath: string) {
  try {
    const model = await tf
      .loadLayersModel("../../" + modelPath)
      .then((res) => res)
      .catch((err) => console.error("err to load model " + err));

    const prediction =
      model && ((await model.predict(imageTensor.expandDims(0))) as tf.Tensor);

    const predictionData =
      prediction &&
      (await prediction
        .data()
        .then((res) => {
          console.log("complete prediction, " + res);
          return res;
        })
        .catch((err) => console.error("prediction err, " + err)));

    console.log("prediction " + predictionData);

    return `Prediction result: ${predictionData}`;
  } catch (error) {
    console.error("error expecific ia, " + error);
  }
}
