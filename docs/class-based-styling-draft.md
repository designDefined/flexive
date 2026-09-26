# [Draft] 클래스 기반 스타일링으로의 전환 검토

> 상태: **논의용 임시 문서 (미채택)**
> 작성: 2026-09-23 / 기준 버전: `@flexive/core` 0.6.0
> 목적: 인라인 스타일 기반인 현재 구조를 클래스 기반으로 전환하는 방안 중,
> 검토 끝에 가장 유력하다고 판단된 **데이터 속성 + CSS 변수** 방식의 방법론과 장단점을 기록한다.
> 실제 채택 여부는 미정이며, 단기적으로는 별도의 소규모 개편을 먼저 진행한다.

---

## 1. 배경

### 1.1 라이브러리의 목표

CSS의 스타일링 요소를 **look**과 **layout**으로 분리하고, layout을 React 컴포넌트의 prop으로 처리하여
CSS가 look에만 집중할 수 있게 한다.

### 1.2 현재 구조 (0.6.0)

- `useFlexiveStyle`이 약 60개의 prop을 받아 단일 `CSSProperties` 객체로 합성 → `<Tag style={...}>`
- **해석(resolution)은 전부 JS에서 수행**
  - `parseAxisStyle`: `row` 여부에 따라 `sizeM` → `width` | `height`
  - `parseDirectionalSizes`: `p` / `px` / `py` / `pt` … → `padding` shorthand 1개
  - `parseBoolable`: boolean prop → 기본값
- 모든 요소에 기본값을 항상 방출
  `display:flex; flex-direction:column; flex-grow:0; flex-shrink:0; flex-basis:auto; position:relative`
- 캐스케이드 계약: **inline style > FlexiveProps > CSS 파일**

### 1.3 인라인 스타일 방식의 한계

1. **CSS에서 override 불가** — 인라인 선언은 일반 선언 중 최상위라 스타일시트로 덮을 수 없다.
2. **반응형 레이아웃 불가** — `@media`, `:hover`, `@container` 안에서 prop으로 설정한 레이아웃을 조정할 수 없다.
   (실질적으로 이것이 가장 큰 제약. 레이아웃 prop이 반응형 앞에서 무력해진다.)
3. **HTML 비대화** — 모든 요소가 동일한 기본값 문자열(약 94자)을 각자 들고 있다.
4. **transition / animation 불가**

---

## 2. 방법론: 데이터 속성 + CSS 변수

### 2.1 핵심 아이디어

Flexive의 prop 공간은 두 종류로 자연스럽게 갈린다.

| 구분 | 예시 | 값 공간 | 방출 방식 |
|---|---|---|---|
| **열거형(enum)** | `row`, `wrap`, `alignM`, `alignC`, `over`, `absolute`, `block` | 유한 | **데이터 속성** (또는 클래스) |
| **스칼라(scalar)** | `p`, `m`, `g`, `sizeM`, `min/max`, `top`, `rad`, `basis`, `z` | 무한 (`string \| number`) | **CSS 커스텀 프로퍼티** |

유한한 것은 정적 CSS 규칙으로, 무한한 것은 변수로 넘긴다.
이렇게 하면 **값 자유도를 100% 유지하면서** 실제 CSS 속성 선언은 스타일시트가 담당하게 된다.

### 2.2 설계 원칙

> **해석(resolution)은 JS에, 표현(presentation)만 CSS에.**
>
> - JS가 계속 담당: 축 해석(`sizeM` + `row` → `width`), shorthand 병합, boolean 기본값, prop 우선순위 판정
> - CSS가 담당: "이 속성/변수가 있으면 이 선언을 적용한다" — 그게 전부

이 원칙이 중요한 이유는 **prop override 시맨틱을 그대로 보존하기 위해서**다.
Tailwind처럼 `fx-p-16 fx-px-24`를 둘 다 붙이고 스타일시트 규칙 순서로 승자를 가리면,
prop 우선순위가 CSS 파일 내부 순서에 종속되어 현재의 명확한 JS 시맨틱이 깨진다.

