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

# 2.8 Adding the Icons

이번 수업의 코드들은 모두 `<createBottomTabNavigator().Navigator ....>` 안에 들어간다.

```
screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
        ---iconName 정하는 과정---
          return (
            <Ionicons
              name={iconName}
              color={focused ? "white" : "grey"}
              size={25}
            ></Ionicons>
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
```

screenOptions가 함수가 됐다고해서 어렵게 볼 필요가 없다. 보면 결국 소괄호를 써서 implicit return으로 하나의 객체를 리턴하기 때문에 결국엔 그냥 screenOptions={....}가 되는 것일 뿐이다.

### `Platform.OS === "ios" ? "ios-" : "md-";`

Platform.OS는 "ios"나 "android" 둘 중 하나를 출력한다. Documentation을 보면 Platform.Select같은 더 여러가지 기능들이 소개돼 있다.

### `tabBarIcon({focused: boolean, color: string, size: number})`

여기서는 focused만 필요해서 나머지는 쓰지 않음. React.Node를 리턴하는 함수여야 하기 때문에 리턴값을 <Ionicons .../>로 쓴 것. 이 안에 들어가는 name, color, size 등의 prop들은 Ionicons 문서에 잘 나와있음.

### `showLabel: false`

tabBarOptions의 이 항목을 false로 해서 "Movies", "TVs", "Search", "Favorites"같은 Tabs.Screen 의 name들이 탭바에 표시되지 않게 한다. 왜냐하면 그 자리를 아이콘으로 대신하기 위해서다.

### `borderTopColor: "black"`

헤더에서는 보더칼라로 구분선이 지워지지 않아서 shadowColor: "black"을 썼었는데, 탭바에서는 이걸로 구분선이 잘 지워졌다.

# 3.0, 3.1 API Layer

- Axios의 사용.
- api 어떤 부분을 사용할지 정해놓고 큰 그림을 먼저 그리는 것이 좋다.

# 3.2 Divide and Conquer

중복이 발생할 수 있는 `try{}catch{}`과정을 하나의 함수로 만들어서 재활용하는 방안.

# 3.3 Bulletproof getAnything

```
const [nowPlaying, setNowPlaying] = useState({
  movies: [],
  error: null,
})
...
  setNowPlaying({
    movies: results,
    error: null,
  })
```

이거를 nowPlaying, popular, upcoming 3번을 반복해서 쓰면 코드 길이가 길어지는 것은 물론이고, 무엇보다 `setNowPlaying()`등이 3번 반복돼서 렌더링이 3번 일어난다는 것이다.  
**렌더링은 한 번이 이상적**이기 때문에 하나의 큰 state를 만들어서 처리하기로 한다.

api.js에서 data를 추가한 이유는 `data: { result }`가 없이 data만 오는 url도 있기 때문이다. (영화나 쇼를 아이디로 단독으로 불러오는 경우)

# 4.0, 4.1 Home Slider

> npm i react-native-web-swiper

그냥 react-native-swiper는 웹에서는 통하지 않는다.

> npm install styled-components

---

바뀐게 많아보이지만 Movies폴더를 만들고 Container, Presenter방식으로 바꿔서 그렇다. `MoviesPresenter.js`를 위주로 살펴보면 된다.

### `import styled from "styled-components/native";`

리액트 네이티브에서 문제없이 쓰려면 뒤에 네이티브를 붙인 styled-components/native를 쓰는 것이 좋다.

### `const { width, height } = Dimensions.get("screen");`

리액트 네이티브에서 제공하는 Dimensions.get은 그 스크린의 사이즈를 바로 불러올 수 있게 해준다.

### `<ActivityIndicator />`

리액트 네이티브에서 제공하는 ActivityIndicator는 흔히 앱이 로딩 중일 때 나오는 동그란 로딩 애니매이션이다. 여기에 옵션을 몇가지 붙이는 것이 가능하다.

### `<Swiper>...</Swiper>`

react-native-web-swiper에서 불러 온 이 컴포넌트는 그 내부의 컴포넌트들을 스와이프 가능하게 만든다. 옵션 설정이 가능하다.

- `controlsEnabled={false}`: 기본적으로는 스와이프 화면 아래에 previous, next 등 문구가 뜨는데, 이를 제거한다.
- `loop`: 자동 스와이프
- `timeout={3}`: 자동 스와이프를 3초마다 실행. 밀리세컨즈가 아니라 초 단위임.

### `{...movies}`

