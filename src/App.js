import { useState, useEffect } from "react";
import Button from "./components/Button";
import proofs from "./data/proofs";
import spirits from "./data/spirits";
import "./App.css";

const App = () => {
  const [types, setTypes] = useState([]);

  const getProofsSpirits = (proofs, spirits) => {
    return proofs.map((p) => {
      return {
        proof: p.name,
        // récupère tous les spirits qui ont "p" dans leur proofs"
        spirits: spirits.map((s) => s.types.includes(p)),
      };
    });
  };

  const toggleFilter = (filter) => {
    if (types.includes(filter)) {
      // Remove "filter" from "types".
      setTypes(types.filter((t) => t !== filter));
    } else {
      setTypes([...types, filter]);
    }
  };

  const shouldDisplayButton = (list) => {
    return types.every((v) => list.includes(v));
  };

  const shouldDisplayProof = (list) => {
    let possibleSpirits = getProofsSpirits(types, spirits);
    console.log("cc");
    console.log(possibleSpirits);
    if (!possibleSpirits[0]) return true;
    let truePossibleSpirits;
    truePossibleSpirits = possibleSpirits.reduce((a, b) =>
      a.spirits.map((c, i) => b[i] && c)
    );
    console.log(truePossibleSpirits);
    return true;
  };

  useEffect(() => {
    console.log(types);
  }, [types]);

  return (
    <div className="App">
      <div className="grid">
        {proofs.map(
          (p) =>
            shouldDisplayProof(p) && (
              <Button
                title={p.title}
                description={p.description}
                variant={p.name}
                onClick={() => toggleFilter(p.name)}
                active={types.includes(p.name)}
              />
            )
        )}
      </div>
      <div className="grid">
        {spirits.map(
          (s) =>
            shouldDisplayButton(s.types) && (
              <Button
                title={s.name}
                variant={s.name}
                description={s.description}
                types={s.types}
              />
            )
        )}
      </div>
    </div>
  );
};

export default App;
