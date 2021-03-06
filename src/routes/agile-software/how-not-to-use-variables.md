---
layout: article
category: 애자일 소프트웨어
title: 대입문을 사용하지 않는 프로그래밍
description: Uncle Bob이 함수형 프로그래밍에 관해서 남긴 유명한 말이 있죠. "Functional programming is programming without assignment statements." 즉 함수형 프로그래밍이란 대입문을 사용하지 않는 프로그래밍이라는 것입니다. 대입문을 사용하지 않는다는 건 무엇을 의미할까요? 그리고 어떻게 가능할까요?
date: 2022-07-13
keywords: [대입문, 프로그래밍, 함수형 프로그래밍, 객체 지향 프로그래밍]
---
[Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin)이 [함수형 프로그래밍](https://ko.wikipedia.org/wiki/%ED%95%A8%EC%88%98%ED%98%95_%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)에 관해서 남긴 유명한 말이 있습니다.

> Functional programming is programming without assignment statements.

즉 함수형 프로그래밍이란 대입문을 사용하지 않는 프로그래밍이라는 뜻입니다. 여기서 대입문을 사용하지 않는다는 건 무엇을 의미할까요? 또 그러한 일이 어떻게 가능할까요?

## 대입문을 사용하는 프로그래밍

대입문을 사용하지 않는 프로그래밍을 이야기하기에 앞서 대입문을 사용하는 프로그래밍을 살펴 보죠. 사실, 직관에 더욱 들어맞는 건 이쪽입니다. 제가 처음 프로그래밍 비슷한 놀이를 할 때가 그랬죠.

오래전에 만들던 플래시 게임이 있었습니다. 저는 게임 캐릭터가 장비를 착용할 수 있으면 좋겠다고 생각했죠. 물론 장비를 착용했을 때 방어력도 함께 올라가야 했습니다. 이를 구현하기 위해 어떤 코드를 짰을까요? 당시에는 액션스크립트 2.0을 사용했지만 지금은 자바스크립트로 예를 들어 보겠습니다.

```js
function equip(character, equipment) {
  character.def = character.def + equipment.def
}
```

주어진 코드는 캐릭터 객체와 장비 객체를 인자로 받아 캐릭터의 방어력을 장비의 방어력만큼 증가시킵니다. `def`라는 변수의 값을 새로운 값으로 바꿈으로써 말입니다. 저는 이러한 조작을 대입이라고 부르겠습니다. 물론 대입 그 자체에는 아무런 문제가 없습니다. 실제로 코드는 의도한 대로 작동합니다.

관점을 지금의 관건인 방어력에게 옮겨 보죠. 우리는 방어력을 의미하는 `def` 값에 대해 무엇을 알고 있나요? 핵심은 `def` 값을 누구도 정확하게 알지 못한다는 사실입니다. 왜냐하면 `def`는 스스로가 알지 못하는 다른 것(이를테면 `equip`)에 의해 언제든 바뀔 수 있을 테니까요. `def`가 얼마나 커지거나 작아질 수 있는지, 값이 변화하는 데에 덧셈이 아니면 곱셈이 이용되는지를 알 수 없습니다. 심지어 `def`는 자바스크립트 변수이므로 숫자인지 문자열인지조차 가늠할 수 없죠. 

이러한 이유 때문에 객체 지향 언어들은 정적인 타입 시스템과 은닉화를 지원합니다. 코드를 개선해 보죠. 이건 제가 플래시 게임을 깨작거리던 중학생 시절에는 상상도 할 수 없던 방법입니다.

```kt
class Character {
  private _def: Int = 0

  def: Int get() = _def

  fun equip(equipment: Equipment) {
    _def = _def + equipment.def
  }
} 
```

우리는 이제 `def`가 부호있는 32비트짜리 정수라는 사실에 동의할 수 있게 되었습니다. 이어서 `def`는 `private`이라는 접근한정자가 외부로부터 보호하고 있는 값이죠. 오직 `equip`이라는 메서드만이 `def`의 값을 변경할 수 있습니다. 조작하는 주체가 한정되면서 대략 `def`의 값을 추적해 볼 수 있게 되었습니다.

하지만 어디까지나 대략입니다. `def`는 스스로에게는 항상 불안한 값입니다. 자기 자신이 무엇인지 알 수 없죠. 말하자면 미지수 x입니다. 미지수 x의 관점 바깥에 존재하는 메서드는 여기에 새로운 값을 대입함으로써 프로그램을 진행시킵니다. 즉 대입이란 정해져 있지 않은 대상을 그것과 소원한 무언가로 변화시키는 일인 것이죠. 값은 자신의 변화에 대해 소원합니다.

이건 객체 지향 프로그래밍에서 유닛 테스팅이 강제되는 이유이기도 합니다. 퍼블릭 메서드를 통한 통신 이후에 특정한 속성의 값을 단언(assert)해야만 하는 이유는, 놀랍게도 우리가 그 값을 확정할 수 없기 때문인 것입니다.

```kt
val character = Character()

val equipment = Equipment()

character.equip(equipment)

assertEqual(10, character.def)
```

## 대입문을 사용하지 않는 프로그래밍

저는 함수형 프로그래밍을 좋아합니다. 많은 부분은 지루한 유닛 테스트를 작성할 필요가 없는 덕분에 그렇습니다. 거듭 말하지만 유닛 테스트는 어떤 값을 확정할 수 없기 때문에 수행해야 합니다. 하지만 어떤 값을 이미 확정할 수 있다면 어떨까요? 방어력에 관한 코드를 다시 작성해 보죠.

```js 
const def = equipments
  .map(({ def }) => def)
  .reduce((acc, cur) => acc + cur, 0)
```

`def`가 `const` 키워드를 가지고 있다는 사실에 주목하세요. 우리는 `def`를 확정했습니다. 바로 y=f(x)와 같은 꼴로 말이죠.

```js
const def = f(equipments)
```

즉 `def`는 `equipments`의 함수입니다. 그리고 `f`는 [순수함수](https://en.wikipedia.org/wiki/Pure_function)죠. 얼핏 함수 역시 특정한 값을 다른 값으로 변화시키는 것처럼 보이지만 분명히 하건대 메서드와 함수는 다릅니다. 어떻게 다를까요?

- **함수는 반드시 하나 이상의 인자를 가집니다.** 인자 없이 반환값만 가진 함수를 상상해 봅시다. 이는 단순한 상수에 불과합니다. 인자는 쉽게 말해서 달라질 수 있는 입력값인데, 달라질 조건이 없는 식이라면 이미 계산해버릴 수 있죠. 반면 메서드는 인자가 없는 형태도 허용합니다. 왜냐하면 메서드는 입력에 대한 출력이 아니라 객체 사이의 통신을 목적으로 설계되었기 때문입니다.
- **함수는 반드시 반환값을 가집니다.** 함수가 어떠한 값도 반환하지 않는다면 대체 무슨 소용이 있을까요? 특정한 입력에 대해서 값을 내놓치 않고도 작업이 유용하기 위해서는 무엇이 필요할까요? 바로 외부의 변수를 변화시키는 효과가 필요합니다. 흔히 [사이드 이펙트](https://en.wikipedia.org/wiki/Side_effect_(computer_science))라고 부르죠. 메서드는 애당초에 사이드 이펙트를 이용할 목적으로 설계된 것입니다. `void`와 같은 반환 타입이 있는 것도 이러한 이유입니다.

함수는 외부의 어떤 변수도 사용하지 않고 인자로 받은 값만을 이용하여 반환값을 산출합니다. 따라서 `equipment`의 함수인 `def`는 이제 스스로에 대해서 압니다. 예시를 참고하자면 `equipments`라는 배열에 속한 각각의 원소로부터 `def` 값을 뽑아내어 모두 더한 값이군요.

