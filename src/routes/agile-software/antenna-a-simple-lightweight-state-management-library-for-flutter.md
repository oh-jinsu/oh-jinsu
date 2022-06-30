---
layout: article
category: 애자일 소프트웨어
slug: antenna-a-simple-lightweight-state-management-library-for-flutter
title: "안테나: 간단하고 유연한 Flutter 상태관리 라이브러리"
description: 안테나는 Flutter 애플리케이션의 상태관리를 돕는 몇 가지 API의 묶음입니다. Redux와 많이 닮아 있어요. 하지만 일반적으로 Redux는 혼자서 작동하지 않습니다. 불변성 관리나 비동기 작업 등을 돕는 여타 부속 라이브러리들을 설치해야 하죠. 이러한 이유로 러닝커브가 높아지고 코드는 불필요하게 복잡해집니다. 안테나 라이브러리는 그러한 점을 해결합니다.
date: 2022-06-30
keywords: [Antenna, Flutter, 상태관리, 라이브러리]
---
[안테나](https://github.com/oh-jinsu/antenna)는 Flutter 애플리케이션의 상태관리를 돕는 몇 가지 API의 묶음입니다. Redux와 많이 닮아 있어요. 하지만 일반적으로 Redux는 혼자서 작동하지 않습니다. 불변성 관리나 비동기 작업 등을 돕는 여타 부속 라이브러리들을 설치해야 하죠. 이러한 이유로 러닝커브가 높아지고 코드는 불필요하게 복잡해집니다. 안테나 라이브러리는 그러한 점을 해결합니다.

글에서는 안테나를 소개하고 카운터 예제를 구현해 볼 거에요. 이해하기 쉽도록 Redux와 비교하여 설명하겠습니다.

## 안테나 설치하기
```sh
flutter pub add antenna
```

## 안테나는 간단해요
### 여러개의 작은 스토어
안테나에서 스토어는 데이터의 현재 상태를 저장하는 객체입니다. 스토어의 API는 다음과 같아요.
```dart
abstract class StoreApi<T> {
  T get value;

  Stream<T> get stream;
}
```

Redux는 애플리케이션을 통틀어 하나의 스토어를 가집니다. 반면에 안테는 여러개의 작은 스토어를 만들 수 있어요.
```dart
// lib/stores/movie.dart

final movieStore = createStore(({List<Movie> state = [], dynamic event}) {
  if (event is ListOfMovieFound) {
    return event.items;
  }

  return state;
});
```

안테나에서는 선언한 Store를 그대로 가져다가 사용해요.
```dart
import "package:app/stores/movie.dart";

final subscription = movieStore.stream.listen((value) {
  // TODO: do something
});
```

### 이벤트를 직접 구독하는 이펙트
경험상 Redux에서 가장 성가신 부분은 Middleware였습니다. 하지만 사이드이펙트를 관리하기 위해서 반드시 필요했죠. 안테나에서는 Middleware를 이펙트라고 부릅니다. 왜냐하면 똑같이 사이드이펙트를 관리하지만 작동하는 방식이 다르기 때문입니다. Redux에서는 액션이 발행되었을 때 스토어의 Reducer를 호출하기에 앞서 순차적으로 실행되기 때문에 Middleware라고 부릅니다. 하지만 안테나에서는 이펙트가 애플리케이션에서 발행되는 이벤트를 직접 구독합니다.

```dart
fetchUserEffect(dynamic event) async {
  if (event === "fetch-user-requested") {
    final response = await client.get("user");

    final user = User.fromJson(response.body);

    dispatch(UserFound(user));
  }
}
```

## 안테나는 유연해요
### 무엇이든 되는 이벤트
안테나에서 이벤트는 Redux의 Action과 유사한 역할을 합니다. Redux에서 Action은 일반적으로 `type`과 `payload` 속성을 가집니다. 하지만 안테나에서 이벤트의 형식은 정해져 있지 않습니다. 사실 이벤트에 해당하는 타입도 없죠. 원하는 방식대로 이벤트를 선언하세요.

```dart
const appStarted = "appStarted"

class AppStarted {
  const AppStarted();
}
```

### 어디서나 이벤트 발행하기
이벤트를 발행하는 다음의 함수는 전역에 위치합니다. 이건 앞선 예에서 이펙트 또한 이벤트를 발행할 수 있었던 이유이기도 합니다.
```dart
void dispatch(dynamic event);
```
물론 `dipsatch` 함수를 사용하면 안되는 곳이 있습니다. `createStore` 함수의 인자로 들어가는 리듀서 내부입니다. 리듀서는 순수함수여야 하기 때문입니다. 그렇지만 그 외에는 이벤트가 어디서든 발행되도 좋습니다. 데이터가 단방향으로 흐르기 때문에 가능한 일입니다.

### 스토어와 이펙트의 생명주기 관리
애플리케이션 발행하는 이벤트를 구독하는 주체는 두 종류가 있습니다. 스토어와 이펙트입니다. 스토어는 이벤트가 발행될 때마다 리듀서를 통해 스스로의 상태를 갱신합니다. 이펙트 역시 주어진 일을 수행할 이벤트가 발행되기만을 기다리고 있죠.

스토어와 이펙트는 이벤트를 듣기 시작하는 함수를 따로 가지고 있습니다. 거꾸로 말해서 그대로 놔둔다고 작동하지 않는다는 뜻입니다.

스토어가 이벤트를 듣도록 하려면 `connect` 함수를 호출합니다.
```dart
final subscription = connect(movieStore);
```

이펙트가 이벤트를 듣도록 하려면 `listen` 함수를 이용하세요.
```dart
final subscription = listen(fetchUserEffect);
```

그리고 보다시피 두 함수는 모두 `StreamSubscription` 객체를 반환합니다. 잘 모아 두었다가 특정한 시점에 `cancel` 메서드를 호출해서 이벤트 수신을 종료시킬 수 있습니다.

## Flutter 예제
[카운터 앱](https://github.com/oh-jinsu/antenna/tree/main/example)

[채팅 앱](https://github.com/oh-jinsu/madeit)