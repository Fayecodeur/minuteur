// Importation des hooks `useState` et `useEffect` de React
import { useEffect, useState } from "react";

// Importation des styles CSS du fichier `Counter.module.css`
import styles from "./Counter.module.css";

// Déclaration et exportation du composant `Counter`
export default function Counter() {
  // `count` : stocke la valeur du compteur (en secondes)
  // `setCount` : permet de mettre à jour `count`
  const [count, setCount] = useState(0);

  // `isRunning` : indique si le compteur est en cours d'exécution (`true`) ou non (`false`)
  // `setIsRunning` : permet de modifier l'état de `isRunning`
  const [isRunning, setIsRunning] = useState(false);

  // useEffect pour gérer le démarrage et l'arrêt du compteur
  useEffect(() => {
    let interval; // Déclaration d'une variable pour stocker l'identifiant de l'intervalle

    if (isRunning) {
      // Si `isRunning` est `true`, on démarre un intervalle
      interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1); // Incrémente `count` chaque seconde
      }, 1000);
    }

    // Fonction de nettoyage : elle est exécutée à chaque changement de `isRunning`
    return () => {
      clearInterval(interval); // Arrête l'intervalle si `isRunning` passe à `false`
    };
  }, [isRunning]); // `useEffect` est exécuté chaque fois que `isRunning` change

  // Fonction pour démarrer ou arrêter le compteur
  function toggleCounter() {
    setIsRunning(!isRunning); // Inverse l'état de `isRunning`
  }

  // Fonction pour formater le temps en MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60); // Convertit les secondes en minutes
    const remainingSeconds = seconds % 60; // Récupère les secondes restantes

    // Retourne le temps sous le format `MM:SS`, en ajoutant un zéro si nécessaire
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Fonction pour réinitialiser le compteur
  const resetTime = () => {
    setCount(0); // Remet `count` à 0
    setIsRunning(false); // Arrête le compteur
  };

  return (
    <div className={styles.counterContainer}>
      {/* Affichage de l'état du compteur : "Actif" ou "Inactif" */}
      <div
        className={`${styles.status} ${
          isRunning ? styles.buttonColorGreen : styles.buttonColorRed
        } `}
      >
        {isRunning ? "Actif" : "Inactif"}
      </div>

      {/* Titre du compteur */}
      <h1 className={styles.title}>Minuteur</h1>

      {/* Affichage du compteur au format MM:SS */}
      <div className={styles.display}>
        <span
          className={`${styles.count} ${
            isRunning ? styles.countColorGreen : styles.countColorRed
          }`}
        >
          {formatTime(count)}
        </span>
      </div>

      {/* Boutons pour démarrer, arrêter et réinitialiser le compteur */}
      <div className={styles.buttonContainer}>
        {/* Bouton de démarrage/arrêt */}
        <button
          className={`${styles.button} ${
            isRunning ? styles.buttonColorRed : styles.buttonColorGreen
          } `}
          onClick={toggleCounter}
        >
          {isRunning ? "Arrêter" : "Démarrer"}
        </button>

        {/* Bouton de réinitialisation */}
        <button
          onClick={resetTime}
          className={`${styles.button} ${styles.buttonColorReset}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
