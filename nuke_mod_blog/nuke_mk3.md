---
title: "Nuke Mk.3"
thumbnail: explosion.png
date: 2025-06-11
description: "Nukes are awesome, and instant. But in minecraft, they are slowwww. Can I fix that? Or at least make it better?"
edu: false
order: 4
---

## The Beginning (Mk.1)

Mk.1 of my nuke code was just a simple for loop that shot out tons of rays in all sorts of directions, stored hit blocks in a queue, and then at the end deleted those blocks about 10k at a time. This worked fine, but it had tons of room to grow. First off, deleting blocks 10k at a time based off of a HashSet is... not great. It means potentially (and likely) causing hundreds of lighting updates per chunk in the blast radius.

To solve this, I devised a new `HashMap<ChunkPos, HashSet<BlockPos>>`. This allowed blocks to be sorted by the chunk, meaning during deletion time any affected chunk would undergo at most one lighting update. Awesome.

But compute times were still awful. I was looking at upwards of 14 minutes to do my "Tsarmark", aka a 500 block wide explosion. That wouldn't do. So now I had two more things to fix: ray instantiation, and ray processing.

## Improving Ray Instantiation (Mk.2)

The first thing I set out to fix was the ray instantiation step. I switched it to a Fibonacci Lattice algorithm, which is basically some fancy trig that evenly spaces any given number of points into a sphere. It's probably what they use in Blender, for the Ico-Sphere. Idk.

This made ray spacing wayyyy better. No missed parts, and barely any missed poles (the top/bottom of the explosion, more on that later). That pretty much concludes Mk.2: by-chunk removal and Fibonacci Lattice.

## The Generation-Branching Experiment (Mk.3 Attempt #1)

Now for Mk.3, I tried something a bit more ambitious: a 'generation-branching ray casting algorithm' that essentially split a large blast radius into many smaller ones. Each time a smaller 'shell' completed, its rays would split into 8 more rays to fit the density of the next, bigger shell.

This did solve the issue with hitting the center blocks millions of times just to have enough rays to make sure the outer blocks got hit once. But it wasn't great.

## The Bad Ending :(

This method actually kind of increased the total ray count. And with the new ray crawling algorithm used later on, this got even more pointless. So instead of having, say, 1 million rays to cover a 500 wide explosion, you would have the cumulative result of many, many generations, and many, many branches, which would total up to a nice 3.325 x 10^13 rays. Yikes.

Safe to say that would take a supercomputer and the age of the universe, plus some, to compute. Eventually after honing in the values I got it down to...<br>400 million rays. Still awful.

Even though 399.9 million of those rays didn't need to process the center and just skipped on ahead, it ended up being worse for performance because of the absolute gargantuan amount of rays. And that's even if my RAM usage didn't hit 100% (6GB) and crash the game. After many hours, I gave up on my generation-branching algorithm and turned to a different way to optimize ray casting.

## The Real Mk.3: Good Ending :)

That's when I discovered... Amanatides and Woo's fast Voxel Traversal algorithm. This algorithm basically takes a ray and ensures it hits every block once, no more, no less, on its journey across the world. Awesome.

So that means I no longer need to have each ray step 0.5 blocks at a time, and still miss blocks somehow. This was the biggest optimization ever. Boy, did it improve the compute times.

The next quick thing I added to conclude Mk.3 was chunk sorting. Basically, as I am deleting chunks, I check the next closest one and delete that one. It looks nicer because it actually looks like the explosion is propagating outwards.

And with Mk.3, my Tsarmark went from 14 minutes to 2.5! Awesome.

Hey, thanks for reading all this. Or, if you just scrolled to the end, my Java file is attached as well as the credits below.

---

<p>
    CREDITS:<br>
    - https://hbmmods.github.io/blog/ (for helping give me ideas for optimization and blog formatting for better readability)<br>
    - https://m4xc.dev/articles/amanatides-and-woo/ (for the awesome time saver algorithm)<br>
    - duckduckgo.com (for the privacy-sound, many searches I made)<br>
</p>

<a class="attachment" href="NukeBase.java">NukeBase.java</a>
