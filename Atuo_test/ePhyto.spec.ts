import { test, expect } from '@playwright/test';
import path from 'path/win32';
const TEST_PDF1 = path.join(__dirname, '..', 'test-files', 'ONLY TEST.pdf');
const TEST_PDF2 = path.join(__dirname, '..', 'test-files', 'SWTECHANDMEDIACOLTD.p12');


test('make ePhyto', async ({ page }) => {
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

    await page.getByRole('checkbox', { name: 'ใบรับรองสุขอนามัยพืช (พ.ก.7)' }).check();
    const productRow1 = page.getByRole('row').filter({ hasText: 'ทุเรียน แช่เย็นจนแข็ง' });
    await productRow1.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.getByRole('button', { name: 'บันทึก' }).click();

    const paymentTerm1 = page.getByRole('combobox', { name: 'ประเภทเอกสารของผู้ขอ', exact: true });
    await paymentTerm1.click();
    await paymentTerm1.fill('เลขประจำตัวผู้เสียภาษี');
    await page.getByRole('option', { name: 'เลขประจำตัวผู้เสียภาษี' }).click();
    await page.locator('input[placeholder="เลขที่, อาคาร/หมู่บ้าน, ชั้น"]:not([readonly])').fill('408/72  PHAHOLYOTHIN PLACE')
    await page.locator('input[placeholder="หมู่"]:not([readonly])').fill('-')
    await page.locator('input[placeholder="ตรอก / ซอย"]:not([readonly])').fill('-')    
    await page.locator('input[placeholder="ถนน"]:not([readonly])').fill('Phahonyothin')

    const paymentTerm2 = page.getByRole('combobox', { name: 'เมือง / จังหวัด', exact: true });
    await paymentTerm2.click();
    await paymentTerm2.fill('Bangkok');
    await page.getByRole('option', { name: 'Bangkok' }).click();

    const paymentTerm3 = page.getByRole('combobox', { name: 'เขต / อำเภอ', exact: true });
    await paymentTerm3.click();
    await paymentTerm3.fill('Phaya Thai');
    await page.getByRole('option', { name: 'Phaya Thai' }).click();

    const paymentTerm4 = page.getByRole('combobox', { name: 'แขวง / ตำบล', exact: true });
    await paymentTerm4.click();
    await paymentTerm4.fill('Sam Sen Nai');
    await page.getByRole('option', { name: 'Sam Sen Nai' }).click();

    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await page.locator('input[placeholder="เลขประจำตัวผู้เสียภาษี (Tax ID)"]:not([readonly])').fill('1122233433334')
    await page.getByRole('button', { name: 'ถัดไป' }).click();
    await expect(row).toBeVisible({ timeout: 10000 });
    await page.getByPlaceholder('น้ำหนักสุทธิรวม').fill('1000');     
    await page.getByPlaceholder('จำนวนภาชนะบรรจุทั้งหมด').fill('1200'); 

    const paymentTerm5 = page.getByRole('combobox', { name: 'ลักษณะหีบห่อ / บรรจุภัณฑ์', exact: true });
    await paymentTerm5.click();
    await paymentTerm5.fill('Carton ');
    await page.getByRole('option', { name: 'Carton' }).click();

    await page.getByPlaceholder('น้ำหนักรวมภาชนะบรรจุ (Gross Weight)').fill('1000'); 
    const paymentTerm6 = page.getByRole('combobox', { name: 'สถานที่ขอออกใบรับรอง ', exact: true });
    await paymentTerm6.click();
    await paymentTerm6.fill('ด่านตรวจพืชท่าอากาศยานดอนเมือง');
    await page.getByRole('option', { name: 'ด่านตรวจพืชท่าอากาศยานดอนเมือง' }).click();
    await page.getByRole('radio', { name: 'ตรวจในสถานที่' }).check();

    const paymentTerm7 = page.getByRole('combobox', { name: 'ด่านที่ตรวจสอบสินค้า', exact: true });
    await paymentTerm7.click();
    await paymentTerm7.fill('ด่านตรวจพืชท่าอากาศยานดอนเมือง');
    await page.getByRole('option', { name: 'ด่านตรวจพืชท่าอากาศยานดอนเมือง' }).click();
    await page.getByPlaceholder('DD/MM/YYYY').click();  
    await page.locator('.dp__today').click();
    const timeInput = page.getByPlaceholder('HH:mm');
    await timeInput.click();
    await page.locator('.dp__action_select').click();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(2).click();   
    await page.getByPlaceholder('เครื่องหมายบนภาชนะ').fill('NO MARK'); 
    await page.getByRole('button', { name: 'ตกลง' }).click();

    const invoiceRow = page.getByRole('row').filter({ hasText: 'TI20261006006102026' });
    const invoiceCheckbox = invoiceRow.getByRole('checkbox');
    await invoiceCheckbox.check();
    await expect(invoiceCheckbox).toBeChecked();
    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(3).click();   

    const paymentTerm8 = page.getByRole('combobox', { name: 'วิธีขนส่งสินค้า', exact: true });
    await paymentTerm8.click();
    await paymentTerm8.fill('ทางเรือ');
    await page.getByRole('option', { name: 'ทางเรือ', exact: true }).click();
    await page.getByPlaceholder('ชื่อยานพาหนะ').fill('USS');
    await page.getByRole('dialog').getByPlaceholder('DD/MM/YYYY').click();
    await page.locator('.dp__today').click();   
    const paymentTerm9 = page.getByRole('combobox', { name: 'สถานที่ส่งออก', exact: true });
    await paymentTerm9.click();
    await paymentTerm9.fill('0010 - กรมศุลกากร');
    await page.getByRole('option', { name: '0010 - กรมศุลกากร' }).click(); 
    const paymentTerm10 = page.getByRole('combobox', { name: 'เมืองท่าปลายทาง', exact: true });
    await paymentTerm10.click();
    await paymentTerm10.fill('CNAAT(ALTAY)');
    await page.getByRole('option', { name: 'CNAAT(ALTAY)' }).click();  
    await page.getByRole('button', { name: 'ตกลง' }).click();   
    await page.getByRole('tab', { name: 'รายการสินค้า' }).click();
    const invoiceRow1 = page.getByRole('row').filter({ hasText: 'TI20261006006102026' }).filter({ visible: true });
    await expect(invoiceRow1).toHaveCount(1); // รอจนเหลือแถวที่มองเห็นแค่ 1 แถว (แท็บเก่าเลื่อนออกไปหมดแล้ว)
    await invoiceRow1.getByRole('checkbox').check();
    await expect(invoiceRow1.getByRole('checkbox')).toBeChecked();

    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(3).click();   

    const paymentTerm11 = page.getByRole('combobox', { name: 'ชื่อสินค้า (ePhyto)', exact: true });
    await paymentTerm11.click();
    await paymentTerm11.fill('ทุเรียน (จีน-ทางเรือ/ทางอากาศ)');
    await page.getByRole('option', { name: 'ทุเรียน (จีน-ทางเรือ/ทางอากาศ)' }).click();  

    const paymentTerm12 = page.getByRole('combobox', { name: 'วัตถุประสงค์', exact: true });
    await paymentTerm12.click();
    await paymentTerm12.fill('บริโภค');
    await page.getByRole('option', { name: 'บริโภค' }).click();  

    const paymentTerm13 = page.getByRole('combobox', { name: 'ระดับชั้นของภาชนะบรรจุ', exact: true });
    await paymentTerm13.click();
    await paymentTerm13.fill('First Level');
    await page.getByRole('option', { name: 'First Level' }).click();  
    await page.getByRole('button', { name: 'ตกลง' }).click();  

    const productRow2 = page.getByRole('row').filter({ hasText: 'ทุเรียน (จีน-ทางเรือ/ทางอากาศ)' });
    await productRow2.locator('.v-selection-control').click();
    await expect(productRow2.locator('.mdi-radiobox-marked')).toBeVisible();

    await page.getByRole('button', { name: 'เพิ่มข้อมูล' }).nth(4).click();  
    await page.getByPlaceholder('เลขทะเบียน').nth(0).fill('AC03900175123000913/200'); 
    await page.locator('input[type="file"]').nth(0).setInputFiles(TEST_PDF1);   
    await page.getByPlaceholder('เลขทะเบียน').nth(1).fill('DQ');    
    await page.locator('input[type="file"]').nth(1).setInputFiles(TEST_PDF1);   
    await page.getByPlaceholder('เลขทะเบียน').nth(2).fill('AAA');   
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










    




});