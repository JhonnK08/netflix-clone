import React, { useEffect, useState } from 'react';
import Tmdb from './tmdb';
import MovieRow from './components/movie-row/MovieRow';

import './App.css';

const App = () => {
	const [movieList, setList] = useState([]);

	useEffect(() => {
		const loadAll = async () => {
			// Catching total list
			let list = await Tmdb.getHomeList();
			setList(list);
		};

		loadAll();
	}, []);

	return (
		<div className="page">
			<section className="lists">
				{movieList.map((item, key) => (
					<MovieRow key={key} title={item.title} items={item.items} />
				))}
			</section>
		</div>
	);
};

export default App;
