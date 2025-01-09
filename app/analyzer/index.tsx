import { useEffect, useState } from "react";
import { Image } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/components/styles/styles";
import { runInference } from "./runInterface";

// Componente principal
export default function Analyzer() {
  const { imageUri } = useLocalSearchParams(); // Pega a URI da imagem passada via query string

  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (imageUri && isModelLoaded) {
      runInference(imageUri as string);
    }
  }, [imageUri, isModelLoaded]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Analizando</ThemedText>

      {/* Exibe a imagem */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 100, height: 100, objectFit: "cover" }}
          onLoad={() => setIsImageLoaded(true)} // Marca a imagem como carregada
        />
      )}

      {/* Exibe os resultados da previsão, caso existam */}
      {prediction && (
        <ThemedText>Resultado da Análise: {JSON.stringify(prediction)}</ThemedText>
      )}
    </ThemedView>
  );
}
