import * as readline from 'readline';

enum IceCreamIngredients {
  SmallCone = 10,
  BigCone = 25,
  Chocolate = 5,
  Caramel = 6,
  Berries = 10,
  Marshmallow = 5,
}

import ICI = IceCreamIngredients;
type ICIKey = keyof typeof ICI;

type Cone = ('BigCone' | 'SmallCone') & ICIKey;

function isCone(value: string): value is Cone {
  const validCones: Cone[] = ['BigCone', 'SmallCone'];
  return validCones.some((cone) => cone === value);
}

type Filling = ('Chocolate' | 'Caramel' | 'Berries') & ICIKey;

function isFilling(value: string): value is Filling {
  const validFillings: Filling[] = ['Chocolate', 'Caramel', 'Berries'];
  return validFillings.some((filling) => filling === value);
}

type Marshmallow = 'Marshmallow' & ICIKey;

interface IIceCream {
  cone: Cone | null;
  fillings: Array<Filling> | null;
  marshmallow: Marshmallow | null;
}

export function iceCream() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const iceCream: IIceCream = {
    cone: null,
    fillings: null,
    marshmallow: null,
  };

  const prompts = [
    'Choose your cone type (BigCone/SmallCone): ',
    `Choose your fillings (space-separated, like 'Chocolate Berries'): `,
    'Do you want marshmallow on top? (y/n): ',
  ];

  function printPriceBoard() {
    console.log('Ice Cream Price Board:');
    console.log('----------------------');

    Object.entries(IceCreamIngredients)
      .filter(([key]) => isNaN(Number(key)))
      .forEach(([item, price]) => {
        console.log(`${item.padEnd(15)} $${price}`);
      });
  }

  printPriceBoard();

  function askQuestion(index: number) {
    rl.question(prompts[index], (rawAnswer) => {
      const answer = rawAnswer.trim();

      switch (index) {
        case 0:
          if (isCone(answer)) {
            iceCream.cone = answer;
            askQuestion(1);
          } else {
            console.log('Invalid cone type. Please try again.');
            askQuestion(0);
          }
          break;
        case 1:
          const fillings = answer.split(' ').map((f) => f.trim());
          const validFillings = fillings.filter(isFilling);
          if (validFillings.length > 0) {
            iceCream.fillings = validFillings;
            askQuestion(2);
          } else {
            console.log('No valid fillings. Please try again.');
            askQuestion(1);
          }
          break;
        case 2:
          if (answer === 'y') {
            iceCream.marshmallow = 'Marshmallow';
            finalResult();
          } else if (answer === 'n') {
            iceCream.marshmallow = null;
            finalResult();
          } else {
            console.log('Invalid input. Please enter y or n.');
            askQuestion(2);
          }
          break;
      }
    });
  }

  function finalResult() {
    console.log('Your final ice cream:', iceCream);
    const totalPrice =
      (iceCream.cone ? ICI[iceCream.cone] : 0) +
      (iceCream.fillings
        ? iceCream.fillings.reduce((acc, cur) => acc + ICI[cur], 0)
        : 0) +
      (iceCream.marshmallow ? ICI[iceCream.marshmallow] : 0);
    console.log(`Total price: $${totalPrice}`);
    rl.close();
  }

  askQuestion(0);
}
