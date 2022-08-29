import PAGES from './pages';

const TOP_BAR_MENUS = [
  {
    id: 'HOME',
    url: PAGES.HOME.url,
    text: PAGES.HOME.title,
  },
  {
    id: 'ABOUT',
    url: PAGES.ABOUT.url,
    text: PAGES.ABOUT.title,
  },
  {
    id: 'VAULT',
    url: PAGES.VAULT.url,
    text: PAGES.VAULT.title,
  },
  {
    id: 'MARKETPLACE',
    url: PAGES.MARKETPLACE.url,
    text: PAGES.MARKETPLACE.title,
  },
  {
    id: 'ACCOUNT',
    url: PAGES.ACCOUNT.url,
    text: PAGES.ACCOUNT.title,
    authOnly: true,
  },
  {
    id: 'MINT',
    url: PAGES.MINT.url,
    text: PAGES.MINT.title,
    minterOnly: true,
  },
  {
    id: 'ADMIN',
    url: PAGES.ADMIN.url,
    text: PAGES.ADMIN.title,
    ownerOnly: true,
  },
  // TODO: removed profile page for temp
  // {
  //   id: 'PROFILE',
  //   url: PAGES.PROFILE.url,
  //   text: PAGES.PROFILE.title,
  //   authOnly: true,
  // },
];

const MOBILE_MENUS = [
  {
    id: 'HOME',
    url: PAGES.HOME.url,
    text: PAGES.HOME.title,
  },
  {
    id: 'ABOUT',
    url: PAGES.ABOUT.url,
    text: PAGES.ABOUT.title,
  },
  {
    id: 'VAULT',
    url: PAGES.VAULT.url,
    text: PAGES.VAULT.title,
  },
  {
    id: 'MARKETPLACE',
    url: PAGES.MARKETPLACE.url,
    text: PAGES.MARKETPLACE.title,
  },
  {
    id: 'ACCOUNT',
    url: PAGES.ACCOUNT.url,
    text: PAGES.ACCOUNT.title,
  },
  {
    id: 'MINT',
    url: PAGES.MINT.url,
    text: PAGES.MINT.title,
    minterOnly: true,
  },
  {
    id: 'ADMIN',
    url: PAGES.ADMIN.url,
    text: PAGES.ADMIN.title,
    ownerOnly: true,
  },
  // {
  //   id: 'PROFILE',
  //   url: PAGES.PROFILE.url,
  //   text: PAGES.PROFILE.title,
  //   authOnly: true,
  // },
];

export { TOP_BAR_MENUS, MOBILE_MENUS };
