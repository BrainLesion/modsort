# modsort with vite and electron
![modsort_logo](modsort_logo/icons/modsort.png)

**modsort** is a powerful tool for sorting, identifying, and tagging MR (Magnetic Resonance) sequences.  
It allows users to manually organize medical imaging files through an intuitive drag-and-drop interface.  

Once sorted, files are automatically copied, renamed, and structured into a relative location, reducing errors and eliminating typos.  
The bulk renaming feature streamlines workflow, making it easy to process large datasets efficiently.  

**modsort** is especially useful for radiologists, researchers, and medical imaging professionals who need to classify MR sequences accurately.  
After renaming, files can be further processed using the [preprocessing module](https://github.com/BrainLesion/preprocessing).  

![modsort_program](modsort_screenshot.png)



## important commands
first run `cd modsort`
### installation
```
npm i
```

### dev
```
yarn dev
```
then use cmd + option + i to open console in the electron window

### build
```
yarn build --mac --win --linux
```

## citation
when using modsort please cite the BrainLesion suite paper:
```
tba
```
