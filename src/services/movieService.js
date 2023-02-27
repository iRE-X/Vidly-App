import http from "./httpService";
import { toast } from "react-toastify";

const moviesEndPoint = "/movies";

function movieUrl(id) {
    return moviesEndPoint + "/" + id;
}

export function getMovies() {
    return http.get(moviesEndPoint);
}

export async function getMovie(id) {
    return http.get(movieUrl(id));
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return toast.promise(http.put(movieUrl(movie._id), movie), {
            pending: "Updating the Movie...",
            success: "Movie Updated 👍",
            error: {
                render({ data }) {
                    return data.response.data;
                },
            },
        });
    }
    return toast.promise(http.post(moviesEndPoint, movie), {
        pending: "Saving the Movie...",
        success: "Movie Saved 👍",
        error: {
            render({ data }) {
                return data.response.data;
            },
        },
    });
}

export function deleteMovie(id) {
    return toast.promise(http.delete(movieUrl(id)), {
        pending: "Deleting the movie...",
        success: "Movie is Deleted 👍",
        error: {
            render({ data }) {
                return data.response.data;
            },
        },
    });
}
