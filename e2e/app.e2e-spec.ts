import { NgFeaturesPage } from './app.po';

describe('ng-features App', () => {
  let page: NgFeaturesPage;

  beforeEach(() => {
    page = new NgFeaturesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
