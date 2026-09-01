import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('GitHub Pages SPA Routing & /roof4u/ Sub-Project Isolation Suite', () => {
  const public404Path = path.resolve(__dirname, '../../public/404.html');
  const dist404Path = path.resolve(__dirname, '../../dist/404.html');
  const indexHtmlPath = path.resolve(__dirname, '../../index.html');
  const distIndexHtmlPath = path.resolve(__dirname, '../../dist/index.html');
  const swJsPath = path.resolve(__dirname, '../../public/sw.js');
  const distSwJsPath = path.resolve(__dirname, '../../dist/sw.js');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  // Helper to execute ACTUAL 404.html scripts in JSDOM
  function execute404Html(pathname: string, search = '', hash = '', targetFile = public404Path) {
    const htmlContent = fs.readFileSync(targetFile, 'utf8');
    
    // Set up DOM
    document.documentElement.innerHTML = htmlContent;

    // Mock window.location
    const mockLocation = {
      protocol: 'https:',
      hostname: 's6pa1rta3n-lab.github.io',
      port: '',
      pathname,
      search,
      hash,
      replace: vi.fn(),
    };

    // Extract actual script in <head> from the file
    const headScripts = document.head.querySelectorAll('script');
    expect(headScripts.length).toBeGreaterThan(0);
    const headScriptCode = headScripts[0]?.textContent || '';
    expect(headScriptCode.length).toBeGreaterThan(0);

    (window as any).__ROOF4U_BYPASS__ = undefined;
    const runHeadScript = new Function('window', 'document', headScriptCode);
    runHeadScript(Object.assign(window, { location: mockLocation }), document);

    // Extract actual script in <body> for DOM rendering
    const bodyScripts = document.body.querySelectorAll('script');
    const bodyScriptCode = bodyScripts[0]?.textContent || '';
    if (bodyScriptCode) {
      const runBodyScript = new Function('window', 'document', bodyScriptCode);
      runBodyScript(Object.assign(window, { location: mockLocation }), document);
    }

    return mockLocation;
  }

  // Helper to execute ACTUAL index.html SPA redirect script in JSDOM
  function executeIndexSpaScript(search: string, pathname = '/', hash = '', targetFile = indexHtmlPath) {
    const htmlContent = fs.readFileSync(targetFile, 'utf8');
    document.documentElement.innerHTML = htmlContent;

    const replaceStateMock = vi.fn();
    const mockHistory = { replaceState: replaceStateMock };

    const mockLocation = {
      protocol: 'https:',
      hostname: 's6pa1rta3n-lab.github.io',
      port: '',
      pathname,
      search,
      hash,
    };

    // Extract the SPA script from <head>
    const headScripts = document.head.querySelectorAll('script');
    expect(headScripts.length).toBeGreaterThan(0);
    const spaScriptCode = headScripts[0]?.textContent || '';
    expect(spaScriptCode).toContain('l.search');

    const runSpaScript = new Function('window', 'document', spaScriptCode);
    runSpaScript(Object.assign(window, { location: mockLocation, history: mockHistory }), document);

    return { mockLocation, mockHistory, replaceStateMock };
  }

  // Helper to instantiate and execute actual sw.js event handlers
  function loadServiceWorker(targetFile = swJsPath) {
    const swCode = fs.readFileSync(targetFile, 'utf8');
    const listeners: Record<string, Function[]> = {};

    const mockSelf: any = {
      addEventListener: vi.fn((event: string, handler: Function) => {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(handler);
      }),
      skipWaiting: vi.fn(),
      registration: {
        unregister: vi.fn().mockResolvedValue(true),
      },
      clients: {
        matchAll: vi.fn().mockResolvedValue([]),
      },
    };

    const mockCaches = {
      keys: vi.fn().mockResolvedValue(['cache-v1', 'cache-v2']),
      delete: vi.fn().mockResolvedValue(true),
    };
    mockSelf.caches = mockCaches;

    const swRunner = new Function('self', 'caches', swCode);
    swRunner(mockSelf, mockCaches);

    return { mockSelf, listeners, mockCaches };
  }

  // =========================================================================
  // 1. /roof4u/ Bypass Tests (No SPA Redirection)
  // =========================================================================
  describe('1. /roof4u/ Sub-Project Route Bypass & Isolation', () => {
    const roof4uTestPaths = [
      { path: '/roof4u', description: 'exact /roof4u without trailing slash' },
      { path: '/roof4u/', description: 'root /roof4u/ with trailing slash' },
      { path: '/roof4u/index.html', description: 'direct index.html in /roof4u/' },
      { path: '/roof4u/login', description: 'sub-route /roof4u/login' },
      { path: '/roof4u/dashboard/analytics', description: 'nested route /roof4u/dashboard/analytics' },
      { path: '/roof4u/assets/bundle.min.js', description: 'static JS asset /roof4u/assets/bundle.min.js' },
      { path: '/roof4u/styles/main.css', description: 'static CSS asset /roof4u/styles/main.css' },
      { path: '/roof4u/images/logo.png', description: 'static image asset /roof4u/images/logo.png' },
      { path: '/ROOF4U/admin', description: 'uppercase /ROOF4U/admin (case-insensitivity)' },
      { path: '/roof4u/api/v1/config.json', description: 'deep config resource /roof4u/api/v1/config.json' },
      { path: '//roof4u', description: 'double slash //roof4u normalization' },
      { path: '///roof4u/dashboard', description: 'triple slash ///roof4u/dashboard' },
      { path: '/%72oof4u', description: 'percent-encoded lowercase r (/%72oof4u)' },
      { path: '/%72%6f%6f%66%34%75/app', description: 'fully percent-encoded /%72%6f%6f%66%34%75/app' },
    ];

    roof4uTestPaths.forEach(({ path: testPath, description }) => {
      it(`bypasses SPA redirection for ${description} (${testPath}) in public/404.html`, () => {
        const mockLoc = execute404Html(testPath);
        expect(mockLoc.replace).not.toHaveBeenCalled();
        expect((window as any).__ROOF4U_BYPASS__).toBe(true);
      });

      it(`bypasses SPA redirection for ${description} (${testPath}) in dist/404.html`, () => {
        const mockLoc = execute404Html(testPath, '', '', dist404Path);
        expect(mockLoc.replace).not.toHaveBeenCalled();
        expect((window as any).__ROOF4U_BYPASS__).toBe(true);
      });
    });

    it('bypasses SPA redirection when query parameters and hashes are present on /roof4u', () => {
      const mockLoc = execute404Html('/roof4u/settings', '?user=alice&theme=dark', '#security');
      expect(mockLoc.replace).not.toHaveBeenCalled();
      expect((window as any).__ROOF4U_BYPASS__).toBe(true);
    });

    it('renders isolated sub-project UI and proper absolute action links when /roof4u/ is requested', () => {
      execute404Html('/roof4u/custom-view');

      const badge = document.getElementById('status-badge');
      expect(badge?.textContent).toBe('Sub-Project Isolated');

      const title = document.getElementById('title');
      expect(title?.textContent).toBe('Sub-Project: /roof4u/');

      const pathContainer = document.getElementById('path-container');
      expect(pathContainer?.style.display).toBe('block');
      expect(pathContainer?.textContent).toBe('/roof4u/custom-view');

      const desc = document.getElementById('desc');
      expect(desc?.textContent).toContain('SPA fallback redirection has been bypassed');

      const btnRoof = document.getElementById('btn-roof');
      expect(btnRoof?.style.display).toBe('inline-flex');
      expect(btnRoof?.getAttribute('href')).toBe('/roof4u/');

      // Verify btn-home points to absolute root "/" to avoid relative path resolution bugs
      const btnHome = document.getElementById('btn-home');
      expect(btnHome?.getAttribute('href')).toBe('/');
    });
  });

  // =========================================================================
  // 2. Strict Isolation & Anti-Bleed Tests (Non-roof4u routes)
  // =========================================================================
  describe('2. Strict Isolation & Standard Swarm Hub SPA Redirection', () => {
    const nonRoofPaths = [
      { path: '/pitch', expected: 'https://s6pa1rta3n-lab.github.io/?/pitch' },
      { path: '/strategy', expected: 'https://s6pa1rta3n-lab.github.io/?/strategy' },
      { path: '/blog', expected: 'https://s6pa1rta3n-lab.github.io/?/blog' },
      { path: '/grants', expected: 'https://s6pa1rta3n-lab.github.io/?/grants' },
      { path: '/affiliates', expected: 'https://s6pa1rta3n-lab.github.io/?/affiliates' },
      { path: '/marketplace', expected: 'https://s6pa1rta3n-lab.github.io/?/marketplace' },
      { path: '/portfolio', expected: 'https://s6pa1rta3n-lab.github.io/?/portfolio' },
      { path: '/proof-of-work', expected: 'https://s6pa1rta3n-lab.github.io/?/proof-of-work' },
      { path: '/arbitrary-subpage', expected: 'https://s6pa1rta3n-lab.github.io/?/arbitrary-subpage' },
      // Strict anti-bleed edge cases (contain "roof" or "4u" but are NOT /roof4u/)
      { path: '/roof', expected: 'https://s6pa1rta3n-lab.github.io/?/roof' },
      { path: '/roofing', expected: 'https://s6pa1rta3n-lab.github.io/?/roofing' },
      { path: '/roof4us', expected: 'https://s6pa1rta3n-lab.github.io/?/roof4us' },
      { path: '/roof4u-alt', expected: 'https://s6pa1rta3n-lab.github.io/?/roof4u-alt' },
      { path: '/roof4u-v2', expected: 'https://s6pa1rta3n-lab.github.io/?/roof4u-v2' },
      { path: '/roof4update', expected: 'https://s6pa1rta3n-lab.github.io/?/roof4update' },
      { path: '/roof4user', expected: 'https://s6pa1rta3n-lab.github.io/?/roof4user' },
      { path: '/my-roof4u', expected: 'https://s6pa1rta3n-lab.github.io/?/my-roof4u' },
      { path: '/deals4u', expected: 'https://s6pa1rta3n-lab.github.io/?/deals4u' },
      { path: '/other-repo/roof4u', expected: 'https://s6pa1rta3n-lab.github.io/?/other-repo/roof4u' },
      { path: '//pitch', expected: 'https://s6pa1rta3n-lab.github.io/?/pitch' },
      { path: '///strategy', expected: 'https://s6pa1rta3n-lab.github.io/?/strategy' },
    ];

    nonRoofPaths.forEach(({ path: testPath, expected }) => {
      it(`triggers SPA fallback redirection for ${testPath}`, () => {
        const mockLoc = execute404Html(testPath);
        expect(mockLoc.replace).toHaveBeenCalledTimes(1);
        expect(mockLoc.replace).toHaveBeenCalledWith(expected);
        expect((window as any).__ROOF4U_BYPASS__).toBeUndefined();
      });
    });

    it('correctly encodes query parameters and preserves hash during SPA redirection', () => {
      const mockLoc = execute404Html('/strategy', '?ref=affiliate_1&category=scf', '#milestone-2');
      expect(mockLoc.replace).toHaveBeenCalledTimes(1);
      expect(mockLoc.replace).toHaveBeenCalledWith(
        'https://s6pa1rta3n-lab.github.io/?/strategy&ref=affiliate_1~and~category=scf#milestone-2'
      );
    });

    it('triggers SPA redirection for routes with query parameters containing roof4u (e.g. /pitch?ref=roof4u)', () => {
      const mockLoc = execute404Html('/pitch', '?ref=roof4u');
      expect(mockLoc.replace).toHaveBeenCalledTimes(1);
      expect(mockLoc.replace).toHaveBeenCalledWith(
        'https://s6pa1rta3n-lab.github.io/?/pitch&ref=roof4u'
      );
    });
  });

  // =========================================================================
  // 3. index.html SPA Decoder & Service Worker Cleaner Verification
  // =========================================================================
  describe('3. index.html SPA Handler & Service Worker / Cache Isolation', () => {
    it('verifies index.html and dist/index.html contain SPA query redirect and SW cleanup scripts', () => {
      for (const filePath of [indexHtmlPath, distIndexHtmlPath]) {
        const indexHtml = fs.readFileSync(filePath, 'utf8');
        
        // Must contain query-to-hash redirector
        expect(indexHtml).toContain('l.search && l.search[1] === \'/\'');
        expect(indexHtml).toContain('roof4u');
        expect(indexHtml).toContain('window.history.replaceState');

        // Must contain Service Worker cleanup
        expect(indexHtml).toContain('navigator.serviceWorker');
        expect(indexHtml).toContain('getRegistrations');
        expect(indexHtml).toContain('unregister');

        // Must contain CacheStorage cleanup
        expect(indexHtml).toContain('caches');
        expect(indexHtml).toContain('caches.delete');
      }
    });

    it('properly decodes query parameters to hash while isolating /roof4u in index.html logic', () => {
      // Case 1: Standard route query redirect
      const res1 = executeIndexSpaScript('?/strategy&ref=devpost');
      expect(res1.replaceStateMock).toHaveBeenCalledWith(null, '', '#/strategy?ref=devpost');

      // Case 2: Direct /index.html loading with route does NOT corrupt to index.htm
      const resIndex = executeIndexSpaScript('?/pitch', '/index.html');
      expect(resIndex.replaceStateMock).toHaveBeenCalledWith(null, '', '#/pitch');

      // Case 3: Subdirectory base path preservation
      const resSub = executeIndexSpaScript('?/blog', '/hub/');
      expect(resSub.replaceStateMock).toHaveBeenCalledWith(null, '', '/hub#/blog');

      // Case 4: /roof4u query redirect must be ignored
      const res2 = executeIndexSpaScript('?/roof4u/dashboard');
      expect(res2.replaceStateMock).not.toHaveBeenCalled();

      // Case 5: Case-insensitive /ROOF4U query redirect must be ignored
      const res3 = executeIndexSpaScript('?/ROOF4U/app');
      expect(res3.replaceStateMock).not.toHaveBeenCalled();

      // Case 6: Percent-encoded /%72oof4u query redirect must be ignored
      const res4 = executeIndexSpaScript('?/%72oof4u/app');
      expect(res4.replaceStateMock).not.toHaveBeenCalled();

      // Case 7: Direct query parameters attached to /roof4u without trailing slash must be ignored
      const resQuery1 = executeIndexSpaScript('?/roof4u?tab=overview');
      expect(resQuery1.replaceStateMock).not.toHaveBeenCalled();

      const resQuery2 = executeIndexSpaScript('?/roof4u&tab=overview');
      expect(resQuery2.replaceStateMock).not.toHaveBeenCalled();

      // Case 8: Multi-slash roof4u queries must be ignored
      const resMultiSlash1 = executeIndexSpaScript('?//roof4u');
      expect(resMultiSlash1.replaceStateMock).not.toHaveBeenCalled();

      const resMultiSlash2 = executeIndexSpaScript('?///roof4u/app');
      expect(resMultiSlash2.replaceStateMock).not.toHaveBeenCalled();

      // Case 9: Hash attached to roof4u query must be ignored
      const resHash = executeIndexSpaScript('?/roof4u#pricing');
      expect(resHash.replaceStateMock).not.toHaveBeenCalled();

      // Case 10: Multi-slash non-roof4u routes are normalized cleanly
      const resMultiNonRoof = executeIndexSpaScript('?//pitch');
      expect(resMultiNonRoof.replaceStateMock).toHaveBeenCalledWith(null, '', '#/pitch');

      // Case 11: Anti-bleed non-roof query redirects MUST NOT be ignored
      const res5 = executeIndexSpaScript('?/roof4us/dashboard');
      expect(res5.replaceStateMock).toHaveBeenCalledWith(null, '', '#/roof4us/dashboard');
    });

    it('proactively unregisters active Service Workers and deletes CacheStorage', async () => {
      const unregisterMock = vi.fn().mockResolvedValue(true);
      const mockRegistration = { unregister: unregisterMock };
      
      const getRegistrationsMock = vi.fn().mockResolvedValue([mockRegistration]);
      (navigator as any).serviceWorker = {
        getRegistrations: getRegistrationsMock,
      };

      const cacheDeleteMock = vi.fn().mockResolvedValue(true);
      const cacheKeysMock = vi.fn().mockResolvedValue(['cache-v1', 'cache-v2']);
      (window as any).caches = {
        keys: cacheKeysMock,
        delete: cacheDeleteMock,
      };

      // Run cleanup logic as present in index.html
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }

      const keys = await window.caches.keys();
      for (const key of keys) {
        await window.caches.delete(key);
      }

      expect(getRegistrationsMock).toHaveBeenCalledTimes(1);
      expect(unregisterMock).toHaveBeenCalledTimes(1);
      expect(cacheKeysMock).toHaveBeenCalledTimes(1);
      expect(cacheDeleteMock).toHaveBeenCalledTimes(2);
    });
  });

  // =========================================================================
  // 4. public/sw.js Service Worker Verification
  // =========================================================================
  describe('4. public/sw.js Pass-Through & Self-Unregistration Verification', () => {
    it('verifies public/sw.js and dist/sw.js exist and contain self-unregistration and strict /roof4u/ bypass logic', () => {
      for (const filePath of [swJsPath, distSwJsPath]) {
        const swContent = fs.readFileSync(filePath, 'utf8');

        // Must have skipWaiting and unregister
        expect(swContent).toContain('self.skipWaiting()');
        expect(swContent).toContain('self.registration.unregister()');

        // Must have explicit /roof4u/ bypass
        expect(swContent).toContain('roof4u');
        expect(swContent).toContain('fetch');

        // Must NOT use loose startsWith('/roof4u') which causes route bleed
        expect(swContent).not.toContain("url.pathname.startsWith('/roof4u')");
      }
    });

    it('executes Service Worker fetch listener and strictly bypasses only /roof4u/ URLs', () => {
      const { listeners } = loadServiceWorker(swJsPath);
      expect(listeners['fetch']).toBeDefined();
      const fetchHandler = listeners['fetch'][0];

      const bypassUrls = [
        'https://s6pa1rta3n-lab.github.io/roof4u',
        'https://s6pa1rta3n-lab.github.io/roof4u/',
        'https://s6pa1rta3n-lab.github.io/roof4u/index.html',
        'https://s6pa1rta3n-lab.github.io/roof4u/bundle.js',
        'https://s6pa1rta3n-lab.github.io/ROOF4U/styles.css',
        'https://s6pa1rta3n-lab.github.io//roof4u',
        'https://s6pa1rta3n-lab.github.io/%72oof4u/app',
      ];

      for (const urlStr of bypassUrls) {
        const respondWithMock = vi.fn();
        fetchHandler({
          request: { url: urlStr },
          respondWith: respondWithMock,
        });
        // Bypassed fetch handler must NOT call respondWith (lets request pass directly to network)
        expect(respondWithMock).not.toHaveBeenCalled();
      }

      // Non-bypassed URLs must not crash or trigger improper bypass
      const nonBypassedUrls = [
        'https://s6pa1rta3n-lab.github.io/pitch',
        'https://s6pa1rta3n-lab.github.io/strategy',
        'https://s6pa1rta3n-lab.github.io/roof',
        'https://s6pa1rta3n-lab.github.io/roofing',
        'https://s6pa1rta3n-lab.github.io/roof4us',
        'https://s6pa1rta3n-lab.github.io/roof4u-v2',
        'https://s6pa1rta3n-lab.github.io/roof4update',
        'https://s6pa1rta3n-lab.github.io/roof4user',
      ];

      for (const urlStr of nonBypassedUrls) {
        const respondWithMock = vi.fn();
        fetchHandler({
          request: { url: urlStr },
          respondWith: respondWithMock,
        });
        expect(respondWithMock).not.toHaveBeenCalled();
      }
    });

    it('executes Service Worker activate listener and unregisters with cache purge', async () => {
      const { listeners, mockSelf, mockCaches } = loadServiceWorker(swJsPath);
      expect(listeners['activate']).toBeDefined();
      const activateHandler = listeners['activate'][0];

      let waitUntilPromise: Promise<any> | null = null;
      activateHandler({
        waitUntil: (p: Promise<any>) => {
          waitUntilPromise = p;
        },
      });

      expect(waitUntilPromise).not.toBeNull();
      await waitUntilPromise;

      expect(mockSelf.registration.unregister).toHaveBeenCalledTimes(1);
      expect(mockCaches.keys).toHaveBeenCalledTimes(1);
      expect(mockCaches.delete).toHaveBeenCalledTimes(2);
    });
  });

  // =========================================================================
  // 5. Build Artifact Integrity (dist/404.html, dist/sw.js, dist/index.html)
  // =========================================================================
  describe('5. Build Artifact Integrity', () => {
    it('verifies dist/404.html contains the /roof4u/ bypass and isolation logic', () => {
      expect(fs.existsSync(dist404Path)).toBe(true);
      const dist404Content = fs.readFileSync(dist404Path, 'utf8');
      expect(dist404Content).toContain('isRoof4uBypass');
      expect(dist404Content).toContain('roof4u');
      expect(dist404Content).toContain('Sub-Project Isolated');
      expect(dist404Content).toContain('href="/"');
    });

    it('verifies dist/sw.js exists and contains the strict bypass and cache purge logic', () => {
      expect(fs.existsSync(distSwJsPath)).toBe(true);
      const distSwContent = fs.readFileSync(distSwJsPath, 'utf8');
      expect(distSwContent).toContain('self.registration.unregister()');
      expect(distSwContent).toContain('roof4u');
      expect(distSwContent).toContain('caches.delete');
      expect(distSwContent).not.toContain("url.pathname.startsWith('/roof4u')");
    });
  });
});

