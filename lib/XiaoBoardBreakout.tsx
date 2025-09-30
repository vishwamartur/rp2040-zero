import type { ChipProps } from "@tscircuit/props"

// Create a simple Xiao-style footprint for the RP2040-Zero
const XiaoRP2040Footprint = () => {
  const pads = []
  let pinNumber = 1

  // Top pads (SWDIO, SWCLK, RUN, GND1, GND2, VIN)
  const topPads = [
    { x: -1.396, y: 8.442 },  // pin1: SWDIO
    { x: 1.144, y: 8.442 },   // pin2: SWCLK
    { x: -1.396, y: 5.902 },  // pin3: RUN
    { x: 1.144, y: 5.902 },   // pin4: GND1
  ]

  for (const pad of topPads) {
    pads.push(
      <smtpad
        key={`top-${pinNumber}`}
        portHints={[`pin${pinNumber++}`]}
        radius={0.5715}
        pcbX={pad.x}
        pcbY={pad.y}
        layer="top"
        shape="circle"
      />
    )
  }

  // Bottom pads (GND2, VIN)
  const bottomPads = [
    { x: 1.27, y: -8.5 },   // pin5: GND2
    { x: -1.27, y: -8.5 },  // pin6: VIN
  ]

  for (const pad of bottomPads) {
    pads.push(
      <smtpad
        key={`bottom-${pinNumber}`}
        portHints={[`pin${pinNumber++}`]}
        width={1.016}
        height={2.032}
        pcbX={pad.x}
        pcbY={pad.y}
        layer="top"
        shape="rect"
      />
    )
  }

  // Left side pads (A0-A3, SDA, SCL, TX)
  const leftRowX = -8.25
  const leftPins = 7
  const pitch = 2.54
  const yOffset = ((leftPins - 1) / 2) * pitch

  for (let i = 0; i < leftPins; i++) {
    pads.push(
      <smtpad
        key={`left-${pinNumber}`}
        portHints={[`pin${pinNumber++}`]}
        width={3}
        height={2}
        pcbX={leftRowX}
        pcbY={yOffset - i * pitch}
        layer="top"
        shape="rect"
      />
    )
  }

  // Right side pads (VBUS, GND3, V3_3, MOSI, MISO, SCK, RX)
  const rightRowX = 8.25
  const rightPins = 7

  for (let i = 0; i < rightPins; i++) {
    pads.push(
      <smtpad
        key={`right-${pinNumber}`}
        portHints={[`pin${pinNumber++}`]}
        width={3}
        height={2}
        pcbX={rightRowX}
        pcbY={yOffset - i * pitch}
        layer="top"
        shape="rect"
      />
    )
  }

  return <footprint>{pads}</footprint>
}

// XiaoBoard RP2040 pin labels from @tscircuit/common
const RP2040PinLabels = {
  pin1: "SWDIO",
  pin2: "SWCLK",
  pin3: "RUN",
  pin4: "GND1",
  pin5: "GND2",
  pin6: "VIN",
  pin7: "A0",
  pin8: "A1",
  pin9: "A2",
  pin10: "A3",
  pin11: "SDA",
  pin12: "SCL",
  pin13: "TX",
  pin14: "VBUS",
  pin15: "GND3",
  pin16: "V3_3",
  pin17: "MOSI",
  pin18: "MISO",
  pin19: "SCK",
  pin20: "RX",
}

const rp2040PinArrangement = {
  leftSide: {
    direction: "top-to-bottom" as const,
    pins: ["SWDIO", "RUN", "A0", "A1", "A2", "A3", "SDA", "SCL", "TX", "VIN"],
  },
  rightSide: {
    direction: "top-to-bottom" as const,
    pins: [
      "SWCLK",
      "RX",
      "SCK",
      "MISO",
      "MOSI",
      "V3_3",
      "GND1",
      "GND2",
      "GND3",
      "VBUS",
    ],
  },
}

export const XiaoBoardBreakout = () => (
  <chip
    name="P1"
    footprint={<XiaoRP2040Footprint />}
    pinLabels={RP2040PinLabels}
    schWidth={1.5}
    schPinArrangement={rp2040PinArrangement}
    schPinStyle={{
      pin2: {
        marginBottom: 0.2,
      },
      pin3: {
        marginBottom: 0.3,
      },
      pin15: {
        marginBottom: 0.2,
      },
      pin16: {
        marginBottom: 0.2,
      },
      pin13: {
        marginBottom: 0.3,
      },
    }}
    connections={{
      // Power connections
      VIN: "net.V5_5",
      V3_3: "net.V3_3",
      GND1: "net.GND",
      GND2: "net.GND",
      GND3: "net.GND",
      VBUS: "net.VSYS",

      // GPIO connections mapped to RP2040-Zero pinout
      // Based on Waveshare RP2040-Zero schematic
      A0: "net.GPIO26",  // GPIO26/ADC0
      A1: "net.GPIO27",  // GPIO27/ADC1
      A2: "net.GPIO28",  // GPIO28/ADC2
      A3: "net.GPIO29",  // GPIO29/ADC3

      SDA: "net.GPIO6",   // GPIO6 (I2C1 SDA)
      SCL: "net.GPIO7",   // GPIO7 (I2C1 SCL)
      TX: "net.GPIO0",    // GPIO0 (UART0 TX)
      RX: "net.GPIO1",    // GPIO1 (UART0 RX)

      MOSI: "net.GPIO3",  // GPIO3 (SPI0 MOSI)
      MISO: "net.GPIO4",  // GPIO4 (SPI0 MISO)
      SCK: "net.GPIO2",   // GPIO2 (SPI0 SCK)

      // Debug connections
      SWDIO: "net.SWD",
      SWCLK: "net.SWCLK",
      RUN: "net.RUN",
    }}
  />
)

