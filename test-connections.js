const { MongoClient } = require('mongodb');

async function testMongoDB() {
  const uri = "mongodb+srv://mey4249:emre4249@polikrizdatabase.uekezsx.mongodb.net/polikriz_platform?retryWrites=true&w=majority&appName=polikrizdatabase";
  
  try {
    console.log('🔄 MongoDB bağlantısı test ediliyor...');
    const client = new MongoClient(uri);
    await client.connect();
    
    // Test ping
    await client.db('polikriz_platform').admin().ping();
    console.log('✅ MongoDB bağlantısı başarılı!');
    
    // Test collection operations
    const db = client.db('polikriz_platform');
    const testCollection = db.collection('test');
    
    // Insert test document
    const testDoc = {
      message: 'MongoDB connection test',
      timestamp: new Date(),
      status: 'success'
    };
    
    const insertResult = await testCollection.insertOne(testDoc);
    console.log('✅ MongoDB insert işlemi başarılı:', insertResult.insertedId);
    
    // Read test document
    const findResult = await testCollection.findOne({ _id: insertResult.insertedId });
    console.log('✅ MongoDB read işlemi başarılı:', findResult ? 'OK' : 'FAILED');
    
    // Clean up
    await testCollection.deleteOne({ _id: insertResult.insertedId });
    console.log('✅ MongoDB cleanup başarılı');
    
    await client.close();
    return true;
  } catch (error) {
    console.log('❌ MongoDB bağlantı hatası:', error.message);
    return false;
  }
}

async function testPrisma() {
  try {
    console.log('🔄 Prisma bağlantısı test ediliyor...');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    await prisma.$connect();
    console.log('✅ Prisma bağlantısı başarılı!');
    
    // Test a simple query
    const countries = await prisma.country.findMany({ take: 1 });
    console.log('✅ Prisma query işlemi başarılı');
    
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.log('❌ Prisma bağlantı hatası:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Veritabanı bağlantıları test ediliyor...\n');
  
  const mongoResult = await testMongoDB();
  console.log('');
  const prismaResult = await testPrisma();
  
  console.log('\n📊 Test Sonuçları:');
  console.log(`MongoDB: ${mongoResult ? '✅ Başarılı' : '❌ Başarısız'}`);
  console.log(`Prisma: ${prismaResult ? '✅ Başarılı' : '❌ Başarısız'}`);
  
  if (mongoResult || prismaResult) {
    console.log('\n🎉 En az bir veritabanı bağlantısı çalışıyor!');
  } else {
    console.log('\n💥 Tüm veritabanı bağlantıları başarısız!');
  }
}

main().catch(console.error);
