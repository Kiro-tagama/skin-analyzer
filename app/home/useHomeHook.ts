import { useState } from "react";
import { handleImportPhoto } from "./handleImportPhoto";
import { Alert } from "react-native";

export function useHomeHook() {
  const [isLoading, setIsLoading] = useState(false);
  
  const messageAlert="Mesmo com a análise feita pela IA, é fundamental procurar um médico para confirmação."

  const handleImportPhotoWithLoading = async () => {
    setIsLoading(true); // Inicia o loading
    try {
      await handleImportPhoto(); // Chama a função de importação
    } catch (error) {
      console.error("Erro ao importar foto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao importar a foto. Tente novamente.");
    } finally {
      setIsLoading(false); // Finaliza o loading, independentemente de sucesso ou falha
    }
  };

  return{
    isLoading,
    messageAlert,
    handleImportPhotoWithLoading
  }
}