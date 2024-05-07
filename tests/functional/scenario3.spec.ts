import test from '@lib/BasePage';

test(`@lambdatest Test Scenario 3`, async ({ interactionsPage, webActions }) => {
    await webActions.navigateToURL();
    await webActions.clickByText('Input Form Submit');
    await interactionsPage.fillInForm()
});