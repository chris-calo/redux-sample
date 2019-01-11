import calorieCRUD from './calorie';
import { dateFactory, calorieData } from './data';

const crud = calorieCRUD;

describe('calorieCRUD.validate', () => {
  it("should ensure existence of required input properties", () => {
    const inputA = { daysAgo: 0, calories: 5 };
    const inputB = { daysAgo: 0 };
    const inputC = { calories: 0 };
    const inputD = { daysAgo: 5, calories: 100 };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);
    const outputD = crud.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'calories' value "undefined"`;
    const msgC = `ERROR: invalid 'daysAgo' value "undefined"`;
    const msgD = `OK: valid`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure daysAgo is a valid Number", () => {
    const inputA = { daysAgo: 0, calories: 5 };
    const inputB = { daysAgo: null, calories: 5 };
    const inputC = { daysAgo: "test", calories: 5 };
    const inputD = { calories: 5 };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);
    const outputD = crud.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'daysAgo' value "null"`;
    const msgC = `ERROR: invalid 'daysAgo' value "test"`;
    const msgD = `ERROR: invalid 'daysAgo' value "undefined"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure calories is a valid Number", () => {
    const inputA = { daysAgo: 0, calories: 5 };
    const inputB = { daysAgo: 0, calories: null };
    const inputC = { daysAgo: 0, calories: "test" };
    const inputD = { daysAgo: 0 };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);
    const outputD = crud.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'calories' value "null"`;
    const msgC = `ERROR: invalid 'calories' value "test"`;
    const msgD = `ERROR: invalid 'calories' value "undefined"`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });
});

