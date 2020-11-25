import React, { useState, useEffect } from "react";

import useDebounce from "../useDebounce";

interface State {
  name?: string;
  address?: string;
  country?: string;
}

interface Props {
  api: (searchText: string) => Promise<State[]>;
}

const Search: React.FC<Props> = ({ api }) => {
  const [spaces, setSpaces] = useState<State[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQuery(e.target.value);

  useEffect(() => {
    api(debouncedQuery)
      .then((res) => {
        setSpaces(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [debouncedQuery]);

  return (
    <div>
      <input type="text" onChange={onChange} />
      {error && <h4>Something went wrong</h4>}
      {spaces.map((space) => {
        if (space.name) {
          const { name } = space;
          return <p key={name}>{name}</p>;
        } else {
          const { address, country } = space;
          return (
            <p key={address}>
              {address} {country}
            </p>
          );
        }
      })}
    </div>
  );
};

export default Search;
