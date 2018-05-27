# react_native_image_recognition_app
react native app for image recognition (sample)

# server

## 概要

1. clientから送られた（base64エンコードされた）画像を`numpy.ndarray`形式に変換します。
2. `numpy.ndarray`の`shape`をクライアントに返します。
  * sklearnなりkerasなりを使った画像認識APIに改変することを想定しています

## deploy方法

* 適当なクラウドサービスにPCFでデプロイすることを想定しています。

# client

## 概要

1. カメラ(Cameraボタン)、またはカメラロール(CamerRollボタン)からserverに送る画像を選択します。
2. 選択した画像を(224, 224, 3)のサイズにリサイズします（中心を切り取る）
3. Recognizeボタンでserverに画像をおくり、serverからの結果を待ちます。
4. 受け取った結果を表示します。

## build

* [expo.io](https://expo.io/)でBuildすることを想定しています。

## screen shot

![image01](./images/image01.PNG)

![image01](./images/image02.PNG)

![image01](./images/image03.PNG)

![image01](./images/image04.PNG)

