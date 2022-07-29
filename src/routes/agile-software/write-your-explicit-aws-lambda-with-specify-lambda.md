---
layout: article
category: 애자일 소프트웨어
title: AWS Lambda로 명시적인 REST API를 작성하는 법
description:
date: 2022-07-26
keywords: [AWS, Lambda, 명시적, REST API, specify-lambda, API 문서]
image: /images/write-your-explicit-aws-lambda-with-specify-lambda.jpg
---
## 왜 AWS Lambda인가요?
[REST API](https://www.redhat.com/ko/topics/api/what-is-a-rest-api) 서버를 구현하는 기술은 다양해요. 하지만 어떤 기술을 사용하든 잘 설계한 REST API 서버는 한 가지 공통점을 가지는데요. 바로 하나의 API를 구성하는 코드가 다른 API를 구성하는 코드와 영향을 최대한 주고받지 않는다는 점이에요. 

무슨 말일까요? 보통 REST API 서버는 여러 기능들을 가지고 있어요. 예를 들어 로그인 기능과 로그아웃 기능을 모두 가지고 있죠. 그러니까 사실은 그러한 기능들을 따로 분리해서 운영해도 아무런 지장이 없다는 말이에요. 하나의 서비스에서 로그인 기능과 로그아웃 기능을 모두 구현하는 것이 아니라, 기능을 하나씩 담당하는 두 서비스를 구현하는 거죠.

오히려 분리해서 운영하면 장점이 생겨요. 우선 서비스를 단순하게 만들 수 있어요. 하나의 서비스는 하나의 기능만 책임지면 되거든요. 게다가 단순할수록 코드를 관리하기 쉬워지고요. 무엇보다 구현하는 조건이 자유로워요. 환경을 분리했으니 구현할 기능마다 적합한 기술을 선택할 수 있으니까요. 이를테면 로그인 기능은 node.js 런타임으로 구현하지만 신분증 인식 기능은 python 런타임으로 구현할 수 있죠.

문제는 비용이에요. 시간과 노력 둘 다요. 말하자면 기능들마다 Amazon EC2 인스턴스를 할당하기는 어렵겠죠. 작은 기능 하나 때문에 서버를 통째로 빌리는 건 낭비고, 번거로운 세팅 과정도 있어요. 그래서 우리에게는 [AWS Lambda](https://aws.amazon.com/ko/lambda/)가 필요한 거죠. AWS Lambda를 이용하면 Amazon EC2 인스턴스를 할당하지 않고도 손쉽게 코드를 실행시킬 수 있거든요. 그리고 코드를 실행시킨 그만큼만 비용을 지불하면 돼요.

그렇기 때문에 REST API를 구현해야 한다면 AWS Lambda는 좋은 선택이 될 거에요. ([콜드 스타트 문제](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/)가 있지만...)

## API 문서를 관리하는 이중고
API를 구현하면 알다시피 문서도 작성해야 해요. 다른 누군가는 API를 사용해야 하니까요. 그렇지만 문서 관리는 귀찮은 일이죠. 뿐만 아니라 협업에 차질을 빚을 때도 적지 않고요. 수정한 내용을 실수로 문서에는 누락하거나 한다면요.

문서 관리는 어떤 수단을 사용하든 해내면 되지만 [Swagger](https://swagger.io)라는 도구도 있어요. 기능을 구현할 때 같은 언어로 명세를 함께 작성해 두면 웹에서 읽을 수 있는 API 문서를 자동으로 생성해 주죠. 명세서를 작성하는 수고를 덜어 주니 편리해요.

하지만 기능을 수정한 다음에 문서에 올라갈 내용도 함께 수정해야 한다는 사실은 변함이 없어요. 여전히 실수할 여지는 남아 있는 셈이에요. 문제는 기능을 구현한 다음에 잊지 않고 문서도 갱신해야 하는 이중적인 절차에 있는 것처럼 보였어요. 그래서 문서 관리를 자동화하는 방법보다 차라리 문서의 필요 자체를 없애는 방법이 좋다고 생각했죠.

## specify-lambda: API 문서를 없애는 깔끔한 방법

어떻게 API 문서를 없앨 수 있을까요? 단순해요. 코드 구현을 읽으면 돼요. 코드는 기능이 무엇을 요구하고 무엇을 전달하는지를 전부 말해 주고 있잖아요.

하지만 코드 구현을 바로 읽기는 어렵죠. 일일이 코드를 뜯어 보고 있을 시간도 없어요. API를 사용하는 입장에서는 기능의 추상적인 정보만 알면 되거든요. 추상적인 정보는 어떤 종류가 있을까요? 일반적인 API 명세에서 흔히 볼 수 있는 것들인데 세 가지로 나누어 볼 수 있어요.

1. **요청 인자**: 기능을 실행하는 데에 필요한 입력값을 의미해요. HTTP 통신에서 이를테면 Method의 종류나 Header 값 혹은 Request Body에 속하는 속성들의 타입 같은 것들이 있어요.
2. **예상 응답**: 기능을 정상적으로 실행했을 때 전달할 값을 의미해요. 예를 들어 GET /users에 대한 응답 객체의 속성과 형식과 같은 것들이에요.
3. **예외 응답**: 기능은 정상적으로 실행할 수 없을 때가 많아요. 그런 경우마다 어떤 응답을 보내는지를 의미해요. HTTP 상태 코드나 메시지 같은 것들이 포함되죠.

이용자 정보를 추가하는 기능의 예를 들어 보면 어떨까요?
```
1. 요청인자
Method: POST
Url: /users
RequestBody: {
  name: string;
}

2. 예상응답
StatusCode: 201
ResponseBody: {
  id: string;
  name: string;
  created_at: Date;
}

3. 예외 응답
400 유효하지 않은 요청
409 이용자가 이미 존재함
```

주어진 명세만을 보고 기능을 이해해 보죠. 우선 이 기능은 POST /users에 string 타입의 name 속성을 실어서 요청을 해야 하는군요. REST API 체계를 안다면 새로운 이용자를 추가하는 기능이라는 사실까지도 추론할 수 있어요. 기능을 잘 수행했다면 요청자는 201 상태 코드와 함께 새 이용자의 정보를 받아 볼 수 있을 거에요. 하지만 요청을 잘못 보낸다면 400 상태 코드를 포함한 응답을 받겠네요. 같은 이름으로 요청을 하면 409 상태 코드를 포함한 응답을 받을 거고요.

API를 소비하기에 충분한 정보죠. 그렇다면 유사한 형식으로 기능을 구현하는 데에 필요한 타입을 선언할 수 있다면 어떨까요? API를 소비하는 입장에서는 충분히 명시적이고, API를 구현하는 입장에서는 유용한 타입을 말이죠.

```ts
// spec.ts

@Post()
export class Request {
  @Required()
  @IsString()
  @Body("name")
  readonly name: string;
}

@StatusCode(201)
export class Response {
  @SnakeCase()
  readonly body: {
    readonly id: string;
    readonly name: string;
    readonly created_at: Date;
  }
}

export class BadRequestExeption extends Exception {
  constructor() {
    super(400, "유효하지 않은 요청입니다.")
  }
}

export class ConflictUserException extends Exception {
  constructor() {
    super(409, "이용자가 이미 존재합니다.")
  }
}
```

바로 이게 이 글에서 소개할 [specify-lambda](https://www.npmjs.com/package/specify-lambda)가 지원하는 기능이에요. 하나의 Typescript 파일에 AWS Lambda로 작성한 REST API의 명세를 담을 수 있죠. 이 명세는 단순히 읽는 용도가 아니에요. 이를테면 `@Body("name")` 데코레이터는 Request Body의 `name` 속성을 런타임에 추출해요. 그걸 어디로 가져다 주냐면,

```ts
// index.ts

export const handler = specify(
  Request,
  Response,
)(async ({ name }) => {

  // 바로 여기!

  return {
    body: { ... }
  }
})
```

Lambda 핸들러의 본문에서 바로 쓸 수 있도록 가져다 주죠. 그리고 반환값의 타입도 먼저 `spec.ts`에서 명세한 `Response` 타입으로 한정돼요.

이로써 API 문서를 작성할 필요가 없어졌어요. 코드 구현을 읽기가 쉬워졌거든요. 이용자는 기능의 추상적인 정보를 담은 `spec.ts`만 읽으면 돼요. 그리고 개발자는 `spec.ts` 덕분에 한정된 타입을 따라 개발하면 되고요.