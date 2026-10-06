import { test ,expect} from '@playwright/test';
import path from 'path';
import fs from 'fs';

console.log(fs.readdirSync(path.resolve(process.cwd(), 'downloads')));


test('demo Download', async ({ page,context }) => {
    await page.goto('https://qahive-demo.w3spaces.com/index.html');
    await page.waitForLoadState('networkidle');
    await page.locator('[id=continue-btn]').click();

    // 1. เตรียมรอ event download ก่อน
    const downloadPromise = page.waitForEvent('download');
    // 2. คลิกปุ่มที่จะดาวน์โหลดไฟล์
    await page.click('css=a[href="/download-test-file.txt"]');
    // 3. รับ download ที่เกิดขึ้น
    const download = await downloadPromise;
    // 4. บันทึกไฟล์ไว้ที่ path ที่ต้องการ
    await download.saveAs('./downloads/' + download.suggestedFilename());
    // 5. แสดงชื่อไฟล์ที่ดาวน์โหลด
    console.log('ชื่อไฟล์:', download.suggestedFilename());


    test.setTimeout(0);
    await page.pause();

});


test('demo upload', async ({ page,context }) => {
    await page.goto('https://qahive-demo.w3spaces.com/index.html');
    await page.waitForLoadState('networkidle');
    await page.locator('[id=continue-btn]').click();

    // 1. เตรียมรอ event download ก่อน
    await page.locator('input[type="file"]').setInputFiles(
    // 2. อัปโหลดไฟล์ไปยัง input[type="file"]
    path.resolve(process.cwd(), 'downloads', 'download-test-file.txt'));
    // 3. คลิกปุ่ม submit เพื่ออัปโหลดไฟล์
    await page.locator('input[type="submit"]').click();
    // 4. ตรวจสอบว่า URL เปลี่ยนไปตามที่คาดหวัง
    await expect(page).toHaveURL(new RegExp('.*myfile=download-test-file.txt*'));
    // 5. แสดงข้อความยืนยันการอัปโหลดไฟล์สำเร็จ
    console.log('Upload file success');
 

    test.setTimeout(0);
    await page.pause(); 

    

});


