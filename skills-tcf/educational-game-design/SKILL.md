---
name: educational-game-design
description: Concevoir et évaluer des activités ludiques originales qui font pratiquer une compétence grammaticale de TCF Structure Master. Utiliser pour les mécaniques d'exercice, la progression, les défis et leurs critères de réussite.
---

# Concevoir des activités ludiques d’apprentissage

## Mission

Faire de chaque action dans le jeu une occasion de repérer, appliquer ou transférer une règle de français. Donner à l’apprenant un retour qui l’aide à comprendre son erreur et à réussir un exercice inédit.

## Méthodologie et instructions

1. Définir un objectif observable et son prérequis. Préciser ce que l’apprenant doit identifier ou produire, le contexte et la preuve de transfert attendue sur un nouvel exemple. Faire confirmer la cible grammaticale par `french-grammar-expert` ou le périmètre par `tcf-expert` lorsque l’activité se présente comme un entraînement au TCF.
2. Associer chaque commande à l’objectif. Choisir selon le besoin un repérage dans la phrase, un choix motivé, un classement, une transformation ou une correction. Pour une mécanique de glisser-déposer, prévoir une commande accessible au clavier et une alternative au pointeur sans glisser, avec le même contenu et les mêmes conséquences.
3. Décrire ce que l’apprenant voit avant, pendant et après sa réponse. En entraînement guidé, proposer au besoin un indice sur le raisonnement, afficher après la réponse la règle appliquée et proposer un nouvel exemple. Si une simulation est prévue par le brief, respecter ses contraintes et placer le retour pédagogique à la fin selon le format retenu. Faire relire les QCM et leurs explications par `tcf-question-validator`.
4. Tenir compte de l’aide reçue. Distinguer une première réponse autonome, une réponse après indice, un nouvel essai et un abandon. Confier la décision de difficulté à `adaptive-learning` et la date du prochain rappel à `spaced-repetition`. Prévoir la reprise après interruption selon les exigences du parcours.
5. Décrire les conditions de réussite et un scénario d’essai complet. Inclure un parcours correct, un distracteur révélateur d’erreur, une reprise avec indice en mode guidé et un exercice final sans aide. Évaluer en priorité la réussite autonome sur un item inédit et les erreurs qui persistent.

## Critères de qualité

- La mécanique demande le même raisonnement que l’objectif annoncé. Chaque résultat distingue la performance autonome de la performance assistée.
- Le retour nomme l’indice décisif, explique le choix et aide à préparer l’essai suivant. Le ton reste factuel et encourage la reprise.
- Les règles sont visibles avant le jeu. Les contrôles et le résultat restent utilisables sans couleur, son ou animation.
- Les interactions et contenus sont originaux. Les points ou récompenses éventuels donnent un repère compatible avec la progression démontrée.

## Exemple

Pour choisir entre « qui » et « que », demander de repérer la fonction du nom repris dans la relative. Sur « J’ai retrouvé le carnet ___ j’avais perdu », un premier indice en entraînement guidé invite à repérer le sujet de « avais perdu ». Le retour montre que « je » est le sujet et que « le carnet » est l’objet direct, repris par « que », élidé devant « j’ ». Proposer ensuite « Elle a choisi la veste ___ était en vitrine » sans indice pour vérifier le transfert vers un pronom sujet.

## Erreurs à éviter

- Faire dépendre la progression des clics rapides, de la présence quotidienne ou du seul nombre d’essais.
- Dévoiler la solution dans un indice censé déclencher le raisonnement.
- Introduire un chronomètre dans un exercice guidé sans objectif de mesure défini ou afficher un résultat ludique comme un score officiel du TCF.
- Compter une répétition immédiate à l’identique comme preuve de transfert.

## Checklist de validation

- [ ] L’objectif, l’action et la preuve de transfert correspondent au même savoir-faire.
- [ ] Le comportement avant réponse, après erreur, après succès et à la reprise est défini pour les états pertinents.
- [ ] Indices, correction et nouvel exemple ont été essayés dans les conditions prévues.
- [ ] Le parcours est jouable au clavier et au pointeur simple. Les informations essentielles existent en texte.
- [ ] Les signaux transmis à l’adaptation reflètent l’autonomie et les révisions ont leur propre échéance.
- [ ] Tout QCM proposé à la publication a reçu un verdict recevable de validation indépendante.
