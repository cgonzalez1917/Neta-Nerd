# Flooded lead-acid {#flooded}

ATS 7.18.1.1 is flooded lead-acid. Vented nickel-cadmium is 7.18.1.2. Valve-regulated lead-acid is 7.18.1.3. The pass/fail numbers are not interchangeable. Nickel-cadmium inspection includes pilot-cell electrolyte temperature (7.18.1.2.A.7). VRLA does not get watered, and a specific-gravity reading is not available the way it is on a flooded cell.

Flooded lead-acid electrical values, 7.18.1.1.D:

- Charger float and equalize voltages follow the battery manufacturer.
- Cell voltages within 0.05 V of each other, or the manufacturer’s band if it publishes one.
- Connection resistance uses the 50-percent-of-the-lowest screen.
- Internal ohmic values (resistance, impedance, or conductance) shall not vary by more than 25 percent among identical cells that are fully charged.
- A load test follows the manufacturer or IEEE 450.
- Voltage from positive to ground and from negative to ground should be equal in magnitude. A large imbalance means a ground on one half of the stack.

Record temperature with the float voltage. Lead-acid float voltage is temperature sensitive; chasing a voltage without the temperature is how a charger gets set wrong.

Intercell hardware gets an oxide inhibitor where the section calls for it, and torque from the battery manufacturer before Table 100.12.

## Common mistakes

- Using the flooded 0.05 V rule on a VRLA monoblock the manual treats differently.
- Comparing ohmic readings between a full charge and a discharged string and calling 25 percent.
- Leaving the charger in equalize.

## Specific gravity, float, and equalize {#specific-gravity}

Sources: IEEE 450-2020 5.3.3, 5.4.3, 5.5, Annex A and Annex B; ATS-2025 7.18.1.1.

- **Temperature correction.** Specific gravity is referenced to 77 °F (25 °C). Add 0.001 for each 3 °F (1.67 °C) above 77 °F, and subtract 0.001 for each 3 °F below. Worked: 1.210 at 86 °F becomes 1.213. 1.220 at 71 °F becomes 1.218.
- **Open-circuit voltage.** OCV ≈ SG + 0.845. A fully charged lead-acid cell rests between 2.05 and 2.15 V.
- **When SG misleads you.** Right after a recharge or an equalize, the dense acid sits at the bottom and a top reading runs low. Added water floats on top and can take weeks to mix. Read SG before adding water.
- **What SG proves.** Good SG means a charged cell. It doesn't prove the cell can carry the load. Only a discharge test does.
- **State of charge from current.** On a voltage-regulated charger, current that has stopped falling for three hourly readings means the battery is near full charge. Float current also shows the charger and circuit are working, but not that each connection is good.
- **Equalize when** cell float voltages stray beyond the manufacturer's spread, corrected SG falls below the manufacturer's lower limit, or a cell is below the minimum voltage. An equalize normally runs 24 hours or more.
- **Charger settings.** ATS has you measure float and equalize voltage and set them to the battery maker's values, not the charger's defaults.

## Capacity tests {#capacity-test}

Sources: IEEE 450-2020 Clause 3, 7.2, 7.3 and 7.4.1.

- **Four test types.** Acceptance and performance tests measure capacity. A service test checks the duty cycle only. A modified performance test checks both, and its recommended length is the duty cycle times the sizing aging factor.
- **First in-service performance test and later interval (IEEE 450-2020, 6.3).** Complete the first capacity performance test by the end of the second year in service. Space later tests at no more than 25 percent of expected service life: five years for a 20-year battery, unless degradation or age later requires a shorter interval. Annual tests come later if the battery shows degradation or reaches 85 percent of expected service life. Degradation is indicated when capacity drops by more than 10 percent from the last capacity test, or has fallen under 90 percent of the manufacturer's rating. Once age is at 85 percent of expected life, a two-year spacing is still allowed if capacity remains at 100 percent of rating or better and degradation has not appeared. Keep that spacing only until degradation appears.
- **Initial conditions.** Equalize if the maker recommends it, then float at least 72 hours. Check connections. Record float current, each cell's float voltage, and terminal voltage. Record electrolyte temperature on at least 10% of the cells, and every 8 hours if the test will run past 24 hours. Isolate the battery so a failure can't take down critical loads.
- **Method.** Rate-adjusted works for any length and is required under one hour. Time-adjusted may be used above one hour. Stay with one method so the results trend.
- See [flooded cells](#/study/batteries.md/flooded) for the ATS cell-voltage, ohmic, and connection limits.
