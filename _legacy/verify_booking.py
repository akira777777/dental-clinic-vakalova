from playwright.sync_api import Page, expect, sync_playwright
import time

def test_booking_page(page: Page):
    try:
        # 1. Arrange
        page.goto("http://localhost:3000/booking")

        # 2. Act & Assert
        expect(page.get_by_role("heading", name="Записаться на прием")).to_be_visible()

        # Check services are loaded
        page.wait_for_selector("text=Лечение кариеса")

        # Select "Лечение кариеса"
        service_label = page.locator("label").filter(has_text="Лечение кариеса").first
        service_label.click()

        # Wait a bit for React to update
        page.wait_for_timeout(1000)

        doctor_label = page.locator("label").filter(has_text="Татьяна Вакалова").first
        expect(doctor_label).to_be_visible()

        doctor_label.click()

        # Select Date (15th)
        page.get_by_role("button", name="15", exact=True).click()

        page.get_by_placeholder("Иван", exact=True).fill("Test User")
        page.get_by_placeholder("Иванов", exact=True).fill("Testov")
        page.get_by_placeholder("ivan@example.com").fill("test@example.com")
        page.get_by_placeholder("+420 123 456 789").fill("+420123456789")

        page.screenshot(path="/home/jules/verification/booking_page.png", full_page=True)
    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="/home/jules/verification/error.png")
        raise e

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_booking_page(page)
        finally:
            browser.close()