결과적으로 `parseAxisStyle`, `parseDirectionalSizes`, `parseBoolable`, `parseAlign`은 **거의 그대로 유지**되고,
마지막 출력 어댑터 한 겹만 바뀐다. 마이그레이션 리스크가 낮다.

### 2.3 출력 형태

```tsx
<Div row p={12} px={20} g={16} alignC="center" sizeC="100%" over="hidden" />
```

```html
<div class="fx fx-p fx-g fx-h"
     data-fx-dir="row"
     data-fx-align-c="center"
     data-fx-ox="hidden" data-fx-oy="hidden"
     style="--fx-p:12px 20px; --fx-g:16px; --fx-h:100%">
```

- `sizeC` → `--fx-h`, `over` → `data-fx-ox/oy` : **JS가 축을 이미 해석해서 물리 축 이름으로 내보낸 것**
- `alignC`는 flexbox에서 항상 `align-items`이므로 축 해석이 불필요 (현재 코드도 동일)

### 2.4 CSS 구조

```css
@layer flexive {
  @layer base, layout, utility;

  @layer base {
    .fx { display:flex; flex-direction:column; position:relative; flex:0 0 auto; }
  }

  @layer layout {
    /* enum → 속성 선택자 */
    .fx[data-fx-dir="row"]        { flex-direction: row; }
    .fx[data-fx-dir="row-r"]      { flex-direction: row-reverse; }
    .fx[data-fx-align-c="center"] { align-items: center; }
    .fx[data-fx-align-c="start"]  { align-items: flex-start; }
    .fx[data-fx-ox="hidden"]      { overflow-x: hidden; }
    /* … 전부 합쳐 60~80줄 */

    /* scalar → 클래스가 스위치, 변수가 값 */
    .fx-p { padding: var(--fx-p); }
    .fx-m { margin:  var(--fx-m); }
    .fx-g { gap:     var(--fx-g); }
    .fx-w { width:   var(--fx-w); }
    .fx-h { height:  var(--fx-h); }
    /* … 20여 줄 */
  }
}
```

전체 CSS가 **150줄 미만, gzip 1KB 안쪽**.
속성 × 값 조합을 생성하지 않고 **속성 개수만큼만** 필요하므로 Tailwind식 클래스 폭발이 없다.

### 2.5 "클래스가 스위치"인 이유 — 미학이 아니라 정확성

`.fx { padding: var(--fx-p) }` 를 **무조건** 적용하면 안 된다.
`--fx-p`가 없을 때 `var(--fx-p)`는 *invalid at computed-value time*(IACVT)이 되는데,
이는 "다른 선언으로 폴백"이 아니라 **해당 속성을 initial 값으로 강제 계산시켜 다른 선언을 지워버린다.**

따라서 **클래스 = 존재 플래그, 변수 = 값** 규칙을 모든 스칼라 prop에 예외 없이 적용해야 한다.

### 2.6 `@layer` — 캐스케이드 제어

네이티브 CSS 표준. Chrome 99 / Firefox 97 / Safari 15.4 (전부 2022-03).

```css
@layer reset, flexive, app;   /* 뒤에 선언된 레이어가 이김 */
```

- **레이어 순서가 명시도를 이긴다.** `reset` 레이어의 `#sidebar div`(0-1-1)가 `app` 레이어의 `.card`(0-1-0)에게 진다.
- **unlayered 규칙이 모든 레이어를 이긴다.** 사용자가 `@layer`를 몰라도 그냥 쓴 CSS가 Flexive를 자동으로 이긴다.
- `!important`는 **레이어 순서를 뒤집는다.** → **라이브러리 CSS에 `!important`를 절대 쓰면 안 된다.**
- `revert-layer`로 이전 레이어 값으로 되돌릴 수 있다.

> **중요:** 인라인 `style` 속성은 레이어 시스템 **바깥**에 있어 모든 일반 선언을 이긴다.
> 따라서 **현재 구조를 유지한 채 `@layer`만 도입하면 아무것도 바뀌지 않는다.**
> `@layer`는 클래스 전환의 *대안*이 아니라 *보상*이다.
>
> 단 하나의 예외가 이 방식이다 — 인라인에 **커스텀 프로퍼티만** 넣으면
> `--fx-p`는 `padding`과 캐스케이드에서 경쟁하지 않으므로, 실제 승자는 전적으로 레이어가 결정한다.

