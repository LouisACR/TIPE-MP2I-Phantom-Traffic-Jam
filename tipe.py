from tkinter import *
from math import *
from numpy import *

voitures = []
pedales = []
DMA = 5
OVS = 5
DAF = 20 # Distance d'arrêt forcé

def creer_voiture(x0):
    global voitures
    print("voiture créé en "+str(x0))
    voitures.append([x0, 0 ,0]) # position, vitesse, accélération
    pedales.append([0, 0]) # pédale d'accélérateur ([0;+\infty]) | pédale de frein ([0;+\infty])

def voiture_automatique(id):
    global voitures
    if(id!=0): # si la voiture n'est pas la première voiture
        distance = int((voitures[id-1][0]-20) - voitures[id][0])
        if(distance>((5*(voitures[id][1])**2))):
            pedales[id][1]=0  # frein
            pedales[id][0]=0.2 # accelerateur
        elif(distance<=((5*(voitures[id][1])**2)) and distance>0):
            pedales[id][1]=1.2 # frein
            pedales[id][0]=0 # accelerateur
        elif(distance<=0):
            pedales[id][0]=0
            pedales[id][1]=0
            voitures[id][1] = 0
            voitures[id][2] = 0

def voiture_auto_v2(id):
    global voitures, DMA, OVS, DAF
    if(id!=0):
        distance = int((voitures[id-1][0]-20) - voitures[id][0])
        vitesseVoiture = voitures[id][1]
        incertitudeVitesse = 2
        if(distance>DMA): # DMA correspond à "Distance Minimale d'Autonomie" qui est la distance à partir de laquelle la voiture ne dépend plus de la voiture d'en face
            if(vitesseVoiture>=OVS+(incertitudeVitesse/2)): # On freine si on dépasse l'objectif de vitesse et on accélère sinon
                pedales[id][1]=0.1  # frein
                pedales[id][0]=0 # accelerateur
            elif(vitesseVoiture<OVS-incertitudeVitesse): # la moitié de l'incertitude car on a + tendance à accélérer que freiner
                pedales[id][1]=0  # frein
                pedales[id][0]=0.1 # accelerateur
            else: # on enlève les pieds des pédales
                pedales[id][1]=0 # frein
                pedales[id][0]=0 # accelerateur
        elif(distance<=0): # Accident ! On arrête tout !
            print("La voiture : "+str(id)+" a eu un accident avec la voiture : "+str(id-1))
            voitures[id][1]=0 # vitesse à 0
            voitures[id][2]=0 # accélération à 0
        elif(distance<=DMA and distance > 0): # Si dans cette zone, la voiture d'en face est "visible" pour nous.
            if(distance<=DAF):
                 pedales[id][1]=0.5
                 pedales[id][0]=0
            else:
                pedales[id][1]=0

def changement_voiture(id, abscisse, ordonee):
    if(pedales[id][0]>0): # on appuie sur l'accélérateur
        canvas.create_rectangle(abscisse+19, ordonee, abscisse+11, ordonee+20, outline="#22ff00", fill="#22ff00")
        voitures[id][2] = pedales[id][0]

    elif(pedales[id][1]>0): #on appuie sur le frein
        if(voitures[id][1]>0): # si la vitesse est positive
            canvas.create_rectangle(abscisse-1, ordonee, abscisse+1, ordonee+20, outline="#ff0000", fill="#ff0000")
            voitures[id][2] = -pedales[id][1] # on applique la "puissance sur la pédale de frein" à une accélération négative
        elif(voitures[id][1]<0): # si la vitesse est négative
            voitures[id][2] = 0 #on met une accélèration nulle
            voitures[id][1] = 0 # et une vitesse nulle (voiture à l'arrêt)

    elif(voitures[id][1]>0): #Si aucune pédale n'est appuyée ET que la vitesse est positive
        voitures[id][2] = -0.4 #on donne une accélération négative (simulation frottement air)

    elif(voitures[id][1]<0): #Si aucune pédale n'est appuyée ET que la vitesse est négative
        voitures[id][1] = 0.4 # jsp

    elif(voitures[id][1]==0): #Si aucune pédale n'est appuyée ET que la vitesse est nulle
        voitures[id][2]=0 # on met une accélération nulle (la voiture est à l'arrêt)

    voitures[id][1] = voitures[id][1] + voitures[id][2]

def afficher_voiture(id, abscisse, ordonee):
    global voitures
    canvas.create_rectangle(abscisse, ordonee, 20+abscisse, 20+ordonee, fill="#fff")
    canvas.create_text(10+abscisse, 10+ordonee, text=str(id), font=('Helvetica','8','bold'))
    voitures[id][0] = (voitures[id][0] + voitures[id][1])

