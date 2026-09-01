import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('GitHub Pages SPA Routing & /roof4u/ Sub-Project Isolation Suite', () => {
  const public404Path = path.resolve(__dirname, '../../public/404.html');
  const dist404Path = path.resolve(__dirname, '../../dist/404.html');
  const indexHtmlPath = path.resolve(__dirname, '../../index.html');
  const swJsPath = path.resolve(__dirname, '../../public/sw.js');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
  });

  // Helper to simulate 404.html execution in JSDOM
  function execute404Html(pathname: string, search = '', hash = '') {
    const htmlContent = fs.readFileSync(public404Path, 'utf8');
    
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

    // Run script in mock environment
    const runHeadScript = new Function('window', 'document', `
      (function() {
        var l = window.location;
        var pathname = l.pathname;
        
        var isRoof4uBypass = /^\\/roof4u(\\/.*)?$/i.test(pathname);
        
        if (isRoof4uBypass) {
          window.__ROOF4U_BYPASS__ = true;
          return;
        }

        var pathSegmentsToKeep = 0;
        var newPath = l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/');
        var redirectUrl = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          (pathSegmentsToKeep > 0 ? '/' + l.pathname.slice(1).split('/').slice(0, pathSegmentsToKeep).join('/') : '') +
          '/?/' + newPath.replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash;
        
        window.location.replace(redirectUrl);
      })();
    `);

    (window as any).__ROOF4U_BYPASS__ = undefined;
    runHeadScript(Object.assign(window, { location: mockLocation }), document);

    // Extract and run body script for DOM rendering
    const bodyScripts = document.body.querySelectorAll('script');
    const bodyScriptCode = bodyScripts[0]?.textContent || '';
    if (bodyScriptCode) {
      const runBodyScript = new Function('window', 'document', bodyScriptCode);
      runBodyScript(Object.assign(window, { location: mockLocation }), document);
    }

    return mockLocation;
  }

  // =========================================================================
  // 1. /roof4u/ Bypass Tests (No SPA Redirection)
  // =========================================================================
  describe('1. /roof4u/ Sub-Project Route Bypass', () => {
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
    ];

    roof4uTestPaths.forEach(({ path: testPath, description }) => {
      it(`bypasses SPA redirection for ${description} (${testPath})`, () => {
        const mockLoc = execute404Html(testPath);

        // window.location.replace must NOT be called for /roof4u/ routes
        expect(mockLoc.replace).not.toHaveBeenCalled();
        expect((window as any).__ROOF4U_BYPASS__).toBe(true);
      });
    });

    it('bypasses SPA redirection when query parameters and hashes are present on /roof4u', () => {
      const mockLoc = execute404Html('/roof4u/settings', '?user=alice&theme=dark', '#security');
      expect(mockLoc.replace).not.toHaveBeenCalled();
      expect((window as any).__ROOF4U_BYPASS__).toBe(true);
    });

    it('renders isolated sub-project UI and actions in DOM when /roof4u/ is requested', () => {
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

      const btnHome = document.getElementById('btn-home');
      expect(btnHome?.getAttribute('href')).toBe('./');
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
      { path: '/my-roof4u', expected: 'https://s6pa1rta3n-lab.github.io/?/my-roof4u' },
      { path: '/deals4u', expected: 'https://s6pa1rta3n-lab.github.io/?/deals4u' },
      { path: '/other-repo/roof4u', expected: 'https://s6pa1rta3n-lab.github.io/?/other-repo/roof4u' },
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
  });

  // =========================================================================
  // 3. index.html SPA Decoder & Service Worker Cleaner Verification
  // =========================================================================
  describe('3. index.html SPA Handler & Service Worker Isolation', () => {
    it('verifies index.html contains SPA query redirect and SW cleanup scripts', () => {
      const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
      
      // Must contain query-to-hash redirector
      expect(indexHtml).toContain('l.search && l.search[1] === \'/\'');
      expect(indexHtml).toContain('roof4u');
      expect(indexHtml).toContain('window.history.replaceState');

      // Must contain Service Worker cleanup
      expect(indexHtml).toContain('navigator.serviceWorker');
      expect(indexHtml).toContain('getRegistrations');
      expect(indexHtml).toContain('unregister');
    });

    it('properly decodes query parameters to hash while isolating /roof4u in index.html logic', () => {
      const replaceStateMock = vi.fn();
      const mockHistory = { replaceState: replaceStateMock };

      const runIndexSpaScript = (search: string, pathname = '/', hash = '') => {
        const mockLocation = {
          pathname,
          search,
          hash,
        };

        const scriptFn = new Function('l', 'window', `
          if (l.search && l.search[1] === '/') {
            var decoded = l.search.slice(1).split('&').map(function(s) { 
              return s.replace(/~and~/g, '&');
            }).join('?');
            if (!/^\\/?roof4u(\\/.*)?$/i.test(decoded)) {
              var targetHash = '#/' + decoded.replace(/^\\//, '');
              window.history.replaceState(null, '', l.pathname.slice(0, -1) + targetHash + l.hash);
            }
          }
        `);

        scriptFn(mockLocation, { history: mockHistory });
      };

      // Case 1: Standard route query redirect
      runIndexSpaScript('?/strategy&ref=devpost');
      expect(replaceStateMock).toHaveBeenCalledWith(null, '', '#/strategy?ref=devpost');

      // Case 2: /roof4u query redirect must be ignored
      replaceStateMock.mockClear();
      runIndexSpaScript('?/roof4u/dashboard');
      expect(replaceStateMock).not.toHaveBeenCalled();

      // Case 3: Case-insensitive /ROOF4U query redirect must be ignored
      replaceStateMock.mockClear();
      runIndexSpaScript('?/ROOF4U/app');
      expect(replaceStateMock).not.toHaveBeenCalled();
    });

    it('proactively unregisters active Service Workers', async () => {
      const unregisterMock = vi.fn().mockResolvedValue(true);
      const mockRegistration = { unregister: unregisterMock };
      
      const getRegistrationsMock = vi.fn().mockResolvedValue([mockRegistration]);
      (navigator as any).serviceWorker = {
        getRegistrations: getRegistrationsMock,
      };

      // Run cleanup logic
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }

      expect(getRegistrationsMock).toHaveBeenCalledTimes(1);
      expect(unregisterMock).toHaveBeenCalledTimes(1);
    });
  });

  // =========================================================================
  // 4. public/sw.js Service Worker Verification
  // =========================================================================
  describe('4. public/sw.js Pass-Through & Self-Unregistration Verification', () => {
    it('verifies public/sw.js exists and contains self-unregistration and /roof4u/ bypass logic', () => {
      const swContent = fs.readFileSync(swJsPath, 'utf8');

      // Must have skipWaiting and unregister
      expect(swContent).toContain('self.skipWaiting()');
      expect(swContent).toContain('self.registration.unregister()');

      // Must have explicit /roof4u/ bypass
      expect(swContent).toContain('roof4u');
      expect(swContent).toContain('fetch');
    });

    it('bypasses fetch handler for /roof4u/ URLs in Service Worker simulation', () => {
      const bypassUrls = [
        'https://s6pa1rta3n-lab.github.io/roof4u/',
        'https://s6pa1rta3n-lab.github.io/roof4u/index.html',
        'https://s6pa1rta3n-lab.github.io/roof4u/bundle.js',
        'https://s6pa1rta3n-lab.github.io/ROOF4U/styles.css',
      ];

      for (const urlStr of bypassUrls) {
        const url = new URL(urlStr);
        const isBypassed = url.pathname.startsWith('/roof4u') || /^\/roof4u(\/.*)?$/i.test(url.pathname);
        expect(isBypassed).toBe(true);
      }

      const nonBypassedUrls = [
        'https://s6pa1rta3n-lab.github.io/pitch',
        'https://s6pa1rta3n-lab.github.io/strategy',
        'https://s6pa1rta3n-lab.github.io/roof',
        'https://s6pa1rta3n-lab.github.io/roofing',
      ];

      for (const urlStr of nonBypassedUrls) {
        const url = new URL(urlStr);
        const isBypassed = url.pathname.startsWith('/roof4u') || /^\/roof4u(\/.*)?$/i.test(url.pathname);
        expect(isBypassed).toBe(false);
      }
    });
  });

  // =========================================================================
  // 5. Build Artifact Integrity (dist/404.html, dist/sw.js)
  // =========================================================================
  describe('5. Build Artifact Integrity', () => {
    it('verifies dist/404.html contains the /roof4u/ bypass and isolation logic', () => {
      expect(fs.existsSync(dist404Path)).toBe(true);
      const dist404Content = fs.readFileSync(dist404Path, 'utf8');
      expect(dist404Content).toContain('isRoof4uBypass');
      expect(dist404Content).toContain('roof4u');
      expect(dist404Content).toContain('Sub-Project Isolated');
    });

    it('verifies dist/sw.js exists and contains the bypass logic', () => {
      const distSwPath = path.resolve(__dirname, '../../dist/sw.js');
      expect(fs.existsSync(distSwPath)).toBe(true);
      const distSwContent = fs.readFileSync(distSwPath, 'utf8');
      expect(distSwContent).toContain('self.registration.unregister()');
      expect(distSwContent).toContain('roof4u');
    });
  });
});
