/*
	- originais netflix
	- recomendados
	- em alta
	- ação
	- comédia
	- terror
	- romance
	- documentários
*/

const basicFetch = async (endpoint) => {
	const req = await fetch(`${process.env.REACT_APP_API_BASE}${endpoint}`);
	const json = await req.json();

	return json;
};

// eslint-disable-next-line
export default {
	getHomeList: async () => {
		return [
			{
				slug: 'originals',
				title: 'Originais da Netflix',
				items: await basicFetch(
					`/discover/tv?with_watch_providers=8&watch_region=BR&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'trending',
				title: 'Recomendados para você',
				items: await basicFetch(
					`/trending/all/week?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'topRated',
				title: 'Em alta',
				items: await basicFetch(
					`/movie/top_rated?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'action',
				title: 'Ação',
				items: await basicFetch(
					`/discover/movie/?with_genres=28&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'comedy',
				title: 'Comédia',
				items: await basicFetch(
					`/discover/movie/?with_genres=35&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'horror',
				title: 'Terror',
				items: await basicFetch(
					`/discover/movie/?with_genres=27&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'romance',
				title: 'Romance',
				items: await basicFetch(
					`/discover/movie/?with_genres=10749&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
			{
				slug: 'documentary',
				title: 'Documentários',
				items: await basicFetch(
					`/discover/movie/?with_genres=99&language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`
				),
			},
		];
	},
	getMovieInfo: async (movieId, type) => {
		let info = {};

		if(movieId) {
			switch (type) {
				case 'movie':
					info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`);
					break;
				case 'tv':
					info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${process.env.REACT_APP_API_KEY}`);
					break;
				default: info = null;
			}
		}

		return info;
	}
};
