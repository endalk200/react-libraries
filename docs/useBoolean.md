# `useBoolean`

React state hook that tracks value of a boolean.

## Usage

```jsx
import {useBoolean} from 'react-use';

const Demo = () => {
  const [on, { on, off, toggle }] = useBoolean(true);

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
