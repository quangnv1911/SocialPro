import * as fs from 'fs';
import { parse } from 'node-html-parser';
import * as moment from 'moment-timezone';
import * as playwright from 'playwright';
import * as _request from 'request-promise';
import { GateType, Payment } from '../gate.interface';

import { Gate } from '../gates.services';
import { sleep } from 'src/shards/helpers/sleep';
import { axios } from 'src/shards/helpers/axios';
export class ACBBankService extends Gate {
  private jar: _request.CookieJar;
  private request: _request.RequestPromiseAPI | undefined = undefined;
  private dse_sessionId: string | undefined;
  private dse_processorId: string | undefined;
  private user_agent: string | undefined;
  getProxyString() {
    if (this.proxy) {
      if (this.proxy.username && this.proxy.username.length > 0) {
        return `${this.proxy.schema}://${this.proxy.username}:${this.proxy.password}@${this.proxy.ip}:${this.proxy.port}`;
      }
      return `${this.proxy.schema}://${this.proxy.ip}:${this.proxy.port}`;
    }
    return undefined;
  }

  getChromProxy() {
    if (!this.proxy) {
      return undefined;
    }

    return {
      server: `${this.proxy.ip}:${this.proxy.port}`,
      username: this.proxy.username,
      password: this.proxy.password,
    };
  }

