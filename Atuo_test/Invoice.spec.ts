import { test, expect, Page, Locator } from '@playwright/test';
import path from 'path';
const TEST_PDF = path.join(__dirname, '..', 'test-files', 'ONLY TEST.pdf');

test('make Invoice', async ({ page }) => {
    await page.goto('https://submission-sit.thainsw.net/submission/sign-in?id=pbo2uRaPgdg9Sd1uM0zzJtb2N6Tj8HdfW3rtm/ia5t4=&profileName=X9BGhh7Ic0ieQl/eZAFWog==&email=QYNFjVme700jr4yV6tvXrcSMY6XiWhRE10rblATXCFeFcHqRUNS3bb+3nCBYaZOa5wE3kaZnl82yy04DJv5nzA==');
    await page.getByText('คำขอสำหรับการส่งออก', { exact: true }).click();
    await page.getByText('บริษัท เอส.ดับบลิว เทค แอนด์ มีเดีย จำกัด', { exact: true }).click();
    await page.getByText('สร้าง', { exact: true }).click();

    await expect(page.getByText('ผู้ขาย').nth(0)).toBeVisible();
    console.log('ผู้ขาย');

    await page.getByRole('radio', { name: 'ใช้ข้อมูลผู้ส่งออก' }).click();
    console.log('S.W. TECH & MEDIA CO., LTD.');
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    
    console.log('ผู้ซื้อ');
    /** await page.getByRole('button', { name: 'เพิ่มผู้ซื้อ' }).click();
    console.log('เพิ่มผู้ซื้อ');
    await page.getByPlaceholder('ชื่อผู้ซื้อ (ภาษาอังกฤษ)').fill('Test Buyer 2');
    await page.getByPlaceholder('ที่อยู่บรรทัดที่ 1').fill('ROOM 611, JOY WING MAU BINHAI TOWER');
    await page.getByPlaceholder('เมือง').fill('Shenzhen');
    await page.getByPlaceholder('รัฐ / มณฑล / จังหวัด').fill('Guangdong');
    await page.getByRole('textbox', { name: 'รหัสไปรษณีย์' }).fill('10110');

    await page.getByRole('combobox', { name: 'ประเทศ' }).click();
    await page.getByPlaceholder('ประเทศ').fill('China');
    await page.getByRole('option', { name: 'China' }).click(); 

    await page.getByRole('textbox', { name: /โทรศัพท์/ }).fill('075 588 888');
    await page.getByRole('textbox', { name: 'อีเมล' }).fill('joywingmau@gmail.com');
    await page.getByRole('button', { name: 'ตกลง' }).click(); **/
    await page.locator('button.custom-page-btn.pa-0:has(.mdi-chevron-double-right)').click();
    await page
    .getByRole('row')
    .filter({ hasText: 'Test Buyer 2' })
    .getByRole('radio')
    .check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('radio', { name: 'Commercial Invoice' }).check();
    const invoiceNo = page.getByPlaceholder('เลขที่บัญชีราคาสินค้า', { exact: true });

    await expect(async () => {
    await invoiceNo.fill('TI20261006006102026');
    await expect(invoiceNo).toHaveValue('TI20261006006102026', { timeout: 1000 });
    }).toPass({ timeout: 15000 });
    await page.getByRole('combobox', { name: 'เงื่อนไขการส่งมอบ' }).click();
    await page.getByPlaceholder('เงื่อนไขการส่งมอบ').fill('EXW - EX Works');
    await page.getByRole('option', { name: 'EXW - EX Works' }).click(); 

    const paymentTerm = page.getByRole('combobox', { name: 'เงื่อนไขการชำระเงิน', exact: true });
    
    await paymentTerm.click();
    await paymentTerm.fill('Telegraphic Transfer');

    await page.getByRole('option', { name: 'Telegraphic Transfer' }).click();
    await page.getByRole('button', { name: 'เพิ่มสินค้า' }).click();
    await page.getByRole('textbox', { name: 'ลำดับในบัญชีราคาสินค้า' }).fill('1');

    await page.getByRole('combobox', { name: 'สินค้าตามพิกัด' }).click();
    await page.getByPlaceholder('สินค้าตามพิกัด').fill('08119000-002-ทุเรียน แช่เย็นจนแข็ง');
    await page.getByRole('option', { name: '08119000-002-ทุเรียน แช่เย็นจนแข็ง' }).click(); 
    console.log('ทุเรียน แช่เย็นจนแข็ง');

    await page.getByPlaceholder('รายละเอียดสินค้า (ภาษาไทย)').fill('ทุเรียน แช่เย็นจนแข็ง');
    await page.getByPlaceholder('ปริมาณ / จำนวน').fill('200');

    await page.getByRole('combobox', { name: 'หน่วยของปริมาณ' }).click();
    await page.getByPlaceholder('หน่วยของปริมาณ').fill('kgm');
    await page.getByRole('option', { name: 'KGM - kilogram' }).click(); 

    await page.getByRole('textbox', { name: 'น้ำหนักสุทธิ' }).fill('1000');
    const weightUnit = page.getByPlaceholder('หน่วยน้ำหนักสุทธิ', { exact: true });
    await weightUnit.click();
    await page.getByRole('option', { name: 'KGM - kilogram' }).click();
    await page.getByPlaceholder('มูลค่ารวม (ตามสกุลเงินที่ระบุ)').fill('70000');
    await page.getByRole('button', { name: 'ตกลง' }).click();
    await page.getByRole('button', { name: 'ถัดไป' }).click();

    await page.locator('input[type="file"]').setInputFiles(TEST_PDF);
    
    test.setTimeout(0);
    await page.pause();
});