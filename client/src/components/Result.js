import React from 'react';
import { View, Text, Image } from 'react-native';
import LoadingContainer from 'react-native-loading-container';

export default class ResultScreen extends React.Component {
  state = {
    text: 'result is ...'
  }

  async _getResultAsync() {
    let { image } = this.props.navigation.state.params;

    let response = await fetch(
      'http://{your host}/recognize',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64: image.base64
        })
      }
    );
    console.log(response);
    let responseJson = await response.json();
    let result = responseJson.result;

    return {text: "result is " + result };
  }

  async _onReadyAsync({text: content}) {
    return new Promise((resolve) => {
      this.setState({text: content}, resolve);
    });
  }

  render() {
    let { image, type } = this.props.navigation.state.params;
    let { text } = this.state;

    return (
      <LoadingContainer
        onLoadStartAsync={this._getResultAsync.bind(this)}
        onReadyAsync={this._onReadyAsync.bind(this)}>
      <View style={styles.screenStyle}>
        <Image
          source={image}
          style={{width: 224, height: 224}}
        />
        <Text>{text}</Text>
      </View>
      </LoadingContainer>
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