MoviesContainer.js에서 프리젠터로 보내는 프롭을 간단하게 보내는 방법. 이론적으로는 알고 있지만 막상 쓸 생각을 잘 하지 못한다.

# 4.2 Slider Background

> npm install prop-types

```
Failed prop type: The prop 'backgroundImage' is marked as required in 'Slide', but its value is 'null'.
```

이 에러가 왜 생기는지 모르겠다... 작동은 일단 된다.

# 4.5 Popular Movies

### `Dimensions.get("window");`

"screen"에서 "window"로 바꿨다. 왜냐하면 스크린으로 했을 때에는 웹환경에서 제대로 보이지 않기 때문이다.

### `<ScrollView />`

웹브라우져와는 다르게 스마트폰에서 스크롤이 필요하다면 이 컴포넌트를 임포트해서 넣어줘야 한다. 임포트 출처는 리액트 네이티브.

- `contentContainerStyle={{ flex: 1, justifyContent: isLoading ? "center" : "flex-start",}}`  
  처음엔 style에 썼는데, justifyContent는 contentContainerStyle이라는 prop으로 전달하라고 에러가 나왔다. 로딩 중에는 센터로 둔 이유는 동그란 로딩 애니메이션이 중앙에 위치하게 하기 위해서.

# 4.7 Vertical Movie Component part Two

### `import { TouchableOpacity } from "react-native";`

react-native-gesture-handler에서 제공하는 것 말고, 리액트 네이티브 자체의 TouchableOpacity를 쓴다.

### `String.slice(), String.substring()`

거의 같다. 가장 큰 차이점은 substring의 경우 시작인덱스와 종료인덱스의 위치가 바껴도 알아서 인식한다는 것이다. 하지만 바로 그것 때문에 마이너스 인덱스를 쓸 수 없다.

### `<ScrollView />`에 들어갈 수 있는 prop들은 매우 많다. 이 부분은 documentation을 참고할 것.

# 4.8, 4.9 Horizontal

### `{releaseDate ? <ReleaseDate>{releaseDate}</ReleaseDate> : null}`

Horizontal.js를 tv shows에서도 쓸 생각인데 거기엔 release date가 없으므로 이렇게 if문으로 통제한 것.

### `util.js trimText(){}`

계속 반복되는 문자열 자르기를 함수로 만들었다.

### `Poster.js <Image source={{ uri: apiImage(url) }}></Image>;`

uri가 받는 인자를 수정해서 각 컴포넌트에서 함수가 아닌 url만 넣어도 되도록 수정함.

### `width: ${WIDTH}px; -> width: 100%;`

Dimensions.get("window");로 받아오는 WIDTH를 쓰면 웹환경에서 창 크기를 조절할 때 반응적으로 너비가 바뀌지 않는 문제가 있었다. 물론 새로고침을 하면 다시 그 화면 크기에 맞게 조정되지만 반응적이지 않은 문제는 고쳐지지 않았다. 그래서 width: 100%로 수정.

# 4.10 Finishing the Movies

### `flex: isLoading ? 1 : "auto"`

로딩 애니메이션 중앙으로 오도록 조치.

### `Date.toLocaleDateString([locales [, options]])`

- Date instance의 메소드이므로 new Date()로 인스턴스를 먼저 만들어주는 것에 주의.
- 보이다시피 locale, options 둘 다 선택적으로 기입할 수 있는 사항이다.
- locale(o), options(x) 인 경우 일단 모두 "numeric"인 것으로 간주하는게 기본이며, 로케일에 있는 지역에 따라 그 지역의 년, 월, 일 표기 순서를 따라 표시한다. 12/19/2020, 19/12/2020, 2020.12.19 등.
- 여기서는 쓰지 않았지만 weekday(요일표시!), timeZone, timeZoneName 등 여러 옵션 사항이 더 있다.

# 5.0 TV Container Presenter

`ScrollContainer.js`를 만들어서 Movies와 TV Shows Presenter에서 중복되는 ScrollView를 따로 분리했다.

- `children` prop을 이용한다. 예전에도 언급했듯이 이는 자동적으로 주어지는 프롭이기 때문에 프리젠터에서 프롭으로 넘길 필요는 없다.

`Tabs.js`에서 TV Shows 스크린을 맨 위로 옮겼는데, 이 스크린이 제일 먼저 위치하게 해서 개발하는 도중에 바로바로 확인 가능하도록 한 일시적인 조치다.
