# `useWindowSize`

React sensor hook that tracks dimensions of the browser window. Returns object container width and height.

## Usage

```jsx
import {useWindowSize} from 'react-hooks-elib';

const Demo = () => {
  const {width, height} = useWindowSize();

  return <div>{ width } X { height }</div>
};
```
