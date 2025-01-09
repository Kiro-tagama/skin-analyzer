import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { SetStateAction } from 'react';

export async function handleImportPhoto(setPhoto: { (value: SetStateAction<string>): void; (arg0: string): void; }){
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    console.log('Permissão para acessar a galeria foi negada!');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images', 
    allowsEditing: true, 
    aspect: [4, 3], 
    quality: 1, 
  });

  //console.log('Resultado do ImagePicker:', result);

  if (!result.canceled) {
    const photoUri = result.assets[0].uri;
    setPhoto(photoUri)
    router.push(`/analyzer?imageUri=${encodeURIComponent(photoUri)}`);
  } else {
    console.log('Usuário cancelou a seleção da imagem.');
  }
};