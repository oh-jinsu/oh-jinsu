---
layout: article
category: 애자일 소프트웨어
title: Flutter로 MVVM 패턴 구현하기
description: 이번 Flutter 프로젝트를 진행하면서 MVVM 패턴을 선택했습니다. 소프트웨어를 뷰와 모델 그리고 뷰모델의 세 계층으로 나누는 설계입니다. 뷰는 가시적인 부분을 담당합니다. 모델은 데이터를 말합니다. 뷰모델은 중간에서 핵심 비즈니스 로직을 수행합니다. 저는 이 최소한의 구분에서 시작하려고 했습니다. 그리고 분명한 필요가 생길 때에만 새로운 요소를 더하고자 노력했습니다. 기본적인 필요는 다음과 같은 원칙을 준수하는 데에서 나타났습니다. 1)뷰모델은 단위별로 테스트할 수 있어야 한다. 2)백엔드가 실제로 구현된 여부와 상관 없이 프론트엔드를 개발할 수 있어야 한다. 글에서는 위의 원칙들을 따라 MVVM 패턴을 Flutter 프로젝트에 적용시킨 이야기를 해 볼 것입니다.
date: 2022-01-28
keywords: [Flutter, MVVM]
---
이번 Flutter 프로젝트를 진행하면서 MVVM 패턴을 선택했습니다. 소프트웨어를 뷰와 모델 그리고 뷰모델의 세 계층으로 나누는 설계입니다. 뷰는 가시적인 부분을 담당합니다. 모델은 데이터를 말합니다. 뷰모델은 중간에서 핵심 비즈니스 로직을 수행합니다.

저는 이 최소한의 구분에서 시작하려고 했습니다. 그리고 분명한 필요가 생길 때에만 새로운 요소를 더하고자 노력했습니다. 기본적인 필요는 다음과 같은 원칙을 준수하는 데에서 나타났습니다.
- 뷰모델은 단위별로 테스트할 수 있어야 한다.
- 백엔드가 실제로 구현된 여부와 상관 없이 프론트엔드를 개발할 수 있어야 한다.

글에서는 위의 원칙들을 따라 MVVM 패턴을 Flutter 프로젝트에 적용시킨 이야기를 해 볼 것입니다. 우선 디렉토리 구조를 통해 대략적으로 조감해 볼 수 있습니다.

```treeview
+-- application
|   +-- services
|   +-- modules
|       +-- splash
|       +-- home
|       +-- sign_in
|           +-- concretes
|           |   +-- viewmodel.dart
|           +-- view
|           +-- coordinator.dart
|           +-- viewmodel.dart
+-- domain
|   +-- core
|   |   +-- client
|   |   +-- requests
|   |       +-- auth
|   |       +-- user
|   +-- sub
|   |   +-- use_cases
|   |   |   +-- auth
|   |   |       +-- exceptions
|   |   |       |   +-- invalid_password.dart
|   |   |       +-- sign_in.dart
|   |   |   +-- user
|   |   +-- repositories
|   |   |   +-- auth
|   |   |   +-- user
|   |   +-- providers
|   +-- models
+-- external
|   +-- client
|   +-- repositories
|   +-- providers
|   +-- utilities
+-- orchestration
+-- main.dart
```

클린아키텍처의 계층적 구분을 본받았습니다. application 계층은 modules 디렉토리를 가지고 있습니다. 스크린 단위로 뷰와 뷰모델을 하나씩 보관했습니다.

domain 계층은 core와 sub로 다시 구분됩니다. core에서는 단순히 백엔드 API를 커맨드 객체로 매핑합니다. sub에서는 다양한 기능들을 종합해 API를 쉽게 이용할 수 있도록 돕습니다. 

마지막으로 domain 계층에서 의존성이 역전된 모든 인터페이스들의 구현체가 external에 담겨 있습니다.

# 뷰모델 작성하기
편의를 위해 GetX 라이브러리를 이용했습니다. 생명주기를 내장하는 컨트롤러를 제공합니다. 뷰는 간편하게 뷰모델의 의존성을 주입받을 수 있습니다. 물론 GetX가 아니라 다른 서비스 로케이터를 이용하더라도 MVVM을 구현하는 데에는 지장이 없습니다.

