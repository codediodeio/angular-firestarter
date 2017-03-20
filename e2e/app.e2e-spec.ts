import { FirestarterPage } from './app.po';

describe('firestarter App', () => {
  let page: FirestarterPage;

  beforeEach(() => {
    page = new FirestarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
