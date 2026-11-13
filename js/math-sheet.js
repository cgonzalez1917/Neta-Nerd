/* Math cheat sheet for #/math. Original wording. No acceptance limits. */
(function (global) {
  "use strict";

  var SECTIONS = [
    {
      id: "dc",
      jump: "DC",
      title: "DC circuits",
      banner: "On the March 2020 sheet",
      cards: [
        {
          title: "Ohm's law and DC power",
          badge: "sheet",
          formulas: ["V = I \u00d7 R", "P = I \u00d7 V"],
          variables: [
            ["V", "voltage, in volts"],
            ["I", "current, in amperes"],
            ["R", "resistance, in ohms"],
            ["P", "power, in watts"]
          ],
          field: "Use this on a DC control circuit, a charger, or any resistor while the meter is on DC. Two of voltage, current, and resistance fix the third. Power is the heat that resistor has to shed.",
          example: "A DC coil measures 48 \u03a9 and draws 2.5 A.",
          steps: [
            "V = 2.5 A \u00d7 48 \u03a9 = 120 V.",
            "P = 120 V \u00d7 2.5 A = 300 W.",
            "Check with I\u00b2R. I\u00b2 = 2.5 \u00d7 2.5 = 6.25. Then 6.25 \u00d7 48 \u03a9 = 300 W. Same heat."
          ]
        },
        {
          title: "Percent accuracy",
          badge: "sheet",
          formulas: ["% accuracy = (actual \u2212 specified) / specified \u00d7 100"],
          variables: [
            ["actual", "the value you measured, in the same units as specified"],
            ["specified", "the setting, nameplate, or stated value"]
          ],
          field: "Use this when a measured pickup, time, voltage, or current has to be compared with a specified number in the same units. The sign is the direction of the miss: positive means actual came out higher than specified. Whether that percent is acceptable depends on the device. See the ATS table.",
          example: "A relay is specified to pick up at 5.00 A. It picks up at 5.15 A.",
          steps: [
            "Difference = 5.15 A \u2212 5.00 A = 0.15 A.",
            "0.15 / 5.00 = 0.030.",
            "0.030 \u00d7 100 = 3.00%. The pickup is 3.00% above the specified value."
          ]
        }
      ]
    },
    {
      id: "ac-volts",
      jump: "AC volts",
      title: "AC voltage and impedance",
      cards: [
        {
          title: "Peak voltage from rms",
          badge: "sheet",
          formulas: ["Vpeak = \u221a2 \u00d7 Vrms"],
          variables: [
            ["Vpeak", "crest voltage of a sine wave, in volts"],
            ["Vrms", "rms voltage, in volts"],
            ["\u221a2", "about 1.414. The square-root key is closer. Sine waves only."]
          ],
          field: "On a sine wave the crest is \u221a2 times the rms value. Use it when a peak reading, a scope shot, or a surge has to sit next to an rms nameplate or an rms test voltage. A waveform that is not a sine wave does not have this crest factor. The same \u221a2 converts rms current to peak current.",
          example: "A sine wave measures 120 V rms. Use 1.414 for \u221a2.",
          steps: [
            "1.414 \u00d7 120 V = 169.68 V.",
            "That rounds to 169.7 V peak. The square-root key on the calculator gives the same 169.7 V."
          ]
        },
        {
          title: "Line-to-line from line-to-neutral",
          badge: "sheet",
          formulas: ["VLL = \u221a3 \u00d7 VLN"],
          variables: [
            ["VLL", "voltage between two phase conductors, in volts"],
            ["VLN", "voltage from a phase conductor to neutral, in volts"],
            ["\u221a3", "about 1.732 on a balanced wye. These examples use 1.732."]
          ],
          field: "On a balanced wye, the voltage between phases is \u221a3 times the voltage from phase to neutral. Use it when the drawing says 208 V or 480 V and the meter is hooked from phase to neutral, or the other way around. It is the wye relationship, not a transformer turns ratio. A 208 V wye is about 120 V to neutral, and a 480 V wye is about 277 V to neutral.",
          example: "A balanced wye measures 120 V from line to neutral.",
          steps: [
            "VLL = 1.732 \u00d7 120 V = 207.84 V.",
            "That is 207.8 V, the line-to-line voltage of a 208 V wye."
          ]
        },
        {
          title: "Ohm's law with impedance",
          badge: "sheet",
          formulas: ["V = I \u00d7 Z"],
          variables: [
            ["V", "voltage across the branch, in volts"],
            ["I", "current through the branch, in amperes"],
            ["Z", "impedance, in ohms"]
          ],
          field: "This is Ohm's law when the opposition to AC current is impedance, not a pure resistance. Use it on a reactor, a transformer winding, or any series branch once Z is already in ohms.",
          example: "A reactor of 24 \u03a9 impedance carries 10 A.",
          steps: [
            "V = 10 A \u00d7 24 \u03a9 = 240 V across the reactor."
          ]
        }
      ]
    },
    {
      id: "reactance",
      jump: "Reactance",
      title: "Reactance and series impedance",
      cards: [
        {
          title: "Inductive reactance",
          badge: "sheet",
          formulas: ["XL = 2 \u00d7 \u03c0 \u00d7 f \u00d7 L"],
          variables: [
            ["XL", "inductive reactance, in ohms"],
            ["f", "frequency, in hertz"],
            ["L", "inductance, in henries, not millihenries"],
            ["\u03c0", "the pi key on the calculator, 3.1416 to four decimals"]
          ],
          field: "Inductive reactance is the ohms an inductor presents at one frequency. Convert millihenries to henries before you multiply. Use it for reactors and for the inductive side of an impedance triangle. Current lags voltage in an inductor. Leave the milli prefix on a 10 mH coil and the ohms come out about a thousand times high, near 3,770 \u03a9 instead of 3.77 \u03a9.",
          example: "A 10 mH inductor at 60 Hz. 10 mH is 0.010 H.",
          steps: [
            "2 \u00d7 \u03c0 \u00d7 60 = 376.99.",
            "XL = 376.99 \u00d7 0.010 H = 3.77 \u03a9."
          ]
        },
        {
          title: "Capacitive reactance",
          badge: "sheet",
          formulas: ["XC = 1 / (2 \u00d7 \u03c0 \u00d7 f \u00d7 C)"],
          variables: [
            ["XC", "capacitive reactance, in ohms"],
            ["f", "frequency, in hertz"],
            ["C", "capacitance, in farads. Microfarads means \u00d7 10\u207b\u2076."],
            ["\u03c0", "the pi key on the calculator"]
          ],
          field: "Capacitive reactance falls as frequency or capacitance rises. Use it for capacitor banks, surge capacitors, and the capacitive side of a cable or a filter. Current leads voltage in a capacitor.",
          example: "A 10 \u00b5F capacitor at 60 Hz. 10 \u00b5F is 0.000010 F.",
          steps: [
            "2 \u00d7 \u03c0 \u00d7 60 = 376.99.",
            "376.99 \u00d7 0.000010 F = 0.0037699.",
            "XC = 1 / 0.0037699 = 265.3 \u03a9, which is 265 \u03a9 to the nearest ohm."
          ]
        },
        {
          title: "Series impedance",
          badge: "sheet",
          formulas: ["Z = \u221a(R\u00b2 + (XL \u2212 XC)\u00b2)"],
          variables: [
            ["Z", "impedance of a series branch, in ohms"],
            ["R", "resistance, in ohms"],
            ["XL", "inductive reactance, in ohms"],
            ["XC", "capacitive reactance, in ohms"],
            ["XL \u2212 XC", "net reactance. Subtract. Do not add the two reactances."]
          ],
          field: "This builds the ohms of a series resistor, inductor, and capacitor that share one current. The sheet subtracts the reactances before the square. A positive net reactance is inductive. Use the result in V = IZ and in the power-factor ratio R/Z.",
          example: "R = 3 \u03a9, XL = 10 \u03a9, XC = 4 \u03a9, all in series.",
          steps: [
            "Net reactance = 10 \u03a9 \u2212 4 \u03a9 = 6 \u03a9. The branch is net inductive.",
            "R\u00b2 = 3\u00b2 = 9. Net reactance squared = 6\u00b2 = 36.",
            "9 + 36 = 45. Z = \u221a45 = 6.708 \u03a9, which is 6.71 \u03a9.",
            "Adding the three ohms, 3 + 10 + 4, gives 17 \u03a9. That is not Z."
          ]
        }
      ]
    },
    {
      id: "power",
      jump: "Power",
      title: "Single-phase power and power factor",
      cards: [
        {
          title: "AC power",
          badge: "sheet",
          formulas: ["P = V \u00d7 I \u00d7 cos \u03b8", "P = I\u00b2 \u00d7 R"],
          variables: [
            ["P", "real power, in watts"],
            ["V", "circuit voltage, in volts"],
            ["I", "current, in amperes"],
            ["\u03b8", "angle between voltage and current. cos \u03b8 is the power factor."],
            ["R", "resistance, in ohms. I\u00b2R is the heat in that resistance."]
          ],
          field: "Real watts in a single-phase AC circuit. The cosine drops the reactive part, so a large current at a poor power factor is not a large wattage. I\u00b2R is only the heat in the resistance. Use the pair to check a wattmeter against an ammeter on a heater or any single-phase load. Take the cosine in degrees.",
          example: "A single-phase load runs at 240 V and 12 A with a power factor of 0.80. The resistance in the circuit is 16 \u03a9.",
          steps: [
            "From voltage and current: P = 240 V \u00d7 12 A \u00d7 0.80 = 2,304 W.",
            "From current and resistance: 12\u00b2 = 144. Then 144 \u00d7 16 \u03a9 = 2,304 W.",
            "The two forms match. Z = 240 V / 12 A = 20 \u03a9, and R/Z = 16/20 = 0.80, which is the power factor used above."
          ]
        },
        {
          title: "Power factor identities",
          badge: "sheet",
          formulas: ["cos \u03b8 = R / Z = PF = W / VA = kW / kVA"],
          variables: [
            ["\u03b8", "angle between voltage and current"],
            ["R", "resistance, in ohms"],
            ["Z", "impedance, in ohms"],
            ["PF", "power factor, a decimal from 0 to 1 in these examples"],
            ["W", "watts, real power"],
            ["VA", "volt-amperes, apparent power"],
            ["kW and kVA", "the same two quantities in thousands"]
          ],
          field: "These are one ratio written five ways. R/Z comes from the impedance triangle. Watts over volt-amperes is what the meters say. kW over kVA is that ratio with the thousands already divided out. Use it to turn a watt reading and a volt-ampere reading into power factor, or to check a reported power factor against R and Z.",
          example: "A series branch has R = 3 \u03a9 and Z = 5 \u03a9. Current is 10 A.",
          steps: [
            "cos \u03b8 = R/Z = 3 \u03a9 / 5 \u03a9 = 0.60.",
            "V = I \u00d7 Z = 10 A \u00d7 5 \u03a9 = 50 V.",
            "VA = 50 V \u00d7 10 A = 500 VA = 0.500 kVA.",
            "W = I\u00b2 \u00d7 R = 100 \u00d7 3 \u03a9 = 300 W = 0.300 kW.",
            "PF = 300 W / 500 VA = 0.60.",
            "kW/kVA = 0.300 / 0.500 = 0.60. All five names are 0.60."
          ]
        }
      ]
    },
    {
      id: "three-phase",
      jump: "Three-phase",
      title: "Three-phase power and voltage unbalance",
      banner: "Memorize",
      cards: [
        {
          title: "Three-phase power",
          badge: "memorize",
          formulas: ["kVA = \u221a3 \u00d7 VLL \u00d7 I / 1000", "kW = kVA \u00d7 PF"],
          variables: [
            ["kVA", "three-phase apparent power"],
            ["kW", "three-phase real power"],
            ["VLL", "line-to-line voltage, in volts"],
            ["I", "line current, in amperes"],
            ["PF", "power factor as a decimal"],
            ["\u221a3", "1.732 in these examples, for a balanced load"]
          ],
          field: "Balanced three-phase apparent power, then real power once you know the power factor. The \u221a3 is required because line-to-line voltage is not the phase voltage. Use it for a load check from a clamp meter and a line-to-line voltage. Leave \u221a3 out and you report the single-phase product. When you only have kW and kVA, kvar is on the math study page.",
          example: "A balanced 480 V load draws 100 A. Power factor is 0.80. \u221a3 = 1.732.",
          steps: [
            "\u221a3 \u00d7 VLL = 1.732 \u00d7 480 V = 831.36.",
            "831.36 \u00d7 100 A = 83,136.",
            "kVA = 83,136 / 1,000 = 83.136 kVA.",
            "At a power factor of 1.00, kW equals that kVA: 83.136 kW, or 83.1 kW to one decimal.",
            "At 0.80 PF, kW = 83.136 \u00d7 0.80 = 66.5088 kW, which rounds to 66.509 kW.",
            "Drop \u221a3 and the unity-power-factor product is 480 \u00d7 100 / 1,000 = 48.0 kW. That is the single-phase figure, not the three-phase load."
          ]
        },
        {
          title: "Full-load current from kVA",
          badge: "memorize",
          formulas: ["IFL = (kVA \u00d7 1000) / (\u221a3 \u00d7 VLL)"],
          variables: [
            ["IFL", "full-load line current, in amperes"],
            ["kVA", "three-phase apparent power at the rated voltage"],
            ["VLL", "rated line-to-line voltage, in volts"],
            ["1000", "turns kVA into volt-amperes"],
            ["\u221a3", "1.732 here, for a balanced three-phase load"]
          ],
          field: "This is the three-phase kVA formula solved for current. Use it to turn a transformer nameplate into amperes before you talk about loading or about fault current.",
          example: "A 1,500 kVA transformer rated 480 V line-to-line. \u221a3 = 1.732.",
          steps: [
            "Volt-amperes = 1,500 kVA \u00d7 1,000 = 1,500,000 VA.",
            "\u221a3 \u00d7 VLL = 1.732 \u00d7 480 V = 831.36 V.",
            "IFL = 1,500,000 / 831.36 = 1,804.27 A.",
            "Check: 831.36 \u00d7 1,804 = 1,499,773.44. The remainder is 1,500,000 \u2212 1,499,773.44 = 226.56, and 226.56 / 831.36 = 0.2725. So 1,804.27 A, which is 1,804 A to the nearest ampere."
          ]
        },
        {
          title: "Voltage unbalance",
          badge: "memorize",
          formulas: ["% unbalance = (maximum deviation from the average / average) \u00d7 100"],
          variables: [
            ["average", "the sum of the three line-to-line voltages, divided by 3, in volts"],
            ["deviation", "how far one line-to-line voltage sits from that average, in volts. Use the absolute value."],
            ["maximum deviation", "the largest of those three gaps"]
          ],
          field: "Average the three line-to-line voltages, then see how far the worst one sits from that average. The percent is that gap divided by the average. This is the NEMA definition used on motor buses. It is not (highest \u2212 lowest) divided by the highest. If the equipment section states a limit, see the ATS table.",
          example: "Line-to-line readings are 478 V, 482 V, and 471 V.",
          steps: [
            "Sum = 478 + 482 + 471 = 1,431 V.",
            "Average = 1,431 / 3 = 477 V.",
            "Deviations: 478 \u2212 477 = 1 V, 482 \u2212 477 = 5 V, and 477 \u2212 471 = 6 V.",
            "The largest deviation is 6 V.",
            "6 / 477 \u00d7 100 = 1.258%, which rounds to 1.26%."
          ]
        }
      ]
    },
    {
      id: "transformers",
      jump: "Transformers",
      title: "Transformers",
      cards: [
        {
          title: "Turns ratio and current ratio",
          badge: "memorize",
          formulas: ["Vp / Vs = Np / Ns = Is / Ip"],
          variables: [
            ["Vp and Vs", "primary and secondary voltage, as a matching pair (line-to-line with line-to-line, or winding with winding)"],
            ["Np and Ns", "primary and secondary turns"],
            ["Ip and Is", "primary and secondary current, in amperes"],
            ["ratio", "the ideal-transformer ratio. Current sits in the opposite direction from voltage."]
          ],
          field: "On an ideal transformer the voltage ratio and the turns ratio are the same number, and the currents sit in the opposite ratio so both windings carry the same volt-amperes. The low-voltage winding carries the higher current. Use the voltage ratio as the calculated turns ratio for a TTR test, and the current ratio as a check on load amperes. Compare line-to-line with line-to-line. Mixing in a line-to-neutral voltage invents a \u221a3 the nameplate does not have.",
          example: "Nameplate 13,800 V to 480 V. Primary current is 10 A. Treat the transformer as ideal.",
          steps: [
            "480 \u00d7 28 = 13,440. The remainder is 13,800 \u2212 13,440 = 360. Then 360 / 480 = 0.75.",
            "Turns ratio = 13,800 / 480 = 28.75.",
            "Secondary current = 10 A \u00d7 28.75 = 287.5 A.",
            "Check the volt-amperes: 13,800 V \u00d7 10 A = 138,000 VA, and 138,000 / 480 V = 287.5 A."
          ]
        },
        {
          title: "Percent impedance and fault current",
          badge: "memorize",
          formulas: ["Zpu = %Z / 100", "Isc = IFL / Zpu"],
          variables: [
            ["%Z", "nameplate percent impedance"],
            ["Zpu", "that percent written as a decimal. 5.75% is 0.0575."],
            ["IFL", "full-load current at the voltage you are using, in amperes"],
            ["Isc", "approximate bolted-fault current, in amperes, from the transformer alone"]
          ],
          field: "Percent impedance is the percent of rated voltage that pushes full-load current through one winding with the other winding shorted. For a stiff source, ignoring the cable, available fault current is full-load current divided by that percent as a decimal. Use it as a quick estimate of what the transformer can feed into a bolted fault. It is not a coordination study. Divide by the decimal. Multiplying by the percent number, or dividing by the percent number, is the usual miss.",
          example: "The 1,500 kVA, 480 V transformer above, with IFL taken as 1,804 A, and a nameplate impedance of 5.75%.",
          steps: [
            "Zpu = 5.75 / 100 = 0.0575.",
            "Isc = 1,804 A / 0.0575 = 31,374 A.",
            "31,374 A = 31.4 kA to three figures.",
            "Check: 0.0575 \u00d7 31,374 = 1,804.005 A.",
            "Dividing by 5.75 instead gives 1,804 / 5.75 = 313.7 A. Multiplying by 5.75 gives 1,804 \u00d7 5.75 = 10,373 A, about 10.4 kA. Neither one is the fault current."
          ]
        },
        {
          title: "Turns-ratio percent error",
          badge: "memorize",
          formulas: ["% ratio error = (measured \u2212 calculated) / calculated \u00d7 100"],
          variables: [
            ["calculated", "the ratio you computed from the nameplate voltages"],
            ["measured", "the ratio the test set reported"]
          ],
          field: "Same percent-change shape as the accuracy formula on the sheet, used on a turns-ratio test. Calculated is the nameplate ratio. Measured is what the set reported. A small gap in the ratio can be a larger percent than it looks. Compare the percent with the allowance for that transformer. See the ATS table.",
          example: "Calculated ratio 28.75, from 13,800 V / 480 V. The set measures 28.95.",
          steps: [
            "Difference = 28.95 \u2212 28.75 = 0.20.",
            "0.20 / 28.75 = 0.0069565.",
            "0.0069565 \u00d7 100 = 0.69565%, which rounds to 0.696%, or 0.70% to two decimal places."
          ]
        }
      ]
    },
    {
      id: "cts",
      jump: "CTs",
      title: "Current transformers",
      cards: [
        {
          title: "CT ratio and secondary current",
          badge: "memorize",
          formulas: ["Is = Ip \u00d7 (rated secondary / rated primary)"],
          variables: [
            ["Ip", "primary current, in amperes"],
            ["Is", "secondary current, in amperes"],
            ["rated primary", "the nameplate primary, such as 600 in a 600:5"],
            ["rated secondary", "the nameplate secondary, usually 5 A or 1 A"]
          ],
          field: "Secondary current is primary current scaled by the nameplate ratio. A 600:5 has a ratio of 120, so you divide primary amperes by 120. Use it to predict the relay or meter reading during a primary injection or under a known load. Polarity is a separate check. The ratio arithmetic does not prove the polarity marks.",
          example: "A 600:5 CT with 240 A in the primary.",
          steps: [
            "Ratio = 600 / 5 = 120.",
            "Is = 240 A / 120 = 2.0 A.",
            "Check: 240 \u00d7 (5 / 600) = 1,200 / 600 = 2.0 A."
          ]
        }
      ]
    },
    {
      id: "motors",
      jump: "Motors",
      title: "Motors",
      cards: [
        {
          title: "Horsepower and motor full-load current",
          badge: "memorize",
          formulas: [
            "1 hp = 746 W",
            "I = (hp \u00d7 746) / (\u221a3 \u00d7 VLL \u00d7 efficiency \u00d7 PF)"
          ],
          variables: [
            ["hp", "shaft output, in horsepower. This is not watts drawn from the line."],
            ["746", "watts in one horsepower"],
            ["VLL", "line-to-line voltage, in volts"],
            ["efficiency", "output divided by input, as a decimal. 95% is 0.95."],
            ["PF", "power factor, as a decimal"],
            ["I", "line current, in amperes, for a three-phase motor"],
            ["\u221a3", "1.732 here. Drop it for a single-phase motor."]
          ],
          field: "Nameplate horsepower is shaft output. The line has to supply that output plus the losses, which is why efficiency is in the denominator, and it has to supply the reactive part, which is why power factor is there too. Use this for a three-phase motor when you have horsepower, voltage, efficiency, and power factor, and the ampere line of the nameplate is not in front of you. A single-phase motor uses the same relationship without the \u221a3.",
          example: "A three-phase motor, 25 hp, 460 V, efficiency 0.95, power factor 0.88. \u221a3 = 1.732.",
          steps: [
            "Shaft output = 25 \u00d7 746 = 18,650 W.",
            "Input power = 18,650 / 0.95 = 19,631.58 W. Check: 0.95 \u00d7 19,631.58 = 18,650.00 W.",
            "\u221a3 \u00d7 VLL = 1.732 \u00d7 460 = 796.72.",
            "796.72 \u00d7 0.88 = 701.1136, which is 701.11 to two decimals.",
            "I = 19,631.58 W / 701.11 V = 28.00 A.",
            "Check: 701.11 \u00d7 28.00 = 19,631.08 W, which is 0.50 W under the input, so the current is 28.00 A."
          ]
        }
      ]
    },
    {
      id: "insulation",
      jump: "Insulation",
      title: "Insulation",
      cards: [
        {
          title: "Polarization index and DAR",
          badge: "memorize",
          formulas: ["PI = R at 10 min / R at 1 min", "DAR = R at 60 s / R at 30 s"],
          variables: [
            ["PI", "polarization index, a ratio with no units"],
            ["DAR", "dielectric absorption ratio, a ratio with no units"],
            ["R", "insulation resistance from the same megohmmeter run, usually in megohms. The later reading is the numerator."]
          ],
          field: "Polarization index is the 10-minute insulation resistance divided by the 1-minute reading. Dielectric absorption ratio is the 60-second reading divided by the 30-second reading. Both come from one DC test, later reading on top. Use the ratio to see whether the insulation resistance is still climbing, which one spot reading does not show. Do not flip the fraction. What counts as acceptable depends on the equipment. See the ATS table.",
          example: "One winding reads 400 M\u03a9 at 1 minute and 1,000 M\u03a9 at 10 minutes. On a shorter test the same winding reads 160 M\u03a9 at 30 seconds and 200 M\u03a9 at 60 seconds.",
          steps: [
            "PI = 1,000 M\u03a9 / 400 M\u03a9 = 2.50.",
            "DAR = 200 M\u03a9 / 160 M\u03a9 = 1.25.",
            "Flipped, those ratios would be 0.40 and 0.80. That puts the earlier reading on top, which is the wrong direction."
          ]
        },
        {
          title: "Insulation resistance and temperature",
          badge: "memorize",
          thumb: true,
          formulas: ["Rule of thumb: \u00d7 2 for each 10 \u00b0C cooler", "Rule of thumb: \u00d7 1/2 for each 10 \u00b0C hotter"],
          variables: [
            ["10 \u00b0C", "one step of insulation temperature, not a winding-resistance correction"],
            ["\u00d7 2 or \u00d7 1/2", "the rough change in megohms for that step. This is a rule of thumb, not a table factor."]
          ],
          field: "This is a rule of thumb, not a number from the standard. Insulation resistance falls as the insulation gets hotter: about half for each 10 \u00b0C rise, and about double for each 10 \u00b0C drop. Use it to judge whether a megohm change is about temperature or about the insulation. It is not exact, and it is not the same factor for oil, solid insulation, and machines. When the report needs a corrected value, use the correction tables in the standard. See the ATS table. Do not put a megohmmeter reading through the copper formula. Hotter insulation reads lower megohms, which is the opposite of a copper winding.",
          example: "A winding reads 800 M\u03a9 at 40 \u00b0C. Estimate the 20 \u00b0C value with the rule of thumb only.",
          steps: [
            "From 40 \u00b0C to 30 \u00b0C is one step cooler, so double: 800 M\u03a9 \u00d7 2 = 1,600 M\u03a9.",
            "From 30 \u00b0C to 20 \u00b0C is a second step, so double again: 1,600 M\u03a9 \u00d7 2 = 3,200 M\u03a9.",
            "The other way, a reading taken 10 \u00b0C hotter than 40 \u00b0C would be about half of 800 M\u03a9, or 400 M\u03a9, by this same rule of thumb.",
            "For a report, replace this estimate with the factor in the standard's correction table."
          ]
        },
        {
          title: "Percent power factor and dissipation factor",
          badge: "memorize",
          formulas: [
            "%PF = (W / (V \u00d7 I)) \u00d7 100",
            "PF = cos \u03b8 = sin \u03b4",
            "DF = tan \u03b4 = PF / \u221a(1 \u2212 PF\u00b2)"
          ],
          variables: [
            ["%PF", "insulation power factor, in percent"],
            ["W", "watts measured by the test set"],
            ["V", "test voltage, in volts"],
            ["I", "test current, in amperes"],
            ["\u03b8", "angle between the test voltage and the current"],
            ["\u03b4", "loss angle, the complement of \u03b8, so \u03b4 = 90\u00b0 \u2212 \u03b8"],
            ["DF", "dissipation factor, tan \u03b4. In the square-root line, PF is the decimal, not the percent."]
          ],
          field: "Percent power factor is real watts divided by volt-amperes, times 100. Dissipation factor is the tangent of the loss angle. On a good specimen both percents are small and nearly the same number. Use them on an insulation power-factor set and on a tan-delta cable set. Liquid-filled results get a temperature correction before a comparison, and that factor is a table. See the ATS table. A tan-delta figure published in thousandths is not already a percent.",
          example: "Drill numbers, chosen so the square root is obvious, not a specimen you would accept: 10,000 V, 0.00300 A, and 6.00 W.",
          steps: [
            "Volt-amperes = 10,000 V \u00d7 0.00300 A = 30.0 VA.",
            "PF = 6.00 W / 30.0 VA = 0.200.",
            "%PF = 0.200 \u00d7 100 = 20.0%.",
            "PF\u00b2 = 0.040, so 1 \u2212 PF\u00b2 = 0.960, and \u221a0.960 = 0.9798.",
            "DF = 0.200 / 0.9798 = 0.2041, which is 20.4%.",
            "At a field-sized decimal the gap closes. PF = 0.005 gives DF = 0.005 / \u221a(1 \u2212 0.000025) = 0.005000, so both are 0.500%."
          ]
        }
      ]
    },
    {
      id: "temperature",
      jump: "Temperature",
      title: "Temperature",
      cards: [
        {
          title: "Winding resistance temperature correction",
          badge: "memorize",
          formulas: [
            "Copper: R2 = R1 \u00d7 (234.5 + T2) / (234.5 + T1)",
            "Aluminum: R2 = R1 \u00d7 (225 + T2) / (225 + T1)"
          ],
          variables: [
            ["R1", "resistance you measured, in ohms"],
            ["T1", "temperature of that measurement, in \u00b0C"],
            ["R2", "resistance corrected to T2, in ohms"],
            ["T2", "temperature you are correcting to, in \u00b0C"],
            ["234.5", "copper constant, in \u00b0C"],
            ["225", "aluminum constant, in \u00b0C"]
          ],
          field: "Copper and aluminum resistance rise almost in a straight line with temperature. Correct the field ohms to the temperature of the number you are comparing them with, or a cold winding looks low and a hot winding looks high. Both temperatures are Celsius. Use this on transformer, motor, and coil winding-resistance tests. It corrects the metal. It does not correct insulation resistance.",
          example: "A copper winding measures 0.420 \u03a9 at 25 \u00b0C. Correct it to 75 \u00b0C. Then repeat the same two temperatures with the aluminum constant.",
          steps: [
            "Copper, new temperature: 234.5 + 75 = 309.5.",
            "Copper, measured temperature: 234.5 + 25 = 259.5.",
            "0.420 \u03a9 \u00d7 309.5 = 129.99.",
            "129.99 / 259.5 = 0.5009 \u03a9, which rounds to 0.501 \u03a9.",
            "Flip the fraction and the correction runs the wrong way: 0.420 \u00d7 259.5 = 108.99, and 108.99 / 309.5 = 0.3521, which is 0.352 \u03a9. A hot winding should read higher, not lower.",
            "Aluminum, same temperatures: (225 + 75) / (225 + 25) = 300 / 250 = 1.200.",
            "0.420 \u03a9 \u00d7 1.200 = 0.504 \u03a9."
          ]
        },
        {
          title: "Celsius, Fahrenheit, and a temperature rise",
          badge: "memorize",
          formulas: [
            "\u00b0F = (\u00b0C \u00d7 1.8) + 32",
            "\u00b0C = (\u00b0F \u2212 32) / 1.8",
            "\u0394\u00b0F = \u0394\u00b0C \u00d7 1.8",
            "\u0394\u00b0C = \u0394\u00b0F / 1.8"
          ],
          variables: [
            ["\u00b0C and \u00b0F", "a temperature, which has a zero point"],
            ["\u0394\u00b0C and \u0394\u00b0F", "a rise or a difference, which does not"],
            ["1.8", "the size of one Celsius degree in Fahrenheit degrees. 9/5 = 1.8."],
            ["32", "the offset between the two zero points. It belongs on a temperature. It does not belong on a rise."]
          ],
          field: "A temperature and a temperature rise convert differently. The 32 degree offset is the gap between the two zero points. A rise has no zero point, so the offset drops out and only the 1.8 scale factor remains. Going the other way, a rise in Fahrenheit divides by 1.8 and still does not use 32. Use this on infrared rises and on winding-temperature rises. Adding 32 to a rise turns it into a temperature and makes a mild rise look severe. If a limit is in play, see the ATS table.",
          example: "A reference point is 25 \u00b0C. A connection beside it runs 10 \u00b0C hotter.",
          steps: [
            "The reference as a temperature: 25 \u00d7 1.8 = 45, and 45 + 32 = 77 \u00b0F.",
            "Check the other direction: (77 \u2212 32) / 1.8 = 45 / 1.8 = 25 \u00b0C.",
            "A rise of 25 \u00b0C would be 25 \u00d7 1.8 = 45 \u00b0F, not 77 \u00b0F. The +32 is not part of a rise.",
            "The connection's rise is 10 \u00b0C. In Fahrenheit that rise is 10 \u00d7 1.8 = 18 \u00b0F.",
            "Treating the 10 \u00b0C rise as a temperature instead: 10 \u00d7 1.8 + 32 = 50 \u00b0F. That 50 \u00b0F is not the rise."
          ]
        }
      ]
    },
    {
      id: "cables",
      jump: "Cables",
      title: "Cables and hipot charging current",
      cards: [
        {
          title: "Capacitive charging current",
          badge: "memorize",
          formulas: ["Ic = 2 \u00d7 \u03c0 \u00d7 f \u00d7 C \u00d7 V"],
          variables: [
            ["Ic", "charging current, in amperes, for a sine wave"],
            ["f", "test frequency, in hertz"],
            ["C", "capacitance of the specimen, in farads"],
            ["V", "test voltage, in volts rms, for a sine wave"],
            ["\u03c0", "the pi key on the calculator"]
          ],
          field: "A capacitor on a sine wave draws current equal to 2\u03c0fCV. A cable or a bus under an AC hipot is that capacitor, from the conductor to the shield or to ground. Use it to see the current the test set has to supply, and to tell charging current from a fault. Current is proportional to frequency, so the same cable at 0.1 Hz draws far less than it does at 60 Hz. The formula is for a sine wave. The voltage you are allowed to apply is in the ATS table.",
          example: "One conductor, 0.50 \u00b5F to the shield, energized at 10,000 V sine wave. 0.50 \u00b5F is 0.00000050 F. The 10,000 V is drill arithmetic, not a test voltage from a table.",
          steps: [
            "At 60 Hz, 2 \u00d7 \u03c0 \u00d7 60 = 376.99.",
            "376.99 \u00d7 0.00000050 F = 0.000188495.",
            "0.000188495 \u00d7 10,000 V = 1.885 A.",
            "0.1 Hz is 60 / 0.1 = 600 times lower in frequency.",
            "1.885 A / 600 = 0.003142 A, which is 3.14 mA. Same cable, same voltage, milliamperes instead of amperes."
          ]
        }
      ]
    }
  ];

  function paragraphs(h, text) {
    return h("p", {}, text);
  }

  function renderCard(h, card) {
    var badges = [
      h("span", { class: "math-badge " + (card.badge === "sheet" ? "sheet" : "mem") },
        card.badge === "sheet" ? "ON NETA SHEET" : "MEMORIZE")
    ];
    if (card.thumb) badges.push(h("span", { class: "math-badge thumb" }, "RULE OF THUMB"));

    return h("article", { class: "panel formula" },
      h("div", { class: "formula-head" },
        h("h3", {}, card.title),
        h("div", { class: "math-badges" }, badges)
      ),
      card.formulas.map(function (line) { return h("p", { class: "eq" }, line); }),
      h("h4", {}, "Variables"),
      h("ul", { class: "vars" }, card.variables.map(function (pair) {
        return h("li", {}, h("b", {}, pair[0]), " \u2014 " + pair[1]);
      })),
      h("h4", {}, "In the field"),
      paragraphs(h, card.field),
      h("h4", {}, "Worked example"),
      h("p", { class: "example" }, card.example),
      h("ol", { class: "steps" }, card.steps.map(function (step) {
        return h("li", {}, step);
      }))
    );
  }

  function mount(app, h) {
    var jump = h("nav", { class: "math-jump", "aria-label": "Cheat sheet sections" },
      SECTIONS.map(function (sec) {
        return h("button", {
          type: "button",
          class: "btn small",
          onclick: function () {
            var node = document.getElementById(sec.id);
            if (node) node.scrollIntoView({ block: "start" });
          }
        }, sec.jump);
      })
    );

    app.append(
      h("p", { class: "kicker" }, "Formula sheet \u00b7 March 2020"),
      h("h1", {}, "Math cheat sheet"),
      h("p", { class: "lede" }, "The certification exam shows a formula sheet on screen. These badges follow the Formulae Sheet dated March 2020. ON NETA SHEET is printed for you. MEMORIZE is the set you have to remember."),
      h("div", { class: "math-legend" },
        h("span", { class: "math-badge sheet" }, "ON NETA SHEET"),
        h("span", { class: "math-badge mem" }, "MEMORIZE")
      ),
      h("p", {}, "Each card has the formula, what the letters mean, when a field tester uses it, and one worked example. The numbers are drill arithmetic. This page does not set pass/fail limits. Where a limit exists, see the ATS table for the equipment in front of you."),
      h("p", {}, "Longer notes, including kvar and the parallel-resistor recipe, are on the math study page. Confirm what your sitting shows on NETA\u2019s exam-preparation page. The on-screen calculator is a TI-30XS. Set it to degrees before a cosine. These examples use \u221a3 = 1.732."),
      h("div", { class: "math-links" },
        h("a", { class: "btn primary", href: "#/study/math.md" }, "Math study page"),
        h("a", {
          class: "btn ghost",
          href: "https://www.netaworld.org/accreditation/exam-preparation",
          target: "_blank",
          rel: "noopener noreferrer"
        }, "NETA exam preparation")
      ),
      jump
    );

    SECTIONS.forEach(function (sec) {
      var blockKids = [];
      if (sec.banner) blockKids.push(h("p", { class: "kicker math-banner" }, sec.banner));
      var section = h("section", { class: "math-sec", id: sec.id },
        blockKids,
        h("h2", {}, sec.title)
      );
      sec.cards.forEach(function (card) { section.append(renderCard(h, card)); });
      app.append(section);
    });

    app.append(
      h("p", { class: "math-end" },
        h("button", {
          type: "button",
          class: "btn small",
          onclick: function () { window.scrollTo(0, 0); }
        }, "Back to top")
      )
    );
  }

  global.NetaMath = { mount: mount };
})(window);
