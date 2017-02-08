import { SchenckPortalPage } from './app.po';

describe('schenck-portal App', function() {
  let page: SchenckPortalPage;

  beforeEach(() => {
    page = new SchenckPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