대안으로 `:where()`(명시도 0-0-0)도 있으나, 규칙마다 강도를 조절해야 해 예측이 어렵다.
`@layer`가 전역적·명시적이고 레이어 내부에서는 명시도가 정상 작동하므로 더 낫다.

### 2.7 `@property` 등록 — 함께 가야 함

```css
@property --fx-p {
  syntax: "<length-percentage>+";   /* 1~4개 공백 구분 값 */
  inherits: false;
  initial-value: 0px;
}
```

얻는 것:

1. **상속 누수 차단** — 커스텀 프로퍼티는 기본 상속이라 부모의 `--fx-p:12px`가 자손 전체로 샌다. `inherits:false`가 막는다. (미적용 시 재현 어려운 버그의 온상)
2. **타입 검증** — 잘못된 값이 조용히 무시되지 않는다.
3. **IACVT 완화** — 등록된 프로퍼티는 무효값일 때 선언 전체를 무효화하지 않고 initial-value로 계산된다.
4. **transition / animation 가능** — 등록된 `<length>` 변수는 보간된다.

지원: Chrome 85 / Safari 16.4 / Firefox 128 (2024-07).
**→ 채택 시 최소 브라우저 요구사항이 올라간다. 의식적 결정 필요.**

### 2.8 토큰

값이 CSS 값으로 그대로 통과하므로, 토큰은 JS 설정이 아니라 **CSS 테마**가 된다.

```css
:root { --fx-space-md: 16px; }
```

```tsx
<Div p="md" />   // → style="--fx-p: var(--fx-space-md)"
```

JS는 토큰 키를 `var(--fx-space-*)` 문자열로 바꾸는 한 줄이면 되고, 타입 안정성은 모듈 augmentation으로 확보한다.

```ts
declare module "@flexive/core" {
  interface FlexiveTokens { space: "sm" | "md" | "lg" }
}
```

빌드 설정도, 코드 생성도, 스케일 잠금도 필요 없다.
**토큰을 도입해도 스칼라 자유도가 전혀 줄지 않는다** — 정적 아토믹 CSS 방식 대비 결정적 차이.

### 2.9 prop API는 100% 보존된다

prop 레이어와 방출 레이어는 직교한다.

- **타입**: `LayoutStyle`, `UtilityStyle` 정의는 손댈 필요가 없다.
  바뀌는 것은 `useFlexiveStyle`의 *리턴 타입*뿐 (`CSSProperties` → `{ className, attrs, vars }`).
- **중첩 override**: CSS가 아니라 **JS 객체 스프레드**가 결정하므로 방식 변경과 무관하다.

```tsx
const MyButton = props => <Button p={16} {...props} />;
<MyButton p={24} />   // props.p = 24 — 순수 JS, CSS 개입 없음
```

`Button`에 도달하는 시점에 `p`는 이미 단일 값이다. (단, §2.2 설계 원칙을 지킬 때에 한함)

---

## 3. 장점

1. **반응형 레이아웃이 CSS로 열린다 — 가장 큰 이득**

   ```css
   @media (max-width: 640px)            { .product-card { --fx-p: 8px; --fx-g: 4px; } }
   @container (inline-size < 400px)     { .product-card { flex-direction: column; } }
   ```

   `p={{base:12, md:20}}` 같은 반응형 prop 문법을 **API에 추가하지 않고도** 반응형이 해결된다.
   Chakra / Tailwind가 반응형을 API 복잡도로 떠안은 지점을 CSS에 위임해 회피한다.
   "레이아웃 *선언*은 prop, 레이아웃 *조정*은 CSS"로 철학과도 충돌하지 않는다.

2. **CSS override 가능** — `@layer flexive`가 앱 CSS보다 먼저 오므로 명시도 싸움 없이 덮인다.
   README의 "props가 CSS 파일보다 우선시됩니다" 경고문이 사라지고,
   **"prop은 기본값, CSS는 override"** 라는 설명하기 쉬운 계약으로 바뀐다.

3. **HTML 크기 급감** — 요소당 약 94자의 기본값 문자열이 `.fx` 하나로 접힌다.