def drawLanes():
    for i in range(10):
        if(i%2):
            color = "#9f9f9f"
        else:
            color = "#bfbfbf"
        canvas.create_rectangle(0, 40+(40*i), width, 40+(40*(1+i)), fill=color)

def update(t):
    global width, DMA, OVS
    canvas.delete("all")
    DMA = DMASlider.get()
    OVS = OVSSlider.get()
    DAF = DAFSlider.get()
    if(DAF>DMA):
        DAF = DMA
        DAFSlider.set(DAF)
    delay = delaySlider.get()
    drawLanes()
    distance01=0
    if(len(voitures)>1):
        distance01 = int((voitures[0][0]-20) - voitures[1][0])
    updateText("position: "+str(int(voitures[0][0])), "vitesse: "+str(int(voitures[0][1])), "accélération: "+str(voitures[0][2]), "distance (1->0): "+str(distance01))
    for i in range(len(voitures)):
        abscisse = (voitures[i][0]%width)
        ordonee = 50+(40*(int(voitures[i][0]/width))%400)
        if(vitesseAjoute.get()>0):
            if(pedales[0][1]==0 and pedales[0][0]==0):
                if(voitures[0][1]<=vitesseAjoute.get()):
                    voitures[0][1] = vitesseAjoute.get()
                else:
                    voitures[0][2] = -1
        voiture_auto_v2(i)
        afficher_voiture(i, abscisse, ordonee)
        changement_voiture(i, abscisse, ordonee)
    width = canvas.winfo_width()
    canvas.pack(fill=BOTH, expand=1)
    root.after(delay, update, t+1)

def accelerateStart(event):
   global pedales
   pedales[0][0] = 0.5

def accelerateStop(event):
   global pedales
   pedales[0][0] = 0

def freinerStart(event):
    global pedales
    pedales[0][1] = 0.75

def freinerStop(event):
    global pedales
    pedales[0][1] = 0

def updateText(*texts):
    info1.delete(1.0,"end")
    i=1
    for text in texts:
        info1.insert(float(i), text+"\n")
        i=i+1

def reset_all():
    global voitures, pedales
    voitures = []
    pedales = []
    creer_voiture(10)

width = 1000
root = Tk()
root.title("TIPE")
root.geometry(str(width)+"x600")
canvas = Canvas(root)

infos = Frame(root)
infos.pack(side = TOP)

btns = Frame(root)
btns.pack(side = BOTTOM)

acc = Button(btns, text ="Accelerer")
acc.pack(side=LEFT, ipadx=5, ipady=5, expand=True)
fre = Button(btns, text ="Freiner")
fre.pack(side=LEFT, ipadx=5, ipady=5, expand=True)
ajt = Button(btns, text ="Ajouter voiture", command=lambda: creer_voiture(int(voitures[-1][0]-100)))
ajt.pack(side=LEFT)
reset = Button(btns, text ="Reset", command=lambda: reset_all())
reset.pack(side=LEFT)

info1 = Text(infos, height=5)
info1.pack()

delay = 20

delaySlider = Scale(btns, from_=1, to=80, orient=HORIZONTAL, label="Période")
delaySlider.pack(side=RIGHT, expand=True)
delaySlider.set(delay)

vitesseAjoute = Scale(btns, from_=0, to=40, orient=HORIZONTAL, label="Vitesse fixé")
vitesseAjoute.pack(side=RIGHT, expand=True)
vitesseAjoute.set(2)

DMASlider = Scale(btns, from_=1, to=100, orient=HORIZONTAL, label="DMA")
DMASlider.pack(side=RIGHT, expand=True)
DMASlider.set(DMA)

OVSSlider = Scale(btns, from_=1, to=40, orient=HORIZONTAL, label="OVS")
OVSSlider.pack(side=RIGHT, expand=True)
OVSSlider.set(OVS)

DAFSlider = Scale(btns, from_=1, to=100, orient=HORIZONTAL, label="DAF")
DAFSlider.pack(side=RIGHT, expand=True)
DAFSlider.set(DMA-2)

acc.bind('<ButtonPress-1>',accelerateStart)
acc.bind('<ButtonRelease-1>',accelerateStop)

fre.bind('<ButtonPress-1>',freinerStart)
fre.bind('<ButtonRelease-1>',freinerStop)

creer_voiture(10)
canvas.after(delay, update(0))
root.mainloop()
