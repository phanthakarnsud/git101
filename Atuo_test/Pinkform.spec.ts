import { test, expect } from '@playwright/test';
import path from 'path/win32';
const TEST_PDF = path.join(__dirname, '..', 'test-files', 'SWTECHANDMEDIACOLTD.p12');


test('make Pinkform', async ({ page }) => {
    await page.goto('https://submission-sit.thainsw.net/submission/sign-in?id=pbo2uRaPgdg9Sd1uM0zzJtb2N6Tj8HdfW3rtm/ia5t4=&profileName=X9BGhh7Ic0ieQl/eZAFWog==&email=QYNFjVme700jr4yV6tvXrcSMY6XiWhRE10rblATXCFeFcHqRUNS3bb+3nCBYaZOa5wE3kaZnl82yy04DJv5nzA==');
    await page.getByText('คำขอสำหรับการส่งออก', { exact: true }).click();
    await page.getByText('บริษัท เอส.ดับบลิว เทค แอนด์ มีเดีย จำกัด', { exact: true }).click();
    await page.getByText('สร้างคำขอ', { exact: true }).click();
    await page.getByPlaceholder('เลขที่บัญชีราคาสินค้า').fill('TI20261006006102026');
    await page.locator('button:has(.mdi-magnify)').click();

    const row = page.getByRole('row').filter({ hasText: 'TI20261006006102026' });
    await expect(row).toBeVisible({ timeout: 10000 });  // เช็คผลค้นหาขึ้นในตาราง
    console.log('เจอ Invoice');
    await row.getByRole('checkbox').check();  
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('checkbox', { name: 'ใบรับรองแหล่งผลิตแหล่งกำเนิดอาหารปลอดโรค (Pinkform)' }).check();
    const productRow = page.getByRole('row').filter({ hasText: 'ทุเรียน แช่เย็นจนแข็ง' });
    await productRow.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();
    await page.locator('input[placeholder="เลขที่, อาคาร/หมู่บ้าน, ชั้น"]:not([readonly])').fill('ROOM 611, JOY WING MAU BINHAI TOWER')
    const paymentTerm = page.getByRole('combobox', { name: 'เมือง / จังหวัด', exact: true });
    await paymentTerm.click();
    await paymentTerm.fill('Bangkok');
    await page.getByRole('option', { name: 'Bangkok' }).click();

    const paymentTerm2 = page.getByRole('combobox', { name: 'เขต / อำเภอ', exact: true });
    await paymentTerm2.click();
    await paymentTerm2.fill('Phaya Thai');
    await page.getByRole('option', { name: 'Phaya Thai' }).click();

    const paymentTerm3 = page.getByRole('combobox', { name: 'แขวง / ตำบล', exact: true });
    await paymentTerm3.click();
    await paymentTerm3.fill('Sam Sen Nai');
    await page.getByRole('option', { name: 'Sam Sen Nai' }).click();

    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();

    const invoiceRow = page.getByRole('row').filter({ hasText: 'TI20261006006102026' });
    const invoiceCheckbox = invoiceRow.getByRole('checkbox');
    await invoiceCheckbox.check();
    await expect(invoiceCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();

    const paymentTerm4 = page.getByRole('combobox', { name: 'วัตถุประสงค์ในการส่งออก', exact: true });
    await paymentTerm4.click();
    await paymentTerm4.fill('จำหน่าย');
    await page.getByRole('option', { name: 'จำหน่าย' }).click();  
    
    const paymentTerm5 = page.getByRole('combobox', { name: 'วิธีขนส่งสินค้า', exact: true });
    await paymentTerm5.click();
    await paymentTerm5.fill('ทางเรือ');
    await page.getByRole('option', { name: 'ทางเรือ', exact: true }).click();
    await page.locator('[data-test-id="dp-input"]').click();
    await page.locator('.dp__today').click();  // คลิกวันปัจจุบัน

    const paymentTerm6 = page.getByRole('combobox', { name: 'เมืองท่าปลายทาง', exact: true });
    await paymentTerm6.click();
    await paymentTerm6.fill('CNAAT(ALTAY)');
    await page.getByRole('option', { name: 'CNAAT(ALTAY)', exact: true }).click();
    await page.getByPlaceholder('จำนวนสำเนาใบรับรองที่ต้องการ').fill('1');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('tab', { name: 'รายการสินค้า' }).click();
    const invoiceRow1 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();

    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();

    const paymentTerm7 = page.getByRole('combobox', { name: 'ประเภทอาหาร', exact: true });
    await paymentTerm7.click();
    await paymentTerm7.fill('ผลไม้');
    await page.getByRole('option', { name: 'ผลไม้' }).click();  

    const mfgDate = page.locator('p:has-text("วันที่ผลิตสินค้า") + .dp__main').locator('[data-test-id="dp-input"]');
    await mfgDate.click();
    await page.locator('.dp__calendar_item:not(:has(.dp__cell_offset))').getByText('1', { exact: true }).click();
    await expect(mfgDate).toHaveValue('01/10/2026');
    console.log('เลือกวันที่ผลิตสินค้า: 01/10/2026');

    const expDate = page.locator('p:has-text("วันที่หมดอายุสินค้า") + .dp__main').locator('[data-test-id="dp-input"]');
    await expDate.click();
    await page.locator('.dp__calendar_item:not(:has(.dp__cell_offset))').getByText('30', { exact: true }).click();
    await expect(expDate).toHaveValue('30/10/2026');
    console.log('เลือกวันที่หมดอายุสินค้า: 30/10/2026');

    const paymentTerm8 = page.getByRole('combobox', { name: 'จังหวัดที่ผลิตสินค้า', exact: true });
    await paymentTerm8.click();
    await paymentTerm8.fill('กรุงเทพมหานคร');
    await page.getByRole('option', { name: 'กรุงเทพมหานคร' }).click(); 
    
    const paymentTerm9 = page.getByRole('combobox', { name: 'อำเภอที่ผลิตสินค้า', exact: true });
    await paymentTerm9.click();
    await paymentTerm9.fill('พระนคร');
    await page.getByRole('option', { name: 'พระนคร' }).click();  

    const paymentTerm10 = page.getByRole('combobox', { name: 'ตำบลที่ผลิตสินค้า', exact: true });
    await paymentTerm10.click();
    await paymentTerm10.fill('พระบรมมหาราชวัง');
    await page.getByRole('option', { name: 'พระบรมมหาราชวัง' }).click();

    const paymentTerm11 = page.getByRole('combobox', { name: 'ลักษณะหีบห่อ / บรรจุภัณฑ์', exact: true });
    await paymentTerm11.click();
    await paymentTerm11.fill('1A - Drum, steel');
    await page.getByRole('option', { name: '1A - Drum, steel' }).click();   
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();

    await page.locator('input[type="file"]').setInputFiles(TEST_PDF);

    await page.getByPlaceholder('รหัสผ่านสำหรับเปิดไฟล์ .p12').fill('titp@swtech');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ยื่นคำขอ' }).click();    
    await page.getByRole('button', { name: 'ตกลง' }).click();
    const requestNo = await page.locator('.text-medium-emphasis.mb-2').first().textContent();
    console.log('เลขคำขอ:', requestNo?.trim());      
});