describe('calorieCRUD.create', () => {
  it("should validate the input object", () => {
    const inputA = { daysAgo: 0, calories: 5 };
    const inputB = { daysAgo: null, calories: 5 };
    const inputC = { daysAgo: "test", calories: 5 };
    const inputD = { calories: 5 };

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);
    const outputD = crud.create(inputD);

    const indexA = calorieData.data.length - 1;

    const msgA = `OK: inserted row with ID ${indexA}`;
    const msgB = `ERROR: invalid 'daysAgo' value "null"`;
    const msgC = `ERROR: invalid 'daysAgo' value "test"`;
    const msgD = `ERROR: invalid 'daysAgo' value "undefined"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should insert new rows, if valid", () => {
    const inputA = { daysAgo: 1, calories: 5 };
    const inputB = { daysAgo: 2, calories: 300 };
    const inputC = { daysAgo: 3, calories: 1234567890 };

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);

    const indexA = calorieData.data.length - 3;
    const indexB = calorieData.data.length - 2;
    const indexC = calorieData.data.length - 1;

    const msgA = `OK: inserted row with ID ${indexA}`;
    const msgB = `OK: inserted row with ID ${indexB}`;
    const msgC = `OK: inserted row with ID ${indexC}`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should fail if daysAgo element already exists", () => {
    const inputA = { daysAgo: 5, calories: 5 };
    const inputB = { daysAgo: 6, calories: 300 };
    const inputC = { daysAgo: 7, calories: 1234567890 };

    const indexA = calorieData.data.findIndex(
      d => d[0].toString() === dateFactory(inputA.daysAgo).toString()
    );
    const indexB = calorieData.data.findIndex(
      d => d[0].toString() === dateFactory(inputB.daysAgo).toString()
    );
    const indexC = calorieData.data.findIndex(
      d => d[0].toString() === dateFactory(inputC.daysAgo).toString()
    );

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);

    const msgA = `ERROR: failed to create; row with daysAgo ` +
      `value "${inputA.daysAgo}" already exists at index "${indexA}"`;
    const msgB = `ERROR: failed to create; row with daysAgo ` +
      `value "${inputB.daysAgo}" already exists at index "${indexB}"`;
    const msgC = `ERROR: failed to create; row with daysAgo ` +
      `value "${inputC.daysAgo}" already exists at index "${indexC}"`;

    expect(outputA.ok).toBeFalsy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });
});

describe('calorieCRUD.read', () => {
  it("should handle ID-based requests", () => {
    const inputA = 0;
    const inputB = 1;
    const inputC = 2;
    const inputD = 3;

    const outputTitle = "Calories Burned";
    const outputA = crud.read(inputA);
    const outputB = crud.read(inputB);
    const outputC = crud.read(inputC);
    const outputD = crud.read(inputD);

    const msgA = `OK: row "${inputA}" requested`;
    const msgB = `OK: row "${inputB}" requested`;
    const msgC = `OK: row "${inputC}" requested`;
    const msgD = `OK: row "${inputD}" requested`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([[ dateFactory(30),  839 ]]);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect(outputB.title).toBe(outputTitle);
    expect(outputB.data).toEqual([[ dateFactory(29),  755 ]]);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect(outputC.title).toBe(outputTitle);
    expect(outputC.data).toEqual([[ dateFactory(27),  272 ]]);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect(outputD.title).toBe(outputTitle);
    expect(outputD.data).toEqual([[ dateFactory(27),  971 ]]);
  });

  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = 0;
    const inputB = null;
    const inputC = "test";

    const outputTitle = "Calories Burned";
    const outputA = crud.read(inputA);
    const outputB = crud.read(inputB);
    const outputC = crud.read(inputC);

    const msgA = `OK: row "${inputA}" requested`;
    const msgB = `ERROR: item with ID "null" does not exist`;
    const msgC = `ERROR: item with ID "test" does not exist`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([[ dateFactory(30),  839 ]]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should provide an option to return all items", () => {
    const outputLengthMin = 10
    const outputTitle = "Calories Burned";
    const output = crud.read(-1, true);

    const msgA = `OK: all rows requested`;

    expect(output.ok).toBeTruthy();
    expect(output.msg).toBe(msgA);
    expect(output.title).toBe(outputTitle);
    expect(output.data.length).toBeGreaterThanOrEqual(outputLengthMin);
  });
});

describe('calorieCRUD.update', () => {
  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = [ 0, { daysAgo: 30, calories: 5 } ];
    const inputB = [ null, { daysAgo: 30, calories: 5 } ];
    const inputC = [ "test", { daysAgo: 30, calories: 5 } ];

    const outputTitle = "Calories Burned";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `ERROR: item with ID "null" does not exist`;
    const msgC = `ERROR: item with ID "test" does not exist`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([[ dateFactory(30), 5 ]]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should validate the input object", () => {
    const inputA = [ 0, { daysAgo: 30, calories: 5 } ];
    const inputB = [ 0, { daysAgo: 30, calories: null } ];
    const inputC = [ 0, { daysAgo: 30, calories: "test" } ];
    const inputD = [ 0, { daysAgo: 30 } ];

    const outputTitle = "Calories Burned";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);
    const outputD = crud.update(...inputD);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `ERROR: invalid 'calories' value "null"`;
    const msgC = `ERROR: invalid 'calories' value "test"`;
    const msgD = `ERROR: invalid 'calories' value "undefined"`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([[ dateFactory(30), 5 ]]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should update the object at a valid row", () => {
    const inputA = [ 0, { daysAgo: 30, calories: 10 } ];
    const inputB = [ 1, { daysAgo: 29, calories: 10 } ];
    const inputC = [ 2, { daysAgo: 28, calories: 10 } ];
    const inputD = [ 3, { daysAgo: 27, calories: 10 } ];

    const outputTitle = "Calories Burned";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);
    const outputD = crud.update(...inputD);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `OK: row "${inputB[0]}" updated`;
    const msgC = `OK: row "${inputC[0]}" updated`;
    const msgD = `OK: row "${inputD[0]}" updated`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([[ dateFactory(30), 10 ]]);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect(outputB.title).toBe(outputTitle);
    expect(outputB.data).toEqual([[ dateFactory(29), 10 ]]);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect(outputC.title).toBe(outputTitle);
    expect(outputC.data).toEqual([[ dateFactory(28), 10 ]]);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect(outputD.title).toBe(outputTitle);
    expect(outputD.data).toEqual([[ dateFactory(27), 10 ]]);
  });
});

describe('calorieCRUD.delete', () => {
  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = 0;
    const inputB = null;
    const inputC = "test";

    const tempA = JSON.parse(JSON.stringify(calorieData.data[0]));

    const outputA = crud.destroy(inputA);
    const outputB = crud.destroy(inputB);
    const outputC = crud.destroy(inputC);

    const msgA = `OK: row "${inputA}" deleted`;
    const msgB = `ERROR: item with ID "null" does not exist`;
    const msgC = `ERROR: item with ID "test" does not exist`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect([JSON.parse(JSON.stringify(outputA.data[0]))]).toEqual([tempA]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should delete the object at the valid row", () => {
    const tempA = JSON.parse(JSON.stringify(calorieData.data[0]));
    const tempB = JSON.parse(JSON.stringify(calorieData.data[1]));
    const tempC = JSON.parse(JSON.stringify(calorieData.data[2]));
    const tempD = JSON.parse(JSON.stringify(calorieData.data[3]));

    const outputA = crud.destroy(0);
    const outputB = crud.destroy(0);
    const outputC = crud.destroy(0);
    const outputD = crud.destroy(0);

    const msgA = `OK: row "0" deleted`;
    const msgB = `OK: row "0" deleted`;
    const msgC = `OK: row "0" deleted`;
    const msgD = `OK: row "0" deleted`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect([JSON.parse(JSON.stringify(outputA.data[0]))]).toEqual([tempA]);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect([JSON.parse(JSON.stringify(outputB.data[0]))]).toEqual([tempB]);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect([JSON.parse(JSON.stringify(outputC.data[0]))]).toEqual([tempC]);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect([JSON.parse(JSON.stringify(outputD.data[0]))]).toEqual([tempD]);
  });
});
