---
name: accessibility-rtl
description: Concevoir, implémenter et tester l’accessibilité et le texte bidirectionnel dans TCF Structure Master. Utiliser pour les parcours au clavier, les formulaires, les changements de langue, le français LTR et la darija en écriture arabe RTL.
---

# Accessibilité et texte bidirectionnel

## Mission

Permettre de lire les consignes, de choisir une réponse, de comprendre le résultat et de poursuivre un exercice au clavier, au pointeur et avec des technologies d’assistance, dans chaque langue proposée.

## Méthodologie et instructions

1. Déclarer indépendamment langue et direction. Utiliser `lang="fr" dir="ltr"` pour un document français et `lang="ary" dir="rtl"` pour un document en darija écrite en arabe. Dans un document mixte, déclarer les changements sur le bloc ou la citation concernés. Employer `lang="ary-Latn" dir="ltr"` pour une translittération latine si elle est proposée. Vérifier la prise en charge des voix sur la configuration de test et consigner les limites observées. [Direction dans le HTML](https://www.w3.org/International/questions/qa-html-dir) · [Registre IANA des sous-étiquettes linguistiques](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
2. Isoler au plus près les segments intégrés de direction différente. Déclarer la direction connue sur la citation et utiliser `bdi` ou `dir="auto"` pour une valeur intégrée de direction inconnue. Conserver la ponctuation de la citation avec celle-ci. Employer les propriétés CSS logiques pour les marges, le placement et l’alignement. Mettre en miroir les icônes directionnelles lorsque leur sens dépend de la lecture. Garder les symboles sans direction sémantique stables et conserver l’ordre de lecture du DOM. [Texte bidirectionnel du W3C](https://www.w3.org/International/articles/inline-bidi-markup/)
3. Utiliser une structure sémantique. Pour un QCM à réponse unique, préférer des boutons radio natifs, un groupe identifié par `fieldset` et `legend`, des libellés associés et un bouton de validation. Vérifier les noms et états accessibles, l’ordre de tabulation, le focus visible et non masqué, et la sortie de chaque commande. Pour un résultat ajouté sans déplacement du focus, exposer une annonce concise via une zone de statut. Pour un passage explicite à la question suivante, donner un point de reprise cohérent avec le nouvel énoncé. Ne pas annoncer deux fois le même retour par le déplacement du focus et le statut. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
4. Appliquer les critères WCAG 2.2 AA pertinents au parcours. Vérifier les contrastes exigés, le redimensionnement du texte à 200 % et la redistribution du contenu à 320 pixels CSS de large pour les vues à défilement vertical, avec les exceptions prévues par la norme. Pour les cibles au pointeur, vérifier le minimum de 24 × 24 pixels CSS ou une exception applicable et documentée. Tester la réduction des animations non essentielles et les options de durée selon le mode et le critère applicable. Présenter les erreurs et statuts avec des libellés compréhensibles sans couleur. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
5. Faire un parcours guidé au clavier seul et un parcours avec lecteur d’écran sur une configuration disponible. Vérifier la consigne, l’annonce des choix, le retour après validation et le passage à l’item suivant. Dans les tests automatisés, couvrir les attributs de langue et de direction, les noms et rôles, les transitions de focus et des états par locale. Confirmer manuellement l’ordre visuel des segments mixtes et les annonces effectivement entendues. Consigner la combinaison navigateur et lecteur d’écran ainsi que les cas restant à tester.

## Critères de qualité

- Les mêmes actions aboutissent dans les deux directions. L’ordre clavier, l’ordre de lecture et la navigation perçue sont cohérents avec la structure et le sens de l’interface.
- Les chaînes mixtes conservent le sens du français, de la darija, des chiffres, des parenthèses et de la ponctuation à toutes les largeurs testées.
- Les contrôles restent identifiables et actionnables sans couleur ni geste complexe. Les erreurs et la correction sont perceptibles visuellement et avec les technologies d’assistance.

## Exemples

- Dans `<p lang="ary" dir="rtl">قرا مزيان هاد الجملة (<span lang="fr" dir="ltr">Je n’en veux plus !</span>) وعطي الجواب.</p>`, vérifier que les parenthèses encadrent le segment français, que le point d’exclamation reste avec la citation et que l’ordre est préservé lors du retour à la ligne.
- Après « Valider », vérifier que le lecteur d’écran annonce un résultat textuel une seule fois. Après « Question suivante », vérifier que l’énoncé suivant peut être atteint immédiatement et qu’une barre d’action fixe ne masque pas le focus.

## Erreurs à éviter

- Inverser les chaînes manuellement ou appliquer RTL à une page française pour corriger un seul bloc en darija.
- Utiliser `row-reverse` ou l’ordre CSS pour simuler la lecture au prix d’un parcours clavier incohérent.
- Déclarer un écran accessible sur la seule base d’une capture ou d’un audit automatique.
- Mélanger les conventions de navigation et la progression du contenu sans vérifier le sens des commandes « Précédent » et « Suivant ».

## Checklist de validation

- [ ] Le document, les blocs en darija et les citations françaises exposent leur langue et leur direction.
- [ ] Les chaînes mixtes ont été essayées avec apostrophes, parenthèses, chiffres, ponctuation et texte long sur écran étroit.
- [ ] Le QCM, sa validation, sa correction et la poursuite sont faisables au clavier avec un focus visible.
- [ ] Le nom, l’état et les annonces des composants ont été contrôlés avec un lecteur d’écran disponible.
- [ ] Le contraste, le zoom, la redistribution et les cibles au pointeur ont été vérifiés selon les critères applicables.
- [ ] Les résultats consignent les outils utilisés, les anomalies reproductibles et les scénarios non vérifiés.
