function Poster(props){
	return(
		<div className="col-sm-6 col-md-4 col-lg-3">
			<img src={props.poster} />
		</div>
	)
}

var Movies = React.createClass({

	getInitialState: function() {
		return{
			moviesToShow: []
		}		
	},

	componentDidMount: function(){
		// var self = this;
		var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=55e2d237df80ec5178651841fda5124c";
		$.getJSON(url, function(movieData){
			var nowPlayingArray = [];
			for(let i = 0; i < movieData.results.length; i++){
				nowPlayingArray.push(movieData.results[i]);
			}
			this.setState({
				moviesToShow: nowPlayingArray
			});
			//bind is same as defining this as self outside of "THE THIS"
		}.bind(this));

	},

	render: function(){
		var baseImageUrl = "https://image.tmdb.org/t/p/w500/"
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="th-wrapper">
							<button className="button">Reset Search</button>
						</div>
						<div className="movie-rows">
							{/* Movies go here!} */}
							{this.state.moviesToShow.map(function(movie, index){
								var fullImageUrl = baseImageUrl + movie.poster_path
								return <Poster key={index} poster={fullImageUrl} />
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<Movies />,
	document.getElementById("movie-gallery")
)