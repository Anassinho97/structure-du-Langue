# TCF Structure Master

## État du projet

Le projet est en préparation. Attendre le Master Prompt de l’utilisateur avant de démarrer le développement, de produire des écrans ou de constituer une banque de questions. Le Master Prompt précisera les déclinaisons du TCF, les publics, les parcours et les choix techniques. Le [rapport d’environnement](RAPPORT-ENVIRONNEMENT.md) indique les outils vérifiés et ceux qui demandent encore une activation.

Les fiches sont consultables dans `skills-tcf/`. Chercher d’abord `.agents/skills/<nom>/SKILL.md` si le dossier a été renseigné depuis la préparation. À défaut, ouvrir la fiche directement depuis le tableau.

## Choix des skills

| Skill | Quand l’utiliser | Résultat attendu |
| --- | --- | --- |
| [`tcf-expert`](skills-tcf/tcf-expert/SKILL.md) | Cadrer une déclinaison du TCF, une simulation, une couverture de compétences ou un calibrage pédagogique. | Références France Éducation international et distinction explicite entre format d’examen et entraînement. |
| [`french-grammar-expert`](skills-tcf/french-grammar-expert/SKILL.md) | Établir ou corriger une règle, un exemple, une exception ou un usage. | Règle circonscrite, exemples et justification réutilisables. |
| [`tcf-question-generator`](skills-tcf/tcf-question-generator/SKILL.md) | Transformer un objectif validé en QCM original avec distracteurs diagnostiques. | Brouillon identifiable, clé et explication pour chaque choix. |
| [`tcf-question-validator`](skills-tcf/tcf-question-validator/SKILL.md) | Relire un QCM créé, modifié, corrigé ou localisé avant utilisation. | Verdict indépendant et traçable sur chaque énoncé, option, clé, règle et explication. |
| [`darija-teacher`](skills-tcf/darija-teacher/SKILL.md) | Enseigner une règle française ou commenter une erreur en darija marocaine. | Explication conçue en darija, exemples français préservés et exercice de transfert. |
| [`adaptive-learning`](skills-tcf/adaptive-learning/SKILL.md) | Sélectionner le prochain objectif, le niveau d’aide ou une remédiation à partir des observations. | Décision pédagogique motivée et vérifiable. |
| [`spaced-repetition`](skills-tcf/spaced-repetition/SKILL.md) | Programmer ou revoir l’échéance d’un rappel après une tentative de récupération. | Échéance explicable, file de révision testable et historique cohérent. |
| [`educational-game-design`](skills-tcf/educational-game-design/SKILL.md) | Concevoir ou évaluer un mode de pratique ludique, son feedback ou ses récompenses. | Boucle de jeu liée à un objectif d’apprentissage observable. |
| [`premium-ui-ux`](skills-tcf/premium-ui-ux/SKILL.md) | Définir les parcours, la direction artistique, les composants, les états ou leur fidélité visuelle. | Critères de rendu et d’interaction que le frontend et la QA peuvent reproduire. |
| [`accessibility-rtl`](skills-tcf/accessibility-rtl/SKILL.md) | Concevoir, implémenter ou vérifier le clavier, les technologies d’assistance et les contenus mixtes FR LTR et darija RTL. | Vérifications accessibles et bidirectionnelles sur des états et contenus réels. |

Charger les skills correspondant au livrable de la tâche. Utiliser leurs exemples comme exercices de vérification internes. Les décisions relatives au contenu de production suivent les exigences du Master Prompt.

## Rôles de production

| Rôle | Responsabilité et transmission |
| --- | --- |
| Directeur artistique | Définit la direction visuelle, la typographie française et arabe et les principes de création des assets. Remet ses choix et références au UX Designer et au frontend. |
| UX Designer | Définit les parcours, la boucle d’entraînement, les états et le comportement sur mobile, au clavier et en RTL. Remet des critères d’interaction observables. |
| Développeur frontend | Intègre les composants, les parcours et les données pédagogiques approuvées. Documente les écarts de rendu et transmet l’interface à tester. |
| Professeur expert TCF | Vérifie le périmètre d’examen, établit la règle grammaticale et cadre les niveaux et contenus. Remet les brouillons et leurs sources au rédacteur et au validateur. |
| Rédacteur pédagogique en darija | Conçoit l’explication marocaine et son exercice de transfert à partir de la règle fournie. Remet la version bilingue au validateur. |
| Validateur grammatical indépendant | Résout le QCM avant lecture de la clé quand celle-ci peut être masquée. Contrôle ensuite chaque choix, chaque règle et chaque explication, y compris les versions en darija. Approuve une version précise ou demande une correction vérifiable. |
| Expert en apprentissage adaptatif | Définit les signaux de maîtrise, les remédiations et la coordination avec les rappels. Remet des exemples de décisions reproductibles à la QA. |
| Testeur qualité | Vérifie la justesse des résultats affichés, la cohérence des parcours, l’accessibilité, le RTL et les régressions. Remet les preuves et les écarts à corriger. |

Les rôles peuvent travailler en parallèle après cadrage. Confier la validation des QCM à une personne ou à un agent distinct de leurs auteurs. Conserver l’identifiant, la version et le verdict de chaque item. Lorsqu’une correction change le sens, la règle, la clé ou une explication, soumettre la nouvelle version au validateur avant sa mise en service.

## Déroulement après le Master Prompt

1. Fixer le périmètre. Dériver les objectifs d’apprentissage, les sources, les critères d’acceptation et les états à tester à partir du brief.
2. Préparer les parcours et les règles. La direction artistique et l’UX travaillent sur les parcours pendant que le professeur établit le référentiel et que l’expert en apprentissage définit les décisions de progression et de rappel.
3. Faire relire les contenus. Générer les QCM, rédiger les explications en darija, résoudre à l’aveugle lorsque possible et vérifier toutes les versions avant leur intégration dans les parcours apprenants.
4. Implémenter et vérifier. Utiliser les outils disponibles selon le rapport. Contrôler sur mobile et ordinateur les parcours critiques, le clavier, le focus, les textes mixtes, la reprise d’une session et les décisions de progression. Ajouter les scénarios de navigation, d’erreur et de remédiation du Master Prompt.
5. Clore la revue. Vérifier les résultats avec les critères du brief et avec les versions de contenus approuvées. Consigner les écarts et les corriger avant de valider le livrable correspondant.
