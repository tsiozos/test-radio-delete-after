let i: number;
radio.setGroup(49)
radio.setTransmitPower(7)
let dat = control.createBuffer(17)
let rcvd = control.createBuffer(100)
for (i = 0; i < 16; i++) {
    dat[i + 1] = i
}
for (i = 0; i < 100; i++) {
    rcvd[i] = 0
}
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    for (let i = 0; i < 100; i++) {
        dat[0] = i
        radio.sendBuffer(dat)
    }
})
input.onButtonPressed(Button.B, function on_button_pressed_a2() {
    let i: number;
    
    let tot = 0
    // total
    for (i = 0; i < 100; i++) {
        tot += rcvd[i]
    }
    console.log("Received: " + ("" + tot) + serial.NEW_LINE)
    console.log("NOT received:" + serial.NEW_LINE)
    for (i = 0; i < 100; i++) {
        if (rcvd[i] == 0) {
            console.log("" + i + serial.NEW_LINE)
        }
        
    }
})
radio.onReceivedBuffer(function on_received_buffer(receivedBuffer: Buffer) {
    
    rcvd[receivedBuffer[0]] = 1
    led.toggle(2, 2)
})
