#!/usr/bin/env python3

import cv2
import sys
import numpy as np
import math

i0 = cv2.imread("./0.png")
i0g = cv2.cvtColor(i0, cv2.COLOR_BGR2GRAY)
i0b = cv2.GaussianBlur(i0g,(9,9), 2)

cv2.imshow('Original Image', i0)

def angle(a,b):
  l1 = math.sqrt(a[0]*a[0]+a[1]*a[1])
  l2 = math.sqrt(b[0]*b[0]+b[1]*b[1])

  dot = a[0]*b[0] + a[1]*b[1]

  a = dot / (l1 * l2)

  if (a >= 1.0): rad = 0.0
  else:
    if (a <= -1.0): rad = math.PI
    else: rad = math.acos(a)

  an = rad * 180 / 3.14159265358979323846

  if (b[0] < 0):
    return 360 - an
  else:
    return an

circles = cv2.HoughCircles(i0b,cv2.HOUGH_GRADIENT,
                           dp=1,
                           minDist=50,
                           param1=150,
                           minRadius=50,
                           maxRadius=500,
                           param2=200)
circles = np.uint16(np.around(circles))

for i in circles[0,:]:
    # draw the outer circle
    cv2.circle(i0,(i[0],i[1]),i[2],(255,0,0),1)
    # draw the center of the circle
    cv2.circle(i0,(i[0],i[1]),2,(255,0,0),1)

def to_point(a,c):
  return (a[0]-int(c[0]), int(c[1])-a[1],)

cv2.imshow("gau",i0b)
cv2.imshow("0",i0)
k = cv2.waitKey(0)

i1 = cv2.imread("./3.png")
i1g = cv2.cvtColor(i1, cv2.COLOR_BGR2GRAY)
delta = cv2.absdiff(i0g, i1g)
thresh = cv2.threshold(delta, 130,255,cv2.THRESH_BINARY)[1]
thresh = cv2.dilate(thresh,None,None,None,3)
cv2.imshow("th2", thresh)

(cnts, _) = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

hits = []
for c in cnts:
  (x,y,w,h) = cv2.boundingRect(c)
  hits.append((x+round(w/2),y+round(h/2)))
  cv2.rectangle(i1, (x,y),(x+w,y+h),(0,0,200),1)

center = (circles[0][0][0],circles[0][0][1])

cv2.line(i1, (center[0],y-330),(center[0],y+330),(255,0,0))
for hit in hits:
  print("angle",  angle((0,200),to_point(hit,center)))
  #print(math.atan2(center[1]-hit[1], center[0]-hit[0]) * 180 / 3.14159265358979323846)
  cv2.line(i1, center,(hit[0],hit[1]),(255,0,0))

cv2.imshow("res", i1)

k = cv2.waitKey(0)

cv2.destroyAllWindows()
