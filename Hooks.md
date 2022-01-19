# Hooks

Full list of hooks in the library.

| Hook                                  | Description                                                                            |
| -----------                           | -----------                                                                            |
| [`useToggle`](#useToggle)             | Hook to toggle boolean values on and off                                               |
| [`useWindowSize`](#useWindowSize)     | Returns the browsers window size  `height` and `width`                                 |

## API

1. `useToggle`

Hook to toggle boolean values on and off

```typescript
import { useToggle } from "react-hooks-elib"

const App = () => {
    const [state, { on, off, toggle }] = useToggle()

    return (
        <>
            {state ? (
                <h2>ON</h2>
            ): (
                <h2>OFF</h2>
            )}
            <button onClick={on} disabled={on}>Turn On</button>
            <button onClick={off} disabled={!off}>Turn Off</button>
            <button onClick={toggle}>Toggle</button>
        </>
    )
}
```

2. `useWindowSize`

Returns the browsers window size  `height` and `width` 

```typescript
import { useWindowSize } from "react-hooks-elib"

const App = () => {
    const { width, height } = useWindowSize()

    return (
        <h2>{width} x {height}</h2>
    )
}
```
