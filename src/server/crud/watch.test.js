import watchCRUD from './watch';
import { dateFactory, watchData } from './data';

const crud = watchCRUD;

describe('watchCRUD.validate', () => {
  it("should ensure existence of required input properties", () => {
    const inputA = { location: "Antelope, OR", usageMS: 1000, ttfbMS: 5 };
    const inputB = { location: "Antelope, OR", usageMS: 1000 };
    const inputC = { usageMS: 1000, ttfbMS: 5 };
    const inputD = { ttfbMS: 5, location: "Antelope, OR" };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);
    const outputD = crud.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'ttfbMS' value "undefined"`;
    const msgC = `ERROR: invalid 'location' value "undefined"`;
    const msgD = `ERROR: invalid 'usageMS' value "undefined"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure location is a valid String", () => {
    const inputA = { location: "Antelope, OR", usageMS: 1000, ttfbMS: 5 };
    const inputB = { location: null, usageMS: 1000, ttfbMS: 5 };
    const inputC = { location: 123, usageMS: 1000, ttfbMS: 5 };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'location' value "null"`;
    const msgC = `ERROR: invalid 'location' value "123"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should ensure usageMS is a valid Number", () => {
    const inputA = { location: "Antelope, OR", usageMS: 1000, ttfbMS: 5 };
    const inputB = { location: "Antelope, OR", usageMS: null, ttfbMS: 5 };
    const inputC = { location: "Antelope, OR", usageMS: "test",ttfbMS: 5 };

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'usageMS' value "null"`;
    const msgC = `ERROR: invalid 'usageMS' value "test"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should ensure ttfbMS is a valid Number", () => {
    const inputA = { location: "Antelope, OR", usageMS: 1000, ttfbMS: 5 };
    const inputB = { location: "Antelope, OR", usageMS: 1000,ttfbMS:null };
    const inputC = { location: "Antelope, OR", usageMS:1000,ttfbMS:"test"};

    const outputA = crud.validate(inputA);
    const outputB = crud.validate(inputB);
    const outputC = crud.validate(inputC);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'ttfbMS' value "null"`;
    const msgC = `ERROR: invalid 'ttfbMS' value "test"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });
});

describe('watchCRUD.create', () => {
  it("should validate the input object", () => {
    const inputA = { location: "Antelope, OR", usageMS: 1000, ttfbMS: 5 };
    const inputB = { location: null, usageMS: 1000, ttfbMS: 5 };
    const inputC = { location: 123, usageMS: 1000, ttfbMS: 5 };
    const inputD = { usageMS: 1000, ttfbMS: 5 };

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);
    const outputD = crud.create(inputD);

    const indexA = watchData.data.length - 1;

    const msgA = `OK: inserted row with ID ${indexA}`;
    const msgB = `ERROR: invalid 'location' value "null"`;
    const msgC = `ERROR: invalid 'location' value "123"`;
    const msgD = `ERROR: invalid 'location' value "undefined"`;
    
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
    const inputA = { location: "Salem, OR", usageMS: 15, ttfbMS: 15 };
    const inputB = { location: "Fairbanks, AK", usageMS: 200, ttfbMS: 200 };
    const inputC = { location: "Dallas, TX", usageMS: 1000, ttfbMS: 1000 };

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);

    const indexA = watchData.data.length - 3;
    const indexB = watchData.data.length - 2;
    const indexC = watchData.data.length - 1;

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

  it("should fail if location element already exists", () => {
    const inputA = { location: "Antelope, OR", usageMS: 15, ttfbMS: 15 };
    const inputB = { location: "Fairbanks, AK", usageMS: 200, ttfbMS: 200 };
    const inputC = { location: "Dallas, TX", usageMS: 1000, ttfbMS: 1000 };

    const indexA = watchData.data.findIndex(
      d => d[0] === inputA.location
    );
    const indexB = watchData.data.findIndex(
      d => d[0] === inputB.location
    );
    const indexC = watchData.data.findIndex(
      d => d[0] === inputC.location
    );

    const outputA = crud.create(inputA);
    const outputB = crud.create(inputB);
    const outputC = crud.create(inputC);

    const msgA = `ERROR: failed to create; row with location ` +
      `value "${inputA.location}" already exists at index "${indexA}"`;
    const msgB = `ERROR: failed to create; row with location ` +
      `value "${inputB.location}" already exists at index "${indexB}"`;
    const msgC = `ERROR: failed to create; row with location ` +
      `value "${inputC.location}" already exists at index "${indexC}"`;

    expect(outputA.ok).toBeFalsy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });
});

