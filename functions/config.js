!function(e,t){for(var n in t)e[n]=t[n]}(exports,function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=261)}({11:function(e,t){e.exports=require("crypto")},2:function(e,t){e.exports=require("path")},261:function(e,t,n){n(262).config(),e.exports={secretKey:process.env.SECRET_KEY}},262:function(e,t,n){const o=n(3),r=n(2),s=n(27),i=n(11),a=n(263).version,c=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;function l(e){console.log(`[dotenv@${a}][DEBUG] ${e}`)}function p(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:process.env.DOTENV_KEY&&process.env.DOTENV_KEY.length>0?process.env.DOTENV_KEY:""}function u(e,t){let n;try{n=new URL(t)}catch(e){if("ERR_INVALID_URL"===e.code)throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");throw e}const o=n.password;if(!o)throw new Error("INVALID_DOTENV_KEY: Missing key part");const r=n.searchParams.get("environment");if(!r)throw new Error("INVALID_DOTENV_KEY: Missing environment part");const s="DOTENV_VAULT_"+r.toUpperCase(),i=e.parsed[s];if(!i)throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);return{ciphertext:i,key:o}}function d(e){let t=r.resolve(process.cwd(),".env");return e&&e.path&&e.path.length>0&&(t=e.path),t.endsWith(".vault")?t:t+".vault"}const f={configDotenv:function(e){let t=r.resolve(process.cwd(),".env"),n="utf8";const i=Boolean(e&&e.debug);var a;e&&(null!=e.path&&(t="~"===(a=e.path)[0]?r.join(s.homedir(),a.slice(1)):a),null!=e.encoding&&(n=e.encoding));try{const r=f.parse(o.readFileSync(t,{encoding:n}));let s=process.env;return e&&null!=e.processEnv&&(s=e.processEnv),f.populate(s,r,e),{parsed:r}}catch(e){return i&&l(`Failed to load ${t} ${e.message}`),{error:e}}},_configVault:function(e){var t;t="Loading env from encrypted .env.vault",console.log(`[dotenv@${a}][INFO] ${t}`);const n=f._parseVault(e);let o=process.env;return e&&null!=e.processEnv&&(o=e.processEnv),f.populate(o,n,e),{parsed:n}},_parseVault:function(e){const t=d(e),n=f.configDotenv({path:t});if(!n.parsed)throw new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);const o=p(e).split(","),r=o.length;let s;for(let e=0;e<r;e++)try{const t=u(n,o[e].trim());s=f.decrypt(t.ciphertext,t.key);break}catch(t){if(e+1>=r)throw t}return f.parse(s)},config:function(e){const t=d(e);return 0===p(e).length?f.configDotenv(e):o.existsSync(t)?f._configVault(e):(n=`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`,console.log(`[dotenv@${a}][WARN] ${n}`),f.configDotenv(e));var n},decrypt:function(e,t){const n=Buffer.from(t.slice(-64),"hex");let o=Buffer.from(e,"base64");const r=o.slice(0,12),s=o.slice(-16);o=o.slice(12,-16);try{const e=i.createDecipheriv("aes-256-gcm",n,r);return e.setAuthTag(s),`${e.update(o)}${e.final()}`}catch(e){const t=e instanceof RangeError,n="Invalid key length"===e.message,o="Unsupported state or unable to authenticate data"===e.message;if(t||n){throw new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)")}if(o){throw new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY")}throw console.error("Error: ",e.code),console.error("Error: ",e.message),e}},parse:function(e){const t={};let n,o=e.toString();for(o=o.replace(/\r\n?/gm,"\n");null!=(n=c.exec(o));){const e=n[1];let o=n[2]||"";o=o.trim();const r=o[0];o=o.replace(/^(['"`])([\s\S]*)\1$/gm,"$2"),'"'===r&&(o=o.replace(/\\n/g,"\n"),o=o.replace(/\\r/g,"\r")),t[e]=o}return t},populate:function(e,t,n={}){const o=Boolean(n&&n.debug),r=Boolean(n&&n.override);if("object"!=typeof t)throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");for(const n of Object.keys(t))Object.prototype.hasOwnProperty.call(e,n)?(!0===r&&(e[n]=t[n]),o&&l(!0===r?`"${n}" is already defined and WAS overwritten`:`"${n}" is already defined and was NOT overwritten`)):e[n]=t[n]}};e.exports.configDotenv=f.configDotenv,e.exports._configVault=f._configVault,e.exports._parseVault=f._parseVault,e.exports.config=f.config,e.exports.decrypt=f.decrypt,e.exports.parse=f.parse,e.exports.populate=f.populate,e.exports=f},263:function(e){e.exports=JSON.parse('{"_from":"dotenv","_id":"dotenv@16.3.1","_inBundle":false,"_integrity":"sha512-IPzF4w4/Rd94bA9imS68tZBaYyBWSCE47V1RGuMrB94iyTOIEwRmVL2x/4An+6mETpLrKJ5hQkB8W4kFAadeIQ==","_location":"/dotenv","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"dotenv","name":"dotenv","escapedName":"dotenv","rawSpec":"","saveSpec":null,"fetchSpec":"latest"},"_requiredBy":["#USER","/"],"_resolved":"https://registry.npmjs.org/dotenv/-/dotenv-16.3.1.tgz","_shasum":"369034de7d7e5b120972693352a3bf112172cc3e","_spec":"dotenv","_where":"/home/dw/Documents/dicoding/submission/back-end/backend-test","browser":{"fs":false},"bugs":{"url":"https://github.com/motdotla/dotenv/issues"},"bundleDependencies":false,"deprecated":false,"description":"Loads environment variables from .env file","devDependencies":{"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3","decache":"^4.6.1","sinon":"^14.0.1","standard":"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0","tap":"^16.3.0","tar":"^6.1.11","typescript":"^4.8.4"},"engines":{"node":">=12"},"exports":{".":{"types":"./lib/main.d.ts","require":"./lib/main.js","default":"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},"funding":"https://github.com/motdotla/dotenv?sponsor=1","homepage":"https://github.com/motdotla/dotenv#readme","keywords":["dotenv","env",".env","environment","variables","config","settings"],"license":"BSD-2-Clause","main":"lib/main.js","name":"dotenv","repository":{"type":"git","url":"git://github.com/motdotla/dotenv.git"},"scripts":{"dts-check":"tsc --project tests/types/tsconfig.json","lint":"standard","lint-readme":"standard-markdown","prerelease":"npm test","pretest":"npm run lint && npm run dts-check","release":"standard-version","test":"tap tests/*.js --100 -Rspec"},"types":"lib/main.d.ts","version":"16.3.1"}')},27:function(e,t){e.exports=require("os")},3:function(e,t){e.exports=require("fs")}}));