import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import { Alert } from "react-native";
import { analizerIA } from "./analizerIA";

export function useAnalyzerHook() {
  const { imageUri } : {imageUri:string} = useLocalSearchParams(); 
    
    if (!imageUri || typeof imageUri !== 'string') {
      Alert.alert('Erro ao carregar imagem');
      router.push('/home');
      return null
    }
  
    // Analize por IA
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [predictions, setPredictions] = useState<string>("");
  
    const tryAnalize = () =>{
      setPredictions("")
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
  
  return{
    imageUri, isLoading, predictions, tryAnalize 
  }
}