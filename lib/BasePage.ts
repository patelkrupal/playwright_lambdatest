import { TestInfo, test as BasePage } from '@playwright/test';
import { InteractionsPage } from '@pages/InteractionsPage';
import { WebActions } from '@lib/WebActions';
const test = BasePage.extend<{
    webActions: WebActions;
    interactionsPage: InteractionsPage;
    testInfo: TestInfo;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    interactionsPage: async ({ page, context }, use) => {
        await use(new InteractionsPage(page, context));
    }
})

export default test;