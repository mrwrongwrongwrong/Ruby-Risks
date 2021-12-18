import threading
import time, random
from tkinter import END

from future.moves.tkinter import messagebox

class my Thread (threading.Thread): # inherits from the father class, threading.Thread
    def __init__(self, root, rt, player, gems, text_c, text_k):
        threading.Thread.__init__(self)
        self.root = root
        self.rt = rt
        self.player = player
        self.gems = gems
        self.text_c = text_c
        self.text_k = text_k

    def run(self):
        time.sleep(2)
        self.submit_11(self.rt, self.player, self.gems, self.text_c, self.text_k)

    def submit_11(self, rt, player, gems, text_c, text_k):
        try:
            ident = True
            print(text_c.get())
            print("Guess number ", guess_number.get())
            current_gems = box_gems[index[0]]
            if int(guess_number.get()) <= current_gems:
                all_player[players[index[0] % len(all_player.keys())]] += int(guess_number.get())
                gem_number[index[0] % len(all_player.keys())].set(
                    str(all_player[players[index[0] % len(all_player.keys())]]))
                text.insert(END, "Congratulations, " + players[index[0] % len(all_player.keys())] + " get "
                            + str(guess_number.get()) + " gems\n")
            else:
                text.insert(END, "Me regret, " + players[index[0] % len(all_player.keys())] + " get 0 gems\n")
            index[0] += 1
            if index[0] == int(sett[1]):
                max_player = ""
                max_c = 0
                for k in all_player.keys():
                    if all_player[k] > max_c:
                        max_c = all_player[k]
                        max_player = k
                settings[2].set(str(index[0]))
                self.exception_catch(
                    "Game Over, The Winner is " + str(max_player) + " his/her gems' number is " + str(max_c))
                ident = False
            if ident:
                current_player.set(players[index[0] % len(all_player.keys())])
                settings[2].set(str(index[0]))
                if current_player.get() == "AIPlayer":
                    self.summit_function(rt, player, gems, text_c, text_k)

        except Exception as e:
            a = rt.messagebox.askokcancel('Warning', e)
            print("Error code ", a)

    def summit_function(self, rt, player, gems, text_c, text_k):
        if current_player.get() == "AIPlayer":
            guess_number.set(str(random.randint(1, int(sett[0] / sett[1]) + 1)))
            select_number.set(random.randint(1, sett[1]))
            # time.sleep(2)
            # submit_1(rt, player, gems, text_c, text_k)
            t = myThread(root, rt, player, gems, text_c, text_k)
            t.start()
        else:
            self.submit_11(rt, player, gems, text_c, text_k)

    def exception_catch(self, info):
        a = messagebox.showinfo('Warning', info)
        print("Error code ", a)
        all_player.clear()
        sett.clear()
