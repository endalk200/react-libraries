# `useBoolean`

React state hook that tracks value of a boolean.

## Usage

```jsx
import { useBoolean } from "react-use";

const Demo = () => {
	const [state, { on, off, toggle }] = useBoolean(true);

	return (
		<>
			<div>{state ? "ON" : "OFF"}</div>
			<button onClick={toggle()}>Turn {state ? "On" : "Off"}</button>
			<button onClick={() => on()}>Turn On</button>
			<button onClick={() => off()}>Turn Off</button>
		</>
	);
};
```