익숙한 `StatelessWidget`에서 시작하겠습니다. 기왕의 코드에서 비즈니스 로직을 뷰모델로 옮겨 놓고 나면 뷰가 남습니다. 뷰와 뷰모델은 GetX의 서비스 로케이터를 통해 다음과 같이 연결됩니다.

```dart
class SignInView extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return GetBuilder<SingInViewModel>(
      builder: (viewmodel) {
        return ...
      }
    )
  }
}
```

이때 `GetBuilder<T>`의 제네릭 인자로는 뷰모델의 추상 클래스를 제공합니다. 구체 클래스가 아닙니다. 일반적으로 MVVM은 뷰모델에 많은 양의 코드를 부담합니다. 이것이 단점으로 꼽히곤 하는데, 추상 클래스를 따로 작성하는 방법으로 부담을 낮출 수 있습니다. 아래와 같아요.

```dart
abstract class SignInViewModel extends GetxController {
  String get email;
  
  String get password;

  Future<ViewModelResponse> onEmailChanged(String value);

  Future<ViewModelResponse> onPasswordChanged(String value);

  Future<ViewModelResponse> onSubmitted();
}
```

`GetxController`를 상속했습니다. `GetBuilder<T>`의 제네릭 인자에 타입을 맞춘 것입니다. 또한 `implements`가 아닌 `extends` 키워드를 사용했습니다. 구체 클래스가 간단하게 자신의 추상 클래스를 상속하기만 하면 되게끔 한 것입니다.

복잡한 구체 클래스는 concretes 디렉토리의 하위에 숨겼습니다. 구현을 도맡은 개발자 이외에는 열어 볼 일이 없어야 바람직하다고 생각했습니다. 뷰는 상기한 예시처럼 뷰모델의 추상 클래스를 참조하여 작성합니다. 유닛 테스트도 마찬가지죠.

뷰모델의 추상 클래스는 뷰에서 사용할 출력 필드와 입력 메서드들의 나열입니다. 특히 메서드의 반환 값은 `Future<ViewModelResponse>`로 고정되어 있습니다. 비동기이며 응답 객체가 따릅니다. 전적으로 유닛 테스트를 위한 것입니다.

비동기는 해당하는 메서드의 실행을 간단한 `await` 키워드로 기다릴 수 있도록 만듭니다. 테스트 코드는 곧바로 다음 라인에서 변화를 확인할 수 있습니다. 하지만 어떤 액션들은 출력 필드를 바꾸지 않기도 합니다. 이를 위해 응답 객체를 반환하여 성공과 실패를 판별하는 것이죠.

# 뷰모델은 정말 어떤 계층도 의존하지 않을까?
앞서 보았다시피 뷰모델은 뷰를 의존하지 않습니다. 그렇다면 모델과의 관계는 어떨까요? 물론 뷰모델은 곧바로 `Repository`와 통신하여 모델을 가져올 수도 있습니다.

```dart
class ConcreteViewModel {
  final TodoRepository todoRepository;

  late final List<TodoItem> _todoItems;
  @override
  List<String> get todoTitles = _todoItems
    .map((item) => item.title)
    .toList();

  ConcreteViewModel({
    required this.todoRepository,
  });

  Future<void> _fetchTodoItems() async {
    _todoItems = await todoRepository.find();
  }
}
```

그리고 뷰모델이 참조하는 레포지토리는 추상 클래스입니다.

```dart
abstract class TodoRepository {
  Future<List<TodoItem>> find();

  ...
}
```

즉 `TodoRepository`는 뷰모델의 서버인 것입니다. 인터페이스를 놓아 의존성을 역전시키는 방법이죠. 이 방식은 서비스의 영역이 프론트엔드 애플리케이션에 국한한다면 옳습니다. 핵심 정책은 프론트엔드에서 작성되고 그러한 수행에 필요한 데이터들을 요청해야 합니다.

하지만 제가 이번에 개발하고자 하는 서비스는 그러한 모형이 아니었습니다. 핵심 정책은 백엔드 서버가 가지고 있습니다. API 서버와 웹 혹은 모바일 클라이언트가 분리된 현대 애플리케이션이 보통 가지고 있는 구조입니다. 프론트엔드 애플리케이션은 GUI일 뿐입니다. 다시 말해 프론트엔드의 과제는 핵심 정책의 구현이 아닙니다. 차라리 핵심 정책을 UI를 통해 간편화하는 일입니다. 프론트엔드가 결국에는 "뷰모델"을 구현하는 일과 같은 이유입니다.

