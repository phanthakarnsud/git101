import { expect, Page, Locator,test, } from '@playwright/test';
import path from 'path';
const TEST_PDF2 = path.join(__dirname, '..', 'test-files', 'SWTECHANDMEDIACOLTD.p12');

function today(addDays: number = 0): string {
  const date = new Date();
  date.setDate(date.getDate() + addDays);
  return [
    String(date.getDate()).padStart(2, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    date.getFullYear(),
  ].join('/');

}
  async function selectDate(page: Page, input: Locator, date: string) {
  const [day, month, year] = date.split('/').map(Number);
  const now = new Date();

  // จำนวนเดือนที่ต้องเลื่อน (บวก = ไปข้างหน้า, ลบ = ย้อนหลัง)
  const diff = (year - now.getFullYear()) * 12 + (month - (now.getMonth() + 1));

  await input.click();

  // กดลูกศรเลื่อนเดือนตามจำนวนที่คำนวณได้
  const nextBtn = page.locator('.dp__inner_nav').last();
  const prevBtn = page.locator('.dp__inner_nav').first();
  for (let i = 0; i < Math.abs(diff); i++) {
    await (diff > 0 ? nextBtn : prevBtn).click();
  }

  // เลือกวัน
    await page
    .locator('.dp__calendar_item:not(:has(.dp__cell_offset))')
    .getByText(String(day), { exact: true })
    .click();

  await expect(input).toHaveValue(date);
  
  }

test('make rgoods Import', async ({ page }) => {
    await page.goto('https://submission-sit.thainsw.net/submission/sign-in?id=pbo2uRaPgdg9Sd1uM0zzJtb2N6Tj8HdfW3rtm/ia5t4=&profileName=X9BGhh7Ic0ieQl/eZAFWog==&email=QYNFjVme700jr4yV6tvXrcSMY6XiWhRE10rblATXCFeFcHqRUNS3bb+3nCBYaZOa5wE3kaZnl82yy04DJv5nzA==');
    await page.getByText('คำขอสำหรับการนำเข้า', { exact: true }).click();
    await page.getByText('บริษัท เอส.ดับบลิว เทค แอนด์ มีเดีย จำกัด', { exact: true }).click();
    await page.getByText('สร้างคำขอ', { exact: true }).click();
    await page.getByPlaceholder('เลขที่บัญชีราคาสินค้า').fill('TI20261006029102026');
    await page.locator('button:has(.mdi-magnify)').click();

    const row = page.getByRole('row').filter({ hasText: 'TI20261006029102026' });
    await expect(row).toBeVisible({ timeout: 10000 });  // เช็คผลค้นหาขึ้นในตาราง
    console.log('เจอ Invoice');
    await row.getByRole('checkbox').check();  
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('checkbox', { name: 'ใบแจ้งการนำเข้า สินค้าควบคุม' }).nth(0).check();
    const productRow = page.getByRole('row').filter({ hasText: 'ทุเรียน' });
    await productRow.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();    

    const invoiceRow = page.getByRole('row').filter({ hasText: 'TI20261006029102026' });
    const invoiceCheckbox = invoiceRow.getByRole('checkbox');
    await invoiceCheckbox.check();
    await expect(invoiceCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    const exportDate1 = page.locator('p:has-text("วันที่นำเข้า") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, exportDate1, today());
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('tab', { name: 'รายการสินค้า' }).click();
    const invoiceRow1 = page.getByRole('row').filter({ hasText: 'TI20261006029102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    await page.getByPlaceholder('ลักษณะของวัตถุอันตราย').fill('TEST');
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(1).click();
    await page.getByPlaceholder('หมายเลขล็อตการผลิต').fill('R1001');    
    const exportDate = page.locator('p:has-text("วันที่ผลิต") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, exportDate, today());
    const deliveryDate = page.locator('p:has-text("วันที่หมดอายุ") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, deliveryDate, today(10));
    await page.getByPlaceholder('ขนาดบรรจุ').fill('10');
    await page.getByRole('combobox', { name: 'หน่วยขนาดบรรจุ' }).click();
    await page.getByPlaceholder('หน่วยขนาดบรรจุ').fill('KGM - KILOGRAM');
    await page.getByRole('option', { name: 'KGM - KILOGRAM' }).click();
    await page.getByPlaceholder('ปริมาณการผลิต / ส่งออก').fill('13');       
    await page.getByRole('combobox', { name: 'หน่วยของปริมาณการผลิต / ส่งออก' }).click();
    await page.getByPlaceholder('หน่วยของปริมาณการผลิต / ส่งออก').fill('KGM - KILOGRAM');
    await page.getByRole('option', { name: 'KGM - KILOGRAM' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();

    await page.getByRole('tab', { name: 'สถานที่เก็บ' }).click();
    const invoiceRow2 = page.getByRole('row').filter({ hasText: 'TI20261006029102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();
    
    await page.getByRole('tab', { name: 'ใบอนุญาต' }).click();
    const invoiceRow7 = page.getByRole('row').filter({ hasText: 'TI20261006029102026' }).filter({ visible: true });
    await expect(invoiceRow7).toHaveCount(1); 
    const headerCheckbox = page.locator('.header-checkbox-container').filter({ visible: true });
    await headerCheckbox.locator('.v-selection-control').click();
    await expect(headerCheckbox.locator('.mdi-checkbox-marked')).toBeVisible();
    await page.getByRole('button', { name: 'เพิ่ม/แก้ไขข้อมูล' }).click();
    await page.getByPlaceholder('เลขที่ใบอนุญาต').fill('A0230661104897');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();    
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.locator('input[type="file"]').setInputFiles(TEST_PDF2);
    await page.getByPlaceholder('รหัสผ่านสำหรับเปิดไฟล์ .p12').fill('titp@swtech');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ยื่นคำขอ' }).click();    
    await page.getByRole('button', { name: 'ตกลง' }).click();
    const requestNo = await page.locator('.text-medium-emphasis.mb-2').first().textContent();
    console.log('เลขคำขอ:', requestNo?.trim());     

})