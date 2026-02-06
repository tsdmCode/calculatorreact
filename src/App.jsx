import { useReducer } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Grid } from './components/Grid/Grid';
import { Display } from './components/Display/Display';
//kodet mens jeg er syg, så hvis den er lidt skod er det derfor
const initialState = {
  firstNum: '',
  secondNum: '',
  operator: null,
  display: '',
};

function calculatorReducer(state, action) {
  switch (action.type) {
    case 'ADD_NUMBER':
      if (state.operator) {
        return {
          ...state,
          secondNum: state.secondNum + action.payload,
          display: state.secondNum + action.payload,
        };
      } else {
        return {
          ...state,
          firstNum: state.firstNum + action.payload,
          display: state.firstNum + action.payload,
        };
      }

    case 'SET_OPERATOR':
      return {
        ...state,
        operator: action.payload,
      };

    case 'CALCULATE':
      if (!state.firstNum || !state.secondNum || !state.operator) {
        return state;
      }

      let result;
      const num1 = parseFloat(state.firstNum);
      const num2 = parseFloat(state.secondNum);

      switch (state.operator) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num2 !== 0 ? num1 / num2 : 0;
          break;
        default:
          return state;
      }

      return {
        firstNum: String(result),
        secondNum: '',
        operator: null,
        display: String(result),
      };

    case 'CLEAR':
      return initialState;

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const handleNumber = (num) => {
    dispatch({ type: 'ADD_NUMBER', payload: String(num) });
  };

  const handleOperator = (op) => {
    dispatch({ type: 'SET_OPERATOR', payload: op });
  };

  const handleEquals = () => {
    dispatch({ type: 'CALCULATE' });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR' });
  };

  return (
    <>
      <h1>Calculator? I hardly knew her!</h1>
      <Display numbers={state.display} />
      <Grid gtc={2} gap={16}>
        <Grid gtc={3} gap={8}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <Button key={num} text={num} type={'number'} onClick={() => handleNumber(num)} />
          ))}
          <Button text={'Cl'} onClick={handleClear} />
          <Button text={'='} onClick={handleEquals} />
        </Grid>
        <Grid gtc={1} gap={8}>
          {['+', '-', '*', '/'].map((op) => (
            <Button key={op} text={op} type={'operator'} onClick={() => handleOperator(op)} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default App;