좌우지간 그렇다면 프론트엔드는 백엔드의 정책에 대해 전적으로 의존적이게 됩니다. 그러므로 `Repository`와는 달리 의존성을 역전시키지 않은 계층을 하나 더 두었습니다. `Request` 계층입니다. 이는 단순하게 백엔드의 API 명세를 `Dart` 코드로 옮겨 놓은 것입니다. 커맨드 패턴을 따랐습니다.

```dart
class FindTodoItemsRequest implements Request<List<TodoItem>, FindTodoItemsRequestParams> {
  final ApiClient apiClient;

  FindTodoItemsRequest({
    required this.apiClient,
  });

  Future<List<TodoItem>> send(FindTodoItemsRequestParams params) async {
    final response = await apiClient.get(...);

    final result = ...

    return result;
  }
}
```

물론 API를 그대로 옮겨 놓았기 때문에 때때로 JWT 토큰이 필요한 때도 있습니다. 매개변수 객체로 받습니다.

```dart
class CreateTodoItemRequestParams {
  final String accessToken;
  ...

  const CreateTodoItemRequestParams({
    required this.accessToken,
    ...
  });
}
```

그런데 액세스 토큰은 뷰모델의 상태와 함께 저장할 수 없습니다. 스크린이 바뀌어도 인증 정보는 남아 있어야 하기 때문이죠. 이러한 것들은 어디에 가지고 있었을까요? 물론 그렇기 때문에 `Repository`도 그대로 가지고 있어야 하는 것입니다.

```dart
abstract class AuthRepository {
  Future<String?> findAccessToken();

  Future<void> saveAccessToken(String value);

  ...
}
```

`Repository`는 이처럼 프론트엔드의 정책적인 요구에 순응합니다. 뷰모델 계층은 `Repository`에 의존하지 않습니다. 하지만 백엔드와 통신하는 `Request`에 대해서는 그렇지 않습니다. 뷰모델은 `Request` 계층을 의존할 수밖에 없습니다.

# 감싸기를 통해 구조를 명확하게
domain 디렉토리 아래에는 sub 디렉토리가 있습니다. 그 아래에 유스케이스를 모아 둔 디렉토리도 있습니다. 프론트엔드의 유스케이스는 백엔드의 유스케이스를 확장합니다. 백엔드의 유스케이스(= `Request`)를 쉽게 이용할 수 있게끔 돕는 일련의 커맨드들입니다.

이를테면 뷰모델에서 백엔드에 구현된 로그인 유스케이스를 활용하는 과정은 다음과 같습니다.

```dart
class ConcreteSignInViewModel extends SignInViewModel {
  final SignInRequest signInRequest;
  final AuthRepository authRepository;

  ConcreteSignInViewModel({
    required this.signInReuest,
    required this.authRepository,
  });

  ...

  Future<ViewModelResponse> onSubmit() async {
    final params = SignInRequestParams({
      email: _email,
      password: _password,
    });

    final accessToken = await signInRequest.send(params);

    await authRepository.saveAccessToken(accessToken);

    return ViewModelResponse.success;
  }
}
```

사실 뷰모델은 이것 말고도 항상 많은 일들을 수행합니다. 유스케이스는 뷰모델의 크기를 줄일 수 있도록 간편한 API를 제공하는 퍼사드입니다. 단순하게 말하면 코드를 감싸는 일에 지나지 않습니다.

```dart
class SignInUseCase extends UseCase<void, SignInUseCaseParams> {
  final SignInRequest signInRequest;
  final AuthRepository authRepository;

  SignInUseCase({
    required this.signInReuest,
    required this.authRepository,
  });

  ...

  Future<void> execute(SignInUseCaseParams params) async {
    final email = params.email;

    final password = params.password;

    final params = SignInRequestParams({
      email: email,
      password: password,
    });

    final accessToken = await signInRequest.execute(params);

    await authRepository.saveAccessToken(accessToken);
  }
}
```

뷰모델은 이제 다음과 같이 사용합니다. 다른 스크린의 뷰모델 역시 같은 커맨드를 작동시킬 수 있습니다.

