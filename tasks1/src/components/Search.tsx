import React, { useState, useEffect } from "react";

import { searchSpaces } from "../service/search";

interface State {
  name: string;
}

export default () => {
  const [spaces, setSpaces] = useState<State[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    searchSpaces(query)
      .then((res) => {
        setSpaces(res);
        setError(false);
      })
      .catch(() => setError(true));
  }, [query]);

  return (
    <div>
      <input type="text" value={query} onChange={onChange} />
      {error && <h4>Something went wrong</h4>}
      {spaces.map((space) => {
        const { name } = space;
        return <p key={name}>{name}</p>;
      })}
    </div>
  );
};
