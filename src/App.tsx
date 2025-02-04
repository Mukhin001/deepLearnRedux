
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppState, CounterId, DecrementAction, IncrementAction, useAppSelector } from './store'
import { useDispatch } from 'react-redux'
import UsersList from './UsersList'

function App() {

  return (
    <section>
        <div>
            <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <h1>Vite + React</h1>
        <h3>UseSelector</h3>
        <Counter counterId='first' />
        <Counter counterId='second' />
        <div className="card">
            <p>
            Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>

        <UsersList />
    </section>
  )
};

const selectCounter = (state: AppState, counterId: CounterId) => state.counters[counterId];
///////
export function Counter({ counterId }: { counterId: CounterId }) {
    // работа под капотом без selector and provider
    // const [, forceUpdate] = useReducer(x => x + 1, 0);
    // const lastStateRef = useRef<ReturnType<typeof selectCounter>>();

    // useEffect(() => {
    //     const unsubscribe = store.subscribe(() => {
    //         const currentState = selectCounter(store.getState(), counterId);
    //         const lastState = lastStateRef.current;

    //         if(currentState !== lastState) {
    //             forceUpdate();
    //         }

    //         lastStateRef.current = currentState;
    //     });
    //     return unsubscribe;
    // }, []);
    //const counterState = selectCounter(store.getState(), counterId);

    const dispatch = useDispatch();
    // useSelector /////
    //const counterState = useAppSelector((state) => state.counters[counterId]);
    const counterState = useAppSelector((state) => selectCounter(state, counterId));

    return (
        <div>
            counter {counterState?.counter}
            <button onClick={() => dispatch({type: 'increment', payload: { counterId } } satisfies IncrementAction)}>
                increment
            </button>

            <button onClick={() => dispatch({type: 'decrement', payload: { counterId } } satisfies DecrementAction)}>
                decrement
            </button>
        </div>
    )
};

export default App;
