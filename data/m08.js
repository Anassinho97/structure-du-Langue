(() => {
  const notions = {
    present: {
      title: 'Former le subjonctif présent',
      definition: 'Forme de la proposition dépendante après certains verbes, locutions et constructions. Elle situe souvent le fait au même moment ou après le repère principal.',
      purpose: 'Exprimer notamment ce qui est exigé, souhaité ou envisagé.',
      when: 'Après il faut que, souhaiter que, exiger que ou douter que, dans les constructions de la leçon.',
      how: 'Isole le sujet après que. Pour beaucoup de verbes, pars de ils au présent pour je, tu, il et ils, puis de nous au présent pour nous et vous. Enlève la terminaison et ajoute -e, -es, -e, -ions, -iez, -ent.',
      recognize: 'Cherche le déclencheur et le sujet. Compare l’orthographe entière de chaque forme avant de te fier à ce que tu entends.',
      rule: 'À l’écrit, recevoir donne que je reçoive mais que nous recevions. Être : sois, sois, soit, soyons, soyez, soient. Avoir : aie, aies, ait, ayons, ayez, aient. Aller : aille, ailles, aille, allions, alliez, aillent. Savoir : sache, saches, sache, sachions, sachiez, sachent.',
      darija: 'تخيّل الأستاذ عطاك شرط باش تدوز للمستوى الجاي: « Il faut que tu sois prêt. » فالأول شدّ « il faut que ». من بعد قلب شكون خاصّو يكون واجد. هنا « tu »، وكنقولو « sois ». بدّل الفاعل لـ « nous » وجرّب: « Il faut que nous soyons prêts. » حفظ التصريف بوحدو ما كافيش، خدم ديما بهاد الجوج أسئلة: شنو جا قبل « que » وشكون الفاعل اللي جا من بعد؟',
      table: [['Sujet', 'Être', 'Avoir'], ['je / tu / il', 'sois / sois / soit', 'aie / aies / ait'], ['nous / vous / ils', 'soyons / soyez / soient', 'ayons / ayez / aient']],
      examples: {B1:'Il faut que tu sois prêt.',B2:'Je souhaite que vous ayez du temps.',C1:'Le jury exige que chaque candidat fournisse une attestation.',C2:'L’experte récuse le scénario sans que les parties puissent en apprécier les conséquences.'},
      exceptions: 'Avec parler, les formes « il parle » de l’indicatif et « qu’il parle » du subjonctif s’écrivent pareil. Le contexte distingue le mode.',
      confusions: 'Soyez partage sa forme avec l’impératif. La présence de que vous dans la subordonnée permet d’identifier le subjonctif.',
      trap: 'J’aie s’écrit avec un e avant un participe passé quand je est sujet du subjonctif d’avoir.',
      do: 'Repérer le sujet réel, y compris après une longue incise.',
      avoid: 'Transformer tout que en signal de subjonctif.',
      memory: 'Déclencheur, sujet, forme : trois regards successifs.'
    },
    passe: {
      title: 'Subjonctif présent ou passé',
      definition: 'Le subjonctif passé associe avoir ou être au subjonctif présent au participe passé du verbe.',
      purpose: 'Marquer un fait envisagé comme antérieur ou accompli par rapport au repère de la principale.',
      when: 'Quand un déclencheur du subjonctif précède un événement déjà achevé au moment du souhait, du regret ou de l’appréciation.',
      how: 'Choisis l’auxiliaire comme au passé composé. Conjugue-le au subjonctif et applique l’accord du participe selon la construction.',
      recognize: 'Un marqueur comme hier, déjà ou avant lundi permet de situer l’action, mais vérifie quel verbe le marqueur modifie.',
      rule: '« Je regrette qu’elle parte » envisage le départ. « Je regrette qu’elle soit partie » le présente comme accompli. Un fait peut être accompli à un repère futur, comme « avant midi » dans « Il faut que tu aies fini avant midi ».',
      darija: 'دير خط صغير فالوقت. شوف « Je regrette qu’elle parte demain »: هي مازال غادي تمشي. دابا شوف « Je regrette qu’elle soit partie hier »: المشية سالات عاد حسّينا بالندم. ملي كاينة فكرة ديال حاجة سالات مقارنة مع اللحظة اللي كنهدرو عليها، ركّب « auxiliaire au subjonctif + participe passé ». سَوّل راسك واش فالفعل الفرنسي كنقولو « elle est partie » ولا « elle a fait » باش تعرف واش تختار « soit » ولا « ait ».',
      table: [['Repère', 'Forme'], ['Départ envisagé demain', 'qu’elle parte'], ['Départ déjà accompli hier', 'qu’elle soit partie'], ['Travail achevé avant midi', 'que tu aies fini avant midi']],
      examples: {B1:'Je suis content que tu sois venu hier.',B2:'Elle regrette que vous ayez oublié la réunion.',C1:'Il est peu probable que le dossier ait été égaré avant l’inventaire.',C2:'Quelles que soient les réserves qu’ait pu susciter le projet, l’amendement demeure recevable.'},
      exceptions: 'Dans l’usage actuel, un verbe principal au passé ne force pas le subjonctif imparfait. « Elle craignait qu’il parte » est courant.',
      confusions: '« Il regrette d’avoir parlé » a le même sujet dans les deux actions. « Il regrette que nous ayons parlé » en a deux.',
      trap: 'Chercher dans les choix l’auxiliaire au bon mode, puis vérifier le participe.',
      do: 'Tracer l’ordre des faits et retrouver le passé composé de référence.',
      avoid: 'Choisir ait pour un verbe qui prend être dans ce sens.',
      memory: 'Passé du subjonctif = auxiliaire bien choisi au subjonctif, puis participe.'
    },
    locutions: {
      title: 'Concession, but, limite et condition',
      definition: 'Les locutions subordonnantes relient un fait principal à un but, une concession, une limite ou une condition.',
      purpose: 'Identifier le rapport logique et choisir le mode compatible avec la construction.',
      when: 'Avec bien que, quoique, pour que, afin que, sans que, avant que, jusqu’à ce que, pourvu que, à condition que, à moins que, de peur que, pour peu que et encore faut-il que.',
      how: 'Classe le lien de sens. Repère les deux sujets avant de comparer la construction avec l’infinitif. Vérifie la locution entière.',
      recognize: 'Ne lis pas seulement le dernier « que ». « Jusqu’à ce que » et « dès que » ne fonctionnent pas pareil.',
      rule: 'Les locutions de la liste se construisent normalement avec le subjonctif. En français écrit soigné, emploie le subjonctif après bien que et quoique. Le ne de certaines constructions (avant que, à moins que, de peur que) peut être explétif et n’inverse pas le sens.',
      darija: 'شوف « On explique pour que les nouveaux comprennent ». كاين هدف والشخص اللي كيشرح ماشي هما الجداد: خدمنا بـ « pour que » و« comprennent ». فـ « Elle vérifie pour comprendre » هي اللي كتدير الجوج. وقبل ما تحكم على « ne »، شوف واش كاينة كلمة ديال النفي بحال « pas ». فـ « avant que le bus ne parte »، الباص غادي يمشي، و« ne » هنا ما كتعنيش ما غاديش يمشي.',
      table: [['Rapport', 'Locutions fréquentes'], ['Concession', 'bien que, quoique'], ['But ou précaution', 'pour que, afin que, de peur que'], ['Limite, condition ou réserve', 'avant que, jusqu’à ce que, pourvu que, à moins que, à condition que']],
      examples: {B1:'Je parle doucement pour que tu m’entendes.',B2:'On attendra jusqu’à ce que la salle soit libre.',C1:'Pour peu que le vent se lève, le bateau devra rentrer.',C2:'Le projet est réversible. Encore faut-il que les archives aient été conservées.'},
      exceptions: 'De sorte que accepte l’indicatif pour une conséquence réalisée et le subjonctif pour un but. Il faut donc lire le contexte.',
      confusions: 'Avec même si, le mode est l’indicatif dans la construction usuelle, même si l’idée est concessive.',
      trap: 'Outre la locution, une option peut contenir le bon mode avec la mauvaise personne.',
      do: 'Lire les choix en replaçant le groupe entier dans la subordonnée.',
      avoid: 'Employer le conditionnel simplement parce que le texte évoque une condition.',
      memory: 'Concession et objectif se ressemblent parfois à l’écrit. Le lien de sens permet de les séparer.'
    },
    indicatif: {
      title: 'Indicatif, infinitif et conditionnel',
      definition: 'Selon la construction, le verbe dépendant prend l’indicatif, l’infinitif ou, dans certains emplois, le conditionnel.',
      purpose: 'Éviter d’étendre à des locutions voisines le mode choisi pour le subjonctif.',
      when: 'Après que, alors que, même si, parce que, puisque, étant donné que, sous prétexte que et il n’en demeure pas moins que introduisent normalement l’indicatif dans leurs emplois usuels. À force de et faute de se construisent avec un nom ou un infinitif, selon la locution.',
      how: 'Distingue la proposition conjuguée de l’infinitif. Après afin de, avant de, au lieu de, de peur de, quitte à ou sans, choisis un infinitif quand la locution introduit le verbe sans sujet exprimé.',
      recognize: 'Même si + indicatif se distingue de quand bien même + conditionnel dans l’hypothèse concessive.',
      rule: 'Après que demande l’indicatif en français écrit soigné, quel que soit le temps. « Après qu’elle est partie » et « après qu’elle sera partie » localisent des faits à deux repères différents.',
      darija: 'قارن « avant qu’elle parte » و« après qu’elle est partie ». فالأولى كنستناو المشية، وفالثانية كنحطّو المشية قبل شي حاجة أخرى بحال واقعة. حطّ خط تحت « avant » ولا « après » بلا ما تتسرّع حيث شفتي « que ». ودابا قارن « pour que vous compreniez » مع « afin de comprendre »: فالثانية الفعل بقى كيف ما هو فالقاموس.',
      table: [['Construction', 'Choix dans ces emplois'], ['après que / même si / alors que', 'indicatif'], ['afin de / avant de / quitte à', 'infinitif avec sujet implicite'], ['quand bien même', 'conditionnel, dans la concession hypothétique']],
      examples: {B1:'Elle est sortie sans répondre.',B2:'Même si vous êtes en retard, entrez.',C1:'Après qu’il eut signé, la greffière annexa la pièce.',C2:'Quand bien même l’autorisation serait accordée, l’association maintiendrait son recours.'},
      exceptions: 'Le conditionnel peut avoir sa valeur propre dans certains contextes de discours rapporté ou d’incertitude. Ce cours porte sur les emplois identifiés dans les phrases proposées.',
      confusions: '« Quoique » signifie bien que. « Quoi que » signifie quelle que soit la chose que. Les deux appellent généralement le subjonctif dans les emplois traités.',
      trap: 'Une forme courte comme eut est à l’indicatif. Eût porte l’accent du subjonctif imparfait et change de mode.',
      do: 'Évaluer séparément sens de l’expression, mode et temps.',
      avoid: 'Ajouter que après afin de ou de peur de.',
      memory: 'Avant que et après que partagent que, mais portent deux repères et deux modes différents.'
    }
  };
  const source = `
B1|present|Il faut que tu ___ prêt au départ.|sois|es|est|être|Il faut que appelle le subjonctif et tu est le sujet.|Indicatif avec tu.|Indicatif avec il ou elle.|Infinitif sans marque de personne.|شدّ « il faut que » وقلّب على « tu ». ملي كتخاطب الشخص وكتعطيه شرط كنكتبوا « sois ».
B1|present|Je voudrais que nous ___ assez de temps.|ayons|avons|ont|avoir|Le souhait déclenche le subjonctif et nous impose ayons.|Indicatif présent.|Troisième personne de l’indicatif.|Infinitif.
B1|present|Le médecin veut que vous ___ à l’heure.|soyez|êtes|sont|être|Vous commande soyez dans une subordonnée de volonté.|Indicatif de vous.|Forme d’indicatif pour ils.|Infinitif.
B1|present|Papa souhaite que le bébé ___ au chaud.|soit|est|sont|être|Le bébé est un sujet singulier après un souhait.|Indicatif singulier.|Indicatif pluriel.|Infinitif.
B1|locutions|On baisse la radio pour que les enfants ___ dormir.|puissent|peuvent|pouvoir|pouvons|Pour que présente le but. Les enfants donne la troisième personne du pluriel.|Indicatif pluriel.|Infinitif.|Indicatif de nous.
B1|indicatif|Maya a fermé la porte sans ___ un mot.|dire|dit|dise|dirait|Sans introduit ici un infinitif dont le sujet est Maya.|Forme conjuguée ou participe.|Subjonctif sans sujet et sans que.|Conditionnel sans sujet.
B2|present|Le maître-nageur exige que chaque enfant ___ un bonnet.|ait|a|ai|avoir|Chaque enfant est singulier et l’exigence appelle ait.|Indicatif du singulier.|Indicatif avec je.|Infinitif.
B2|present|Je doute que ces plans ___ exacts.|soient|sont|soit|seraient|Le doute appelle le subjonctif et les plans sont pluriels.|Indicatif pluriel.|Subjonctif singulier.|Conditionnel non requis.
B2|present|Cette formatrice souhaite que je ___ davantage confiance en moi.|aie|ai|ait|avais|Je requiert aie au subjonctif présent d’avoir.|Indicatif présent.|Subjonctif de il.|Imparfait de l’indicatif.|شوفي « je »: « ai » اللي فـ « j’ai » هو indicatif. من بعد « souhaite que » هنا كنزيدو « e » وكنكتبوا « j’aie ».
B2|present|J’aimerais que tu ___ assez de matériel pour demain.|aies|aie|as|ait|La deuxième personne du singulier prend aies.|Subjonctif de je.|Indicatif de tu.|Subjonctif de il.
B2|present|Le règlement exige que les candidats ___ une convocation.|aient|ont|ait|avoir|Le pluriel au subjonctif présent d’avoir est aient.|Indicatif pluriel.|Subjonctif singulier.|Infinitif.
B2|present|Je veux que nous ___ sur place au moment de l’annonce.|soyons|sommes|serez|soient|Nous et que après vouloir imposent soyons.|Indicatif présent.|Futur de vous.|Subjonctif de ils.
B2|present|La direction tient à ce que vous ___ tous les justificatifs.|ayez|avez|aies|aurez|Tenir à ce que appelle le subjonctif, ici avec vous.|Indicatif de vous.|Subjonctif de tu.|Futur de vous.
B2|present|Notre équipe souhaite que chacun ___ où déposer ses affaires.|sache|sait|savent|savoir|Savoir au subjonctif avec chacun donne sache.|Indicatif singulier.|Indicatif pluriel.|Infinitif.
B2|passe|Elle regrette que nous ___ le dernier train hier et que le trajet soit déjà annulé.|ayons manqué|avons manqué|ayez manqué|sommes manqués|Le train est déjà manqué, et manquer le train se conjugue avec avoir.|Indicatif passé composé.|Subjonctif de vous.|Mauvais auxiliaire et mauvais mode.|البارح فات التران، ماشي باقين غير كنفكرو واش غادي يفوت. شدّ « nous » و« avoir manqué » باش توصل لـ « ayons manqué ».
B2|passe|Je suis heureux que ta sœur ___ arrivée hier sans encombre.|soit|est|sont|ait|Le fait est accompli. Arriver se conjugue ici avec être et ta sœur donne soit.|Indicatif d’être.|Indicatif pluriel.|Avoir ne convient pas à arriver.
B2|locutions|Le guide attendra jusqu’à ce que tout le monde ___ dehors.|soit|est|soient|être|Le point d’arrêt de l’attente est au subjonctif et tout le monde est singulier.|Indicatif.|Subjonctif pluriel.|Infinitif.
B2|locutions|Ferme la fenêtre avant que le vent ne ___ les feuilles.|disperse|dispersera|disperser|dispersez|Avant que appelle le subjonctif. Le vent requiert la troisième personne du singulier.|Futur de l’indicatif.|Infinitif.|Deuxième personne du pluriel.
B2|locutions|Pour que vous ___ recommencer, j’ai rouvert le formulaire.|puissiez|pouvez|pourriez|pouvoir|Le but avec pour que appelle puissiez au subjonctif de vous.|Indicatif.|Conditionnel.|Infinitif.
B2|locutions|Elle prêtera sa bicyclette à condition que tu la ___ avant midi.|rendes|rends|rendra|rendre|À condition que appelle le subjonctif. Tu sélectionne rendes.|Indicatif avec tu.|Futur singulier de il.|Infinitif.
B2|indicatif|Il n’a pas répondu, faute de ___ du réseau.|capter|capte|captait|capterait|Faute de est suivi ici de l’infinitif capter.|Forme conjuguée.|Imparfait.|Conditionnel.
B2|indicatif|Elle remet ses idées en ordre avant de ___ ses notes.|relire|relit|relise|relirait|Avant de suivi d’un verbe appelle l’infinitif.|Indicatif.|Subjonctif conjugué.|Conditionnel conjugué.
B2|indicatif|Après qu’elle ___ le code hier, le technicien a remplacé le clavier. Emploie le passé composé de l’indicatif.|a saisi|ait saisi|eut saisi|saisira|Le passé composé demandé est a saisi. Après que se construit à l’indicatif écrit soigné.|Subjonctif passé.|Passé antérieur, pas le temps demandé.|Futur.
C1|passe|Nous déplorons que les pièces ___ détruites avant l’ouverture du dossier.|aient été|ont été|soient eu|avait été|La destruction est accomplie. Le passif passé utilise le subjonctif d’avoir et été.|Auxiliaire à l’indicatif.|La suite ne forme pas le passif passé.|Indicatif et sujet au pluriel.
C1|passe|Elle s’étonne que j’___ oublié cette règle hier, moi qui l’avais si souvent expliquée.|aie|ai|ait|avais|Oublier a pour auxiliaire avoir. Je exige aie au subjonctif.|Indicatif présent.|Subjonctif de il.|Indicatif imparfait.
C1|passe|Le Conseil regrette que tu ___ tenu à l’écart lors du vote de lundi.|aies été|as été|ait été|sois eu|État passé dans un passif, aies été est construit sur avoir au subjonctif avec tu.|Passé composé de l’indicatif.|Subjonctif avec un sujet de troisième personne.|La suite est incompatible avec tenu à l’écart.
C1|passe|Je crains que nous nous ___ trompés de rampe lors du dernier bilan.|soyons|sommes|ayons|serons|Se tromper est pronominal. Au temps composé son auxiliaire est être.|Indicatif d’être.|Mauvais auxiliaire.|Futur de l’indicatif.
C1|passe|Bien qu’ils ___ sortis avant l’alarme, leurs badges ont enregistré leur passage.|soient|sont|aient|seraient|Sortir sans COD et exprimant un déplacement se conjugue ici avec être.|Indicatif d’être.|Mauvais auxiliaire dans ce sens de sortir.|Conditionnel.|إلى قلنا « ils ont sorti le dossier » كاين COD. هنا هما اللي خرجو برا، إذن « ils sont sortis » وفـ « bien que » كنقولو « soient sortis ».
C1|passe|Le parquet doute que vous ___ pris connaissance des pièces avant l’audience de mardi dernier.|ayez|avez|aies|soyez|Prendre se conjugue avec avoir. L’antériorité demande le subjonctif passé.|Indicatif de vous.|Subjonctif de tu.|Mauvais auxiliaire.
C1|passe|La responsable se réjouit que deux adhérentes ___ revenues avant la clôture de lundi.|soient|sont|ait|aient|Revenir prend être et les deux adhérentes sont au pluriel.|Indicatif présent.|Avoir au singulier.|Mauvais auxiliaire malgré le pluriel.
C1|locutions|Bien que cette mesure ___ coûteuse, la mairie la maintient. Respecte l’usage écrit soigné.|soit|est|étaient|être|Bien que appelle normalement le subjonctif en français soigné.|Indicatif singulier.|Indicatif pluriel.|Infinitif.
C1|locutions|On déplace l’audience à moins que le juge ne ___ avant midi.|revienne|reviendra|revenir|revenons|À moins que appelle le subjonctif. Le ne est explétif.|Futur de l’indicatif.|Infinitif.|Indicatif avec nous.
C1|locutions|Pourvu qu’aucun des justificatifs ne ___ illisible.|soit|sont|seront|être|Pourvu que appelle le subjonctif et aucun est singulier dans la phrase.|Indicatif pluriel.|Futur pluriel.|Infinitif.
C1|locutions|Le coffre est fermé, de peur que des documents ne ___ lors du déménagement.|disparaissent|disparaîtront|disparaît|disparaître|De peur que présente l’issue redoutée au subjonctif.|Futur de l’indicatif.|Indicatif singulier.|Infinitif.
C1|locutions|Pour peu que l’humidité ___ davantage, le capteur signale un dépassement.|monte|monter|montera|montent|Pour peu que appelle le subjonctif. L’humidité est singulier.|Infinitif.|Futur indicatif.|Forme plurielle.
C1|locutions|Le dispositif peut être prolongé. Encore faut-il que tous les élus ___ d’accord.|soient|sont|soit|seront|Encore faut-il que introduit une condition nécessaire au subjonctif.|Indicatif pluriel.|Subjonctif singulier.|Futur de l’indicatif.
C1|locutions|La lettre fut déposée sans que personne ___ la remarquer.|puisse|peut|pourra|pouvoir|Sans que exige un mode conjugué au subjonctif et personne est singulier.|Indicatif de il.|Futur de l’indicatif.|Infinitif.
C1|indicatif|Même si le délai ___ court, nous allons répondre immédiatement. Emploie l’indicatif présent.|est|soit|serait|étaient|L’indicatif présent demandé donne est avec le délai.|Subjonctif.|Conditionnel.|Imparfait pluriel.
C1|indicatif|Alors que les recettes ___ depuis janvier, les prix restent inchangés.|augmentent|augmentez|augmenter|augmentâmes|Les recettes est pluriel. Depuis janvier et restent situent la tendance au présent.|Indicatif de vous.|Infinitif.|Passé simple de nous.
C1|indicatif|Le directeur demande un report sous prétexte que le bâtiment ___ encore en travaux. Emploie le présent de l’indicatif.|est|soit|serait|fût|Le commentaire du prétexte prend ici l’indicatif présent.|Subjonctif présent.|Conditionnel.|Subjonctif imparfait.
C1|indicatif|Quittes à reformuler : choisissez la correction du passage qui doit se lire « Quitte à ___ le contrat, relisons-le ensemble. »|retarder|retardons|retardiez|retarderons|Quitte à est invariable dans cet emploi et introduit retarder à l’infinitif.|Présent conjugué.|Forme conjuguée de vous.|Futur conjugué.
C1|indicatif|Il n’en demeure pas moins que l’offre ___ ce soir. Choisis le futur simple.|expirera|expire|expirerait|expirât|La locution introduit ici un fait projeté au futur simple, expirera.|Indicatif présent, éventuellement prospectif, mais autre temps.|Conditionnel.|Subjonctif imparfait.
C2|passe|Elles contestent que la dépêche leur ___ parvenue avant la séance terminée hier.|soit|est|ait|aient|Parvenir se conjugue avec être. Le caractère accompli et le sujet la dépêche demandent soit parvenue.|Indicatif.|Mauvais auxiliaire.|Mauvais auxiliaire et mauvais nombre.
C2|passe|Il se peut que les témoignages qu’elle avait recueillis ___ été mal transcrits lors de l’audition passée.|aient|ont|ait|soient|Dans ce passif passé au subjonctif, les témoignages appellent aient été.|Indicatif pluriel.|Auxiliaire subjonctif singulier.|Être ne forme pas le temps composé de été.
C2|passe|Il est surprenant qu’une telle divergence ___ subsister après le dernier arbitrage désormais clos. Emploie le subjonctif passé de pouvoir.|ait pu|a pu|puisse|eut pu|Le subjonctif passé de pouvoir au singulier est ait pu.|Passé composé de l’indicatif.|Subjonctif présent.|Passé antérieur de l’indicatif.
C2|locutions|Quoique la preuve ___ insuffisante aux yeux de l’experte, la requête a été examinée. Choisis le subjonctif présent.|soit|est|fût|serait|Quoique marque la concession. Le temps demandé est le subjonctif présent.|Indicatif présent.|Subjonctif imparfait, autre temps.|Conditionnel.
C2|locutions|Afin que nul ne ___ en prétexter l’ignorance, l’avis sera affiché dès ce soir.|puisse|peut|pourrait|pourra|Le but impose le subjonctif de pouvoir. Nul est singulier.|Indicatif présent.|Conditionnel.|Futur de l’indicatif.
C2|indicatif|Quand bien même la commission ___ la dérogation demain, aucun chantier ne commencerait avant juin.|accorderait|accordera|accorder|accorde|Quand bien même introduit ici une concession hypothétique au conditionnel.|Futur de l’indicatif.|Infinitif.|Indicatif présent.
C2|indicatif|De peur de ___ la portée du texte, l’experte a refusé d’en résumer les exceptions.|trahir|trahisse|trahit|trahira|L’experte est sujet des deux actions. De peur de introduit l’infinitif.|Subjonctif conjugué.|Indicatif conjugué.|Futur conjugué.
C2|indicatif|Sitôt après que l’huissière ___ la pièce, le juge leva l’audience. Choisis le passé antérieur.|eut remis|eût remis|avait remis|aura remis|Eut remis est le passé antérieur, adapté au récit littéraire demandé.|Subjonctif plus-que-parfait, signalé par l’accent circonflexe.|Plus-que-parfait de l’indicatif.|Futur antérieur.
`;
  globalThis.TCF_MODULES ??= [];
  globalThis.TCF_MODULES.push({
    id: 8, title: 'Subjonctif', summary: 'Formation, choix du mode et repérage des faits accomplis.',
    darijaIntro: 'غادي نلقاو الكلمة اللي كتحكم فـ mode، ومن بعد نميّزو واش الفعل باقي مطروح ولا سالا مقارنة مع اللحظة ديال الجملة.',
    notions, items: source.trim().split('\n').map(line => line.split('|'))
  });
})();
