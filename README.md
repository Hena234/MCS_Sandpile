# Sandpile Simulations

This repository contains implementations of various sandpile models, demonstrating the concept of self-organized criticality. The simulations are written in JavaScript using the p5.js library for visualization.

## Table of Contents

1. [Basic Sandpile Model](#basic-sandpile-model)
2. [Sandpile Pixel Model](#sandpile-pixel-model)
3. [Abelian Sandpile Model](#abelian-sandpile-model)
4. [Installation and Usage](#installation-and-usage)

## Basic Sandpile Model

The basic sandpile model implements a simple 10x10 grid where each cell can contain grains of sand. This model demonstrates the fundamental concepts of self-organized criticality in a manageable scale.

### How it works:
- Each cell is initialized with a random number of grains (0-3).
- In each iteration, one grain is added to the center cell.
- If a cell contains 4 or more grains, it "topples," distributing one grain to each of its four neighbors.
- The process continues until the system reaches a stable state.

### Visualization:
![Basic Sandpile Model GIF](basic_sandpile/grid-sandpile.gif)


### Analysis:
The following log-log plot shows the distribution of avalanche sizes in the basic sandpile model:

![Basic Sandpile Log-Log Plot](basic_sandpile/plot.png)


This plot demonstrates the power-law distribution characteristic of self-organized criticality, where the frequency of avalanches decreases as their size increases, following a straight line on a log-log scale.

## Sandpile Pixel Model

The sandpile pixel model extends the basic model to a larger grid (400x400 pixels), allowing for more complex patterns and behaviors to emerge.

### Key improvements:
- Random drop location within a circular area around the center.
- Pixel-based rendering for improved performance with larger grids.
- GIF generation to visualize the evolution of the sandpile over time.

### Visualization:
![Sandpile Pixel Model GIF](sandpile_pixel/random-sandpile.gif)



### Analysis:
The log-log plot for the pixel model shows how the behavior scales with a larger grid:

![Sandpile Pixel Log-Log Plot](sandpile_pixel/plot_pixel.png)



This plot may reveal subtle differences in the power-law distribution compared to the basic model, potentially due to the larger scale and different grain drop mechanism.

## Abelian Sandpile Model

The Abelian sandpile model demonstrates the mathematical properties of sandpiles, particularly the concept that the order of topplings doesn't affect the final state (hence "Abelian").

### Key features:
- A large initial pile (2^20 grains) placed at the center.
- Efficient toppling algorithm for handling large numbers of grains.
- Visualization of the resulting fractal-like patterns.

### Visualization:
![Abelian Sandpile Model GIF](abelian_sandpile/sandpile.gif)


The Abelian model often produces striking, symmetrical patterns that emerge from simple rules, showcasing the beauty of self-organized criticality.

## Installation and Usage

1. Clone this repository:
   ```
   git clone https://github.com/your-username/sandpile-simulations.git
   ```
2. Open the desired HTML file in a web browser to run the simulation:
   - `basic_sandpile.html` for the Basic Sandpile Model
   - `sandpile_pixel.html` for the Sandpile Pixel Model
   - `abelian_sandpile.html` for the Abelian Sandpile Model

3. Observe the simulation and analyze the results!

---

Feel free to explore each model and experiment with different parameters. If you have any questions or suggestions, please open an issue or submit a pull request!
