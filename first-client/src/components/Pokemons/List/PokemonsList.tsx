import { Fragment, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { PokemonListItem } from './PokemonsListItem';
import Typography from '@material-ui/core/Typography';
import { useTypedSelector, useTypedDispatch } from '../../../hooks/reduxHooks';
import { fetchPokemons, pageChange } from './pokemonsListSlice';
import Container from '@material-ui/core/Container';
import { PokemonsListSkeleton } from './PokemonsListSkeleton';
import { Pagination } from '../../Pagination/Pagination';
import { PageWrapper } from '../../PageWrapper';
import { PageSizeSelector } from './PageSizeSelector';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export const PokemonsList: React.FC = () => {
  const { skip, limit, data, loading, count, search } = useTypedSelector(
    (state) => state.pokemonsList
  );
  const dispatch = useTypedDispatch();

  const classes = useStyles();

  useEffect(() => {
    const fetchPokemonsList = async () => {
      dispatch(fetchPokemons({ skip, limit, search }));
    };

    fetchPokemonsList();

    // window.scrollTo({ top: 200 });
  }, [skip, limit, search, dispatch]);

  const onPageChange = (pageNumber: number) => {
    const newSkip =
      Math.floor(limit) * Math.floor(pageNumber) - Math.floor(limit);
    dispatch(pageChange(newSkip));
  };

  return (
    <div className={classes.root}>
      {!loading && (
        <Fragment>
          <PageWrapper>
            {search.length === 0 && (
              <Typography variant='h4'>Pokemons</Typography>
            )}
            {search.length > 0 && (
              <Typography variant='h4'>
                {count} search results for "{search}"
              </Typography>
            )}
            <PageSizeSelector />
            <List>
              {data?.pokemons.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <PokemonListItem pokemon={item} key={item.id} />
                  </Fragment>
                );
              })}
            </List>
          </PageWrapper>

          <Container>
            <Pagination
              onPageChange={onPageChange}
              totalCount={count}
              pageSize={limit}
              siblingCount={2}
              currentPage={Math.floor(skip / limit + 1)}
            />
          </Container>
        </Fragment>
      )}

      {loading && <PokemonsListSkeleton />}
    </div>
  );
};
