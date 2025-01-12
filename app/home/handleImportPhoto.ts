import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { SetStateAction } from 'react';
import { Platform } from 'react-native';

export async function handleImportPhoto(setPhoto: { (value: SetStateAction<string>): void; (arg0: string): void; }){
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    console.log('Permissão para acessar a galeria foi negada!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images', 
    allowsEditing: true, 
    aspect: [4, 4], 
    quality: 0.75, // depois editar esse ponto para algo mais relevante em comparação com a ia
  });

  // console.log('Resultado do ImagePicker:', result);

  if (!result.canceled) {
    let photoUri = result.assets[0].uri;

    try {
      if (Platform.OS === 'web') {
        photoUri = result.assets[0].uri;
      } else {
        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });
        photoUri =`data:image/jpeg;base64,${base64}`; // Converte para base64 no Android/iOS
      }
    } catch (error) {
      console.error("Erro ao ler o arquivo:", error);
    }
    setPhoto(photoUri)
    router.push(`/analyzer?imageUri=${encodeURIComponent(photoUri)}`);
  } else {
    console.log('Usuário cancelou a seleção da imagem.');
  }
};