import React from 'react';
import { View, Button, Image } from 'react-native';
import { ImagePicker, Permissions, ImageManipulator } from 'expo';


export default class MainScreen extends React.Component {
  state = {
    imageSize: 224,
    image: require('./assets/no_image.png')
  }

  _cropAndResize = async (pickerResult) => {
    let { imageSize } = this.state;
    
    let cropTopLeftX = 0;
    let cropTopLeftY = 0;
    let cropSize = pickerResult.width;
    if (pickerResult.width > pickerResult.height) {
      cropTopLeftX = pickerResult.width / 2 - (pickerResult.height / 2)
      cropTopLeftY = 0
      cropSize = pickerResult.height;
    }else if (pickerResult.width < pickerResult.height) {
      cropTopLeftX = 0
      cropTopLeftY = pickerResult.height / 2 - (pickerResult.width / 2)
      cropSize = pickerResult.width;
    }

    const manipResult = await ImageManipulator.manipulate(
      pickerResult.uri,
      [
        {crop: {originX: cropTopLeftX, originY: cropTopLeftY,
                width: cropSize, height: cropSize}},
        {resize: {width: imageSize, height: imageSize}}
      ],
      { base64: true }
    );

    return manipResult;
  }

  _getImageWithCamera = async () => {
    let { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status !== 'granted') {
      alert('You should enable CAMERA.');
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true
    });
    if (pickerResult.cancelled) { return; }

    const manipResult = await this._cropAndResize(pickerResult);

    this.setState({image: manipResult});
  }

  _getImageWithCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      alert('You should enable CAMERA ROLL.');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (pickerResult.cancelled) { return; }

    const manipResult = await this._cropAndResize(pickerResult);

    this.setState({image: manipResult});
  }

  render() {
    let { image, imageSize } = this.state;

    return (
      <View style={styles.screenStyle}>
        <Image
          source={image}
          style={{width: imageSize, height: imageSize}}
        />
        <Button
          onPress={this._getImageWithCamera}
          title="Camera"
        />
        <Button
          onPress={this._getImageWithCameraRoll}
          title="CameraRoll"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Result', {image: image} )}
          title="Recognize!"
        />
      </View>
    )
  }
}


const styles = {
  screenStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 15
  }
}