describe('watchCRUD.read', () => {
  it("should handle ID-based requests", () => {
    const inputA = 0;
    const inputB = 1;
    const inputC = 2;
    const inputD = 3;

    const outputTitle = "Stream Usage";
    const outputA = crud.read(inputA);
    const outputB = crud.read(inputB);
    const outputC = crud.read(inputC);
    const outputD = crud.read(inputD);

    const msgA = `OK: row "${inputA}" requested`;
    const msgB = `OK: row "${inputB}" requested`;
    const msgC = `OK: row "${inputC}" requested`;
    const msgD = `OK: row "${inputD}" requested`;

    const dataA = [ "Boston, MA, USA", 480234123, 30 ];
    const dataB = [ "Berlin, DE", 543411398, 61 ];
    const dataC = [ "Toronto, CA, USA", 123587612, 44 ];
    const dataD = [ "Irvine, CA, USA", 823451994, 39 ];

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([dataA]);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect(outputB.title).toBe(outputTitle);
    expect(outputB.data).toEqual([dataB]);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect(outputC.title).toBe(outputTitle);
    expect(outputC.data).toEqual([dataC]);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect(outputD.title).toBe(outputTitle);
    expect(outputD.data).toEqual([dataD]);
  });

  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = 0;
    const inputB = null;
    const inputC = "test";

    const outputTitle = "Stream Usage";
    const outputA = crud.read(inputA);
    const outputB = crud.read(inputB);
    const outputC = crud.read(inputC);

    const msgA = `OK: row "${inputA}" requested`;
    const msgB = `ERROR: item with ID "null" does not exist`;
    const msgC = `ERROR: item with ID "test" does not exist`;

    const dataA = [ "Boston, MA, USA", 480234123, 30 ];

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([dataA]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should provide an option to return all items", () => {
    const outputLengthMin = 10
    const outputTitle = "Stream Usage";
    const output = crud.read(-1, true);

    const msgA = `OK: all rows requested`;

    expect(output.ok).toBeTruthy();
    expect(output.msg).toBe(msgA);
    expect(output.title).toBe(outputTitle);
    expect(output.data.length).toBeGreaterThanOrEqual(outputLengthMin);
  });
});

describe('watchCRUD.update', () => {
  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputB = [
      null, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputC = [
      "test", {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];

    const outputTitle = "Stream Usage";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `ERROR: item with ID "null" does not exist`;
    const msgC = `ERROR: item with ID "test" does not exist`;

    const dataA = [ "Antelope, OR", 1000, 5 ];

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([dataA]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should validate the input object", () => {
    const inputA = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputB = [
      0, {
        location: null,
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputC = [
      0, {
        location: 123,
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputD = [
      0, {
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];

    const outputTitle = "Stream Usage";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `ERROR: invalid 'location' value "null"`;
    const msgC = `ERROR: invalid 'location' value "123"`;
    const msgD = `ERROR: invalid 'location' value "undefined"`;

    const dataA = [ "Antelope, OR", 1000, 5 ];

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([dataA]);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);
  });

  it("should update the object at a valid row", () => {
    const inputA = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputB = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputC = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];
    const inputD = [
      0, {
        location: "Antelope, OR",
        usageMS: 1000,
        ttfbMS: 5,
      }
    ];

    const outputTitle = "Stream Usage";
    const outputA = crud.update(...inputA);
    const outputB = crud.update(...inputB);
    const outputC = crud.update(...inputC);
    const outputD = crud.update(...inputD);

    const msgA = `OK: row "${inputA[0]}" updated`;
    const msgB = `OK: row "${inputB[0]}" updated`;
    const msgC = `OK: row "${inputC[0]}" updated`;
    const msgD = `OK: row "${inputD[0]}" updated`;

    const dataA = [ "Antelope, OR", 1000, 5 ];
    const dataB = [ "Antelope, OR", 1000, 5 ];
    const dataC = [ "Antelope, OR", 1000, 5 ];
    const dataD = [ "Antelope, OR", 1000, 5 ];

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);
    expect(outputA.title).toBe(outputTitle);
    expect(outputA.data).toEqual([dataA]);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect(outputB.title).toBe(outputTitle);
    expect(outputB.data).toEqual([dataB]);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect(outputC.title).toBe(outputTitle);
    expect(outputC.data).toEqual([dataC]);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect(outputD.title).toBe(outputTitle);
    expect(outputD.data).toEqual([dataD]);
  });
});

describe('watchCRUD.delete', () => {
  it("should ensure the received ID is a valid row identifier", () => {
    const inputA = 0;
    const inputB = null;
    const inputC = "test";

    const tempA = JSON.parse(JSON.stringify(watchData.data[0]));

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
    const tempA = JSON.parse(JSON.stringify(watchData.data[0]));
    const tempB = JSON.parse(JSON.stringify(watchData.data[1]));
    const tempC = JSON.parse(JSON.stringify(watchData.data[2]));
    const tempD = JSON.parse(JSON.stringify(watchData.data[3]));

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
