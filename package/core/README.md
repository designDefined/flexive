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
