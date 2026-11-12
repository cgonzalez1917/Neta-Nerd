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
