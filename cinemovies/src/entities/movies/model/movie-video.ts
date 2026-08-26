export interface MovieVideo {
  id: string;
  results: Video[];
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
  published_at: number;
  id: string;
}
