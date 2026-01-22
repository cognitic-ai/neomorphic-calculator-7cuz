import { useState } from "react";
import { View, Text, Pressable, useColorScheme, useWindowDimensions } from "react-native";
import * as AC from "@bacons/apple-colors";

export default function IndexRoute() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { width } = useWindowDimensions();
  const isCompact = width < 400;

  const backgroundColor = isDark ? "#1c1c1e" : "#e0e5ec";
  const lightShadow = isDark ? "#2c2c2e" : "#ffffff";
  const darkShadow = isDark ? "#0a0a0a" : "#a3b1c6";
  const textColor = AC.label;
  const secondaryTextColor = AC.secondaryLabel;

  const handleNumberPress = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperationPress = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue !== null && operation && !shouldResetDisplay) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }

    setOperation(op);
    setShouldResetDisplay(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay("0.");
      setShouldResetDisplay(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const buttonSize = isCompact ? 70 : 80;
  const buttonGap = isCompact ? 12 : 16;

  const NeomorphicButton = ({
    title,
    onPress,
    type = "number",
    wide = false,
  }: {
    title: string;
    onPress: () => void;
    type?: "number" | "operation" | "function" | "equals";
    wide?: boolean;
  }) => {
    const [pressed, setPressed] = useState(false);

    const getButtonColor = () => {
      if (type === "operation") return isDark ? "#ff9500" : "#ff9500";
      if (type === "function") return isDark ? "#505050" : "#d4d4d2";
      if (type === "equals") return isDark ? "#ff9500" : "#ff9500";
      return backgroundColor;
    };

    const getTextColor = () => {
      if (type === "operation" || type === "equals") return "#ffffff";
      if (type === "function") return textColor;
      return textColor;
    };

    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={{
          width: wide ? buttonSize * 2 + buttonGap : buttonSize,
          height: buttonSize,
          borderRadius: buttonSize / 2,
          backgroundColor: getButtonColor(),
          justifyContent: "center",
          alignItems: wide ? "flex-start" : "center",
          paddingLeft: wide ? 28 : 0,
          ...(type === "number" || type === "function" ? {
            shadowColor: pressed ? darkShadow : lightShadow,
            shadowOffset: { width: pressed ? -2 : -6, height: pressed ? -2 : -6 },
            shadowOpacity: 1,
            shadowRadius: pressed ? 4 : 10,
          } : {}),
        }}
      >
        {(type === "number" || type === "function") && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: buttonSize / 2,
              shadowColor: pressed ? lightShadow : darkShadow,
              shadowOffset: { width: pressed ? 2 : 6, height: pressed ? 2 : 6 },
              shadowOpacity: 1,
              shadowRadius: pressed ? 4 : 10,
            }}
          />
        )}
        <Text
          selectable={false}
          style={{
            fontSize: isCompact ? 28 : 32,
            color: getTextColor(),
            fontWeight: type === "operation" || type === "equals" ? "400" : "300",
            zIndex: 1,
          }}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        justifyContent: "flex-end",
        paddingBottom: 40,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ marginBottom: 40 }}>
        <Text
          selectable
          style={{
            fontSize: isCompact ? 64 : 80,
            color: textColor,
            textAlign: "right",
            fontWeight: "200",
            fontVariant: ["tabular-nums"],
          }}
        >
          {display}
        </Text>
      </View>

      <View style={{ gap: buttonGap }}>
        <View style={{ flexDirection: "row", gap: buttonGap }}>
          <NeomorphicButton title="C" onPress={handleClear} type="function" />
          <NeomorphicButton title="±" onPress={handlePlusMinus} type="function" />
          <NeomorphicButton title="%" onPress={handlePercent} type="function" />
          <NeomorphicButton title="÷" onPress={() => handleOperationPress("÷")} type="operation" />
        </View>

        <View style={{ flexDirection: "row", gap: buttonGap }}>
          <NeomorphicButton title="7" onPress={() => handleNumberPress("7")} />
          <NeomorphicButton title="8" onPress={() => handleNumberPress("8")} />
          <NeomorphicButton title="9" onPress={() => handleNumberPress("9")} />
          <NeomorphicButton title="×" onPress={() => handleOperationPress("×")} type="operation" />
        </View>

        <View style={{ flexDirection: "row", gap: buttonGap }}>
          <NeomorphicButton title="4" onPress={() => handleNumberPress("4")} />
          <NeomorphicButton title="5" onPress={() => handleNumberPress("5")} />
          <NeomorphicButton title="6" onPress={() => handleNumberPress("6")} />
          <NeomorphicButton title="-" onPress={() => handleOperationPress("-")} type="operation" />
        </View>

        <View style={{ flexDirection: "row", gap: buttonGap }}>
          <NeomorphicButton title="1" onPress={() => handleNumberPress("1")} />
          <NeomorphicButton title="2" onPress={() => handleNumberPress("2")} />
          <NeomorphicButton title="3" onPress={() => handleNumberPress("3")} />
          <NeomorphicButton title="+" onPress={() => handleOperationPress("+")} type="operation" />
        </View>

        <View style={{ flexDirection: "row", gap: buttonGap }}>
          <NeomorphicButton title="0" onPress={() => handleNumberPress("0")} wide />
          <NeomorphicButton title="." onPress={handleDecimal} />
          <NeomorphicButton title="=" onPress={handleEquals} type="equals" />
        </View>
      </View>
    </View>
  );
}