4. **기존 JS 로직 거의 그대로 재사용** — 출력 어댑터 한 겹만 교체.
   `useFlexiveStyle`의 `useMemo`와 60칸 의존성 배열이 사라져 **구현이 오히려 단순해질 수 있다.**

5. **transition / animation** — `@property` 등록 덕에 레이아웃 값이 애니메이션 가능해진다. (현재 불가)

6. **devtools 가독성** — `data-fx-dir="row" data-fx-align-c="center"`가 30개짜리 클래스 수프보다 읽힌다.

7. **미래 경로** — 훅이 사라지면 RSC 호환이 따라오고, `attr()` 보편화 시 `style` 속성마저 제거 가능 (§5).

---

## 4. 단점 및 함정

1. **성능 기대치를 낮춰야 한다**
   "인라인 스타일이라 느리다"는 전제는 과장이다. 데이터 속성을 8개 쓰면 React가 `setAttribute`를 8번 호출하므로
   현재의 `style` 1회 쓰기보다 많을 수 있다. 실측 시 **대체로 무승부, HTML 크기에서만 확실한 승리**일 가능성이 높다.
   → **성능을 전환 근거로 삼지 말 것. 캐스케이드 통합과 반응형이 근거다.**

2. **캐스케이드 계약 역전은 breaking change — 그것도 미묘한 방향으로**
   레이어드 규칙은 unlayered 규칙에 **무조건 진다**. 그런데 대부분의 CSS reset은 unlayered다.

   ```css
   * { margin: 0; padding: 0; }   /* unlayered reset */
   ```

   이것이 `<Div p={16}/>`를 **이겨버린다.** 현재는 인라인이라 지지 않던 것이 지게 된다.
   → 권장 레이어 순서(`@layer reset, flexive, app;`) 문서화가 필요하나, 사용자가 리셋을 레이어에 넣지 않으면 깨진다.
   **실사용 이슈가 가장 많이 나올 지점으로 예상.**
   완화책으로 `.fx.fx-p`처럼 명시도를 0-2-0으로 올리는 방법이 있으나 "약하게 만들기" 목표와 상충한다.

3. **CSS import 필수 — zero-config 상실**
   `import "@flexive/core/style.css"` 누락 시 **에러가 아니라 조용한 오작동**이라 진단이 어렵다.
   → 개발 모드에서 `.fx` 규칙 적용 여부를 런타임 체크해 `console.warn` 하는 장치 고려.

4. **디버깅 간접화** — 현재는 devtools에서 `padding: 16px 12px`가 인라인에 바로 보인다.
   앞으로는 `--fx-p` 변수와 `.fx-p` 규칙을 머릿속에서 연결해야 한다. (Computed 탭으로 확인 가능하나 한 단계 늘어남)

5. **DOM이 완전히 깨끗해지지는 않는다** — `style` 속성은 남는다. 내용물이 커스텀 프로퍼티뿐이라 성격은 다르지만.

6. **설계 규율이 생긴다** — `@property` 등록과 "클래스=스위치" 규칙을 **모든 스칼라 prop에 빠짐없이** 적용해야 한다.
   하나라도 빠지면 상속 누수나 선언 삭제 같은 재현 어려운 버그가 난다.
   → 기계적 생성/검증 장치(코드젠 또는 테스트) 필요.

7. **레이어 내부 순서가 번들러 의존적이 된다**
   서브레이어 순서가 CSS 파일 내 선언 순서에 의존하므로, 번들러가 CSS를 재정렬·분할하면 깨진다.
   → **단일 CSS 파일로 배포**하고 서브레이어를 파일 최상단에서 한 번에 선언하는 규율이 필요하다.

8. **브라우저 요구사항 상승** — `@property` 채택 시 Firefox 128+(2024-07)이 하한선.
   미채택 시 상속 누수를 JS로 막아야 하는데(미사용 변수까지 전부 `initial`로 리셋) 비용이 커 실용적이지 않다.

---

## 5. 미래 경로: `attr()` 타입 지원

```html
<div class="fx" data-fx-p="12">
```

```css
.fx { padding: attr(data-fx-p type(<length>), 0); }
```

