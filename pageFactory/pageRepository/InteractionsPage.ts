import { expect, Locator, Page, BrowserContext } from '@playwright/test';

export class InteractionsPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly DRAGGABLE: Locator;
    readonly DROPPABLE: Locator

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        this.DRAGGABLE = page.getByRole('tabpanel', { name: 'Simple' }).locator('#draggable');
        this.DROPPABLE = page.getByRole('tabpanel', { name: 'Simple' }).locator('#droppable');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/selenium-playground");
    }

    async verifyDragandDrop(): Promise<void> {
        await this.DRAGGABLE.hover();
        await this.page.mouse.down();
        await this.DROPPABLE.hover();
        await this.page.mouse.up();
        await expect(this.DROPPABLE).toContainText('Dropped'); //Verify Dropped text
    }

    async moveSlider(start: number, end: number): Promise<void> {
        const sliderLocator = this.page.locator(`//*[@id='slider3']//input[@type='range']`);

        // Get the bounding box of the slider
        const sliderBoundingBox = await sliderLocator.boundingBox();

        // Calculate the start and end points for dragging
        const startX = sliderBoundingBox.width * (start / 100); // 15% of slider width
        const endX = sliderBoundingBox.width * (end / 100) - 10; // 95% of slider width
        const y = sliderBoundingBox.height / 2; // Middle of slider height
      
        // Drag the slider from start to end
        await sliderLocator.dragTo(sliderLocator, {
          sourcePosition: { x: startX, y },
          targetPosition: { x: endX, y }
        });
    }

    async fillInForm(): Promise<void> {
        await this.page.click("//button[text()='Submit']")
        // await expect(this.page.locator("//button[text()='Submit']")).toHaveText('Please fill out this field')
        await this.page.locator("//input[@id='name']").fill("Krupal Patel")
        await this.page.locator("//input[@id='inputEmail4']").fill("kpdemo@gmail.com")
        await this.page.locator("//input[@id='inputPassword4']").fill("kp@kp")
        await this.page.locator("//input[@id='company']").fill("Info")
        await this.page.locator("//input[@name='website']").fill("Info.com")
        await this.page.locator("//select[@name='country']").selectOption('United States')
        await this.page.locator("//input[@name='city']").fill("Boston")
        await this.page.locator("//input[@name='address_line1']").fill("Mehsana")
        await this.page.locator("//input[@name='address_line2']").fill("PP")
        await this.page.locator("//input[@placeholder='State']").fill("MS")
        await this.page.locator("//input[@name='zip']").fill("411028")
        await this.page.click("//button[text()='Submit']")
        await expect(this.page.locator("//p[@style='display: block;']")).toHaveText('Thanks for contacting us, we will get back to you shortly.')
    }
}