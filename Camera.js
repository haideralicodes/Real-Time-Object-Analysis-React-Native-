import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Modal,
  Text,
  ActivityIndicator,
  Alert, 
  TouchableOpacity
} from 'react-native';

import {
  Camera,
  CameraType,
  requestCameraPermissionsAsync,
  requestMicrophonePermissionsAsync,
  getCameraPermissionsAsync,
  getMicrophonePermissionsAsync,
} from "expo-camera";

import {
  getModel,
  convertBase64ToTensor,
  startPrediction,
} from './tensor-helper';

import {cropPicture} from './image-helper';

import Feather from "@expo/vector-icons/Feather";


const RESULT_MAPPING = ['Triangle', 'Circle', 'Square'];

const Main = () => {
  const cameraRef = useRef();
  const [isProcessing, setIsProcessing] = useState(false);
  const [presentedShape, setPresentedShape] = useState('');

  const handleImageCapture = async () => {
    setIsProcessing(true);
    const imageData = await cameraRef.current.takePictureAsync({
      base64: true,
    });
    processImagePrediction(imageData);
  };

  const processImagePrediction = async (base64Image) => {
    const croppedData = await cropPicture(base64Image, 300);
    const model = await getModel();
    const tensor = await convertBase64ToTensor(croppedData.base64);

    const prediction = await startPrediction(model, tensor);

    const highestPrediction = prediction.indexOf(
      Math.max.apply(null, prediction),
    );
    setPresentedShape(RESULT_MAPPING[highestPrediction]);
  };

  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState("off");
  const [pictureUri, setPictureUri] = useState("");

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    await requestCameraPermissionsAsync();
    await requestMicrophonePermissionsAsync();
  };

  const getPermissions = async () => {
    const cameraPermission = await getCameraPermissionsAsync();
    const microphonePermission = await getMicrophonePermissionsAsync();

    return cameraPermission.granted && microphonePermission.granted;
  };

  const switchFlashMode = () =>
    setFlashMode(flashMode === "off" ? "on" : "off");

  const switchType = () =>
    setType(type === CameraType.back ? CameraType.front : CameraType.back);

  const takePicture = async () => {
    const { uri, width, height } = await cameraRef?.current.takePictureAsync();
    setPictureUri(uri);
  };

  if (!getPermissions()) {
    return Alert.alert(
      "Permissions Required!",
      "You need to provide the permissions to access the camera",
      [{ text: "Got it" }]
    );
  }

  return (
    <View style={styles.container}>
      <Modal visible={isProcessing} transparent={true} animationType="slide">
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text>Your current shape is {presentedShape}</Text>
            {presentedShape === '' && <ActivityIndicator size="large" />}
            <Pressable
              style={styles.dismissButton}
              onPress={() => {
                setPresentedShape('');
                setIsProcessing(false);
              }}>
              <Text>Dismiss</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        autoFocus={true}
        whiteBalance={Camera.Constants.WhiteBalance.auto}></Camera>
      <Pressable
        onPress={() => handleImageCapture()}
        style={styles.captureButton}></Pressable>
    </View>
  );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: 'absolute',
    left: Dimensions.get('screen').width / 2 - 50,
    bottom: 40,
    width: 100,
    zIndex: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  modal: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
    borderRadius: 24,
    backgroundColor: 'gray',
  },
  dismissButton: {
    width: 150,
    height: 50,
    marginTop: 60,
    borderRadius: 24,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});

export default Main;
