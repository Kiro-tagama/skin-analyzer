import * as tf from "@tensorflow/tfjs";
import { Alert } from "react-native";

const loadModel = async () => {
  await tf.ready(); // Garanta que o TensorFlow está pronto
  const modelUrl = 'https://example.com/path/to/your/model.json'; // Substitua pela URL ou caminho do seu modelo
  try {
    const loadedModel = await tf.loadGraphModel(modelUrl);
    setModel(loadedModel);
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível carregar o modelo');
  }
};

function setModel(loadedModel: any) {
  throw new Error("Function not implemented.");
}
