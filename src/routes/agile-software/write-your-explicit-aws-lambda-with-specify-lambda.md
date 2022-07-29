---
layout: article
category: 애자일 소프트웨어
title: AWS Lambda로 명시적인 REST API를 작성하는 법
description:
date: 2022-07-26
keywords: [AWS, Lambda, 명시적, REST API, specify-lambda]
---
## 왜 AWS Lambda인가요?
[REST API](https://www.redhat.com/ko/topics/api/what-is-a-rest-api) 서버를 구현하는 기술은 다양해요. 하지만 어떤 기술을 사용하든 잘 설계한 REST API 서버는 한 가지 공통점을 가지는데요. 바로 하나의 API를 구성하는 코드가 다른 API를 구성하는 코드와 영향을 최대한 주고받지 않는다는 점이에요. 

무슨 말일까요? 보통 REST API 서버는 여러 기능들을 가지고 있어요. 예를 들어 로그인 기능과 로그아웃 기능을 모두 가지고 있죠. 그러니까 사실은 그러한 기능들을 따로 분리해서 운영해도 아무런 지장이 없다는 말이에요. 하나의 서비스에서 로그인 기능과 로그아웃 기능을 모두 구현하는 것이 아니라, 기능을 하나씩 담당하는 두 서비스를 구현하는 거죠.

오히려 분리해서 운영하면 장점이 생겨요. 우선 서비스를 단순하게 만들 수 있어요. 하나의 서비스는 하나의 기능만 책임지면 되거든요. 게다가 단순할수록 코드를 관리하기 쉬워지고요. 무엇보다 구현하는 조건이 자유로워요. 환경을 분리했으니 구현할 기능마다 적합한 기술을 선택할 수 있으니까요. 이를테면 로그인 기능은 node.js 런타임으로 구현하지만 신분증 인식 기능은 python 런타임으로 구현할 수 있죠.

문제는 비용이에요. 시간과 노력 둘 다요. 말하자면 기능들마다 Amazon EC2 인스턴스를 할당하기는 어렵겠죠. 작은 기능 하나 때문에 서버를 통째로 빌리는 건 낭비고, 번거로운 세팅 과정도 있어요. 그래서 우리에게는 [AWS Lambda](https://aws.amazon.com/ko/lambda/)가 필요한 거죠. AWS Lambda를 이용하면 Amazon EC2 인스턴스를 할당하지 않고도 손쉽게 코드를 실행시킬 수 있거든요. 그리고 코드를 실행시킨 그만큼만 비용을 지불하면 돼요.

그렇기 때문에 REST API를 구현해야 한다면 AWS Lambda는 좋은 선택이 될 거에요. ([콜드 스타트 문제](https://aws.amazon.com/blogs/compute/operating-lambda-performance-optimization-part-1/)가 있지만...)

## API 문서를 관리하는 이중고
## specify-lambda: 그 자체로 명시적인 REST API를 작성하세요.