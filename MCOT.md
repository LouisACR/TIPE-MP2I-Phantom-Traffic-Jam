---
"lang": "fr",
"title": "Etude du phénonème d'embouteillage automobile fantôme (Phantom Traffic Jam)",
"subtitle": "Quels sont les impacts de ce phénomène ?",
"authors": ["Louis ROMAIN"," Clément PREVOT"],
"date": "Juin 2022"
---

Nous sommes souvent confrontés à un trafic dense sur les axes routiers du pays. Depuis notre voiture nous avons du mal à observer ce phénomène, mais il est bien réel et très présent.
Si nous observons la voie depuis plusieurs dizaines de mètres de hauteur, nous apercevons alors qu'une voiture qui freine légèrement entraine un freinage plus intense pour la voiture derrière et ainsi de suite, ce qui forme une onde de ralentissement qui avance dans le sens inverse de circulation provoquant de nombreux embouteillages.

## Ce TIPE fait l'objet d'un travail de groupe

### Liste des membres du groupe

* ROMAIN Louis
* PREVOT Clément

### Positionnement thématique

* ***PHYSIQUE*** (Physique Ondulatoire)
* ***INFORMATIQUE*** (Modélisation dynamique du problème)

### Mots-clés

| ***Mots-Clés*** (en français)  | ***Mots-Clés*** (en anglais) |
| :--------------- |:--------------- |
| Embouteillage automobile fantôme | Phantom Traffic Jam |
| Onde de ralentissement | Decelaration wave |
| Flux | Flow |
| Trafic discontinu | Stop-and-go traffic |
| Modélisation de Aw-Rascle-Zhang | Aw-Rascle-Zhang model |

### Pourquoi avoir choisi ce sujet ?

Ce sujet nous inspire puisqu'il traite d'un phénonème courant mais très peu connu et auquel des solutions simples peuvent être mises en place par les usagers de la route. Ce sujet nous permet également d'étudier des simulations sur la propagation des ondes de ralentissement et la faisabilité des solutions pour prévenir ce phénomème sur les automobilistes.

### Objectifs du TIPE

* Etudier théoriquement et expérimentalement les embouteillages et comprendre leurs caractéristiques intrinsèques.
* Modéliser informatiquement une situation d'embouteillage automobile dynamique.
* Utilisation d'un système de gestion de versions en ligne (Github)
* Comprendre le principe de la modélisation de Aw-Rascle-Zhang (ARZ)
* Etudier et comparer expérimentalement la modélisation de Aw-Rascle-Zhang avec notre modélisation.

### Problématique retenue

Au regard de l'importance d'une infrastructure routière fluide, quelle peut être les solutions mises en place afin de contrer l'effet d'embouteillage automobile fantôme ?

### Bibliographie commentée 

Les phenomenes de perturbation du traffic ne sont pas linéaires car les variations de vitesses ne sont pas forcement voulues et se basent sur des probabilités d'apparition. 

Dans un traffic dense nous allons étudier plusieurs scénarios : 

1. La premiere voiture change de vitesse de façon continue (pas d'acceleration brusque). 

2. La première voiture change de vitesse de façon discontinue. 

3. Une voiture quelquonque (qui n'est pas la première) change brusquement de vitesse. 

On peut faire un // avec le phénomène et un système masse ressort (théorie mathématique de l'élastisité des corps).
On peut faire un // avec le phénomène et la mecaniqeue des fluides (le systèmes euleriens) ou la mecanique des solide (systèmes lagrangiens).

euler : $v(y,t)$ $\rho(y,t)$ (y : position du vehicule)

lagrange : $\lambda(x,t)$ $v(x,t)$ (x : position du vehicule)

on peut passer d'un modele à l'autre en utilisant ecrivant $y(x,t)$



### Abstract

Phantom Traffic Jams take place too often in our lives. This phenomenon is mainly caused by the human factor. In stop-and-go traffic, drivers are not machines and can not react instantly to variable speeds. This results in a backwards wave in highly densed traffic that tends to reduce the flow.

### Liens

* **Dépôt des versions en ligne:** https://github.com/LouisACR/TIPE-MP2I-Phantom-Traffic-Jam

### Références bibliographiques

**[1]** **TAL COHEN and ROHAN ABEYARATNE** : “Linearized Theory of Traffic Flow“ : *Departement of Mechanical Engineering - Massachusetts Institute of Technology - arXiv:1412.7371v1 [physics.soc-ph] 20 Dec 2014*

**[2]** **Flynn, M. R. et al.** “Self-sustained nonlinear waves in traffic flow.” : *Physical Review E 79.5 (2009): 056113. © 2009 The AmericanPhysical Society.*