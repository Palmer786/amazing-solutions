import React, { useState, useEffect } from "react";

import { searchSpaces } from "../service/search";
import useDebounce from "../useDebounce";

interface State {
  name: string;
}

export default () => {
  const [spaces, setSpaces] = useState<State[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setQuery(e.target.value);

  useEffect(() => {
      searchSpaces(debouncedQuery)
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
        const { name } = space;
        return <p key={name}>{name}</p>;
      })}
    </div>
  );
};
