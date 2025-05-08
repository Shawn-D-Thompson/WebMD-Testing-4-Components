import pillTools from '../pageobjects/pillIdentifierTools.js'

describe('Pill Identifier Tests', () => {
    
  beforeEach(async () => {
      await pillTools.openPillIdentifier();
  });

  it('Testing all shapes in filter', async () => {
      await pillTools.testShapes();
  });

  it('Testing all colors in filter', async () => {
      await pillTools.testColors();
  });

  it('Testing only side 1 with Text Filter', async () => {
    const text1 = 'APO';
    await pillTools.testTextInput(text1);
  });

  it('Testing both side 1 & 2 with Text Filter', async () => {
      const text1 = 'APO';
      const text2 = 'BU75';
      await pillTools.testTextInput(text1, text2);
  });


});

