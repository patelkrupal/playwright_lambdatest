import test from '@lib/BasePage';

test(`@lambdatest Test Scenario 1`, async ({ interactionsPage, webActions }) => {
    const message = 'Welcome to LambdaTest';
    await webActions.navigateToURL();
    await webActions.clickByText('Simple Form Demo'); // Click on Interactions Icon identified via text selector
    await webActions.validateUrlContent('simple-form-demo');
    await webActions.fillIn(message, 'user-message');
    await webActions.clickByText('Get Checked Value');
    await webActions.verifyContentOnPage(message, 'message') // Click on Interactions Icon identified via text selector
    // await interactionsPage.verifyDragandDrop();
});