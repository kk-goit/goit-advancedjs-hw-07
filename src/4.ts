
interface IKey { 
  getSignature(): number;
}

export class Key implements IKey { 
  private readonly signature: number;

  constructor() { 
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

interface IPerson {
  getKey(): IKey;
}

export class Person implements IPerson {
  constructor(private key: IKey) { }

  getKey(): IKey {
    return this.key
  }
}

abstract class House {
  private tenants: IPerson[] = [];
  protected door: boolean = false;

  constructor(protected key: IKey) { }

  comeIn(person: IPerson): void {
    if (this.door) { 
      console.log("The new tenants entered");
      this.tenants.push(person);
      this.door = false;
    }
    else
      console.log("The Door is closed, you can not come in")
  }

  abstract openDoor(key: IKey): boolean;
}

export class MyHouse extends House { 
  openDoor(key: IKey): boolean {
    if (this.key.getSignature() == key.getSignature()) { 
      this.door = true;
      console.log("The Door is opened");
    } else {
      this.door = false;
      console.log("The Door is still closed")
    }
    return this.door;
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

const key2 = new Key();
const person2 = new Person(key2);

house.openDoor(person2.getKey());

house.comeIn(person2);

export { };