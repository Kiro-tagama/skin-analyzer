import { styles } from "@/components/styles/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { handleImportPhoto } from "./handleImportPhoto";

export default function Home() {

  const [photo,setPhoto]=useState<string>('');

  const handleCameraPress = () => {
  };

  const messageAlert="Mesmo com a análise feita pela IA, é fundamental procurar um médico para confirmação."

  return (
    <ThemedView style={[styles.container]}>
      {/* Título */}
      <ThemedText style={styles.title}>Analisador de Câncer de Pele</ThemedText>

      {/* Descrição */}
      <ThemedText >
        Este aplicativo usa inteligência artificial para analisar imagens de sua pele e fornecer informações preliminares sobre possíveis sinais de câncer.
      </ThemedText>

      {/* Botões */}
      <ThemedView style={{flexDirection:"row",gap:10,marginVertical:"15%"}}>
        <Button onPress={handleCameraPress}>
          <FontAwesome name="camera" size={24}/>
        </Button>
        <Button onPress={()=>handleImportPhoto(setPhoto)}>
          <FontAwesome name="photo" size={24}/>
        </Button>
      </ThemedView>

      {/* Alerta */}
      <ThemedView style={{width:"95%"}}>
        <ThemedView style={{flexDirection:"row",gap:10}}>
          <Feather name="alert-triangle" size={24} color="red" />
          <ThemedText style={[styles.subTitle,{color:"red"}]}>Importante</ThemedText>
        </ThemedView>
          <ThemedText style={{color:"red"}}>{messageAlert}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}