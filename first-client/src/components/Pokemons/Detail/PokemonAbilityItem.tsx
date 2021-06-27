import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Ability } from './types';
import Popper from '@material-ui/core/Popper';

interface PokemonAbilityItemProps {
  data: Ability;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    ability: {
      cursor: 'help',
      display: 'flex',
      justifyContent: 'flex-start',
      textTransform: 'capitalize',
      margin: '0.5rem 0',
      color: theme.palette.primary.dark,
      fontWeight: 500,
    },
    description: {
      border: '1px solid #555',
      padding: '0.5rem',
      backgroundColor: '#fff',
    },
  })
);

export const PokemonAbilityItem: React.FC<PokemonAbilityItemProps> = ({
  data,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'ability-description' : undefined;

  const handleOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Grid className={classes.ability} item xs={12} key={data.slot}>
        <div onMouseEnter={handleOpen} onMouseLeave={handleClose}>
          {data.ability.name}
        </div>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          <div className={classes.description}>{data.ability.description}</div>
        </Popper>
      </Grid>
    </div>
  );
};
