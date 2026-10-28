import { expect, Page, Locator,test, } from '@playwright/test';
import path from 'path';
const TEST_PDF1 = path.join(__dirname, '..', 'test-files', 'ONLY TEST.pdf');
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




test('make R4', async ({ page }) => {
    await page.goto('https://submission-sit.thainsw.net/submission/sign-in?id=pbo2uRaPgdg9Sd1uM0zzJtb2N6Tj8HdfW3rtm/ia5t4=&profileName=X9BGhh7Ic0ieQl/eZAFWog==&email=QYNFjVme700jr4yV6tvXrcSMY6XiWhRE10rblATXCFeFcHqRUNS3bb+3nCBYaZOa5wE3kaZnl82yy04DJv5nzA==');
    await page.getByText('คำขอสำหรับการนำเข้า', { exact: true }).click();
    await page.getByText('บริษัท เอส.ดับบลิว เทค แอนด์ มีเดีย จำกัด', { exact: true }).click();
    await page.getByText('สร้างคำขอ', { exact: true }).click();
    await page.getByPlaceholder('เลขที่บัญชีราคาสินค้า').fill('TI20261006028102026');
    await page.locator('button:has(.mdi-magnify)').click();

    const row = page.getByRole('row').filter({ hasText: 'TI20261006028102026' });
    await expect(row).toBeVisible({ timeout: 10000 });  // เช็คผลค้นหาขึ้นในตาราง
    console.log('เจอ Invoice');
    await row.getByRole('checkbox').check();  
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('checkbox', { name: 'หนังสือรับรองแสดงการได้รับสิทธิ WTO สำหรับภาษีนอกโควต้า (ร.4)' }).check();
    const productRow = page.getByRole('row').filter({ hasText: 'เมล็ดหอมหัวใหญ่' });
    await productRow.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();

    const invoiceRow = page.getByRole('row').filter({ hasText: 'TI20261006028102026' });
    const invoiceCheckbox = invoiceRow.getByRole('checkbox');
    await invoiceCheckbox.check();
    await expect(invoiceCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    await page.getByRole('radio', { name: 'กรณีสินค้ายังมิได้ส่งจากต้นทาง' }).check();
    await page.getByPlaceholder('ข้อความคำชี้แจงและเหตุผลในการขอใบอนุญาต').fill('สำหรับการทดสอบระบบ');
    const paymentTerm5 = page.getByRole('combobox', { name: 'วิธีขนส่งสินค้า', exact: true });
    await paymentTerm5.click();
    await paymentTerm5.fill('ทางเรือ');
    await page.getByRole('option', { name: 'ทางเรือ', exact: true }).click();
    await page.getByPlaceholder('ชื่อยานพาหนะ').fill('USS');   

    const exportDate1 = page.locator('p:has-text("วันที่นำเข้า") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, exportDate1, today());

    const paymentTerm2 = page.getByRole('combobox', { name: 'เลือกสถานที่นำเข้า', exact: true });
    await paymentTerm2.click();
    await paymentTerm2.fill('0119 - ท่าเรือกรุงเทพ สทก.');
    await page.getByRole('option', { name: '0119 - ท่าเรือกรุงเทพ สทก.' }).nth(0).click();  
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('tab', { name: 'รายการสินค้า' }).click();
    const invoiceRow1 = page.getByRole('row').filter({ hasText: 'TI20261006028102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    await page.getByPlaceholder('น้ำหนักของการบรรจุกระสอบ (กิโลกรัม)').fill('100');

    await page.getByRole('combobox', { name: 'รูปแบบการคำนวณราคา' }).click();
    await page.getByPlaceholder('รูปแบบการคำนวณราคา').fill('ต่อหน่วยของน้ำหนัก (กก.)');
    await page.getByRole('option', { name: 'ต่อหน่วยของน้ำหนัก (กก.)' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click(); 
    await page.getByRole('button', { name: 'ถัดไป' }).click(); 
    
    await page.locator('li').filter({ hasText: 'หนังสือรับรองแสดงการได้รับสิทธิ WTO สำหรับภาษีนอกโควต้า (ร.4)' }).locator('.button-group').getByRole('button', { name: 'แนบไฟล์' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();  
    const paymentTerm13 = page.getByRole('combobox', { name: 'ประเภทเอกสาร', exact: true });
    await paymentTerm13.click();
    await paymentTerm13.fill('ใบกำกับการบรรจุหีบห่อสินค้า (Packing List)');
    await page.getByRole('option', { name: 'ใบกำกับการบรรจุหีบห่อสินค้า (Packing List)' }).nth(0).click();
    await page.getByPlaceholder('ชื่อเอกสาร').fill('TEST');  
    await page.locator('input[type="file"]').setInputFiles(TEST_PDF1);
    await page.getByRole('button', { name: 'บันทึกไฟล์แนบ' }).click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('button:has(.mdi-close)').first().click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.locator('input[type="file"]').setInputFiles(TEST_PDF2);
    await page.getByPlaceholder('รหัสผ่านสำหรับเปิดไฟล์ .p12').fill('titp@swtech');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ยื่นคำขอ' }).click();    
    await page.getByRole('button', { name: 'ตกลง' }).click();
    const requestNo = await page.locator('.text-medium-emphasis.mb-2').first().textContent();
    console.log('เลขคำขอ:', requestNo?.trim()); 

})