`style` 속성도, 클래스 폭발도 없는 **이론적 최적해**.
타입 지원 `attr()`은 현재 Chrome 전용(Chrome 133+)이라 채택 불가.

다만 **데이터 속성 기반 설계를 지금 택해두면 그 이전이 무손실**이라는 점이 설계 판단에 반영되어 있다.

---

## 6. 검토했으나 탈락한 대안

| 방법 | 판정 | 이유 |
|---|---|---|
| **정적 아토믹 CSS (Tailwind식)** | 탈락 | 스케일을 닫아야 해 스칼라 자유도(`string \| number`)와 정면 충돌. 임의값 지원 시 결국 인라인 폴백이 필요해 동작 모드가 둘이 된다. |
| **빌드 타임 추출 (StyleX / Vanilla-Extract / Panda)** | 탈락 | 이 라이브러리의 핵심 패턴인 `<Button p={16} {...props} />` 를 정적 분석할 수 없다. 호출부의 `<MyButton p={24}/>`가 어디로 흘러가는지 컴파일러가 알 수 없어 런타임 폴백이 필수가 되고, 빌드 도구 의존성까지 생긴다. |
| **런타임 CSS 주입 (Emotion / styled-components식)** | 탈락 | SSG 목표와 충돌. 빌드 타임 프리렌더 HTML에 주입 규칙이 들어가지 않아 **첫 페인트 FOUC**가 발생한다. 회피하려면 SSR과 동일한 스타일 추출 파이프라인이 필요해진다. 반면 인라인 스타일과 정적 CSS 파일은 프리렌더와 무상성. |
| **하이브리드 (스케일 히트만 정적 클래스, 나머지는 var)** | 보류 | 동작 모드가 둘이 되어 디버깅·문서화·우선순위 추론이 복잡해진다. 순수 최적화이므로 나중에 얹을 수 있으나 1차 설계로는 부적합. |
| **enum prop 전부 클래스화 (H3)** | 권장 안 함 | 바이트는 줄지만 **가독성이 오히려 나빠진다**. `align-items:center`가 `fx-ai-center`보다 읽기 쉽다. `.fx` 베이스는 *잡음(기본값)* 제거라 순수 개선이지만, H3부터는 *신호를 약어로 치환*하는 것이다. |

---

## 7. 미결정 사항

1. **`@property` 채택 여부** ↔ 브라우저 하한선. 이것이 갈리면 설계가 상당히 달라진다.
2. **명시도 정책**: `.fx-p`(0-1-0) vs `.fx.fx-p`(0-2-0) — §4-2 리셋 충돌 문제와 직결.
3. **enum을 데이터 속성으로 할지 클래스로 할지** — 기능은 동등, DOM 가독성 vs 관례의 문제.
4. **shorthand를 변수 1개(`--fx-p: "16px 12px"`)로 낼지 4방향 변수로 낼지**
   후자면 사용자가 CSS에서 `--fx-pl`만 갈아끼울 수 있어 §3-1 반응형 이득이 커지지만 변수 개수가 늘어난다.
5. **60개 prop 전수 매핑표** — 어떤 prop이 attr / class / var로 가는지, 축 해석이 필요한 것은 정확히 무엇인지.
   **사각지대는 여기서 나온다. 채택을 진지하게 검토하는 시점에 이것부터 작성할 것.**

---

## 8. 현재 방침

이 문서의 방안은 **채택 보류**한다. 이유는 현재 구조의 "단순하고 직관적인 접근과 유연한 대응 가능성"을
과도하게 제한한다고 판단했기 때문이며, 그 전제로 **CSS override 목표 자체를 포기**하기로 했다.

대신 인라인 스타일 방식을 유지한 채 다음 목표만 부분적으로 추구한다.

- 최소한의 성능 개선
- HTML 길이 축소 및 가독성 개선
- 추후 SSR / RSC 지원 가능성 확보

해당 소규모 개편 방안은 별도로 진행한다.
단, **반응형 레이아웃(§3-1)은 인라인 스타일 방식으로는 원리적으로 해결 불가능**하므로,
향후 이 요구가 커지면 이 문서를 다시 검토할 것.
