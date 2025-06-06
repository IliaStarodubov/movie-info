import React, { FC } from "react";
import { IMovie } from "../../../types/types";
import cl from "./MyList.module.scss";

interface MyListProps {
  movie: IMovie | null;
}

const MyList: FC<MyListProps> = ({ movie }) => {
  const movieInfo = [
    {
      title: "Оригинальное название",
      info: movie?.nameOriginal ? movie?.nameOriginal : "—",
    },
    {
      title: "Страны",
      info: movie?.countries.map((e) => e.country).join(", "),
    },
    { title: "Жанр", info: movie?.genres.map((e) => e.genre).join(", ") },
    { title: "Слоган", info: movie?.slogan ? movie?.slogan : "—" },
    {
      title: "Возраст",
      info: movie?.ratingAgeLimits
        ? `${movie?.ratingAgeLimits.slice(3)}+`
        : "0+",
    },
    {
      title: "Время",
      info: movie?.filmLength ? `${movie?.filmLength} минут` : "—",
    },
    { title: "Премьера", info: movie?.year ? `${movie?.year} год` : "—" },
  ];

  return (
    <ul className={cl.listRest}>
      {movieInfo.map((elem) => (
        <li key={elem.title} className={cl.infoItem}>
          <span className={cl.infoCaption}>{elem.title}</span>
          <span>{elem.info}</span>
        </li>
      ))}
    </ul>
  );
};

export default MyList;
