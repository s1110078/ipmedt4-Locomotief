# -*- coding: utf-8 -*-
"""
Created on Wed Jun 19 18:17:58 2019

@author: leong
"""

stations = []
stationDictionary =	{
  "id": "",
  "label": ""
}

print("hallo")
bestand = open("treinstations.txt","r")

stationList = bestand.readlines()
for i in range(len(stationList)):
    station = stationList[i]
    station = station.split('\t')
    station[0] = station[0].upper()
    station[1] = station[1].partition("\n")[0]
    stationDictionary['id'] = station[0]
    stationDictionary['label'] = station[1]
    stations.append(stationDictionary.copy())

bestand.close()

print(stations)