import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid2';
import RemoveIcon from '@mui/icons-material/Remove';

const Counter = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <Grid container alignItems="center" justifyContent="left" spacing={2}>
      <Grid>
        <IconButton onClick={handleDecrement}>
          <RemoveIcon />
        </IconButton>
      </Grid>
      <Grid>
        <Typography variant="h6">{count}</Typography>
      </Grid>
      <Grid>
        <IconButton onClick={handleIncrement}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Counter;
