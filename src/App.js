import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/movie-row/MovieRow';
import FeaturedMovie from './components/featured-movie/FeaturedMovie.js';

import './App.css';

const App = () => {
	const [movieList, setList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);

	useEffect(() => {
		const loadAll = async () => {
			// Catching total list
			let list = await Tmdb.getHomeList();
			setList(list);

			// Catching featured movie
			let originals = list.filter((movie) => movie.slug === 'originals');
			let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
			let chosenMovie = originals[0].items.results[randomChosen];
			let chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv');
			setFeaturedData(chosenMovieInfo);
		};

		loadAll();
	}, []);

	return (
		<div className="page">
			{
				featuredData &&
				<FeaturedMovie item={featuredData}/>
			}
			<section className="lists">
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>
		</div>
	);
};

export default App;
