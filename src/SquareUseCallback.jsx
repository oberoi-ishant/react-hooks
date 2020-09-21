import React from 'react';
import { useCountRenders } from './useCountRenders';

const SquareUseCallback = React.memo(({ n, increment }) => {
  useCountRenders();

  return (
    <button
      onClick={ () => increment(n) }>
      { n }
    </button>
  );
});

export default SquareUseCallback;