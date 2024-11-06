import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {decrement, increment, setValue} from "../slices/counterSlice";

export const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  useEffect(() => {
    window.app.onCountChange((count: number) => {
      dispatch(setValue(count));
    });
  }, [dispatch]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-lg">Count: {count}</p>

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded block mx-auto"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded block mx-auto"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};
