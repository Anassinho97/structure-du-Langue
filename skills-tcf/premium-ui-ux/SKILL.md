---
name: premium-ui-ux
description: Concevoir ou examiner l’interface et les parcours de TCF Structure Master, de la direction artistique aux états des composants. Utiliser pour les maquettes, les prototypes et les critères de recette visuelle.
---

# Concevoir l’interface de TCF Structure Master

## Mission

Créer une interface cohérente et lisible pour commencer un exercice, comprendre une correction, reprendre une séance et repérer sa progression.

## Méthodologie et instructions

1. Définir, pour le parcours demandé, l’intention de l’utilisateur, l’action principale à chaque étape et le signal de réussite. Utiliser du texte français et de la darija réalistes, avec leurs longueurs attendues. Donner la priorité à l’énoncé, aux choix et à l’explication sur l’écran d’exercice.
2. Définir les décisions visuelles qui modifient l’usage. Choisir une typographie française et arabe compatibles en taille perçue et densité, une échelle d’espacement et des rôles de couleur pour la surface, le texte, l’action, la sélection et le résultat. Donner aux textes et commandes un contraste contrôlé. Valider les césures, accents, formes arabes et interlignes avec le contenu le plus exigeant.
3. Décliner les états qui changent la décision de l’apprenant. Pour un QCM, couvrir au minimum les choix disponibles, la sélection, l’action de validation, la correction et l’action suivante. Traiter ensuite le chargement, l’erreur récupérable, la reprise, l’état vide et la fin de séance là où le parcours peut les rencontrer. Garder visibles le statut de la réponse et le moyen de continuer.
4. Vérifier un écran étroit et un écran large en français et avec le contenu en darija. Coordonner l’ordre de lecture, les contrôles, les contenus mixtes et les variantes d’icônes avec `accessibility-rtl`. Réutiliser les composants et décisions du projet quand ils respectent le brief. Recourir à une maquette Figma si le livrable l’exige et si l’accès est confirmé.
5. Livrer le parcours ainsi que les spécifications utiles au développement et aux tests. Pour les composants touchés, consigner le contenu, l’action, les états, les changements liés à la largeur et le comportement au clavier. Définir des critères qui se vérifient par une action ou une observation. Pour une interface implémentée, relever l’écart éventuel entre la maquette et le rendu en navigateur.

## Critères de qualité

- L’énoncé et l’action principale se repèrent immédiatement dans une vue réaliste. La correction donne un résultat textuel et une prochaine action explicite.
- Les choix comparables partagent les mêmes styles et aucune décoration ne signale la bonne réponse avant validation.
- Les composants restent utilisables avec une explication longue, un zoom, une largeur étroite et des textes mêlant français et darija.
- Les libellés orientent l’action. Les états importants se distinguent par autre chose que la couleur et restent perceptibles au clavier et avec les technologies d’assistance.

## Exemples

- Après validation, afficher « Réponse incorrecte », conserver la réponse choisie et présenter la piste de raisonnement. Dans une vue étroite avec une correction longue, l’action « Question suivante » suit la correction et n’en masque aucune partie.
- Quand le français constitue le contexte de la page, conserver l’énoncé et les choix en lecture gauche à droite. Un bloc d’aide en darija écrite en arabe prend sa propre direction et isole une phrase française citée. Éprouver la maquette avec « Je n’en veux plus. » au milieu d’une phrase en darija.

## Erreurs à éviter

- Concevoir uniquement un état idéal avec des textes courts et une souris.
- Multiplier les accents décoratifs et les badges dans la zone de lecture.
- Déplacer les réponses ou les commandes à la validation sans effet attendu par le parcours.
- Calquer l’apparence d’une interface propriétaire. Créer une composition et des composants propres au projet.

## Checklist de validation

- [ ] Le scénario principal et ses états pertinents sont représentés avec du contenu réaliste.
- [ ] La hiérarchie, la typographie et les rôles de couleur sont cohérents entre écrans.
- [ ] Les états sélectionné, focus, correct et incorrect se distinguent visuellement et textuellement quand nécessaire.
- [ ] Le parcours reste lisible en largeur étroite avec un énoncé long et un bloc avec des écritures mixtes.
- [ ] Les interactions et décisions responsive et bilingues ont chacune un critère de recette observable.
