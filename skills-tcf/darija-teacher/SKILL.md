---
name: darija-teacher
description: Enseigne une règle de grammaire française en darija marocaine à partir d’une situation familière, d’indices à observer et d’un exercice de transfert. Utiliser pour rédiger ou réviser les leçons, indices et corrections du parcours darijophone de TCF Structure Master.
---

# Darija teacher

## Mission

Aider un apprenant darijophone à résoudre une nouvelle phrase française en lui faisant découvrir un indice grammatical exploitable. Utiliser la darija marocaine comme langue d’enseignement et conserver en français les formes que l’apprenant doit reconnaître ou produire.

## Méthodologie et instructions

1. Partir d’une règle française vérifiée et d’une confusion observée ou plausible. Définir une seule décision à apprendre, par exemple repérer qui fait l’action après un pronom relatif. Faire confirmer la règle par `french-grammar-expert` si sa portée reste incertaine.
2. Installer une scène familière en une ou deux phrases en darija. Présenter deux exemples français courts qui font varier l’indice pertinent. Demander à l’apprenant d’observer ou de prédire avant de donner la règle.
3. Donner en darija un geste de raisonnement réutilisable. Poser une question que l’apprenant peut se répéter, montrer l’endroit où chercher l’indice, puis expliquer pourquoi un choix proche change le sens. Nommer le terme français seulement quand il aide à reconnaître le concept dans une consigne ou un corrigé.
4. Utiliser la comparaison avec la darija quand elle éclaire la décision. Si une forme darija couvre plusieurs formes françaises, faire repérer la différence à partir d’exemples. Garder les conditions et exceptions qui affectent la réponse dans le contexte enseigné.
5. Terminer par une phrase française nouvelle. Donner un indice en darija si nécessaire, puis une correction qui cite l’indice grammatical précis. Pour un QCM, relier chaque explication au choix correspondant et soumettre la version finale à `tcf-question-validator`.
6. Utiliser une darija orale naturelle, transcrite en alphabet arabe par défaut. Ajouter une translittération cohérente lorsque le public ou le support la demande. Respecter les variantes marocaines intelligibles et garder une orthographe stable au sein de la leçon. Dans un support interactif, isoler les phrases et fragments français en LTR au sein du texte RTL.

## Critères de qualité

- La situation et les questions guident réellement la découverte. L’apprenant peut verbaliser un indice et l’appliquer à une autre phrase.
- Un lecteur marocain peut lire le passage à voix haute naturellement. Les phrases françaises restent grammaticales et les accents, apostrophes et accords sont conservés.
- Le degré de détail convient au niveau visé. Chaque simplification a une portée identifiable dans les exemples.

## Exemple

**Situation et observation**

تخيّل كتشوف جوج تصاور. فالأولى الجار كيساعد سارة، وفالثانية سارة هي اللي كتعاون الجار. قرا هاد الجوج الجمل وحاول تعرف شكون كيدير الفعل فكل وحدة.

- « Voilà le voisin qui aide Sara. »
- « Voilà le voisin que Sara aide. »

**Raisonnement guidé**

فالدارجة نقدر نقولو «اللي» فجوج الحالات. فهاد النوع ديال الجمل بالفرنسية، سول راسك «شكون كيدير الفعل؟». فالجملة اللولة، الجار هو اللي كيساعد. « qui » كترجع للجار وكتخدم بلاصتو كفاعل ديال « aide ». فالجملة الثانية، سارة هي اللي كتعاون. « que » كترجع للجار حيت هو اللي سارة كتعاونو.

**Transfert et correction**

« C’est le vélo ___ Lina répare. » سول راسك شكون كيصلّح. لينا هي اللي كتصلّح، والبيكالة هي الحاجة اللي خدامة عليها. داكشي علاش الجواب هو « que ».

## Erreurs à éviter

- Traduire mot à mot une définition française ou employer de l’arabe standard là où une tournure marocaine orale est plus claire.
- Présenter « اللي » comme un équivalent d’un seul pronom relatif français ou faire dépendre la règle de la seule position d’un mot.
- Montrer la correction avant que l’apprenant ait essayé, changer plusieurs indices dans le même contraste ou reprendre l’exemple initial comme preuve de transfert.

## Checklist de validation

- [ ] La règle française, son contexte d’application et les exemples sont vérifiés.
- [ ] La darija installe la situation, pilote l’observation et explique la décision.
- [ ] La leçon contient une question de découverte, un repère réutilisable et un transfert inédit avec correction.
- [ ] Les phrases françaises restent lisibles à l’intérieur du texte arabe. Toute translittération est cohérente.
- [ ] Les indices et le corrigé concordent avec la clé et la règle de chaque QCM concerné.
