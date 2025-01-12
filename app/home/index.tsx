import { styles } from "@/components/styles/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { handleImportPhoto } from "./handleImportPhoto";
import { ActivityIndicator, Alert, Modal, Platform } from "react-native";
import React from "react";
import CameraModal from "@/components/CameraModal";

export default function Home() {

  const [photo,setPhoto]=useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCameraPress = () => {
    Alert.alert("ainda não criado")
  };

  const messageAlert="Mesmo com a análise feita pela IA, é fundamental procurar um médico para confirmação."

  const handleImportPhotoWithLoading = async () => {
    setIsLoading(true); // Inicia o loading
    try {
      await handleImportPhoto(setPhoto); // Chama a função de importação
    } catch (error) {
      console.error("Erro ao importar foto:", error);
      Alert.alert("Erro", "Ocorreu um erro ao importar a foto. Tente novamente.");
    } finally {
      setIsLoading(false); // Finaliza o loading, independentemente de sucesso ou falha
    }
  };

  return (
    <ThemedView style={[styles.container]}>
      {
        isLoading ?
          <ThemedView>
            <ActivityIndicator/>
            <ThemedText>Aguarde</ThemedText>
          </ThemedView> :
        
        <>
        <ThemedText style={styles.title}>Analisador de Câncer de Pele</ThemedText>
        <ThemedText >
          Este aplicativo usa inteligência artificial para analisar imagens de sua pele e fornecer informações preliminares sobre possíveis sinais de câncer.
        </ThemedText>

      {/* Botões */}
      <ThemedView style={{flexDirection:"row",gap:10,marginVertical:"15%"}}>
        {Platform.OS === "web" ? null: <CameraModal/>}
        <Button onPress={()=>handleImportPhotoWithLoading()}>
          <FontAwesome name="photo" size={24}/>
        </Button>
      </ThemedView>

      {/* Alerta */}
        <ThemedView style={{flexDirection:"row",gap:10}}>
          <Feather name="alert-triangle" size={24} color="red" />
          <ThemedText style={[styles.subTitle,{color:"red"}]}>Importante</ThemedText>
        </ThemedView>
          <ThemedText style={{color:"red"}}>{messageAlert}</ThemedText>
        </>
      }
      
    </ThemedView>
  );
}