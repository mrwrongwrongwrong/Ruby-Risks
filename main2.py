from random import randint
from future.moves import tkinter
from tkinter import *
from tkinter.font import BOLD
from PIL import Image, ImageTk
from future.moves.tkinter import messagebox

all_player = {}
players = {}
sett = []
P = 2
box_gems = []
temp_index = [0]


def generate_box_gems():
    gems = sett[0]
    boxes = sett[1]
    opened_box = sett[2]
    total_appened = 0
    for i in range(0, int(boxes)):
        #box_gems.append(int(gems / boxes))
        min = int(gems / boxes) - 2
        max = int(gems / boxes) + 2
        gem_num = randint(min, max)
        box_gems.append(gem_num)
        total_appened += gem_num
    for i in range(0, gems % boxes):
        box_gems[i] += 1

    print("The distribution of rubies in each chest ", box_gems)


def exception_catch(info):
    a = messagebox.showinfo('Warning', info)
    print("Error code ", a)
    all_player.clear()
    sett.clear()


def show(rt, player, gems, setting):
    try:
        print(rt)
        temp_count = 0
        for item in player:
            p = item.get()
            print(p)
            if len(p) > 0 and p not in all_player.keys():
                all_player[p] = 0
                players[temp_count] = p
                temp_count += 1

            elif p in all_player:
                exception_catch(p + " is in the player list, please assign a different name.")

        if 2 <= len(all_player) < 5:
            print("player's count is ", len(all_player))

            for item in setting:
                print(item.get())
                sett.append(int(item.get()))

            if sett[1] % len(all_player) != 0:
                exception_catch("The number of chests must be divisible by the number of players and "
                                "the remainder must be 0")
            else:
                text_content.set("OK, the number of rubies in the chest will be revealed as soon as you submit your "
				"guess\n ")
                text.insert(1.0, text_content.get())

                rt.bt1 = Button(root, text='Submit', width=10,
                            command=lambda: summit_function(root, player_v, gem_number, text_content, text), height=1,
                            font=('Arial', 12, BOLD), fg='#F4606C',
                            bg="#A0EEE1").grid(row=6, column=3, columnspan=2, padx=10, pady=5)
                generate_box_gems()
                current_player.set(player_v[index[0]].get())
                print("Player ", all_player.keys())
                print("Player1 ", players)

        else:
            exception_catch("The number of the player must be between 2 and 5")

    except Exception as e:
        exception_catch(e)


def summit_function(rt, player, gems, text_c, text_k):
    try:
        print(text_c.get())
        print("Guess number ", guess_number.get())
        current_gems = box_gems[index[0]]
        if int(guess_number.get()) <= current_gems:
            all_player[players[index[0]%len(all_player.keys())]] += int(guess_number.get())
            gem_number[index[0]%len(all_player.keys())].set(str(all_player[players[index[0]%len(all_player.keys())]]))
            text.insert(END, "Congratulations, " + players[index[0]%len(all_player.keys())] + " get "
            + str(guess_number.get()) + " gems\n")
        else:
            text.insert(END, "Me regret, " + players[index[0]%len(all_player.keys())] + " get 0 gems\n")
        index[0] += 1
        if index[0] == int(sett[1]):
            max_player = ""
            max_c = 0
            for k in all_player.keys():
                if all_player[k] > max_c:
                    max_c = all_player[k]
                    max_player = k
            settings[2].set(str(index[0]))
            exception_catch("Game Over, The Winner is " + str(max_player) + " his/her gems' number is " + str(max_c))
        current_player.set(players[index[0]%len(all_player.keys())])
        settings[2].set(str(index[0]))


    except Exception as e:
        a = rt.messagebox.askokcancel('Warning', e)
        print("Error code ", a)


