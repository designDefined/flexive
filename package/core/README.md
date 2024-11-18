# Flexive Core

```tsx
type LabeledInputProps = FlexiveInputProps<{ label: true; input: true }> & { labelText: string };

export default function LabeledInput({ f, className, labelText, ...props }: LabeledInputProps) {
  const { fx, cx } = useFlexiveSystem({ f, className });

  return (
    <Label className={cx.root("LabeledInput")} f={fx.root({ flex: [1, 1, 0] })} style={style} {...props}>
      <Div className={cx.label("label")}>{labelText}</Div>
      <Input />
    </Label>
  );
}
```

```tsx
export const Page = () => {
  return (
    <Main grow shrink px={12} py={24} g={20}>
      <Header row py={16} g={8}>
        <H1>Be water, my layout!</H1>
      </Header>
      <Article></Article>
      <Article>
        <H3></H3>
      </Article>
    </Main>
  );
};
```

```tsx
type InputTextProps = FlexiveInputProps & { labelProps?: FlexiveLabelProps; wrapperProps?: FlexiveDivProps };

export const InputText = ({ labelText, className, labelProps, wrapperProps, ...props }: InputTextProps) => {
  return (
    <Div g={20} className={cx("InoutText", className)} {...wrapperProps}>
      <Label {...labelProps}>{labelText}</Label>
      <Input type="text" {...props} />
    </Div>
  );
};

export const Page = () => {
  return (
    <Div>
      <H3>HEADER</H3>
      <InputText p={20} labelProps={{ p: 20 }} />
    </Div>
  );
};
```
