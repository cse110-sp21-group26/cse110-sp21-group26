# Phase two of CI/CD pipeline

## Automation
Automation is finished using github automations, using `node.js.yml` located within `./github/workflows`. Each push triggers automatic tests located in `__tests__`. For each automated test, we test using Node versions `[12.x, 14.x, 15.x]` and on mac, windows, and linux operating systems.

## Test Frameworks
Our frameworks are Jest and Puppeteer for unit tests and E2E testing respecitvely. 
