const code = "(function () {\n  'use strict';\n\n  const checkPolyfilled = 'typeof browser !== \"undefined\"';\n\n  const _executeScript = chrome.tabs.executeScript;\n  const withP = (...args) =>\n    new Promise((resolve, reject) => {\n      _executeScript(...args, (results) => {\n        if (chrome.runtime.lastError) {\n          reject(chrome.runtime.lastError.message);\n        } else {\n          resolve(results);\n        }\n      });\n    });\n\n  // @ts-expect-error FIXME: executeScript should return Promise<any[]>\n  chrome.tabs.executeScript = (...args) => {\n  (async () => {\n      const baseArgs = (typeof args[0] === 'number' ? [args[0]] : []); \n\n      const [done] = await withP(...(baseArgs.concat({ code: checkPolyfilled }) ));\n\n      if (!done) {\n        await withP(...(baseArgs.concat([{ file: 'browser-polyfill-executeScript.js' }]) ));\n      }\n\n      _executeScript(...(args ));\n    })();\n  };\n\n}());\n";

export { code };