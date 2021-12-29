# 1 [2021 UPDATE] INTRODUCTION

https://reactnative.dev/docs/environment-setup

안드로이드의 경우는 좀 더 복잡하다.

공식문서에는 `npx react-native init AwesomeProject` 실행하라고 나와있지만 이건 매우 기본 뼈대만 제공하므로 다른 방식을 사용할 것이다.

> npx create-react-native-app 앱이름 --use-npm

- Ignite
  좋지만 강의에서는 사용하지 않을 것이다. 우리가 직접 설정하고 싶은 것들도 있기 때문이다.

- CRNA

> npx pod-install ios

expo를 통해 의존성 설치 이후?

`CMD + SHIFT + K` to turn on/off ios keyboard

expo 말고 react-native로 컴파일 할 때 다음과 같은 에러가 뜬다.

```terminal
error Failed to launch the app on simulator, An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=405):
Unable to lookup in current state: Shutdown
```

> npx react-native run-ios --simulator="iPhone 12"

simulator를 지정해 주면 해결된다.

# Social Coin

## Android - Firebase

`/android/app/build.gradle` 파일에 있는 `applicationId`를 봐야 한다.

Debug signing certificate SHA-1 를 찾기 위해서는 다음을 터미널에서 입력해야 한다.

> cd android && ./gradlew signingReport

Task :app:signingReport 의 SHA1을 복붙하여 입력한다. 그리고 시키는대로...

## IOS - Firebase

XCode를 실행시킬 때, 파인더를 열어서 ios폴더의 socialcoin.xcworkspacedata 파일이나 socialcoin.pbxproj를 바로 열어도 된다. (vscode에서는 폴더로 나오지만 파인더에서는 파일로 나옴) 그리고 bundle id가 우리가 찾는 정보다.

GoogleService-Info.plist 파일은 안드로이드 때와는 달리 XCode의 Add files to socialcoin으로 추가해 줘야 한다.

https://rnfirebase.io/#3-ios-setup
