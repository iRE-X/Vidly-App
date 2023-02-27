import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
    columns = [
        {
            path: "title",
            lable: "Title",
            content: movie => (
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
            ),
        },
        { path: "genre.name", lable: "Genre" },
        { path: "numberInStock", lable: "Stock" },
        { path: "dailyRentalRate", lable: "Rate" },
        {
            key: "Like",
            content: movie => (
                <Like
                    liked={movie.liked}
                    onClick={() => this.props.onLike(movie)}
                />
            ),
        },
    ];

    deleteColumn = {
        key: "Delete",
        content: movie => (
            <button
                className="btn btn-danger btn-sm m-2"
                onClick={() => this.props.onDelete(movie)}
            >
                Delete
            </button>
        ),
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    }

    render() {
        const { movies, onSort, sortColumn } = this.props;
        return (
            <Table
                data={movies}
                columns={this.columns}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default MoviesTable;
