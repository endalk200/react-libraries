# `useToggle`

React state hook that tracks value of a boolean.

`useBoolean` is an alias for `useToggle`.

## Usage

```jsx
import { useToggle } from "react-use";

const Demo = () => {
	const [state, { toggle }] = useToggle(true);

	return (
		<>
			<div>{state ? "ON" : "OFF"}</div>
			<button onClick={toggle()}>Turn {state ? "Turn On" : "Turn Off"}</button>
		</>
	);
};
```
