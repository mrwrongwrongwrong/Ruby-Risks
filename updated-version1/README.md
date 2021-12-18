# Ruby-Risks
Final Project for Heuristic Problem solving. Enjoy the game by "python main.py". :)

Well, "python main.py" in terminal works on my Linux system.

Since my mac OS system has multiple python environment installed, in order to start the game, execute

## python3 main.py

in termain.

In addition, I did not use pycharm this time, just run it in the terminal.

#Environment Setups

If you have troubles as ---Error report "ModuleNotFoundError: No module named '_tkinter'
"
checkout: https://stackoverflow.com/questions/25905540/importerror-no-module-named-tkinter


By executing:
## pip3 install python3.7-tk

I solved my problem.


# Embedding python game in browser 
Solution 1:  pyjs, 
compile python code to javascript, then use javascript to integrate with browser
http://pyjs.org/

# In this updated version1, the following features has been added:
##1. An AI
##2. Freedom on choosing which box(chest) to open

##In order to run the AI,
1. In terminal, under the root, execute "python3 ai.py"
2. Run the game by "python3 main.py" in terminal
3. In the game interface, click on "Add AI"

##In order to choose which box to open:
Simply type the box index number in the section "Ideal Box Index", Then click submit
