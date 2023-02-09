if (!self.__DIP) self.__DIP={};

self.__DIP.config = {
  prefix: '/usedservice/fip/',
  encoding: 'xor',
  ws: true,
  cookies: true,
  worker: true,
  bare: {
    version: 2,
    path: '/bare/',
  },
  tab: {
    title: 'Francium→',
    icon: 'https://google.com/favicon.ico',
    ua: 'Mozilla/5.0 (X11; CrOS x86_64 14388.61.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.107 Safari/537.36'
  }
};
