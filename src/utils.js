// A film has its own page (and a VIEW button on the slider) when it has an
// address name (slug) and something to show: a Vimeo film and/or images.
export const hasFilmPage = (film) =>
  Boolean(film.slug) && (Boolean(film.vimeoId) || film.images.length > 0)
