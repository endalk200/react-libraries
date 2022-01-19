# `useWindowScroll`

React sensor hook that re-renders on window scroll.

## Usage

```jsx
import { useWindowScroll } from 'react-hooks-elib';

const Demo = () => {
  const {x, y} = useWindowScroll();

  return (
    <>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </>
  );
};
```
