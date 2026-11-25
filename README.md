# TCF Structure Master

Application statique de préparation à la maîtrise des structures du TCF Tout Public, niveaux B1 à C2.

## Lancer en local

Pour ouvrir l’interface, utilisez un serveur statique local afin d’activer la sauvegarde, les modules PWA et la navigation hors ligne.

```sh
npx serve .
```

Ou, avec Python :

```sh
python -m http.server 8000
```

Ouvrez ensuite http://localhost:8000. La version serveur fonctionne aussi par simple ouverture de `index.html`, mais certains navigateurs limitent `localStorage` pour les fichiers ouverts avec `file://`.

## GitHub Pages

1. Placez ces fichiers dans la racine publiée du dépôt.
2. Dans **Settings → Pages**, sélectionnez la branche et le dossier racine.
3. Ouvrez l’adresse fournie par GitHub.

Les chemins et l’inscription du service worker sont relatifs pour fonctionner sous `/<nom-du-dépôt>/`. La première visite doit charger le réseau une fois. L’installation PWA et le service worker nécessitent HTTPS ou localhost.

## Sauvegarde

La progression reste dans le stockage local de ce navigateur. Dans **Paramètres**, exportez un fichier JSON pour sauvegarder ou déplacer vos données. L’import remplace la progression après confirmation. Effacer les données du navigateur supprime la seule copie locale.

## Contenus et tests

Les cours et les questions sont répartis dans `data/m01.js` à `data/m20.js`. Voir [SUIVI-PRODUCTION.md](SUIVI-PRODUCTION.md) pour l’état réel de la production et [RAPPORT-VALIDATION-PEDAGOGIQUE.md](RAPPORT-VALIDATION-PEDAGOGIQUE.md) pour le contrôle des contenus.

L’application est un outil d’entraînement indépendant. Son estimation de niveau n’est pas un résultat ni un score officiel du TCF.
