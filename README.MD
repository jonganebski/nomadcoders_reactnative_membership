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

# 2.5, 2.6 Updating Header
(이해를 위해 object destructuring 안 씀)
### `useLayoutEffect(()=>{},[])`
기본적으로 useEffect와 같지만, 차이점은 useLayoutEffect는 모든 레이아웃 변경이 끝난 뒤에 작동한다는 점이다.  
### `props.navigation.setOptions({ title: 타이틀 이름 })`
2.3에서 언급했던 바와 같이, StackNavigator는 각 Screen에서 `props.navigation`을 보장한다. 그리고 `props.route`도 보장한다.  
그런데 여기서 TabsNavigator는 또한 StackNavigator의 Screen이기도 하다. 그러므로 TabsNavigator는 하나의 Screen으로서 이 props를 받는다. 
하지만 이 props를 통해서 Screen이 이 상위에 있는 Navigator를 변화시킬수도 있다.(일방향이 아닌 양방향이 가능) `props.navigation.setOptions()`에는 네비게이터의 타이틀을 바꿀 수 있는 기능이 내제돼 있다. 
### `props.route?.state?.routeNames[props.route.state.index] ?? "Movies"`
단, 처음 접속시에는 props.route.state가 없기 때문에 에러를 발생시킨다. 그래서 optional chaining과 ??를 사용해서 첫 접속시의 타이틀을 "Movies"로 설정했다.
# 2.7 Styling Nav
### `<StatusBar barStyle="light-content"></StatusBar>`
react-native에서 import한 StatusBar 사용. expo-status-bar에도 있는데 auto-import시 이쪽으로 되는 경우가 종종 있다. 
```
<Stack.Navigator  
    mode="modal"  
    screenOptions={{  
      headerStyle: {  
        backgroundColor: "black",  
        shadowColor: "black",  
      },  
      headerTintColor: "white",  
      headerBackTitleVisible: false,
    }}
>
```
```
<View style={{ flex: 1, backgroundColor: "black" }}>
```
createStackNavigator().Navigator와 View는 스타일링에 차이가 있다. 네비게이터에서는 여러 옵션을 다는 것처럼 설정하고, 뷰에서는 style={{}}을 쓴다. 
### `mode="modal"`
스택 화면을 넘길 때 좌우가 아닌 위아래 방향으로 넘어간다. 
### `shadowColor: "black"`
헤더와 스크린의 색을 검은색으로 해도 하얀 구분선이 보이는데, 이를 없애줌. 
### `headerTintColor: "white"`
헤더의 제목 색 뿐만 아니라 뒤로 돌아가는 버튼까지 채색해준다. 그래서 헤더 제목 섹깔만 바꿀게 아니라면 이것을 선택하는 것이 좋다. 
### `headerBackTitleVisible: false`
헤더에 왼쪽에 `< Detail`이라고 뜨는걸 `<` 이렇게 바꾼다. 
