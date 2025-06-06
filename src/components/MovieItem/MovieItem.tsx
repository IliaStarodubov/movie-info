import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { FC } from "react";
import { IMovie } from "../../types/types";
import classes from "./MovieItem.module.scss";

interface MovieItemProps {
    movie: IMovie;
    onClick: (movie: IMovie) => void;
}

const MovieItem: FC<MovieItemProps> = ({ movie, onClick }) => {
    return (
        <li className={classes.item}>
            <Card
                bordered={false}
                onClick={() => onClick(movie)}
                style={{width: 222}}
                hoverable
                cover={
                    <img className={classes.img} alt={movie.posterUrlPreview} src={movie.posterUrlPreview} />
                }
            >   
                <span className={classes.rating}>{movie.ratingKinopoisk}</span>
                <Meta title={movie.nameRu} description={`${movie.year}, ${movie.type === "FILM" ? "Фильм" : "Сериал"}`}/> 
            </Card>
        </li>
    );
};

export default MovieItem;
