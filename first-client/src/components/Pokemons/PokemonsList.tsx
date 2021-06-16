import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function PokemonsList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        <ListItem button></ListItem>
      </List>
    </div>
  );
}
