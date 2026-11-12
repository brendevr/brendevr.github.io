---
title: "Pre-Math"
thumbnail: pre_math_thumb.png
date: 2025-06-03
description: "This page is a prerequisite sort of thing for math used throughout the other stuff."
edu: true
order: 1
---

## I. Rotation Matrix

Rotation matrices are a fun thing that make a point go from one place to another based on an axis and a rotation angle.
Look at this diagram to see what I mean:

<div class="imgcap">
    <img src="/assets/img/graph2.png">
    <p>
        What I've done is visualized the rotation using a building. The red building is the initial position (3,2). After a rotation by π/2, we arrive at the
        coordinate (-2,3). This is done using the rotation matrix:<br>
        <span style="white-space: nowrap;">
            <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/e02da33f45679713d15de997449a76df48efb282" style="display: inline; height: 4em; filter: invert();"><br>(Wikimedia)<br>
        </span>
        Or rather,<br> X' = X * cos(angle) - Y * sin(angle) and Y' = X * sin(angle) + Y * cos(angle).
    </p>
</div>

## II. Sin and Cos Basics

Sin and Cos are two trigonometric functions that, when you're dealing with circles, are the best way to do stuff. It's not too complex:
just think of a circle with a radius of 1, aka a unit circle. Now take any angle (in radians) that starts pointing at (1,0) and then goes counterclockwise.
Sin will return the Y value while Cos will return the X value.

<img src="/assets/img/unitcircle.png" style="filter: invert(); width: 50em;">
