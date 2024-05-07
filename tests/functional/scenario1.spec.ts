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

// test(`@lambdatest Test Scenario 2`, async ({ loginPage, interactionsPage, webActions }) => {
//     await webActions.navigateToURL();
//     await webActions.clickByText('Drag & Drop Sliders'); // Click on Interactions Icon identified via text selector
//     await interactionsPage.moveSlider(15,95);
//     await webActions.delay(5000)
//     await webActions.verifyContentOnPage('95', 'rangeSuccess') // Click on Interactions Icon identified via text selector
// });

// test(`@lambdatest Test Scenario 3`, async ({ loginPage, interactionsPage, webActions }) => {
//     await webActions.navigateToURL();
//     await webActions.clickByText('Input Form Submit');
//     await interactionsPage.fillInForm()
// });