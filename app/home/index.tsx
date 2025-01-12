import { styles } from "@/components/styles/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Platform } from "react-native";
import React from "react";
import CameraModal from "./CameraModal";
import { useHomeHook } from "./useHomeHook";

export default function Home() {
  const {isLoading,handleImportPhotoWithLoading,messageAlert} = useHomeHook();

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