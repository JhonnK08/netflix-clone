import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/movie-row/MovieRow';
import FeaturedMovie from './components/featured-movie/FeaturedMovie.js';
import Header from './components/header/Header';

import './App.css';

const App = () => {
	const [movieList, setList] = useState([]);
	const [featuredData, setFeaturedData] = useState(null);
	const [blackHeader, setBlackHeader] = useState(false);

	useEffect(() => {
		const loadAll = async () => {
			// Catching total list
			let list = await Tmdb.getHomeList();
			setList(list);

			// Catching featured movie
			let originals = list.filter((movie) => movie.slug === 'originals');
			let randomChosen = Math.floor(
				Math.random() * (originals[0].items.results.length - 1)
			);
			let chosenMovie = originals[0].items.results[randomChosen];
			let chosenMovieInfo = await Tmdb.getMovieInfo(chosenMovie.id, 'tv');
			setFeaturedData(chosenMovieInfo);
		};

		loadAll();
	}, []);

	useEffect(() => {
		const scrollListener = () => {
			if (window.scrollY > 20) {
				setBlackHeader(true);
			} else {
				setBlackHeader(false);
			}
		};

		window.addEventListener('scroll', scrollListener);
		return () => {
			window.removeEventListener('scroll', scrollListener);
		};
	}, []);

	return (
		<div className="page">
			<Header black={blackHeader} />
			{featuredData && <FeaturedMovie item={featuredData} />}
			<section className="lists">
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>

			<footer>
				Feito com{' '}
				<span role="img" aria-label="coração">
					❤️
				</span>{' '}
				por Jhonatan Konopp
				<br />
				Direitos de imagem para Netflix
				<br />
				Dados coletados do site{' '}
				<a href="https://themoviedb.org" target="_blank">
					themoviedb.org
				</a>
			</footer>
			{movieList.length <= 0 && (
				<div className="loading">
					<img
						src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
						alt="Carregando"
					/>
				</div>
			)}
		</div>
	);
};

export default App;
