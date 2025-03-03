import { router, useLocalSearchParams } from "expo-router";

import { Alert } from "react-native";
export function useAnalyzerHook() {
  const { imageUri } : {imageUri:string} = useLocalSearchParams(); 
    
  if (!imageUri || typeof imageUri !== 'string') {
    Alert.alert('Erro ao carregar imagem');
    router.push('/home');
    return null
  }
  
  return{
    imageUri
  }
}