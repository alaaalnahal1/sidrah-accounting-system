import mysql from "mysql2/promise";

// إعداد اتصال قاعدة البيانات
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// إنشاء مجمع اتصالات لتحسين الأداء
const pool = mysql.createPool(dbConfig);

// دالة للحصول على اتصال من المجمع
export async function getConnection() {
  try {
    console.log("محاولة الاتصال بقاعدة البيانات...", {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    });

    const connection = await pool.getConnection();
    console.log("تم الاتصال بقاعدة البيانات بنجاح");
    return connection;
  } catch (error) {
    console.error("خطأ في الاتصال بقاعدة البيانات:", error);
    throw new Error(`فشل الاتصال بقاعدة البيانات: ${error instanceof Error ? error.message : "خطأ غير معروف"}`);
  }
}

// دالة لتنفيذ استعلام SQL
export async function executeQuery<T>(query: string, params: any[] = []): Promise<T> {
  let connection;
  try {
    connection = await getConnection();
    console.log("تنفيذ استعلام:", query.substring(0, 100) + (query.length > 100 ? "..." : ""));

    const [results] = await connection.execute(query, params);
    return results as T;
  } catch (error) {
    console.error("خطأ في تنفيذ الاستعلام:", error);
    throw new Error(`فشل تنفيذ الاستعلام: ${error instanceof Error ? error.message : "خطأ غير معروف"}`);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// دالة للتحقق من اتصال قاعدة البيانات
export async function testConnection(): Promise<boolean> {
  let connection;
  try {
    console.log("اختبار الاتصال بقاعدة البيانات...");
    connection = await getConnection();
    const [result] = await connection.execute("SELECT 1 as test");
    console.log("نتيجة اختبار الاتصال:", result);
    return Array.isArray(result) && result.length > 0;
  } catch (error) {
    console.error("فشل اختبار الاتصال بقاعدة البيانات:", error);
    return false;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
