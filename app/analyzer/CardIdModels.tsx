import { PropsMappingIAs } from "@/assets/IAModels/mappingIAs";
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Button } from "@/components/ui/Button";
import { analizerIA } from "./analizerIA";
import { Collapsible } from "@/components/Collapsible";
import { Colors } from "react-native/Libraries/NewAppScreen";

export function CardIdModels({
  img,
  item,
}: {
  img: string;
  item: PropsMappingIAs;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);

  const runAnalizer = async () => {
    // console.log(img); // data:image/jpeg;base64,/9j/4QBYRXhpZgAATU0AK
    setIsLoading(true);
    await analizerIA(img, item.model)
      .then((res) =>
        res == undefined ? setData("erro ao analizar") : setData(res)
      )
      .catch((err) => setData(err))
      .finally(() => setIsLoading(false));
  };

  // useEffect(()=>{
  //   runAnalizer()
  // },[])

  const title = () => {
    const colorTheme =
      useColorScheme() == "light" ? Colors.light.text : Colors.dark.text;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 30,
        }}
      >
        <ThemedText>{item.name}</ThemedText>
        {isLoading && <ActivityIndicator color={colorTheme} />}
        {/* <Button onPress={()=>runAnalizer()} disabled={isLoading}>{isLoading? <ActivityIndicator/>:"Analizar"}</Button> */}
      </View>
    );
  };

  return (
    <View>
      <Collapsible title={title()}>
        {isLoading && <ThemedText>Carregando...</ThemedText>}
        {data && <ThemedText>{data.toString()}</ThemedText>}
        {isLoading == false && (
          <Button onPress={() => runAnalizer()} disabled={isLoading}>
            {isLoading ? <ActivityIndicator /> : "Analizar"}
          </Button>
        )}
      </Collapsible>
    </View>
  );
}
