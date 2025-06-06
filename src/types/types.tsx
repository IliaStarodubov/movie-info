export interface IMovie {
    kinopoiskId: number;
    nameRu: string;
    posterUrlPreview: string;
    ratingKinopoisk: number;
    type: string;
    year: number;
    genres: IGenre[];
    countries: { country: string }[];
    nameOriginal: string;
    slogan: string;
    ratingAgeLimits: string;
    filmLength: number;
    description: string;
}

export interface IQuery {
    kinopoiskId?: number;
    order?: string;
    type?: string;
    ratingFrom?: number;
    ratingTo?: number;
    yearFrom?: string;
    yearTo?: string;
    page?: number;
    keyword?: string;
    genres?: number;
    filters?: string
}

export interface IGenre {
    id?: number;
    genre: string;
}

export interface ICountry {
    id?: number;
    country: string;
}