```dart
class ConcreteSignInViewModel extends SignInViewModel {
  final SignInUseCase signInUseCase;

  ConcreteSignInViewModel({
    required this.signInUseCase,
  });

  ...

  Future<ViewModelResponse> onSubmit() async {
    final params = SignInUseCaseParams({
      email: _email,
      password: _password,
    });

    try {
      await signInRequest.send(params);
    } on InvalidPasswordException {
      //TODO: Show an error dialog.

      return ViewModelResponse.failure;
    } ...

    return ViewModelResponse.success;
  }
}
```

뷰모델의 구체 클래스는 항상 유스케이스에 대한 예외 처리도 함께 수행해야 합니다. 우선은 충분한 자리를 확보할 수 있습니다. 그리고 예외는 명시적으로 유스케이스의 하위 디렉토리에 나열됩니다. 이건 애플리케이션의 명세를 한 눈에 알아볼 수 있게 돕습니다.

기왕의 MVVM 아키텍처에서 유스케이스 계층을 뷰모델과 모델 사이에 끼워 넣었습니다. 유스케이스는 말했다시피 퍼사드일 뿐입니다. 따라서 작동이 극적으로 변하지는 않습니다. 다만 애플리케이션의 구조는 더욱 명확해졌습니다. 이렇게 하면 유지보수가 용이합니다.

테스트 역시 간편해졌습니다. 모킹해야 하는 의존성의 수가 줄었기 때문입니다. 우리는 단지 뷰모델을 테스트하고 싶을 뿐입니다. `Repository`나 `Request`가 아니다.

`Request`를 사용해야 하지만 백엔드 API가 준비되지 않았을 때도 있습니다. 개발 환경에서도 단순히 유스케이스를 모킹하면 됩니다. 백엔드가 구현되지 않아도 프론트엔드를 개발하는 데에는 문제가 없습니다. 정책이 분명히 명세되어 있다면 말입니다.

# 종합
결국에 이번 프로덕션에 사용한 아키텍처는 크게 네 가지 책임을 가진 계층으로 나뉩니다. 마틴 파울러는 책임이란 변경을 위한 단 한 가지의 이유라고 이야기했습니다. 그렇다면 예의 아키텍처는 크게 네 가지의 변경에 대비되어 있다고 하겠습니다.

1. 가장 먼저는 물론 API의 명세입니다. 거듭 말하지만 이 프로젝트의 프론트엔드는 백엔드 애플리케이션의 GUI 역할을 수행하기 때문입니다. 정책적 변화는 거의 모든 부분에 영향을 끼칠 수 있는 것이 당연합니다. domain 계층 아래의 core 계층이 기술적인 변화에 대응했습니다.
2. 다음은 일종의 서브도메인으로서 프론트엔드가 백엔드 API를 이용하는 정책입니다. `UseCase`는 `Repository`의 인터페이스를 요청하고 이용합니다. 어디까지나 자신이 의존하는 `Request`를 잘 사용하기 위해서입니다. 목적만 달성한다면 그 방식은 제각각일 수 있습니다.
3. 그리고 뷰모델보다 먼저 말하자면 가시적인 부분을 담당하는 뷰가 있습니다. 뷰는 디자인의 구성적인 변화에 대응합니다. 물론 디자인에도 정책적인 변화가 있습니다. 이것에는 뷰모델도 자유로울 수 없습니다. 뷰모델은 어디까지나 말 그대로 뷰의 모델이기 때문입니다.
4. 뷰모델은 기술적으로는 뷰와 모델 계층과 독립되어 있지만 정책적으로는 전혀 그렇지 않습니다. 오히려 뷰모델은 디자인과 백엔드의 두 의존성을 함께 다루는 계층입니다. 복잡한 일을 수행할 수밖에 없습니다. 다만 그처럼 복잡한 일에서 반드시 발생하는 에러를 이제는 보다 쉽게 찾아낼 수 있죠. 작동 자체의 유지보수가 용이해지는 것입니다.

결국 소프트웨어 설계는 비용의 문제입니다. 프로덕션 전후의 생산성에 대한 것이기도 합니다. 필요에 따라 최소한으로 구분했기 때문에 충분히 빠르게 개발했습니다. 물론 결과물은 잘 작동하는 한에서 입니다. 그리고 책임의 분리와 의존적 구조가 바로잡힌 설계 덕분에 추후에 발생한 오류를 민첩하게 해결했습니다. 실제 프로덕션을 염두에 둔다면 문제는 항상 유지보수에 대한 것입니다. 이번 설계는 충분한 실용성을 갖추고 있습니다.
