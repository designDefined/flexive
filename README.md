# Flexive

### 목차

- [사용법](#사용법)
  - [설치](#설치)
  - [기초적인 사용법](#기초적인-사용법)
  - [재사용 컴포넌트와 디자인 시스템](#재사용-컴포넌트와-디자인-시스템)
    - [주의할 점: 구체성과 우선순위](#주의할-점-구체성과-우선순위)
    - [주의할 점: ref 이용하기](#주의할-점-ref-이용하기)
- [Module Status](#module-status)
- [라이브러리 명세](#라이브러리-명세)
  - [Props Specification](#props-specification)
    - [Display 관련](#display-관련)
    - [Flexbox 관련](#flexbox-관련)
    - [정렬 관련](#정렬-관련)
    - [Sizing 관련](#sizing-관련)
    - [Overflow 관련](#overflow-관련)
    - [기타](#기타)
  - [API Specification](#api-specification)

# 사용법

## 설치

```shell
yarn add @flexive/core
# 또는
npm install @flexive/core
```

- `react`와 함께 사용해야 합니다.
- 별도의 css reset 또는 normalize를 제공하지 않아, 관련 라이브러리와 함께 사용할 것을 권장합니다.

## 기초적인 사용법

`@flexive/core`는 일반적인 JSX를 대체하는 **기본 컴포넌트**를 제공합니다.

```tsx
import { Div, Span, Button, Input, H1, P } from "@flexive/core"; // and much more...
```

기본 컴포넌트는 기본적으로 Flexbox와 관련된 기본값 속성을 가지고 있으며, 선언 시 `FlexiveProp`을 전달하여 레이아웃과 관련된 속성을 조정할 수 있습니다. 예를 들어

```tsx
<Div row px={12} py={16} g={20} alignM="end" alignC="center" />
```

이 컴포넌트는

```css
.someDiv {
  display: flex;
  flex-direction: row;
  padding: 16px 12px;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
}
```

이러한 클래스 선택자가 적용된 요소와 동일합니다.

`FlexiveProp`으로 조정할 수 있는 모든 속성을 알고 싶다면 아래의 [Props Specification](#props-specification)를 참고하세요. 이외의 prop 인터페이스는 기본적인 JSX와 완전히 동일합니다.

`prop`으로 설정한 레이아웃은 인라인 스타일 객체에 의해 덮어씌워질 수 있습니다. 그러나 CSS 파일을 이용한 스타일링보다는 우선시됩니다.

```tsx
<Div className="target" m={4} p={16} style={{ padding: "24px" }} />
```

```css
.target {
  margin: 8px;
}
```

이 컴포넌트의 padding은 24px, margin은 4px입니다.

## 재사용 컴포넌트와 디자인 시스템

`@flexive/core`를 이용하면 재사용과 커스터마이징이 가능한 컴포넌트를 간편하게 선언할 수 있습니다. 다음은 테마에 따라 특정 디자인이 적용된 버튼 컴포넌트를 만드는 예시입니다.

먼저 버튼 컴포넌트에서 사용할 Props를 선언합니다. `@flexive/core`의 `PropsOf` 타입을 사용하면 기본 JSX와 동일한

```tsx
import { PropsOf } from "@flexive/core";

// Button 컴포넌트가 최상위일 것이므로 PropsOf의 제니
type MyButtonProps = PropsOf<"button"> & {
  theme?: "light" | "dark"; // 원하는 대로 custom prop을 추가합니다. 단 이름이 겹칠 것을 주의하십시오.
};
```

그리고 컴포넌트 코드를 작성합니다. `props`를 하위 컴포넌트에 모조리 전달하여 다재다능하고, `FlexiveProps`의 기본값을 언제든 override할 수 있는 컴포넌트를 만들어 볼 겁니다.

```tsx
export const MyButton = ({
  theme = "light",
  className, // className을 따로 주입해주지 않으면 디자인 컴포넌트 자체의 클래스명이 덮어씌워질 수 있습니다.
  ...props
}: MyButtonProps) => {
  return (
    <Button
      className={`MyButton ${theme} ${className}`}
      p={16} // FlexiveProps로 레이아웃의 기본값을 설정합니다
      {...props} // 남은 props를 모두 전달하는 간단한 문법
    />
  );
};
```

또는 `bindCSS`를 이용하여 가독성을 높힐 수도 있습니다.

```tsx
import { bindCSS, Button } from "@flexive/core";

const cx = bindCSS(); // css modules를 사용할 경우 import한 객체를 함수의 인자로 전달.
<Button className={cx("MyButton", theme, className)} {...props} />;
```

이렇게 만들어진 디자인 컴포넌트는 UI를 작업할 때 마치 JSX 컴포넌트의 확장형처럼 유연하게 사용될 수 있습니다. 또한 `FlexiveProps`를 전달하여 컴포넌트 내부의 레이아웃이나 크기 등을 커스터마이징하는 것도 여전히 가능합니다.

```tsx
<MyButton
  className="alertButton" // 추가적인 클래스 이름을 붙일 수 있습니다.
  p={24} // MyButton 자체의 padding을 override합니다.
  grow={1} // 또는 새로운 FlexiveProps를 주입합니다.
  onClick={() => {
    // onClick은 명시적으로 선언한 적 없지만, <button> 태그의 onClick 동일하게 동작합니다.
    alert("Alert!");
  }}
>
  버튼입니다
</MyButton>
```

### 주의할 점: 구체성과 우선순위

`FlexiveProps`에서는 더 구체적인 속성이 항상 덜 구체적인 속성을 override합니다., 너무 구체적인 속성이 디자인 컴포넌트 내부에 선언된 경우 덜 구체적인 속성으로는 이를 덮어씌우지 못해 예상하지 못한 스타일 오류가 생길 수 있습니다. 이를 해결하기 위해 아래와 같은 트릭을 사용할 수 있습니다.

```tsx
export const MyButton = props => {
  return <Button px={props.p ?? 12} py={prop.p ?? 16} />;
};
```

### 주의할 점: Ref 이용하기

일반적인 React 컴포넌트와 마찬가지로 `forwardRef`를 사용하여 디자인 컴포넌트를 만들 수 있습니다. `NativeElementOf` 타입 제네릭을 사용하면 Ref가 어떤 타입인 지 고민할 필요가 없습니다.

```tsx
type MyButtonProps = PropsOf<"button">;

export const MyButton = forwardRef<NativeElementOf<"button">, MyButtonProps>((props, ref) => (
  <Button ref={ref} {...props} />
));
```

# Module Status

- `semver`를 따릅니다.
- `@flexive/core`는 현재 테스트 단계로, 언제든 하위호환성을 지키지 않는 API 변경이 일어날 수 있습니다.
- `@flexive/core/0.5.x`는 메이저 버전 `v1`을 올리기 위한 준비 단계로, API 인터페이스를 확정하는 작업을 진행하고 있습니다.

# 라이브러리 명세

## Props Specification

### 알아두기

속성 이름에는 아래와 같은 줄임말이 사용됩니다.

- 속성 줄임말: p(padding), m(margin), over(overflow)
- 방위 줄임말: x(가로), y(세로), t(상단), r(우측), b(하단), l(좌측)
- 축 줄임말: M, C
  - M (Main Axis): Flexbox의 주 축 방향을 의미합니다.`alignM`은 항상 `justify-content`이고, `sizeM`은 `flex-direction: row`(주 축 방향이 가로)인 컴포넌트에서 `width`지만 `column`에서는 `height`입니다.
  - C (Cross Axis): 교차 축, 즉 주 축 방향에 수직인 속성입니다.

길이나 크기를 의미하는 속성에는 값으로 숫자와 문자열을 모두 사용할 수 있습니다. 숫자는 `{value}px`로 변환되고, 문자는 그대로 사용되므로 반드시 `em`이나 `%`와 같은 단위가 붙어야 합니다.

중복이 가능한 속성의 경우, 더 구체적인 것부터 우선 적용됩니다. 예컨데 `pl`은 `px`보다 우선 적용되고, `p`는 제일 마지막 우선순위를 가집니다. `overM`과 `over`도 마찬가지입니다.

### Display 관련

#### inline, inlineFlex, block

- 값: `boolean`
- 기본값: - (`display: flex`)
- 설명: 요소의 `display` 속성입니다. 기본값이 `display: flex`로 처리되기에 `flex` 속성은 존재하지 않습니다.

### Flexbox 관련

#### row, colReverse, rowReverse

- 값: `boolean`
- 기본값: - (`flex-direction: column`)
- 설명: 요소의 `flex-direction`을 결정합니다. 기본값이 `flex-direction: column`로 처리되기에 `col` 또는 `column` 속성은 존재하지 않습니다.

#### grow, shrink

- 값: `number | boolean`
- 기본값: 0
- 설명: 각각 `flex-grow`와 `flex-shrink`에 대응합니다. `boolean` 값을 설정할 수도 있는데, `true`는 `1`, `false`는 `0`으로 변환됩니다.

#### f

- 값: `boolean`
- 기본값: -
- 설명: `flex-grow: 1; flex-shrink: 1;`의 단축 속성입니다.

#### basis

- 값: `number | string`
- 기본값: "auto"
- 설명: `flex-basis`

#### g

- 값: `number | string`
- 기본값: -
- 설명: `gap`

### 정렬 관련

#### alignM, alignSelfM

- 값: `"start" | "end" | "center" | "between" | "around" | "evenly"`
- 기본값: -
- 설명: 주 축 방향으로의 정렬로, 각각 `justify-content`와 `justify-self`에 대응합니다.

#### alignC, alignSelfC

- 값: `"start" | "end" | "center" | "stretch" | "baseline"`
- 기본값: -
- 설명: 교차 축 방향으로의 정렬로, 각각 `align-items`와 `align-self`에 대응합니다.

#### wrap, wrapReverse, nowrap

- 값: `boolean`
- 기본값: -
- 설명: `flex-wrap`

### Sizing 관련

#### p, px, py, pt, pr, pb, pl

- 값: `number | string`
- 기본값: -
- 설명: `padding`입니다. 방위 줄임말을 붙일 수 있습니다. 속성이 중복될 경우, 더욱 구체적인 것(`pl` > `px` > `p`)부터 적용됩니다.

#### m, mx, my, mt, mr, mb, ml

- 값: `number | string`
- 기본값: -
- 설명: `margin`입니다. `p`와 동일하게 동작합니다.

#### sizeM, sizeC, minM, minC, maxM, maxC

- 값: `number | string`
- 기본값: -
- 설명: 요소의 크기를 결정합니다.`size`가 `width`라면, `min`은 `minWidth`, `max`는 `maxWidth`에 대응합니다. 요소의 주 축 방향이 세로라면 `M`은 주 축 `height`, 아니라면 `M`은 `width`에 대응하고 `C`는 항상 그 반대입니다.

### Overflow 관련

#### over, overM, overC

- 값: `"auto" | "hidden" | "scroll" | "visible" | boolean`
- 기본값: -
- 설명: `overflow` 속성입니다. 축 줄임말이 붙은 경우 요소의 주 축 방향에 따라 `overflow-x`인지 `overflow-y`인지 정해집니다. `true`일 경우 `"auto"`로 변환됩니다.

#### hide, hideM, hideC

- 값: `boolean`
- 기본값: -
- 설명: `overflow: hidden`에 대한 단축 속성입니다. 같은 단위에 대하여 `over`와 `hide`가 모두 선언되었을 경우 `over`의 값으로 처리됩니다.

### 기타

#### static, fixed, absolute, sticky

- 값: `boolean`
- 기본값: - (`position: relative`)
- 설명: 요소의 `position` 속성입니다. 기본값이 `position: relative`로 처리되기에 `relative` 속성은 존재하지 않습니다.

#### top, right, bottom, left

- 값: `number | string`
- 기본값: -
- 설명: 이름 그대로 `top`, `right`, `bottom`, `left` 속성입니다

#### rad

- 값: `number | string`
- 기본값: -
- 설명: `border-radius` 속성입니다. 레이아웃과 연관된 경우가 많아 편의상 추가했습니다.

## API Specification

### bindCSS

`classnames/bind`와 유사하게 동작합니다. css modules를 사용하는 경우 import한 css 객체를 인자로 받습니다. `undefined` 또는 `null` 값은 무시되며 객체를 이용한 조건부 렌더링이 가능합니다.

```tsx
import styles from "./styles.module.css";
const cx = bindCSS(styles);

// 또는
import "styles.css";
const cx = bindCSS();

// 이렇게 사용합니다
<Div className={cx("ComponentName", null, undefined, { isOpen: status === "open", always: true })} />;
```
