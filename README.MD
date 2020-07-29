# 2.0 Creating the Project

`>>> expo init [directory name]`  
`choose 'blank'`

# 2.1 cacheImages

### `import { AppLoading } from "expo";`

AppLoading은 이 앱에서 쓸 리소스들(아이콘, 이미지, api 등등..)을 미리 로드(preload) 해 놓는다. 그래서 사용시 아이콘등이 로드되는걸 사용자가 보게되는 일을 방지한다.  
Documentaion을 보면 `startAsync`(function), `onFinish`(function), `onError`(function), `autoHideSplash`(boolean) 4개의 prop을 가질 수 있다.

### `return Image.prefetch(img);`

출처는 리액트 네이티브다. `import { Image } from "react-native";` 말 그대로 prefetch하므로 인자가 이미지의 url일 때 적용하도록 했다. `Promise`를 리턴한다.

### `return Asset.fromModule(img).downloadAsync();`

출처는 엑스포. `npm i expo-asset`으로 설치하고 Asset을 가져온다. 이미지가 저장되어 있을 때 사용한다. `Promise`를 리턴한다.

# 2.2 cacheFonts

### `import { Ionicons, FontAwesome } from "@expo/vector-icons";`

### `import * as Font from "expo-font";`

아이콘 - 폰트. 아이콘의 preload는 Font에서 담당한다. 그리고 `Font.loadAsync(font)` 역시 `Promise`를 리턴한다.

### `return Promise.all([...images, ...fonts]);`

Documentaion에 보면 AppLoading의 startAsync 함수는 Promise를 리턴한다고 되어있기 때문에 굳이 async-await를 써 줄 필요가 없다.

# 2.3 Stack Navigation

> npm install @react-navigation/native

> expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

> npm i @react-navigation/stack

App.js의 `<NavigationContainer>`  
-> Stack.js의 `<createStackNavigator().Navigator>`  
-> Stack.js의 `<createStackNavigator().screen>`

- Navigator로부터 {navigation}을 보장받음. 마치 prop처럼.
- 'name'값이 필요. 이게 화면 상단의 제목으로 표시된다.
- 'component'로 각 component에 연결.

-> 각각의 `Component <View>`

- Button은 'title'값으로 화면에 표시됨.
- onPress={() => navigation.navigate(스크린 name)

# 2.4 Tabs Navigation

> npm i @react-navigation/bottom-tabs

이번 수업에서 코딩한 바를 해석해보자면, 2개의 Stack이 있고, 그 중 하나에 Tabs가 들어가있는 것이다. 대등한 관계로 착각 금지. 그래서 다른 스택인 Detail로 넘어가면 bottom tabs는 사라진다.  
그 외에는 위에서 설명한 것들이 그대로 적용돼 있다.
