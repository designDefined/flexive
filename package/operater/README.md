# Flexive Core

> Flexbox-based, html-like design system builder for React

## Table of content

- [Getting Started](#getting-started)
- [Main Concept](#main-concept)
- [Status of the Module](#status-of-the-module)

## Getting Started

### Installation

```bash
yarn add @flexive/core
# or npm
npm add @flexive/core
```

### Basic Usage

`Flexive` provides a set of **Base components** that only casing differs from normal JSX tags. Use base components in substitute of JSX.

```tsx
import { Div, Span, Button, Input, H1, P } from "@flexive/core"; // and much more...
```

Base component has `flexive-style-props` to control `layout`, such as flex, padding, gap and overflow. Most of the props have abbreviated names in convenience, and some has directional or axial suffix. To find out **what is layout** and **why inline styling is restricted to a handful of css properties**, read [To-Way Approach](#two-way-approach) below.

```tsx
// flex-direction: row; padding: 16px 12px; gap: 20px; align-items: center;
<Div row px={12} py={16} g={20} alignC="center" />
```

Besides the `flexive-style-props`, everything is same as normal JSX tags.

```tsx
<Input
  type="text"
  p={16} // flexive-style-prop for padding
  placeholder="Type some texts" // Everything else is same
  value={currentValue}
  onChange={onChangeValue}
>
```

### Recommanded Practice

(WIP)

## Main Concept

### Two-Way Approach

> Flexive uses both css and inline style declaration, with two different scopes of styling: the **LOOK** and the **LAYOUT**.

There are plenty of css-assistant libraries to be used in React environment. Libraries like `Sass` takes `css-in-css` approach, which provides you syntactic sugar and utilities to enrich css stylesheets. On the other hand, there is `css-in-js` libraries, such as `styled-compoents` and `emotion`, that commonly used as well. And `Tailwind CSS` also, offers you its distinct approach towards styling, called `utility-first`. But all of these libraries have one thing in common. **They don't classifies CSS Properties**. They treat every lines of css-rules equally, and this is the point where `Flexive` begins.

`Flexive` splits style properties into two groups: the **LOOK**, and the **LAYOUT**. Look is where the tone, mood, and the feeling of service is determined, and layout is about positioning and composing those moody components. This approach is based on the assumptions below.

1. To form a consistent look, we have to share styles, such as color, font family, or background designs across many UI components.
2. Layout, on the other hand, effects functionality of UI. So it must be optimized with each service, usecase, and user's environment like screen size.
3. Most of the css properties determines only look, or layout. `color`, `border`, and `background` is associated with look of UI, but has nothing to do with layout. In contrast, `padding`, `margin`, `gap` and `align`s barely cast effects on the look.

Considering these assumptions, `Flexive` offers you two different methods of styling suitable to each scope. To shape the look of your service, you can simply use **css classes**, that are easy to reuse and share properties between multiple components. For the layout, in other hands, you can use **inline props** anywhere you call the component. Those props are flexbox friendly, easy to override, and render optimized out-of-the-box.

This two-way approach affords you a **new mental model** which is useful to developing your own design systems, applying those to real-world service UI, and maintaining the components through continuous modifications. It's called `Pouring`.

### Pouring: The New Mental Model

(WIP)

### Why Flex?

(WIP)

## Status of the Module

(WIP)
