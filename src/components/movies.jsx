import React, { Component } from "react";
import { getMovies, deleteMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
    state = {
        movies: [],
        genres: [{ _id: "", name: "All Genres" }],
        pageSize: 4,
        currentPage: 1,
        selectedGenre: { _id: "", name: "All Genres" },
        sortColumn: { path: "title", order: "asc" },
        searchQuery: "",
    };

    async componentDidMount() {
        try {
            const { data } = await getGenres();
            const genres = [{ _id: "", name: "All Genres" }, ...data];
            const { data: movies } = await getMovies();
            this.setState({ movies, genres });
        } catch (error) {
            console.log(error.message);
        }
    }

    handleDelete = async movie => {
        // const { data: movies } = await getMovies();
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m._id !== movie._id);
        this.setState({ movies });

        try {
            await deleteMovie(movie._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("This movie has already been deleted !");
            this.setState({ movies: originalMovies });
        }
    };

    handleLike = async movie => {
        // const movies = this.state.movies.map(m => {
        //     if (m._id === movie._id) m.liked = !m.liked;
        //     return m;
        // });

        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movie };
        movies[index].liked = !movie.liked;

        this.setState({ movies });

        await saveMovie(movies[index]);
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleGenreSelect = genre => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1,
            searchQuery: "",
        });
    };

    getPagedData = () => {
        const {
            currentPage,
            pageSize,
            selectedGenre,
            sortColumn,
            movies: allMovies,
            searchQuery,
        } = this.state;

        const filteredMovies =
            selectedGenre && selectedGenre._id
                ? allMovies.filter(
                      movie => movie.genre._id === selectedGenre._id
                  )
                : searchQuery
                ? allMovies.filter(movie =>
                      movie.title
                          .toUpperCase()
                          .includes(searchQuery.toUpperCase())
                  )
                : allMovies;

        const sortedMovies = _.orderBy(
            filteredMovies,
            [sortColumn.path],
            [sortColumn.order]
        );

        const movies = paginate(sortedMovies, currentPage, pageSize);

        return { totalCount: filteredMovies.length, movies };
    };

    handelSearchString = query => {
        this.setState({
            selectedGenre: { _id: "", name: "All Genres" },
            searchQuery: query,
            currentPage: 1,
        });
    };

    render() {
        // const { length: count } = this.state.movies;
        const {
            currentPage,
            pageSize,
            genres,
            selectedGenre,
            sortColumn,
            searchQuery,
        } = this.state;
        const { user } = this.props;

        const { totalCount, movies } = this.getPagedData();

        // if (count)
        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={genres}
                        selectedItem={selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    {user && (
                        <Link to="/movies/new" className="btn btn-primary">
                            New Movie
                        </Link>
                    )}

                    <p className="m-2">
                        Showing {totalCount} movies in the database.
                    </p>

                    <SearchBox
                        value={searchQuery}
                        onChange={this.handelSearchString}
                    />

                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );

        // return <p>There are no Movies available at this moment!</p>;
    }
}

export default Movies;
