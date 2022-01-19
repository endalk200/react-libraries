# `useToggle`

React state hook that tracks value of a boolean.

`useBoolean` is an alias for `useToggle`.

## Usage

```jsx
import {useToggle} from 'react-use';

const Demo = () => {
  const [on, { on, off, toggle }] = useToggle(true);

  return (
    <>
      <div>{on ? 'ON' : 'OFF'}</div>
      <button onClick={toggle()}>Toggle</button>
      <button onClick={() => on()}>set ON</button>
      <button onClick={() => off()}>set OFF</button>
    </>
  );
};
```
