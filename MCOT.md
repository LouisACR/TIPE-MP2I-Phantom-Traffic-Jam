---
"lang": "fr",
"title": "Etude du phénomème d'embouteillage automobile fantôme (Phantom Traffic Jam)",
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

* ***PHYSIQUE*** (Physique Ondulatoire, Mécanique des fluides)
* ***INFORMATIQUE*** (Modélisation dynamique)

### Mots-clés

| ***Mots-Clés*** (en français)  | ***Mots-Clés*** (en anglais) |
| :--------------- |:--------------- |
| Embouteillage automobile fantôme | Phantom Traffic Jam |
| Onde de ralentissement | Decelaration wave |
| Flux | Flow |
| Trafic discontinu | Stop-and-go traffic |

### Pourquoi avoir choisi ce sujet ?

Ce sujet nous inspire puisqu'il traite d'un phénonème courant mais très peu connu et auquel des solutions simples peuvent être mises en place par les usagers de la route. Ce sujet nous permet également d'étudier des simulations sur la propagation des ondes de ralentissement et la faisabilité des solutions pour prévenir ce phénomème sur les automobilistes.

### Objectifs du TIPE

* Etudier théoriquement et expérimentalement les embouteillages et comprendre leurs caractéristiques intrinsèques.
* Modéliser informatiquement une situation d'embouteillage automobile dynamique.
* Utilisation d'un système de gestion de versions en ligne (Github)
* Comprendre le principe des modélisations proposées.
* Etudier et comparer expérimentalement notre modélisation avec d'autres.

### Problématique retenue

Au regard de l'importance d'une infrastructure routière fluide, quelle peut être les solutions mises en place afin de contrer l'effet d'embouteillage automobile fantôme ?

### Bibliographie commentée

Les phénomènes de perturbation du trafic automobile ne sont pas des phénomènes linéaires, c'est à dire qu'il n'y a pas de solution générale au problème puisqu'il s'agit de phénomène qui se modélise par des équations non-linéaires. **[1]**,**[2]**
Nous pouvons rapprocher un trafic automobile dense à la mécanique des fluides et dire qu'il s'agit d'un milieu continu afin de pouvoir utiliser certains outils mathématiques telles que la dérivabilité. **[1],[3]**

Il y a différentes façons de voir ce phénomène de perturbation, nous nous intéresserons uniquement à trois scénarios:

1. La première voiture change de vitesse de façon continue (pas d'accélération brusque).

2. La première voiture change de vitesse de façon discontinue.

3. Une voiture quelconque (qui n'est pas la première) change brusquement de vitesse et sépare un trafic continu en deux.

Nous avons deux fonctions très utiles pour l'étude de ce phénomène, dans deux systèmes différents.

La spécification eulérienne : la vitesse $v(y,t)$ et la densité $\rho(y,t)$ avec $y$ la position du véhicule et $t$ un temps
euler : $v(y,t)$ $\rho(y,t)$ ($y$ : position du vehicule a un temps $t$)

lagrange : $\lambda(x,t)$ $v(x,t)$ ($x$ : position du vehicule dans le groupe de vehicule)

on peut passer d'un modele à l'autre en utilisant ecrivant $y(x,t)$

La spécification lagrangienne : la distance entre deux voitures: $\lambda(x,t)$ **[1]** et la vitesse $v(x,t)$ avec $x$ un unique entier non dimensionné représentant une voiture et $t$ un temps. Nous pouvons passer d'une spécification à l'autre en utilisant : $y(x,t)$ **[1],[2]**

Une possible solution à cette perturbation est d'utiliser des voitures autonomes afin de réguler le trafic en évitant une décélération forte en anticipant ou en attendant plus longtemps que prévu dans le but de laisser une marge de manœuvre. **[3]**

### Abstract

Phantom Traffic Jams take place too often in our lives. This phenomenon is mainly caused by the human factor. In stop-and-go traffic, drivers are not machines and can not react instantly to variable speeds. This results in a backwards wave in highly densed traffic that tends to reduce the flow.

### Liens

* **Dépôt des versions en ligne:** https://github.com/LouisACR/TIPE-MP2I-Phantom-Traffic-Jam

### Références bibliographiques

**[1]** **TAL COHEN and ROHAN ABEYARATNE** : “Linearized Theory of Traffic Flow“ : *Departement of Mechanical Engineering - Massachusetts Institute of Technology - arXiv:1412.7371v1 [physics.soc-ph] 20 Dec 2014*

**[2]** **Flynn, M. R. et al.** “Self-sustained nonlinear waves in traffic flow.” : *Physical Review E 79.5 (2009): 056113. © 2009 The AmericanPhysical Society.*

**[3]** **Stern, Raphael & Cui, Shumo & Delle Monache, Maria Laura & Bhadani, Rahul & Bunting, Matt & Churchill, Miles & Hamilton, Nathaniel & Haulcy, R'mani & Pohlmann, Hannah & Wu, Fangyu & Piccoli, Benedetto & Seibold, Benjamin & Sprinkle, Jonathan & Work, Daniel. (2017).** : “Dissipation of stop-and-go waves via control of autonomous vehicles: Field experiments.“ *Transportation Research Part C: Emerging Technologies. 89. 10.1016/j.trc.2018.02.005.*
