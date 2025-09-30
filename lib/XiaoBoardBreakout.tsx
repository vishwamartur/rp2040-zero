import type { ChipProps } from "@tscircuit/props"

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
    footprint="xiao"
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

