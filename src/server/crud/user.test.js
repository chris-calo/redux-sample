import { expiresTime, userOps } from './user';
import { dateFactory } from './data';

const ops = userOps;

describe('userOps.validate', () => {
  it("should ensure existence of required input properties", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      email: "jdoe@gmail.com",
      password: "321bca",
    };
    const inputC = {
      lastName: "Calo",
      email: "ccalo@vulcanca.com",
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      password: "∂∆º∆AK1§",
    };
    const inputE = {
      firstName: "Danielle",
      lastName: "Calo",
      email: "dcalo@vulcanca.com",
    };

    const outputA = ops.validate(inputA);
    const outputB = ops.validate(inputB);
    const outputC = ops.validate(inputC);
    const outputD = ops.validate(inputD);
    const outputE = ops.validate(inputE);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'lastName' value "undefined"`;
    const msgC = `ERROR: invalid 'firstName' value "undefined"`;
    const msgD = `ERROR: invalid 'email' value "undefined"`;
    const msgE = `ERROR: invalid 'password' value "undefined"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);

    expect(outputE.ok).toBeFalsy();
    expect(outputE.msg).toBe(msgE);
  });

  it("should ensure firstName is a valid String", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: null,
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: "321bca",
    };
    const inputC = {
      firstName: 123,
      lastName: "Calo",
      email: "ccalo@vulcanca.com",
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      lastName: "Renalds",
      email: "drenalds@vulcanca.com",
      password: "∂∆º∆AK1§",
    };

    const outputA = ops.validate(inputA);
    const outputB = ops.validate(inputB);
    const outputC = ops.validate(inputC);
    const outputD = ops.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'firstName' value "null"`;
    const msgC = `ERROR: invalid 'firstName' value "123"`;
    const msgD = `ERROR: invalid 'firstName' value "undefined"`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure lastName is a valid String", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: null,
      email: "jdoe@gmail.com",
      password: "321bca",
    };
    const inputC = {
      firstName: "Chris",
      lastName: 123,
      email: "ccalo@vulcanca.com",
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      email: "drenalds@vulcanca.com",
      password: "∂∆º∆AK1§",
    };

    const outputA = ops.validate(inputA);
    const outputB = ops.validate(inputB);
    const outputC = ops.validate(inputC);
    const outputD = ops.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'lastName' value "null"`;
    const msgC = `ERROR: invalid 'lastName' value "123"`;
    const msgD = `ERROR: invalid 'lastName' value "undefined"`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure email is a valid email", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: null,
      password: "321bca",
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: 123,
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      password: "∂∆º∆AK1§",
    };

    const outputA = ops.validate(inputA);
    const outputB = ops.validate(inputB);
    const outputC = ops.validate(inputC);
    const outputD = ops.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'email' value "null"`;
    const msgC = `ERROR: invalid 'email' value "123"`;
    const msgD = `ERROR: invalid 'email' value "undefined"`;

    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should ensure password is a valid String", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: null,
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: "ccalo@vulcanca.com",
      password: 123,
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      email: "drenalds@vulcanca.com",
    };

    const outputA = ops.validate(inputA);
    const outputB = ops.validate(inputB);
    const outputC = ops.validate(inputC);
    const outputD = ops.validate(inputD);

    const msgA = `OK: valid`;
    const msgB = `ERROR: invalid 'password' value "null"`;
    const msgC = `ERROR: invalid 'password' value "123"`;
    const msgD = `ERROR: invalid 'password' value "undefined"`;

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

describe('userOps.create', () => {
  it("should validate the input object", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: null,
      password: "321bca",
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: 123,
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      password: "∂∆º∆AK1§",
    };

    const outputA = ops.create(inputA);
    const outputB = ops.create(inputB);
    const outputC = ops.create(inputC);
    const outputD = ops.create(inputD);

    const msgA = `OK: inserted row with email "${inputA.email}"`;
    const msgB = `ERROR: invalid 'email' value "null"`;
    const msgC = `ERROR: invalid 'email' value "123"`;
    const msgD = `ERROR: invalid 'email' value "undefined"`;
    
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
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "johnathan.doe@gmail.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@email.com",
      password: "321bca",
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: "chriscalo@vulcanca.com",
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      email: "danielrenalds@vulcanca.com",
      password: "∂∆º∆AK1§",
    };

    const outputA = ops.create(inputA);
    const outputB = ops.create(inputB);
    const outputC = ops.create(inputC);
    const outputD = ops.create(inputD);

    const indexA = userOps.data.length - 4;
    const indexB = userOps.data.length - 3;
    const indexC = userOps.data.length - 2;
    const indexD = userOps.data.length - 1;

    const msgA = `OK: inserted row with email "${inputA.email}"`;
    const msgB = `OK: inserted row with email "${inputB.email}"`;
    const msgC = `OK: inserted row with email "${inputC.email}"`;
    const msgD = `OK: inserted row with email "${inputD.email}"`;
    
    expect(outputA.ok).toBeTruthy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should fail if email element already exists", () => {
    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "johnathan.doe@gmail.com",
      password: "abc123",
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@email.com",
      password: "321bca",
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: "chriscalo@vulcanca.com",
      password: "§!§vi≠(nsdfjkdsf)!",
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      email: "danielrenalds@vulcanca.com",
      password: "∂∆º∆AK1§",
    };

    const indexA = userOps.data.findIndex(
      d => d.email === inputA.email
    );
    const indexB = userOps.data.findIndex(
      d => d.email === inputB.email
    );
    const indexC = userOps.data.findIndex(
      d => d.email === inputC.email
    );
    const indexD = userOps.data.findIndex(
      d => d.email === inputD.email
    );

    const outputA = userOps.create(inputA);
    const outputB = userOps.create(inputB);
    const outputC = userOps.create(inputC);
    const outputD = userOps.create(inputD);

    const msgA = `ERROR: failed to create; row with email ` +
      `value "${inputA.email}" already exists at index "${indexA}"`;
    const msgB = `ERROR: failed to create; row with email ` +
      `value "${inputB.email}" already exists at index "${indexB}"`;
    const msgC = `ERROR: failed to create; row with email ` +
      `value "${inputC.email}" already exists at index "${indexC}"`;
    const msgD = `ERROR: failed to create; row with email ` +
      `value "${inputD.email}" already exists at index "${indexD}"`;

    expect(outputA.ok).toBeFalsy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });
});

describe('userOps.sessions', () => {
  it("should validate the input object", () => {
    const inputA = {
      email: "john.doe@email.com",
    };
    const inputB = {
      email: null,
    };
    const inputC = {
      email: 123,
    };
    const inputD = {
    };

    const outputA = userOps.extendSession(inputA);
    const outputB = userOps.extendSession(inputB);
    const outputC = userOps.extendSession(inputC);
    const outputD = userOps.extendSession(inputD);

    const msgA = `ERROR: Unable to validate user authentication token`;
    const msgB = `ERROR: User with email "null" does not exist`;
    const msgC = `ERROR: User with email "123" does not exist`;
    const msgD = `ERROR: User with email "undefined" does not exist`;

    expect(outputA.ok).toBeFalsy();
    expect(outputA.msg).toBe(msgA);

    expect(outputB.ok).toBeFalsy();
    expect(outputB.msg).toBe(msgB);

    expect(outputC.ok).toBeFalsy();
    expect(outputC.msg).toBe(msgC);

    expect(outputD.ok).toBeFalsy();
    expect(outputD.msg).toBe(msgD);
  });

  it("should increase the session length, if possible", () => {
    const timeInA = dateFactory(0);
    const timeInB = dateFactory(0);
    const timeInC = dateFactory(0);
    const timeInD = dateFactory(0);

    const timeOutA = expiresTime(new Date(timeInA.getTime()));
    const timeOutB = expiresTime(new Date(timeInB.getTime()));
    const timeOutC = expiresTime(new Date(timeInC.getTime()));
    const timeOutD = expiresTime(new Date(timeInD.getTime()));

    const inputA = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@email.com",
      password: "abc123",
      sessionExpires: timeInA,
    };
    const inputB = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: "def456",
      sessionExpires: timeInB,
    };
    const inputC = {
      firstName: "Chris",
      lastName: "Calo",
      email: "ccalo@vulcanca.com",
      password: "321cba",
      sessionExpires: timeInC,
    };
    const inputD = {
      firstName: "Dan",
      lastName: "Renalds",
      email: "drenalds@vulcanca.com",
      password: "654fed",
      sessionExpires: timeInD,
    };

    // ensure data exists
    const tempUserA = userOps.create(inputA);
    const tempUserB = userOps.create(inputB);
    const tempUserC = userOps.create(inputC);
    const tempUserD = userOps.create(inputD);

    const sessionA = userOps.createSession(inputA).data[0];
    const sessionB = userOps.createSession(inputB).data[0];
    const sessionC = userOps.createSession(inputC).data[0];
    const sessionD = userOps.createSession(inputD).data[0];

    const outputA = userOps.extendSession(sessionA, inputA.sessionExpires);
    const outputB = userOps.extendSession(sessionB, inputB.sessionExpires);
    const outputC = userOps.extendSession(sessionC, inputC.sessionExpires);
    const outputD = userOps.extendSession(sessionD, inputD.sessionExpires);

    const msgA = `OK: extended session of user "${inputA.email}"`;
    const msgB = `OK: extended session of user "${inputB.email}"`;
    const msgC = `OK: extended session of user "${inputC.email}"`;
    const msgD = `OK: extended session of user "${inputD.email}"`;

    expect(outputA.msg).toBe(msgA);
    expect(outputA.ok).toBeTruthy();
    expect((new Date(outputA.data[0].sessionExpires)).getTime())
    .toBe(timeOutA.getTime());

    expect(outputB.ok).toBeTruthy();
    expect(outputB.msg).toBe(msgB);
    expect((new Date(outputB.data[0].sessionExpires)).getTime())
    .toBe(timeOutB.getTime());

    expect(outputC.ok).toBeTruthy();
    expect(outputC.msg).toBe(msgC);
    expect((new Date(outputC.data[0].sessionExpires)).getTime())
    .toBe(timeOutC.getTime());

    expect(outputD.ok).toBeTruthy();
    expect(outputD.msg).toBe(msgD);
    expect((new Date(outputD.data[0].sessionExpires)).getTime())
    .toBe(timeOutD.getTime());
  });
});
