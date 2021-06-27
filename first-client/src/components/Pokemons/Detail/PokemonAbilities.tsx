import { classExpression } from '@babel/types';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PokemonDetail, Ability } from './types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';
import { PokemonAbilityItem } from './PokemonAbilityItem';

interface PokemonAbilitiesProps {
  data: PokemonDetail;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: '1rem 1rem',
    },
  })
);

export const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ data }) => {
  const classes = useStyles();

  const { abilities } = data;

  return (
    <div className={classes.root}>
      <Typography variant='h5'>Abilities</Typography>
      {abilities.map((el, index) => {
        return <PokemonAbilityItem data={el} key={index} />;
      })}
    </div>
  );
};
