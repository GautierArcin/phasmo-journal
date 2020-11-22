import { useState, useEffect } from "react";
import Button from "./components/Button";
import proofs from "./data/proofs";
import spirits from "./data/spirits";
import "./App.css";
import Input from "./components/Input";

const App = () => {
  const [types, setTypes] = useState([]);
  const [notTypes, setNotTypes] = useState([]);
  const [bestProof, setBestProof] = useState("");

  //visible ghosts
  const [visibleGhost, setVisibleGhost] = useState([]);

  //var for selected ghost
  const [selectedGhost, setSelectedGhost] = useState([]);
  const [selectedGhostProofs, setSelectedGhostProofs] = useState([]);

  // const getProofsSpirits = (proofs, spirits) => {
  //   return proofs.map((p) => {
  //     return {
  //       proof: p.name,
  //       // récupère tous les spirits qui ont "p" dans leur proofs"
  //       spirits: spirits.map((s) => s.types.includes(p)),
  //     };
  //   });
  // };

  const toggleFilter = (filter) => {
    if (types.includes(filter)) {
      // Remove "filter" from "types".
      setTypes(types.filter((t) => t !== filter));
      setNotTypes([...notTypes, filter]);
    } else {
      if (notTypes.includes(filter)) {
        setNotTypes(notTypes.filter((t) => t !== filter));
      } else {
        setTypes([...types, filter]);
      }
    }

    //if selected demon not there anymore, remove selection on Ghosts
  };

  const currentlySelectedGhost = (s) => {
    if (s.name !== selectedGhost) {
      setSelectedGhost(s.name);
      setSelectedGhostProofs(s.types);
    } else {
      setSelectedGhost("");
      setSelectedGhostProofs([]);
    }
    // console.log(selectedGhost);
    // console.log(selectedGhostProofs);
  };

  const isProofSelected = (p) =>
    selectedGhostProofs.includes(p.name) &&
    visibleGhost.some((g) => g.name === selectedGhost);

  const isSpiritSelected = (s) => selectedGhost === s.name;

  const shouldDisplayButton = (list) =>
    types.every((v) => list.includes(v)) &&
    notTypes.every((v) => !list.includes(v));

  //@to do  si on la somme cumulé
  // const shouldDisplayProof = (proof) =>
  //   visibleGhost.some((g) => g.types.includes(proof.name)) ||
  //   notTypes.includes(proof.name);

  const shouldDisplayProof = (proof) => {
    if (visibleGhost.length === 1)
      return types.includes(proof.name) || notTypes.includes(proof.name);
    return (
      visibleGhost.some((g) => g.types.includes(proof.name)) ||
      notTypes.includes(proof.name)
    );
  };

  const computeBestProof = () => {
    let occurences = {};

    for (const p of proofs) {
      occurences[p.name] = 0;
    }
    // console.log("Begginning algorithm");
    // console.log("Proofs: " + occurences);

    for (const g of visibleGhost) {
      for (const t of g.types) {
        occurences[t] = occurences[t] + 1;
      }
    }
    // console.log("Proofs: ");
    // console.log(occurences);

    // Occurences : { "orbs": 0, "emf": 0 }
    // Object.keys(occurences) => ["orbs", "emf", ..]
    // Object.values(occurences) => [0, 0, ..]

    const optimal = visibleGhost.length / 2;
    let foundOptimal = Object.keys(occurences)[0];
    let currentOptimal = 100;

    for (const o of Object.keys(occurences)) {
      if (
        Math.abs(occurences[o] - optimal) < currentOptimal &&
        !notTypes.includes(o) &&
        !types.includes(o)
      ) {
        foundOptimal = o;
        currentOptimal = Math.abs(occurences[foundOptimal] - optimal);
      }
    }
    // console.log("optimal: " + optimal);
    // console.log("foundOptimal: " + foundOptimal);

    setBestProof(foundOptimal);
  };

  useEffect(() => {
    // console.log("visibleGhost: ", visibleGhost);
    // eslint-disable-next-line
    computeBestProof();
  }, [visibleGhost]);

  useEffect(() => {
    // console.log("types: ", types);
    // console.log("notTypes: ", notTypes);
    // Mettre à jour les fantômes visibles
    setVisibleGhost(spirits.filter((s) => shouldDisplayButton(s.types)));
    // eslint-disable-next-line
  }, [types, notTypes]);

  return (
    <div className="App">
      <Input />
      {visibleGhost.length <= 6 && visibleGhost.length > 1 && (
        <div className="bestProof">
          <p>
            <b>Best proof:</b> {bestProof}
          </p>
        </div>
      )}
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
                unactive={notTypes.includes(p.name)}
                selected={isProofSelected(p)}
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
                onClick={() => currentlySelectedGhost(s)}
                description={s.description}
                selected={isSpiritSelected(s)}
                types={s.types}
              />
            )
        )}
      </div>
    </div>
  );
};

export default App;
