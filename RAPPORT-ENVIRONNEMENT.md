# Environnement de TCF Structure Master

## Inventaire du 24 novembre 2026

- Paramètres Codex activés localement pour Browser, Computer Use, Unified Computer Use, Codex App Tools, Visualize, Documents, PDF, Spreadsheets, Presentations et Template Creator.
- Autres intégrations observées dans le cache ou exposées à la session : Sites, Canva, Notion, Google Drive, Gmail, Google Calendar, Google Contacts, Cloud Environment, Adobe, Adobe Express, Adobe Acrobat, PDF Editor PRO by Playgram, LinkedIn, Remote Desktop Commander, Cardboard, HyperFrames, Remotion, Spotify, Pages, Pets, Default templates et gestion des plugins. La présence dans le cache renseigne sur le package local. La connexion se vérifie par intégration.
- 165 fiches directement sous le répertoire utilisateur `~/.agents/skills`, 38 fiches imbriquées et 6 fiches système lisibles. Le cache des plugins contenait 101 fichiers `SKILL.md`, en incluant leurs références et modèles. Ces nombres comptent des fichiers, dont des variantes et des doublons de nom. Un répertoire utilisateur supplémentaire, `skill-discovery`, était visible mais son fichier inaccessible.
- Compétences déjà disponibles et pertinentes : `playwright`, `playwright-interactive`, `imagegen`, `frontend-design`, la famille `figma`, `gh-address-comments`, `gh-fix-ci` et `yeet`. Playwright 1.62.1 est importable depuis le runtime local de Codex. Le binaire Chromium propre à ce paquet n’était pas présent à son emplacement par défaut. ImageGen dispose d’un outil natif. Browser est un plugin intégré et activé. [Catalogue de skills OpenAI](https://github.com/openai/skills/tree/main/skills/.curated) · [ImageGen](https://github.com/openai/skills/blob/main/skills/.system/imagegen/SKILL.md)

## Disponibilité et installation

| Capacité | État constaté |
| --- | --- |
| Build Web Apps | Plugin OpenAI répertorié au catalogue public Codex. Package absent du cache local et non proposé par le catalogue accessible à la session. [Plugin officiel](https://github.com/openai/plugins/tree/main/plugins/build-web-apps) |
| Frontend App Builder et Frontend Testing Debugging | Skills du plugin Build Web Apps. Pas de copie installée détectée. Le workflow local réunit `frontend-design`, Browser et Playwright. [Frontend App Builder](https://github.com/openai/plugins/tree/main/plugins/build-web-apps/skills/frontend-app-builder) · [Frontend Testing Debugging](https://github.com/openai/plugins/tree/main/plugins/build-web-apps/skills/frontend-testing-debugging) |
| Game Studio | Plugin OpenAI répertorié au catalogue public Codex. Package absent du cache local et non proposé par le catalogue accessible à la session. [Manifeste officiel](https://github.com/openai/plugins/blob/main/plugins/game-studio/.codex-plugin/plugin.json) |
| Product Design, Figma et GitHub | Identifiés dans le catalogue accessible. L’installation a été proposée dans l’interface. L’état confirmé à la préparation était « disponible, non installé ». L’usage des connecteurs dépend de leur activation et de l’accès au compte concerné. [Catalogue officiel](https://github.com/openai/plugins/blob/main/.agents/plugins/marketplace.json) |
| Playwright Interactive | Fiche présente. Son workflow historique repose sur un JS REPL compatible et des binaires navigateur. L’exécution interactive via cette fiche n’a pas été validée durant l’inventaire. [Skill officiel](https://github.com/openai/skills/tree/main/skills/.curated/playwright-interactive) |
| `prompt-master` | Aucun fichier correspondant dans les emplacements consultables ni référence confirmée dans les catalogues consultés. |

Aucun nouveau plugin ou skill externe n’a été installé pendant la préparation. La connexion directe de Git à GitHub a échoué. La politique de la session a refusé l’escalade requise par le script réseau de `skill-installer`, et les écritures dans `.agents/skills` ont été refusées. Les fiches locales sont livrées sous `skills-tcf/`, avec accès direct depuis [AGENTS.md](AGENTS.md). Leur emplacement de découverte automatique reste `.agents/skills/`. [Documentation de découverte des skills](https://developers.openai.com/codex/skills)

## Validation des compétences du projet

Dix compétences locales créées en UTF‑8, avec métadonnées, mission, méthode, critères, exemples, erreurs et checklist. Le contrôle local vérifie la structure et les liens. Le script Python officiel de `skill-creator` dépendait de PyYAML, absent de l’interpréteur accessible. La structure a donc été contrôlée avec les outils locaux disponibles.

Un essai indépendant a soumis au validateur trois QCM de grammaire. Il a signalé un corrigé incomplet, un item acceptant deux réponses et une règle d’accord incorrecte en darija. Les clés étaient visibles pendant l’essai. Un exercice séparé a vérifié que la fiche darija guidait l’observation d’un exemple français puis le transfert à un exemple inédit.

La stratégie de production et les huit responsabilités figurent dans [AGENTS.md](AGENTS.md). Le suivi du développement et les écarts du Master Prompt sont consignés dans [SUIVI-PRODUCTION.md](SUIVI-PRODUCTION.md).
