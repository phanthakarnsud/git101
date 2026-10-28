import { test, expect, Page, Locator } from '@playwright/test';
const TEST_PDF1 = path.join(__dirname, '..', 'test-files', 'ONLY TEST.pdf');
const TEST_PDF2 = path.join(__dirname, '..', 'test-files', 'SWTECHANDMEDIACOLTD.p12');
import path from 'path';


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

    async function fillAndConfirm(input: Locator, value: string) {
        await expect(async () => {
        await input.fill(value);
        await input.press('Tab');
        await expect(input).toHaveValue(new RegExp(`^${value}`), { timeout: 1000 });
        }).toPass({ timeout: 15000 });
    }


  test('make Mks7', async ({ page }) => {
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
    await page.getByRole('checkbox', { name: 'หนังสือแจ้งการส่งออกสินค้าเกษตรตามมาตรฐานบังคับ (มกษ.7)' }).check();
    const productRow1 = page.getByRole('row').filter({ hasText: 'ทุเรียน แช่เย็นจนแข็ง' });
    await productRow1.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();

    const authorizedId = page.getByPlaceholder('เลขบัตรประจำตัวประชาชนของผู้รับมอบอำนาจ');
    await expect(authorizedId).toBeVisible();
    await expect(authorizedId).toBeEditable();
    await fillAndConfirm(authorizedId, '1199900805663');    

    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await expect(page.getByText('ข้อมูลผู้รับปลายทาง')).toBeVisible();

    // ถัดไป ครั้งที่ 2 รอให้ช่องน้ำหนักพร้อมให้กรอก
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    const actualWeight = page.getByPlaceholder('น้ำหนักจริงที่จะส่งออก (KGM)');
    await expect(actualWeight).toBeVisible();
    await expect(actualWeight).toBeEditable();

    // รอให้หน้าโหลดข้อมูลจาก server เสร็จ
    await page.waitForLoadState('networkidle');
    await fillAndConfirm(actualWeight, '200');

    
    const paymentTerm10 = page.getByRole('combobox', { name: 'ด่านตรวจสินค้าเกษตร ', exact: true });
    await paymentTerm10.click();
    await paymentTerm10.fill('ด่านตรวจพืชท่าอากาศยานดอนเมือง');
    await page.getByRole('option', { name: 'ด่านตรวจพืชท่าอากาศยานดอนเมือง' }).nth(0).click();   

    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(0).click(); 
    await page.getByRole('radio', { name: 'ซื้อจากผู้ผลิตโดยตรง' }).check();
    await page.getByPlaceholder('เลขที่ใบอนุญาตผู้ผลิต').fill('ACFS90460200158');   
    await page.getByPlaceholder('เลขประจำตัวผู้เสียภาษีอากรของหน่วยงานผู้ออกใบอนุญาต').fill('0994000037015');

    const issueDate = page.locator('p:has-text("วันที่ออกใบอนุญาต") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate, '22/05/2025');

    const issueDate2 = page.locator('p:has-text("วันที่หมดอายุใบอนุญาต") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate2, '21/05/2028');

    const exportDate = page.locator('p:has-text("วันที่รับซื้อจากโรงรม") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, exportDate, today());

  
    await page.getByPlaceholder('หมายเลขตู้คอนเทนเนอร์ / หมายเลข Seal / ทะเบียนรถลาก').nth(0).fill('TU1234');   
    await page.getByPlaceholder('หมายเลข Seal').nth(1).fill('TU1234');   
    await page.getByPlaceholder('ปริมาณสุทธิที่ผู้ผลิตขายสินค้า / ปริมาณสุทธิที่ผู้รวบรวมขายสินค้า (กิโลกรัม)').fill('1,200.000');   
    await page.getByRole('button', { name: 'ตกลง' }).click();   
    
    const invoiceRow = page.getByRole('row').filter({ hasText: 'TI20261006006102026' });
    const invoiceCheckbox = invoiceRow.getByRole('checkbox');
    await invoiceCheckbox.check();
    await expect(invoiceCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(1).click();      

    const paymentTerm1 = page.getByRole('combobox', { name: 'วิธีขนส่งสินค้า', exact: true });
    await paymentTerm1.click();
    await paymentTerm1.fill('ทางเรือ');
    await page.getByRole('option', { name: 'ทางเรือ' }).nth(0).click();  

    const exportDate1 = page.locator('p:has-text("วันที่ส่งออก") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, exportDate1, today());

    const paymentTerm2 = page.getByRole('combobox', { name: 'สถานที่ส่งออก', exact: true });
    await paymentTerm2.click();
    await paymentTerm2.fill('0119 - ท่าเรือกรุงเทพ สทก.');
    await page.getByRole('option', { name: '0119 - ท่าเรือกรุงเทพ สทก.' }).nth(0).click();  

    const deliveryDate = page.locator('p:has-text("วันที่กำหนดส่งมอบ") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, deliveryDate, today(5));
    await page.getByRole('button', { name: 'ตกลง' }).click();

    await page.getByRole('tab', { name: 'ตู้บรรจุสินค้า' }).click();
    const invoiceRow1 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(1).click();      
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(2).click(); 
    const dialog = page.getByRole('dialog');
    const containerRow2 = dialog  // แถวที่มีช่องให้กรอก (แถวที่เพิ่งเพิ่มใหม่)
    .getByRole('row')
    .filter({ has: page.getByRole('textbox') })
    .last();
    const inputs = containerRow2.getByRole('textbox');
    await inputs.nth(0).fill('MSCU1234567');   
    await inputs.nth(1).fill('SEAL001');       
    await inputs.nth(2).fill('70-1234');   
    await containerRow2.locator('button:has(.lucide-check-icon)').click();
    await dialog.locator('button:has(.mdi-close)').first().click();

    await page.getByRole('tab', { name: 'ใบรับรองมาตรฐานสินค้า' }).click();
    const invoiceRow2 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow2).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    const productRow3 = page
    .getByRole('row')
    .filter({ hasText: 'ทุเรียน แช่เย็นจนแข็ง' })
    .filter({ visible: true });
    await expect(productRow3).toHaveCount(1);   // รอแท็บเปลี่ยนเสร็จ
    await productRow3.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    
    const productRow4 = page
    .getByRole('row')
    .filter({ hasText: 'ใบรับรองมาตรฐานสินค้า (Certificate of Standard)' })
    .filter({ visible: true });
    await expect(productRow4).toHaveCount(1);   
    await productRow4.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    await page.getByPlaceholder('ชื่อมาตรฐาน').fill('ทุเรียนแช่เยือกแข็ง');
    await page.getByPlaceholder('ชื่อผู้ได้รับการรับรองมาตรฐาน').fill('บริษัท เอส.ดับบลิว เทค แอนด์ มีเดีย จำกัด');   
    await page.getByPlaceholder('เลขที่ใบรับรองมาตรฐานสินค้า').fill('GAP123456');
    const paymentTerm3 = page.getByRole('combobox', { name: 'หน่วยงานรับรอง', exact: true });
    await paymentTerm3.click();
    await paymentTerm3.fill('บริษัท ไทย จี เอ พี 09 จำกัด');
    await page.getByRole('option', { name: 'บริษัท ไทย จี เอ พี 09 จำกัด' }).nth(0).click();  
    const issueDate3 = page.locator('p:has-text("ออกให้เมื่อวันที่") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate3, '01/05/2025');
    const issueDate4 = page.locator('p:has-text("หมดอายุวันที่") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate4, '21/05/2027');
    await page.getByRole('button', { name: 'ตกลง' }).click();

    const productRow5 = page
    .getByRole('row')
    .filter({ hasText: 'ใบรายงานผลการวิเคราะห์ (เช่น Test Report Alflatoxin Certificate)' })
    .filter({ visible: true });
    await expect(productRow5).toHaveCount(1);   
    await productRow5.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();
    const paymentTerm4 = page.getByRole('combobox', { name: 'หน่วยงานรับรอง', exact: true });
    await paymentTerm4.click();
    await paymentTerm4.fill('บริษัท ไทย จี เอ พี 09 จำกัด');
    await page.getByRole('option', { name: 'บริษัท ไทย จี เอ พี 09 จำกัด' }).nth(0).click();  
    const issueDate5 = page.locator('p:has-text("ออกให้เมื่อวันที่ ") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate5, '01/05/2025');
    await page.getByPlaceholder('เลขที่ใบรายงานผลวิเคราะห์').fill('test001');
    await page.getByPlaceholder('สารที่ทดสอบ').fill('test002');
    await page.getByPlaceholder('ผลการวิเคราะห์ (ppb หรือ μg/kg)').fill('test003');
    await page.getByPlaceholder('ปริมาณ (KGM)').fill('12');
    await page.getByPlaceholder('หน่วยเลขที่ลอต').fill('test004');
    const issueDate6 = page.locator('p:has-text("วันที่วิเคราะห์") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate6, '01/10/2026');
    await page.getByPlaceholder('วิธีการวิเคราะห์').fill('test005');  
    await page.getByRole('button', { name: 'ตกลง' }).click();

    const productRow6 = page
    .getByRole('row')
    .filter({ hasText: 'อื่น ๆ (เช่น Certification of Origin)' })
    .filter({ visible: true });
    await expect(productRow6).toHaveCount(1);   
    await productRow6.getByRole('button', { name: 'เพิ่มข้อมูล' }).click();   
    await page.getByPlaceholder('เลขที่ใบรับรองมาตรฐานสินค้า').fill('GAP123456');
    const paymentTerm6 = page.getByRole('combobox', { name: 'หน่วยงานรับรอง', exact: true });
    await paymentTerm6.click();
    await paymentTerm6.fill('บริษัท ไทย จี เอ พี 09 จำกัด');
    await page.getByRole('option', { name: 'บริษัท ไทย จี เอ พี 09 จำกัด' }).nth(0).click(); 
    const issueDate7 = page.locator('p:has-text("ออกให้เมื่อวันที่") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate7, '01/05/2025');
    const issueDate8 = page.locator('p:has-text("หมดอายุวันที่") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate8, '21/05/2027');
    await page.getByPlaceholder('ชื่อเอกสาร').fill('test001');
    await page.getByPlaceholder('เลขที่เอกสาร').fill('123456');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'บันทึกทั้งหมด' }).click();

    await page.getByRole('tab', { name: 'สถานที่เก็บ' }).click();
    const invoiceRow6 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow6).toHaveCount(1); 
    await invoiceRow6.getByRole('checkbox').check();
    await expect(invoiceRow6.getByRole('checkbox')).toBeChecked();    
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(1).click();

    await page.getByRole('radio', { name: 'เจ้าของ' }).check();
    await page.getByPlaceholder('ชื่อสถานที่เก็บ / เลี้ยงหรือกักดูอาการ').fill('สุดใจการค้า');
    await page.getByPlaceholder('เลขที่, อาคาร / หมู่บ้าน, ชั้น').fill('123');
    await page.getByPlaceholder('หมู่').nth(5).fill('7');
    await page.getByPlaceholder('ตรอก / ซอย').nth(2).fill('6');
    await page.getByPlaceholder('ถนน').nth(2).fill('5');
    const paymentTerm8 = page.getByRole('combobox', { name: 'จังหวัด', exact: true });
    await paymentTerm8.click();
    await paymentTerm8.fill('กรุงเทพมหานคร');
    await page.getByRole('option', { name: 'กรุงเทพมหานคร' }).click();
    const paymentTerm9 = page.getByRole('combobox', { name: 'เขต / อำเภอ', exact: true });
    await paymentTerm9.click();
    await paymentTerm9.fill('พระนคร');
    await page.getByRole('option', { name: 'พระนคร' }).click();
    const paymentTerm11 = page.getByRole('combobox', { name: 'แขวง / ตำบล', exact: true });
    await paymentTerm11.click();
    await paymentTerm11.fill('วังบูรพาภิรมย์');
    await page.getByRole('option', { name: 'วังบูรพาภิรมย์' }).click();
    await page.getByPlaceholder('โทรสาร').nth(4).fill('0987787776');   
    await page.getByRole('button', { name: 'ตกลง' }).click();

    await page.getByRole('tab', { name: 'ใบอนุญาต' }).click();
    const invoiceRow7 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow7).toHaveCount(1); 
    const headerCheckbox = page.locator('.header-checkbox-container').filter({ visible: true });
    await headerCheckbox.locator('.v-selection-control').click();
    await expect(headerCheckbox.locator('.mdi-checkbox-marked')).toBeVisible();
    await page.getByRole('button', { name: 'เพิ่ม/แก้ไขข้อมูล' }).nth(1).click();
    await page.getByPlaceholder('เลขที่ใบอนุญาต').fill('ACFS90460400284');
    const issueDate9 = page.locator('p:has-text("วันที่ออกใบอนุญาต") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate9, '22/05/2025');
    const issueDate10 = page.locator('p:has-text("วันที่หมดอายุใบอนุญาต") + .dp__main').locator('[data-test-id="dp-input"]');
    await selectDate(page, issueDate10, '21/05/2028');
    const paymentTerm12 = page.getByRole('combobox', { name: 'ประเภทใบอนุญาต', exact: true });
    await paymentTerm12.click();
    await paymentTerm12.fill('เลขใบอนุญาต มกษ.4');
    await page.getByRole('option', { name: 'เลขใบอนุญาต มกษ.4' }).nth(0).click();  
    await page.getByRole('button', { name: 'ตกลง' }).click();      
    await page.getByRole('button', { name: 'ถัดไป' }).click(); 

    await page.locator('li').filter({ hasText: 'มกษ.7' }).locator('.button-group').getByRole('button', { name: 'แนบไฟล์' }).click();
    await page.getByRole('button', { name: 'ตกลง' }).click();  
    const paymentTerm13 = page.getByRole('combobox', { name: 'ประเภทเอกสาร', exact: true });
    await paymentTerm13.click();
    await paymentTerm13.fill('ใบรับรองมาตรฐานสินค้า (Certificate of Standard)');
    await page.getByRole('option', { name: 'ใบรับรองมาตรฐานสินค้า (Certificate of Standard)' }).nth(0).click();  
    await page.locator('input[type="file"]').setInputFiles(TEST_PDF1);
    await page.getByRole('button', { name: 'บันทึกไฟล์แนบ' }).click();
    await dialog.locator('button:has(.mdi-close)').first().click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();

    await page.locator('input[type="file"]').setInputFiles(TEST_PDF2);
    await page.getByPlaceholder('รหัสผ่านสำหรับเปิดไฟล์ .p12').fill('titp@swtech');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ยื่นคำขอ' }).click();    
    await page.getByRole('button', { name: 'ตกลง' }).click();
    const requestNo = await page.locator('.text-medium-emphasis.mb-2').first().textContent();
    console.log('เลขคำขอ:', requestNo?.trim()); 

});

