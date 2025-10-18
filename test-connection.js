const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = 'mongodb+srv://mehmeh700:emre4249@policrisis.ffohxzm.mongodb.net/?retryWrites=true&w=majority&appName=Policrisis';
  
  try {
    console.log('MongoDB bağlantısı test ediliyor...');
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('✅ MongoDB bağlantısı başarılı!');
    
    const db = client.db('policrisis');
    console.log('✅ Veritabanı: policrisis');
    
    // Test collection oluştur
    const testCollection = db.collection('test');
    await testCollection.insertOne({
      message: 'Test document',
      timestamp: new Date()
    });
    console.log('✅ Test dokümanı eklendi');
    
    // Koleksiyonları listele
    const collections = await db.listCollections().toArray();
    console.log('📁 Mevcut koleksiyonlar:', collections.map(c => c.name));
    
    await client.close();
    console.log('✅ Bağlantı kapatıldı');
    
  } catch (error) {
    console.error('❌ Hata:', error.message);
  }
}

testConnection();