if __name__ == '__main__':
    root = Tk()
    index = [0]
    x_w = root.winfo_screenwidth()
    y_w = root.winfo_screenheight()
    ww = 850
    xx = 600
    x = (x_w - ww) / 2
    y = (y_w - xx) / 2
    root.geometry("%dx%d+%d+%d" % (ww, xx, x, y))
    root.configure(bg="#D1BA74")
    root.title(' Ruby Risks ')

    Label(root, text='The number of\n gems owned', width=12, height=2, font=('Arial', 8), fg='white',
          bg="#F4606C"). \
        grid(row=0, column=2, pady=10)

    Label(root, text='Player1 Name', width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=1, column=0, padx=5, pady=5)
    Label(root, text='Player2 Name', width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=2, column=0, padx=5, pady=5)
    Label(root, text='Player3 Name', width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=3, column=0, padx=5, pady=5)
    Label(root, text='Player4 Name', width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=4, column=0, padx=5, pady=5)
    Label(root, text='Player5 Name', width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=5, column=0, padx=5, pady=5)

    v1 = StringVar()
    v2 = StringVar()
    v3 = StringVar()
    v4 = StringVar()
    v5 = StringVar()
    player_v = [v1, v2, v3, v4, v5]

    e1 = Entry(root, textvariable=v1, width=12, font=('Arial', 15), fg='white', bg="#F4606C"). \
        grid(row=1, column=1, padx=5, pady=5)
    e2 = Entry(root, textvariable=v2, width=12, font=('Arial', 15), fg='white', bg="#F4606C"). \
        grid(row=2, column=1, padx=5, pady=5)
    e3 = Entry(root, textvariable=v3, width=12, font=('Arial', 15), fg='white', bg="#F4606C"). \
        grid(row=3, column=1, padx=5, pady=5)
    e4 = Entry(root, textvariable=v4, width=12, font=('Arial', 15), fg='white', bg="#F4606C"). \
        grid(row=4, column=1, padx=5, pady=5)
    e5 = Entry(root, textvariable=v5, width=12, font=('Arial', 15), fg='white', bg="#F4606C"). \
        grid(row=5, column=1, padx=5, pady=5)

    # Gem Number of every player
    n1 = StringVar()
    n2 = StringVar()
    n3 = StringVar()
    n4 = StringVar()
    n5 = StringVar()
    gem_number = [n1, n2, n3, n4, n5]

    n1.set("0")
    n2.set("0")
    n3.set("0")
    n4.set("0")
    n5.set("0")

    Label(root, textvariable=n1, width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=1, column=2, padx=5, pady=5)
    Label(root, textvariable=n2, width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=2, column=2, padx=5, pady=5)
    Label(root, textvariable=n3, width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=3, column=2, padx=5, pady=5)
    Label(root, textvariable=n4, width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=4, column=2, padx=5, pady=5)
    Label(root, textvariable=n5, width=12, height=2, font=('Arial', 8), fg='white', bg="#F4606C"). \
        grid(row=5, column=2, padx=5, pady=5)

    # gem number, gem chest number
    Label(root, text='Total Gem Number', width=18, height=2, font=('Arial', 8, BOLD), fg='Black', bg="#A0EEE1"). \
        grid(row=6, column=0, padx=5, pady=12)
    Label(root, text='Total Chest Number', width=18, height=2, font=('Arial', 8, BOLD), fg='Black', bg="#A0EEE1"). \
        grid(row=7, column=0, padx=5, pady=8)
    Label(root, text=' Opened Chest Num', width=18, height=2, font=('Arial', 8, BOLD), fg='Black',
          bg="#A0EEE1"). \
        grid(row=8, column=0, padx=5, pady=8)

    ms1 = StringVar()
    ms2 = StringVar()
    ms3 = StringVar()

    ms1.set("0")
    ms2.set("0")
    ms3.set("0")
    settings = [ms1, ms2, ms3]

    Entry(root, textvariable=ms1, width=12, font=('Arial', 10, BOLD), fg='Black', bg="#A0EEE1"). \
        grid(row=6, column=1, columnspan=2, padx=5, pady=12)
    Entry(root, textvariable=ms2, width=12, font=('Arial', 10, BOLD), fg='Black', bg="#A0EEE1"). \
        grid(row=7, column=1, columnspan=2, padx=5, pady=8)
    Label(root, textvariable=ms3, width=12, height=1, font=('Arial', 8, BOLD), fg='Black', bg="#A0EEE1"). \
        grid(row=8, column=1, columnspan=2, padx=5, pady=8)

    Button(root, text='Start Game', width=10, command=lambda: show(root, player_v, gem_number, settings), font=('Arial', 12, BOLD),
           fg='Black', bg="#A0EEE1") \
 \
        .grid(row=0, column=6, padx=10, pady=5)

    # set current palyer
    current_player = StringVar()
    current_player.set("Nobody")
    Label(root, text="Current Player", width=12, height=2, font=('Arial', 12, BOLD), fg='Black',
          bg="#D6D5B7"). \
        grid(row=1, column=3, columnspan=2, padx=5, pady=12)
    Label(root, textvariable=current_player, width=12, height=2, font=('Arial', 12, BOLD), fg='Black', bg="#D6D5B7"). \
        grid(row=1, column=6, columnspan=2, padx=5, pady=8)
    Label(root, text="Guess the number of gem in the chest", width=38, height=2, font=('Arial', 12, BOLD),
          fg='Black', bg="#D6D5B7"). \
        grid(row=2, column=3, columnspan=5, padx=0, pady=12)

    # load image of the chest
    img = Image.open('image/box.png')
    image_resize = img.resize((60, 50))
    img_png = ImageTk.PhotoImage(image_resize)
    label_img1 = Label(root, image=img_png).grid(row=3, column=3, rowspan=2, padx=5, pady=12)
    label_img2 = Label(root, image=img_png).grid(row=3, column=4, rowspan=2, padx=5, pady=12)
    label_img3 = Label(root, image=img_png).grid(row=3, column=5, rowspan=2, padx=5, pady=12)
    label_img4 = Label(root, image=img_png).grid(row=3, column=6, rowspan=2, padx=5, pady=12)
    label_img5 = Label(root, image=img_png).grid(row=3, column=7, rowspan=2, padx=5, pady=12)

    Label(root, text=" Guess Number", width=12, height=2, font=('Arial', 11, BOLD), fg='Black',
          bg="#D6D5B7"). \
        grid(row=5, column=3, columnspan=3, padx=5, pady=12)
    guess_number = StringVar()
    Entry(root, textvariable=guess_number, width=12,  font=('Arial', 12, BOLD), fg='Black', bg="#D6D5B7"). \
        grid(row=5, column=5, columnspan=2, padx=5, pady=8)

    # game result
    Label(root, text="Game\n Result", width=6, height=5, font=('Arial', 12, BOLD), fg='Black',
          bg="#D6D5B7"). \
        grid(row=7, column=3, rowspan=3, padx=5, pady=12)
    text_content = StringVar()

    text = Text(root, width=45, height=9)
    text.grid(row=7, column=4, columnspan=4, rowspan=3, padx=5, pady=12)

    text.insert(1.0, text_content.get())

    bt1 = Button(root, text='Submit', width=10, command=lambda: summit_function(root, player_v, gem_number, text_content, text), height=1,
           font=('Arial', 12, BOLD), fg='#F4606C', state= DISABLED,
           bg="#A0EEE1").grid(row=6, column=3, columnspan=2, padx=10, pady=5)

    root.mainloop()
