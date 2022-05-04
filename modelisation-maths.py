from tkinter import *
from math import *
import numpy as np
import matplotlib.pyplot as plt

def update(t):
    global width,densite,densiteMax, densiteLS
    canvas.delete("all")
    sliders()
    densiteLS = np.linspace(0, int(densiteMax), 100)
    width = root.winfo_width()
    updateText("taille du tronçon: "+str(width-100), "flux = "+str(getFlux([densite])))
    drawRoute()
    if(t%(400/delay)==0):
        renderPlt()
    drawPlt()
    canvas.pack()
    root.after(delay, update, t+1)

def getFlux(densiteLS):
    global vitesseMax,densiteMax
    tab = []
    for i in range(len(densiteLS)):
        tab.append((densiteLS[i])*vitesseMax*(1-(densiteLS[i])/(densiteMax)))
    return tab

def sliders():
    global voitures,vitesseMax,densite,densiteMax
    voitures = voituresSlider.get()
    vitesseMax = vitesseMaxSlider.get()
    densite = densiteSlider.get()
    densiteMax = densiteMaxSlider.get()
    if(densite>densiteMax):
        densiteSlider.set(densiteMax)

def drawRoute():
    global canvas
    #canvas.create_line(100, 200, (width-100), 200)

def updateText(*texts):
    info1.delete(1.0,"end")
    i=1
    for text in texts:
        info1.insert(float(i), text+"\n")
        i=i+1

def renderPlt():
    global canvas, densiteLS, img
    plt.plot(densiteLS, getFlux(densiteLS))
    plt.xlabel(r'Densité max (en voiture$\cdot m^{-1}$)')
    plt.ylabel(r'Flux (en voiture$\cdot s^{-1}$)')
    plt.savefig('graph.png', dpi=100)
    plt.close('all')
    img = PhotoImage(file="graph.png")

def drawPlt():
    global img, graph
    graph.configure(image=img)
    graph.image = img

width = 1000
root = Tk()
img = PhotoImage(file='graph.png')
root.title("TIPE")
root.geometry(str(width)+"x800")
canvas = Canvas(root)

infos = Frame(root)
infos.pack(side = TOP)

densiteLS = []

btns = Frame(root)
btns.pack(side = BOTTOM)

info1 = Text(infos, height=5)
info1.pack()

delay = 20

graph = Label(root, image=img)
graph.pack()

delaySlider = Scale(btns, from_=1, to=80, orient=HORIZONTAL, label="Actualisation (ms)")
delaySlider.pack(side=RIGHT, expand=True)
delaySlider.set(delay)

densite = 1
densiteSlider = Scale(btns, from_=1, to=100, orient=HORIZONTAL, label="Densité (voiture/m)")
densiteSlider.pack(side=RIGHT, expand=True)
densiteSlider.set(densite)

densiteMax = 10
densiteMaxSlider = Scale(btns, from_=1, to=100, orient=HORIZONTAL, label="Densité max (voiture/m)")
densiteMaxSlider.pack(side=RIGHT, expand=True)
densiteMaxSlider.set(densiteMax)

vitesseMax = 5
vitesseMaxSlider = Scale(btns, from_=1, to=100, orient=HORIZONTAL, label="Vitesse max (m/s)")
vitesseMaxSlider.pack(side=RIGHT, expand=True)
vitesseMaxSlider.set(vitesseMax)

voitures = 0
voituresSlider = Scale(btns, from_=0, to=100, orient=HORIZONTAL, label="Nombre voiture")
voituresSlider.pack(side=RIGHT, expand=True)
voituresSlider.set(voitures)

canvas.after(delay, update(0))
root.mainloop()