import React, { useState, useEffect } from 'react';
import { View, Modal, Text, ActivityIndicator } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { ThemedView } from '@/components/ThemedView';
import { BlurView } from 'expo-blur';
import { styles } from '@/components/styles/styles';

const CameraModal = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [isProcessing, setIsProcessing] = useState(false); 

  useEffect(() => {
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
      setIsProcessing(true);

      try {
        const photoData = await cameraRef.takePictureAsync({
          quality: 0.75,
          base64: true,
        });

        const base64Image = `data:image/jpeg;base64,${photoData.base64}`;

        setIsModalVisible(false);
        router.push(`/analyzer?imageUri=${encodeURIComponent(base64Image)}`);
      } catch (error) {
        console.error("Error capturing photo:", error);
      } finally {
        setIsProcessing(false); // Finaliza o carregamento
      }
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
            ref={setCameraRef}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 20 }}>
              <Button onPress={handleCameraPress}  disabled={isProcessing}>
                <FontAwesome name="camera" size={24}/>
              </Button>
              {/* <Button onPress={() => setIsModalVisible(false)}  disabled={isProcessing}>CLose</Button>   */}
            </View>
          </CameraView>
          <Modal visible={isProcessing} transparent={true}>
            <BlurView style={styles.container} intensity={100}>
              <ActivityIndicator size={100}/>
            </BlurView>
          </Modal>
        </ThemedView>
      </Modal>
    </>
  );
};

export default CameraModal;
