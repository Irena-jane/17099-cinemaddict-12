
export const generateFilters = (films) => {

  return {
    watchlist: films.filter((film) => film.isInWatchlist).length,
    history: films.filter((film) => film.isWatched).length,
    favorites: films.filter((film) => film.isFavorite).length
  };

};
