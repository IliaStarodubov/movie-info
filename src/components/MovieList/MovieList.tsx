import { Pagination } from "antd";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../types/types";
import MovieItem from "../MovieItem/MovieItem";
import classes from "./MovieList.module.scss";

interface MovieListProps {
    movies: IMovie[];
    page: number;
    totalPages: number;
    changePage: (page: number) => void;
}

const MovieList: FC<MovieListProps> = ({ movies, changePage, page, totalPages }) => {
    const navigate = useNavigate()
    return (
        <div className={classes.container}>
            <ul className={classes.myList}>
                {movies.map((movie) => (
                    <MovieItem 
                        onClick={(movie) => navigate('/film/' + movie.kinopoiskId)}
                        key={movie.kinopoiskId} 
                        movie={movie} 
                    />
                ))}
            </ul>
            <Pagination
                showSizeChanger={false}
                onChange={changePage}
                defaultCurrent={1}
                current={page}
                total={totalPages * 10}
            />
        </div>
    );
};

export default MovieList;
