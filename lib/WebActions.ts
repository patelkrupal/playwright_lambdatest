import fs from 'fs';
import { Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import { testConfig } from '../testConfig';
import * as pdfjslib from 'pdfjs-dist-es5';

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }

    async validateUrlContent(text: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(`.*${text}`));
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/selenium-playground");
    }
    
    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    async writeDataIntoTextFile(filePath: number | fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }

    async getPdfPageText(pdf: any, pageNo: number) {
        const page = await pdf.getPage(pageNo);
        const tokenizedText = await page.getTextContent();
        const pageText = tokenizedText.items.map((token: any) => token.str).join('');
        return pageText;
    }

    async getPDFText(filePath: any): Promise<string> {
        const dataBuffer = fs.readFileSync(filePath);
        const pdf = await pdfjslib.getDocument(dataBuffer).promise;
        const maxPages = pdf.numPages;
        const pageTextPromises = [];
        for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
          pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
        }
        const pageTexts = await Promise.all(pageTextPromises);
        return pageTexts.join(' ');
      }

    async fillIn(value: string, locator: string): Promise<void> {
        const text = value;
        await this.page.fill(`#${locator}`, text);
    }

    async verifyContentOnPage(text: string, locator: string): Promise<void> {
        await expect(this.page.locator(`#${locator}`)).toContainText(text); // Verifies if the locator contains text
    }
}