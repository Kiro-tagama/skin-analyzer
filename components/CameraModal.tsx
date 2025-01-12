import React, { useState, useEffect } from 'react';
import { View, Modal, Text } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from './ui/Button';
import { ThemedView } from './ThemedView';

const CameraModal = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);  

  useEffect(() => {
    // Pergunta permissão para usar a câmera
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleCameraPress = async () => {
    if (cameraRef) {
      // Tira a foto
      const photoData = await cameraRef.takePictureAsync();
      setPhoto(photoData.uri);  // Armazena a URI da imagem

      // Chama a função de análise passando a imagem
      const photoUri = photoData.base64 ? photoData.base64 : '';  // Caso tenha base64
      if (photoUri) {
        router.push(`/analyzer?imageUri=${encodeURIComponent(photoUri)}`);
      }

      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Button onPress={() => setIsModalVisible(true)}>
        <FontAwesome name="camera" size={24}/>
      </Button>
      {/* Modal com a câmera */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}  // Fecha o modal quando pressionado o botão de voltar
      >
        <ThemedView style={{ flex: 1 }}>
          <CameraView 
            style={{ flex: 1 }} 
            //ref={setCameraRef}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }}>
              <Button onPress={handleCameraPress} >
                <FontAwesome name="camera" size={24}/>
              </Button>
              {/* <Button onPress={() => setIsModalVisible(false)}>CLose</Button>   */}
            </View>
          </CameraView>
        </ThemedView>
      </Modal>
    </>
  );
};

export default CameraModal;
