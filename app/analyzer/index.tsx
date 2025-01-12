import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Image } from 'expo-image';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/components/styles/styles";

import { ActivityIndicator, Alert } from "react-native";
import { analizerIA } from "./analizerIA";
import { Button } from "@/components/ui/Button";

// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { decodeJpeg } from '@tensorflow/tfjs-react-native';

export default function Analyzer() {
  const { imageUri } = useLocalSearchParams(); 
  
  if (!imageUri || typeof imageUri !== 'string') {
    Alert.alert('Erro ao carregar imagem');
    router.push('/home');
    return null
  }

  // Analize por IA
  const [isLoading, setIsLoading] = useState(false);
  // const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [predictions, setPredictions] = useState<any|string>("");

  const tryAnalize = () =>{
    setPredictions(null)
    setIsLoading(true);
    analizerIA(imageUri)
    .then((result) => {
      result == undefined ? 
        setPredictions("erro ao analizar") 
        : setPredictions(result);
      
        setIsLoading(false);
      console.log("Previsões:", result);
    })
    .catch((error) => {
      Alert.alert("Erro", "Falha na análise da imagem.");
      setIsLoading(false);
      console.error("Erro ao analisar a imagem:", error);
    });
  }


  useEffect(() => {
    tryAnalize();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Analizando</ThemedText>

      {/* Exibe a imagem */}
      {imageUri && (
        <Image
          // @ts-ignore
          source={{ uri: imageUri }} 
          style={{ width: 200, height: 200, objectFit: "cover" }}
        />
      )}
      <Button onPress={()=>tryAnalize()}>update</Button>

    <ThemedText>Previsão da Imagem</ThemedText>
    {isLoading && <ActivityIndicator/>}
    {predictions && <ThemedText>{predictions.toString()}</ThemedText>}
    </ThemedView>
  );
}
