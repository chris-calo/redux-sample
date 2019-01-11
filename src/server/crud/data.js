const dateFactory = (days = 0) => {
  const ago = new Date();

  // initialize new date to 12:00, for consistency's sake
  const base = new Date(ago.setDate(ago.getDate() - days));
  base.setHours(12, 0, 0, 0);

  return base;
};

const calorieData = {
  title: "Calories Burned",
  data: [
    [ dateFactory(30),  839 ],
    [ dateFactory(29),  755 ],
    [ dateFactory(27),  272 ],
    [ dateFactory(27),  971 ],
    [ dateFactory(26),  171 ],
    [ dateFactory(25),  102 ],
    [ dateFactory(24),  612 ],
    [ dateFactory(23),  322 ],
    [ dateFactory(22),  832 ],
    [ dateFactory(21),  558 ],
    [ dateFactory(20),  758 ],
    [ dateFactory(19),  178 ],
    [ dateFactory(18),  194 ],
    [ dateFactory(17),  794 ],
    [ dateFactory(16),  497 ],
    [ dateFactory(15),  347 ],
    [ dateFactory(14),  554 ],
    [ dateFactory(13),  224 ],
    [ dateFactory(12),  678 ],
    [ dateFactory(11),  738 ],
    [ dateFactory(10),  100 ],
    [ dateFactory(9),   180 ],
    [ dateFactory(8),   550 ],
    [ dateFactory(7),   430 ],
    [ dateFactory(6),   650 ],
    [ dateFactory(5),   500 ],
  ]
};

const distanceData = {
  title: "Total Distance",
  data: [
    [ dateFactory(42),  "Louisville, KY, USA",      280 ],
    [ dateFactory(41),  "Scranton, PA, USA",        90  ],
    [ dateFactory(40),  "Detroit, MI, USA",         520 ],
    [ dateFactory(39),  "Indianapolis, IN, USA",    770 ],
    [ dateFactory(38),  "Omaha, NE, USA",           420 ],
    [ dateFactory(37),  "New Orleans, LA, USA",     510 ],
    [ dateFactory(36),  "Atlanta, OK, USA",         730 ],
    [ dateFactory(35),  "Nashville, TN, USA",       520 ],
    [ dateFactory(34),  "Cincinati, OH, USA",       110 ],
    [ dateFactory(33),  "Antelope, OR, USA",        990 ],
    [ dateFactory(32),  "Norwich, VT, USA",         390 ],
    [ dateFactory(31),  "Manchester, NH, USA",      260 ],
    [ dateFactory(30),  "Dallas, TX, USA",          910 ],
    [ dateFactory(29),  "SantaFe, NM, USA",         530 ],
    [ dateFactory(28),  "Denver, CO, USA",          810 ],
    [ dateFactory(27),  "Rochester, MN, USA",       390 ],
    [ dateFactory(26),  "Jersey City, NJ, USA",     210 ],
    [ dateFactory(25),  "Reno, NV, USA",            880 ],
    [ dateFactory(24),  "Salt Lake City, UT, USA",  690 ],
    [ dateFactory(23),  "Kansas City, MO, USA",     310 ],
    [ dateFactory(22),  "Greenbay, WI, USA",        440 ],
    [ dateFactory(21),  "Jackson, MS, USA",         350 ],
    [ dateFactory(20),  "Pheonix, AZ, USA",         820 ],
    [ dateFactory(19),  "Billings, MT, USA",        130 ],
    [ dateFactory(18),  "Tulsa, OK, USA",           220 ],
    [ dateFactory(17),  "Richmond, VA, USA",        440 ],
    [ dateFactory(16),  "Jacksonville, FL, USA",    330 ],
    [ dateFactory(15),  "Charlotte, NC, USA",       620 ],
    [ dateFactory(14),  "Chicago, IL, USA",         870 ],
    [ dateFactory(13),  "Seattle, WA, USA",         470 ],
    [ dateFactory(12),  "Houston, TX, USA",         360 ],
    [ dateFactory(11),  "Bangkok, TH",              270 ],
    [ dateFactory(10),  "Boston, MA, USA",          180 ],
    [ dateFactory(9),   "Berlin, DE",               550 ],
    [ dateFactory(8),   "Toronto, CA",              430 ],
    [ dateFactory(7),   "Irvine, CA, USA",          650 ],
    [ dateFactory(6),   "Portland, OR, USA",        500 ],
    [ dateFactory(5),   "Miami, FL, USA",           600 ],
  ]
};

const watchData = {
  title: "Stream Usage",
  headings: [
      "Locations",           "Total usage",   "Average TTFB"
  ],
  data: [
    [ "Boston, MA, USA",        480234123,                30 ],
    [ "Berlin, DE",             543411398,                61 ],
    [ "Toronto, CA, USA",       123587612,                44 ],
    [ "Irvine, CA, USA",        823451994,                39 ],
    [ "Portland, OR, USA",       12388349,                22 ],
    [ "Miami, FL, USA",         123987724,                58 ],
    [ "Moscow, RU,",              1238760,                70 ],
    [ "Dublin, IRE",             98734183,                38 ],
    [ "Cape Town, ZA",              72895,                47 ],
    [ "El Paso, TX, USA",         4789863,                61 ],
  ],
};

export { dateFactory, calorieData, distanceData, watchData };
