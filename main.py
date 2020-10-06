
radio.set_group(49)
radio.set_transmit_power(7)

dat = bytearray(17)
rcvd = bytearray(100)

for i in range(16):
    dat[i+1] = i
for i in range(100):
    rcvd[i] = 0


def on_button_pressed_a():
    global dat
    for j in range(10):
        for i in range(100):
            dat[0]=i
            radio.send_buffer(dat)
            basic.pause(10)
        
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_a2():
    global rcvd
    tot = 0     #total
    for i in range(100):
        tot += rcvd[i]
    print ("Received: "+str(tot)+serial.NEW_LINE)
    print ("NOT FULLY received:"+serial.NEW_LINE)
    for i in range(100):
        if rcvd[i] < 10:
            print(str(i) + ": " + str(rcvd[i]) + " times" + serial.NEW_LINE)

input.on_button_pressed(Button.B, on_button_pressed_a2)

def on_received_buffer(receivedBuffer):
    global rcvd
    rcvd[receivedBuffer[0]] += 1
    led.toggle(2,2)
radio.on_received_buffer(on_received_buffer)