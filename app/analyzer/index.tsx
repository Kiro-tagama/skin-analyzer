import { router } from "expo-router";
import { Image } from 'expo-image';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/components/styles/styles";

import { ActivityIndicator, FlatList, Platform, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { useAnalyzerHook } from "./useAnalyzerHook";
import { mappingIAs } from "@/assets/IAModels/mappingIAs";
import { CardIdModels } from "./CardIdModels";

export default function Analyzer() {
  const { 
    imageUri, 
    isLoading, 
    predictions, 
    tryAnalize 
  } : any = useAnalyzerHook();

  // Define a marge superior para iOS para evitar o status bar ionic
  const mt = Platform.OS === "ios" ? 40:30

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title,{marginTop:mt}]}>Analizando</ThemedText>

      {/* Exibe a imagem */}
      {imageUri && (
        <Image
          // @ts-ignore
          source={{ uri: imageUri }} 
          style={{ width: 200, height: 200, objectFit: "cover", borderRadius:10}}
        />
      )}

      <ThemedView style={{flex:1, gap:10, marginVertical:20, minWidth:350}}>
        {/* <Button onPress={()=>tryAnalize()}>update</Button> */}

        <ThemedText>Previsão da Imagem</ThemedText>

        {/* <ThemedText>Generico</ThemedText>
        {isLoading && <ActivityIndicator/>}
        {predictions && <ThemedText>{predictions.toString()}</ThemedText>} */}

        <ThemedText>Expecialista</ThemedText>
        <View>
          <FlatList
            data={mappingIAs}
            renderItem={({ item })=><CardIdModels item={item} img={imageUri}/>}
            keyExtractor={(items,index) => `${index}-${items.name}`}
          />
        </View>
      </ThemedView>

      <Button onPress={()=>router.back()}>Voltar</Button>
    </ThemedView>
  );
}
