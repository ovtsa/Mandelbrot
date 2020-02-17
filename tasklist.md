# Task list

## INIT:
- [x] organize project directory hierarchy
- [x] organize html element to contain JavaScript that will become Mandelbrot Explorer
- [x] organize CSS to position element properly on page
- [x] connect HTML element to a skeleton JavaScript script
- [x] publish elements using Github pages

## APPLICATION:
- [ ] create large float data structure
- [ ] create complex number data structure
- [ ] create Mandelbrot_Math data structure (shortcuts)
- [ ] create PixelNode data structure that holds NSEW connections, coordinates, zoom, and color
- [ ] create empty plotly.js complex plane image OR your own native graphing environment (less overhead)
- [ ] if creating native graphing environment, need data structure
- [ ] also will need a draw() method for this graphing environment (implicitly called perhaps in another class)
- [ ] create buttons for zooming in and out
- [ ] create buttons for up, down, left, right
- [ ] make zoom buttons change graphing environment's corners' coordinates
- [ ] make zoom buttons show a smaller "window" showing where the next zoom level begins compared to the current one
- [ ] make UDLR buttons shift canvas by set percentage
- [ ] parse 2d pixel array dimensions from native screen environment
- [ ] determine coordinates of each pixel in that 2d array
- [ ] convert 2d pixel array to 2d PixelNode linked list
- [ ] determine if PixelNode doesn't already exist
- [ ] determine if any part of the image has already been calculated and stored in database - if so, loads accordingly
- [ ] using MandelBrot_Math, determine whether pixel is in or out of set (if PixelNode doesn't already exist)
- [ ] if pixel is outside set, determine what color it should have
- [ ] create Mandelbrot data structure that contains image at set specifications
- [ ] draw those pixels onto canvas in Mandelbrot data structure
- [ ] draw Mandelbrot data structure on webpage canvas
- [ ] create "reset" button
- [ ] implement "reset" that resizes and redraws fractal
- [ ] create "zoom to" textbar
- [ ] parse text from "zoom" textbar to coordinates if possible
- [ ] redraw Mandelbrot set at those coordinates and that zoom, placing those coordinates at the center of the screen
- [ ] create permissions button allowing client to offer more CPU cores to process images
- [ ] create option for editing color scheme

## DATABASE:

- [ ] create database
- [ ] organize database columns (image, corner_coords, zoom, priority)
- [ ] make JavaScript access server-side database
- [ ] write storage priority algorithm (what gets deleted when full)
- [ ] create simple fetch command ability
- [ ] implement timeout system before client calculates image himself
- [ ] implement zoom level where database communication stops
- [ ] ensure encryption of data passed between client and server

## API:

 - [ ] create skeleton Python library
 - [ ] create function that takes center_coords, zoom, resolution, and color_scheme as arguments, and returns a Python image of the Mandelbrot set

## MISC:

- [ ] decorate website
- [ ] add menu for "about me"
- [ ] add menu for contact info
- [ ] add menu for "coming soon"
- [ ] create "share your find" feature
- [ ] implement more fractals?
- [ ] create offline C++ version for deep zooms?
- [ ] find mathematically interesting point to zoom on
- [ ] create deep zoom video for YouTube
