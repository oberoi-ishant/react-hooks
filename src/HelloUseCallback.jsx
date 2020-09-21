import React from 'react';
import { useCountRenders } from './useCountRenders';

const HelloUseCallback = React.memo(({ increment }) => {
  useCountRenders();

  return (
    <button
      onClick={ () => increment(5) }>
      Increment
    </button>
  );
});

export default HelloUseCallback;