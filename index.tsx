import { VoltageRegulator } from "./lib/VoltageRegulator"
import { XiaoBoardBreakout } from "./lib/XiaoBoardBreakout"
import { LedCircuit } from "./lib/LedCircuit"
import { FlashCircuit } from "./lib/FlashCircuit"
import { CrystalCircuit } from "./lib/CrystalCircuit"
import { RP2040Circuit } from "./lib/RP2040Circuit"

export default () => (
  <board
    width="21mm"
    height="17.5mm"
    
    // Simplified routing configuration for successful autorouting
    routingDisabled={false}
    
    // More relaxed constraints to help routing succeed
    minTraceWidth="0.08mm"
    maxTraceWidth="0.5mm"
    
    // Larger vias for easier routing
    viaSize="0.3mm"
    viaDrillSize="0.15mm"
    
    // Increase maximum trace distance for flexibility
    schMaxTraceDistance={15}
  >
    {/* Optimized component placement with more spacing */}
    
    {/* Central RP2040 - main IC placement */}
    <RP2040Circuit 
      pcbX="0mm" 
      pcbY="0mm"
    />
    
    {/* Voltage regulator - more spacing from other components */}
    <VoltageRegulator 
      pcbX="-8mm" 
      pcbY="-7mm"
    />
    
    {/* Crystal - closer to RP2040 but with clearance */}
    <CrystalCircuit 
      pcbX="5mm" 
      pcbY="3mm"
      pcbRotation="0deg"
    />
    
    {/* Flash memory - positioned for clear routing path */}
    <FlashCircuit 
      pcbX="-5mm" 
      pcbY="4mm"
    />
    
    {/* LED - positioned away from dense routing areas */}
    <LedCircuit 
      pcbX="7mm" 
      pcbY="-5mm"
    />
    
    {/* Breakout connector - centered */}
    <XiaoBoardBreakout 
      pcbX="0mm" 
      pcbY="0mm"
    />
    
  </board>
)