  async randomUserAgent(): Promise<string> {
    const replaceNumberWithRandomNumber = (str: string) => {
      return str
        .replace(/\d{2}/g, () =>
          Math.floor(Math.random() * 100)
            .toString()
            .padStart(2, '0'),
        )
        .replace(/\d{3}/g, () =>
          Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, '0'),
        );
    };
    return (
      'Mozilla/5.0 (Windows NT 10.0; Windows; x64)' +
      replaceNumberWithRandomNumber(
        ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36',
      )
    );
  }

  parseAcbHistory(html: string): Payment[] {
    const document = parse(html);
    const table = document.getElementById('table1');
    const rows = table.querySelectorAll('tr');

    const payments: Payment[] = [];

    // Skip header row
    for (let i = 1; i < rows.length - 1; i += 2) {
      try {
        const transactionRow = rows[i];
        const contentRow = rows[i + 1];

        const tds = transactionRow.querySelectorAll('td');

        // Check if this is a valid transaction row (should have 6 columns)
        if (tds.length === 6) {
          const date = tds[1].text.trim();

          const debitAmount = tds[3].text.trim();
          const creditAmount = tds[4].text.trim();

          // Get content from the next row (colspan=4)
          const contentCell = contentRow.querySelector('td[colspan="4"]');
          const content = contentCell ? contentCell.text.trim() : '';

          const transactionId = tds[2].text.trim();

          // Determine amount - credit
          const amount = parseInt(creditAmount.replace(/\./g, ''));

          // Only add if we have a valid date and amount
          if (date && !debitAmount && !isNaN(amount)) {
            payments.push({
              // 01/11/2024 23:37:01
              date: moment
                .tz(date, 'DD/MM/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh')
                .toDate(),
              transaction_id: 'acbbank-' + transactionId,
              amount: amount,
              content: content,
              gate: GateType.ACBBANK,
              account_receiver: this.config.account,
            });
          }
        }
      } catch (error) {
        console.error('Error processing row:', error);
        // Continue processing other rows even if one fails
        continue;
      }
    }

    return payments;
  }

  async login() {
    const browser = await playwright.chromium.launch({
      headless: true,
      proxy: this.getChromProxy(),
    });
    this.user_agent = await this.randomUserAgent();
    try {
      const context = await browser.newContext({
        userAgent: this.user_agent,
      });
      const page = await context.newPage();

      // Tiết kiệm băng thông
      if (this.proxy)
        await page.route('**/*', async (route) => {
          const url = route.request().url();
          const resourceType = route.request().resourceType();

          if (url.includes('Captcha.jpg')) {
            return route.continue();
          }
          if (['image', 'media'].includes(resourceType)) {
            return route.abort();
          }

          if (![`xhr`, `fetch`, `document`].includes(resourceType)) {
            try {
              const response = await axios.get(url, {
                responseType: 'arraybuffer',
              });
              return route.fulfill({
                status: response.status,
                headers: {},
                body: response.data,
              });
            } catch (error) {
              return route.abort();
            }
          }
          route.continue();
        });

      const getCaptchaWaitResponse = page.waitForResponse('**/Captcha.jpg');
      await page.goto('https://online.acb.com.vn/acbib/Request');

      // fake fingerprint
      await page.evaluate(() => {
        // Helper function for random values
        const getRandomInt = (min, max) => {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        // Random platform
        const platforms = ['Win32', 'MacIntel', 'Linux x86_64'];
        Object.defineProperty(navigator, 'platform', {
          get: () => platforms[getRandomInt(0, platforms.length - 1)],
        });

        // Random screen resolution
        Object.defineProperty(screen, 'width', {
          get: () => getRandomInt(1024, 2560),
        });
        Object.defineProperty(screen, 'height', {
          get: () => getRandomInt(768, 1600),
        });

        // Random device memory (2-16 GB)
        Object.defineProperty(navigator, 'deviceMemory', {
          get: () => Math.pow(2, getRandomInt(1, 4)),
        });

        // Random languages
        const languages = [
          'en-US',
          'en-GB',
          'fr-FR',
          'de-DE',
          'es-ES',
          'it-IT',
        ];
        Object.defineProperty(navigator, 'language', {
          get: () => languages[getRandomInt(0, languages.length - 1)],
        });

        // Random color depth
        Object.defineProperty(screen, 'colorDepth', {
          get: () => [24, 32][getRandomInt(0, 1)],
        });
      });

      await page.getByLabel('Tên truy cập').click();
      await page.getByLabel('Tên truy cập').fill(this.config.login_id);
      await page.getByLabel('Mật khẩu').click();
      await page.getByLabel('Mật khẩu').fill(this.config.password);
      await page.getByLabel('Mật khẩu').press('Tab');

      const getCaptchaBuffer = await getCaptchaWaitResponse.then((d) =>
        d.body(),
      );
      const captchaBase64 = getCaptchaBuffer.toString('base64');
      const captchaText = await this.captchaSolver.solveCaptcha(captchaBase64);

      await sleep(5000);
      await page.locator('#security-code').fill(captchaText);
      await page.locator('#security-code').press('Enter');

      const linkMyAccount = await page.getByText(this.config.account);
      const linkMyAccountHref = await linkMyAccount.getAttribute('href');

      const cookie = await context.cookies();
      this.jar = _request.jar();
      for (const c of cookie) {
        this.jar.setCookie(`${c.name}=${c.value}`, 'https://' + c.domain);
      }
      this.request = _request.defaults({
        jar: this.jar,
        headers: {
          'User-Agent': this.user_agent,
        },
        followRedirect: true,
        followAllRedirects: true,
      });

      const dashboardPageHtml = await this.request(
        `https://online.acb.com.vn/acbib/${linkMyAccountHref}`,
        { proxy: this.getProxyString() },
      );
      // await fs.promises.writeFile('acb1.1.html', dashboardPageHtml);

      this.dse_sessionId =
        /<input type="hidden" name="dse_sessionId" value="(.*?)"/gm.exec(
          dashboardPageHtml,
        )?.[1];
      this.dse_processorId =
        /<input type="hidden" name="dse_processorId" value="(.*?)"/gm.exec(
          dashboardPageHtml,
        )?.[1];

      //close
      await browser.close();
    } catch (error) {
      await browser.close();
      console.error('ACBBankService login error', error);
      throw error;
    }
  }

  async getHistory(): Promise<Payment[]> {
    if (!this.dse_sessionId) {
      await this.login();
      await sleep(1000);
    }

    const fromDate = moment()
      .tz('Asia/Ho_Chi_Minh')
      .subtract(this.config.get_transaction_day_limit, 'days')
      .format('DD/MM/YYYY');
    const toDate = moment()
      .add(1, 'day')
      .tz('Asia/Ho_Chi_Minh')
      .format('DD/MM/YYYY');

    const dataSend = {
      dse_sessionId: this.dse_sessionId,
      dse_applicationId: '-1',
      dse_operationName: 'ibkacctDetailProc',
      dse_pageId: '4',
      dse_processorState: 'acctDetailPage',
      dse_processorId: this.dse_processorId,
      dse_errorPage: '/ibk/acctinquiry/trans.jsp',
      AccountNbr: this.config.account,
      virtualAccount: '',
      storeName: '',
      CheckRef: 'false',
      EdtRef: '',
      activeDatetimeYN: 'N',
      dse_nextEventName: 'byDate',
      FromDate: fromDate,
      ToDate: toDate,
    };

    try {
      const historyPageHtml = await this.request({
        uri: 'https://online.acb.com.vn/acbib/Request',
        method: 'POST',
        form: dataSend,
        proxy: this.getProxyString(),
      });
      // await fs.promises.writeFile('acb2.2.html', historyPageHtml);

      const payments = this.parseAcbHistory(historyPageHtml);

      return payments;
    } catch (error) {
      console.error(error);

      try {
        await this.login();
      } catch (error) {
        console.error(error);
      }

      throw error;
    }
  }
}
